import type { Role, YearMonth } from "~/data/experience";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** Months since year 0, so dates compare and subtract as plain numbers. */
export const monthIndex = (ym: YearMonth) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};
export const currentMonth = (d = new Date()) => d.getFullYear() * 12 + d.getMonth();

export const formatMonth = (idx: number, precision: Role["precision"] = "month") =>
  precision === "year" ? String(Math.floor(idx / 12)) : `${MONTHS[idx % 12]} ${Math.floor(idx / 12)}`;

export const formatRange = (r: Role) =>
  `${formatMonth(monthIndex(r.start), r.precision)} → ${r.end ? formatMonth(monthIndex(r.end), r.precision) : "present"}`;

export const formatDuration = (r: Role, now: number) => {
  const n = (r.end ? monthIndex(r.end) : now) - monthIndex(r.start) + 1;
  const y = Math.floor(n / 12), m = n % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`].filter(Boolean).join(" ") || "1 mo";
};

/** Stable short hash per branch, so each role keeps the same "commit id". */
export const commitHash = (seed: string) => {
  let h = 2166136261;
  for (const c of seed) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
};

export type RowKind = "head" | "init" | "branch" | "merge";

export interface GraphRow {
  kind: RowKind;
  /** Absent only on the HEAD row. */
  role?: Role;
}

export interface Branch {
  role: Role;
  lane: number;
  /** Row where the branch starts (or the init row, for the trunk). */
  startRow: number;
  /** Merge row; 0 (the HEAD row) while the role is ongoing. */
  endRow: number;
  open: boolean;
}

export interface Graph {
  rows: GraphRow[];
  branches: Branch[];
  byBranch: Map<string, Branch>;
  laneCount: number;
  trunk: Role;
}

/**
 * Lays roles out as a git log, newest row first. The trunk role is lane 0;
 * every other role branches off it when it starts and merges back when it
 * ends. A lane is reused once its branch has merged.
 */
export function layoutGraph(roles: Role[]): Graph {
  const trunk = roles.find((r) => r.trunk) ?? roles[0];
  type Ev = { kind: Exclude<RowKind, "head">; role: Role; at: number; order: number };
  const events: Ev[] = [];
  roles.forEach((role, order) => {
    if (role === trunk) {
      events.push({ kind: "init", role, at: monthIndex(role.start), order });
      return;
    }
    events.push({ kind: "branch", role, at: monthIndex(role.start), order });
    if (role.end) events.push({ kind: "merge", role, at: monthIndex(role.end), order });
  });

  // Display order: newest first; within a month, merges sit above branches,
  // and the init commit is always last.
  const rank = { merge: 0, branch: 1, init: 2 } as const;
  const sorted = [...events].sort((a, b) => b.at - a.at || rank[a.kind] - rank[b.kind] || a.order - b.order);
  const rows: GraphRow[] = [{ kind: "head" }, ...sorted.map(({ kind, role }) => ({ kind, role }))];
  const rowOf = (kind: RowKind, role: Role) => rows.findIndex((r) => r.kind === kind && r.role === role);

  // Lane assignment, oldest first. Within a month, branches claim lanes before
  // merges free them, so a new branch never collides with one merging that month.
  const ascRank = { init: 0, branch: 1, merge: 2 } as const;
  const asc = [...events].sort((a, b) => a.at - b.at || ascRank[a.kind] - ascRank[b.kind] || a.order - b.order);
  const used = new Set<number>([0]);
  const laneOf = new Map<Role, number>([[trunk, 0]]);
  for (const ev of asc) {
    if (ev.kind === "branch") {
      let l = 1;
      while (used.has(l)) l++;
      used.add(l);
      laneOf.set(ev.role, l);
    } else if (ev.kind === "merge") {
      used.delete(laneOf.get(ev.role)!);
    }
  }

  const branches: Branch[] = roles.map((role) => {
    const isTrunk = role === trunk;
    return {
      role,
      lane: laneOf.get(role)!,
      startRow: rowOf(isTrunk ? "init" : "branch", role),
      endRow: role.end && !isTrunk ? rowOf("merge", role) : 0,
      open: !role.end || isTrunk,
    };
  });

  return {
    rows,
    branches,
    byBranch: new Map(branches.map((b) => [b.role.branch, b])),
    laneCount: Math.max(...branches.map((b) => b.lane)) + 1,
    trunk,
  };
}

export interface Segment {
  branch: Branch;
  d: string;
}
export interface Dot {
  branch: Branch;
  x: number;
  y: number;
  hollow: boolean;
}

/**
 * Everything drawn inside one row's gutter, in row-local coordinates
 * (0 = top of the row, `h` = bottom). Keeping curves inside their own row
 * lets rows grow taller (an expanded detail) without breaking the graph:
 * `through` lists the lanes that continue below the row.
 */
export function rowGeometry(g: Graph, r: number, h: number, laneX: (l: number) => number) {
  const segments: Segment[] = [];
  const dots: Dot[] = [];
  const through: Branch[] = [];
  const mid = h / 2;
  const x0 = laneX(0);

  for (const b of g.branches) {
    const x = laneX(b.lane);
    const isTrunk = b.lane === 0 && b.role === g.trunk;
    if (r > b.startRow || r < b.endRow) continue;

    if (isTrunk) {
      const top = r === 0 ? mid : 0;
      const bottom = r === b.startRow ? mid : h;
      segments.push({ branch: b, d: `M${x},${top} V${bottom}` });
      if (r === b.startRow) dots.push({ branch: b, x, y: mid, hollow: false });
      if (r === 0) dots.push({ branch: b, x, y: mid, hollow: true });
    } else if (r === b.startRow) {
      // branch off: curve up out of the trunk, then continue up the lane
      segments.push({ branch: b, d: `M${x0},${h} C${x0},${h * 0.75} ${x},${h * 0.75} ${x},${mid} V${r === b.endRow ? mid : 0}` });
      dots.push({ branch: b, x, y: mid, hollow: false });
    } else if (r === b.endRow && !b.open) {
      // merge: lane comes up from below and curves into the trunk
      segments.push({ branch: b, d: `M${x},${h} C${x},${h * 0.75} ${x0},${h * 0.75} ${x0},${mid}` });
      dots.push({ branch: b, x: x0, y: mid, hollow: true });
    } else if (r === 0) {
      segments.push({ branch: b, d: `M${x},${mid} V${h}` });
      dots.push({ branch: b, x, y: mid, hollow: true });
    } else {
      segments.push({ branch: b, d: `M${x},0 V${h}` });
    }

    if (r < b.startRow) through.push(b);
  }
  return { segments, dots, through };
}

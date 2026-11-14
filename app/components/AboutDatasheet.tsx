import { BsGithub } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";
import { BiMailSend } from "react-icons/bi";

/**
 * About section written up as a component datasheet for part "UT-01".
 * Blocks carry `about-reveal` so home.tsx's staggered scroll reveal still applies.
 */

const features: { lead: string; rest: string }[] = [
  { lead: "Ships real tools.", rest: "Job Market Agent automates the tedious parts of applying for jobs." },
  { lead: "Clean, maintainable output.", rest: "Code written to be read by the next person." },
  { lead: "Field-upgradable.", rest: "Keeps learning new tools and best practices." },
  { lead: "Currently adding:", rest: "AI integration in web apps and cloud services." },
];

const characteristics: [param: string, value: string, note: string][] = [
  ["Location", "Midrand, ZA", "UTC+2"],
  ["Core languages", "Python, JavaScript", "TypeScript where it helps"],
  ["Frameworks", "React, Node.js", "FastAPI on the Python side"],
  ["In development", "AI + cloud", "OpenAI API, Azure, Vercel"],
  ["Idle mode", "Gaming, tech reading", "Low power, high curiosity"],
];

const links = [
  { href: "https://github.com/zerobbreak", label: "GitHub", icon: <BsGithub size={15} />, external: true },
  { href: "https://www.linkedin.com/in/unathi-tshuma-7a30a523b/", label: "LinkedIn", icon: <LiaLinkedin size={16} />, external: true },
  { href: "mailto:utshuma6@gmail.com", label: "Email", icon: <BiMailSend size={15} />, external: false },
];

const inputs = ["HTML/CSS", "JAVASCRIPT", "PYTHON", "CURIOSITY"];
const outputs = ["REACT APPS", "APIs", "AI TOOLS"];
const PIN_Y = [90, 140, 190, 240];

const SectionHeading = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <h3 className="mb-3 flex gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground">
    <span className="text-brand-primary">{n}</span>
    {children}
  </h3>
);

function PinDiagram() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 360 330"
        role="img"
        aria-label="Pin diagram. Inputs: HTML and CSS, JavaScript, Python, curiosity. Outputs: React apps, APIs, AI tools, and cloud, which is new."
        className="block h-auto w-full font-mono"
      >
        <g stroke="var(--color-muted-foreground)" strokeWidth={2}>
          {PIN_Y.map((y) => (
            <line key={`in-${y}`} x1={20} y1={y} x2={110} y2={y} />
          ))}
          {PIN_Y.slice(0, 3).map((y) => (
            <line key={`out-${y}`} x1={250} y1={y} x2={340} y2={y} />
          ))}
          <line x1={180} y1={274} x2={180} y2={296} />
        </g>
        <line x1={250} y1={240} x2={340} y2={240} stroke="var(--color-brand-primary)" strokeWidth={2.5} />

        <rect x={110} y={56} width={140} height={218} rx={4} fill="var(--color-foreground)" />
        <circle cx={128} cy={74} r={5} fill="var(--color-card)" />
        <text x={180} y={156} textAnchor="middle" fontSize={24} fontWeight={800} fill="var(--color-card)">
          UT-01
        </text>
        <text x={180} y={178} textAnchor="middle" fontSize={10} letterSpacing={2} fill="var(--color-card)" opacity={0.7}>
          MIDRAND · ZA
        </text>
        <g fontSize={10} fontWeight={700} fill="var(--color-card)" opacity={0.75}>
          {PIN_Y.map((y, i) => (
            <text key={`l-${y}`} x={122} y={y + 4}>
              {i + 1}
            </text>
          ))}
          {PIN_Y.map((y, i) => (
            <text key={`r-${y}`} x={238} y={y + 4} textAnchor="end">
              {8 - i}
            </text>
          ))}
        </g>

        <g fontSize={10.5} fontWeight={600} fill="var(--color-foreground)">
          {inputs.map((t, i) => (
            <text key={t} x={20} y={PIN_Y[i] - 8}>
              {t}
            </text>
          ))}
          {outputs.map((t, i) => (
            <text key={t} x={340} y={PIN_Y[i] - 8} textAnchor="end">
              {t}
            </text>
          ))}
        </g>
        <text x={340} y={232} textAnchor="end" fontSize={10.5} fontWeight={700} fill="var(--color-brand-primary)">
          CLOUD ⟶ NEW
        </text>
        <g fontSize={9} letterSpacing={1.5} fill="var(--color-muted-foreground)">
          <text x={20} y={30}>IN</text>
          <text x={340} y={30} textAnchor="end">OUT</text>
          <text x={180} y={310} textAnchor="middle">GND · COFFEE</text>
        </g>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        Fig. 1 · Pin configuration (top view)
      </figcaption>
    </figure>
  );
}

export default function AboutDatasheet() {
  return (
    <section id="about" className="container mx-auto px-6 pt-20">
      <span className="about-reveal mb-3 block font-mono text-[11px] uppercase tracking-[0.3em] text-brand-primary">
        / 04 — About
      </span>

      <article className="about-reveal hud-frame relative border border-border bg-card" aria-labelledby="about-title">
        {/* Header strip */}
        <header className="grid gap-4 border-b-2 border-foreground px-5 pt-6 pb-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:px-7">
          <div>
            <h2 id="about-title" className="font-mono text-[32px] font-extrabold leading-none text-foreground md:text-[40px]">
              UT-01
              <span className="sr-only">: About Unathi Tshuma</span>
            </h2>
            <p className="mt-2 text-[13px] font-semibold text-muted-foreground">
              Full-stack web developer · Python &amp; JavaScript
            </p>
          </div>
          <p className="font-mono text-[10px] uppercase leading-[1.7] tracking-[0.14em] text-muted-foreground md:text-right">
            Datasheet · Rev 2026.11
            <br />
            Status: <span className="font-bold text-brand-primary">In production</span>
            <br />
            Midrand, ZA
          </p>
        </header>

        <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {/* Left column: description, features, characteristics */}
          <div className="flex min-w-0 flex-col gap-6 px-5 py-6 md:px-7">
            <div className="about-reveal">
              <SectionHeading n={1}>General description</SectionHeading>
              <p className="max-w-[62ch] text-[14px] leading-[1.7] text-muted-foreground">
                The UT-01 started as <strong className="text-foreground">curiosity about how the web works</strong>. It
                began with HTML and CSS, moved deep into the JavaScript ecosystem and React, and now runs the backend
                too. It is tuned for{" "}
                <strong className="text-foreground">full-stack applications that solve real problems</strong>.
              </p>
            </div>

            <div className="about-reveal">
              <SectionHeading n={2}>Features</SectionHeading>
              <ul className="flex flex-col gap-2">
                {features.map((f) => (
                  <li key={f.lead} className="relative pl-[18px] text-[13.5px] leading-[1.55] text-muted-foreground">
                    <span aria-hidden="true" className="absolute left-0 top-[0.5em] h-2 w-2 bg-brand-primary" />
                    <strong className="text-foreground">{f.lead}</strong> {f.rest}
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-reveal">
              <SectionHeading n={3}>Operating characteristics</SectionHeading>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr>
                      {["Parameter", "Value", "Notes"].map((h) => (
                        <th
                          key={h}
                          scope="col"
                          className="border-b border-foreground px-2.5 py-2 text-left font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-muted-foreground"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {characteristics.map(([param, value, note]) => (
                      <tr key={param} className="border-b border-dashed border-border">
                        <th scope="row" className="whitespace-nowrap px-2.5 py-2 text-left align-top font-mono text-[12px] font-semibold text-foreground">
                          {param}
                        </th>
                        <td className="px-2.5 py-2 align-top font-semibold text-foreground">{value}</td>
                        <td className="px-2.5 py-2 align-top text-[12.5px] text-muted-foreground">{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right column: pin diagram */}
          <div className="about-reveal min-w-0 border-t border-border px-5 py-6 md:border-t-0 md:border-l md:px-7">
            <PinDiagram />
          </div>
        </div>

        {/* Footer: contact */}
        <footer className="flex flex-wrap items-center justify-between gap-3.5 border-t-2 border-foreground px-5 py-4 md:px-7">
          <div className="flex flex-wrap gap-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-2 border border-border px-3 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                {l.icon}
                {l.label}
              </a>
            ))}
          </div>
          <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">UT-01 · PAGE 1 OF 1</span>
        </footer>
      </article>
    </section>
  );
}

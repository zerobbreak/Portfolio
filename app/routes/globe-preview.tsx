import CobeGlobe from "~/components/ui/cobe-globe";

export default function GlobePreview() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6 p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        // cobe globe preview — drag to rotate
      </p>
      <div className="w-full max-w-xl">
        <CobeGlobe />
      </div>
    </main>
  );
}

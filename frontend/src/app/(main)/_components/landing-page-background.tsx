/**
 * Full-viewport decorative layers behind the landing page. Uses theme tokens
 * so light/dark both read as soft depth without hurting contrast.
 */
export function LandingPageBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Vertical depth: subtle band through the scroll */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/25 to-background dark:via-muted/10" />

      {/* Top center — brand-tinted spotlight */}
      <div className="absolute left-1/2 top-0 h-[min(85vh,48rem)] w-[min(120%,90rem)] -translate-x-1/2 rounded-[100%] bg-primary/[0.14] blur-3xl dark:bg-primary/[0.22]" />

      {/* Mid-right — secondary accent */}
      <div className="absolute -right-24 top-[28%] h-[22rem] w-[22rem] rounded-full bg-chart-2/20 blur-3xl dark:bg-chart-2/25" />

      {/* Lower-left — cool contrast */}
      <div className="absolute -left-32 top-[55%] h-[20rem] w-[20rem] rounded-full bg-chart-1/15 blur-3xl dark:bg-chart-1/20" />

      {/* Bottom edge — grounds the page */}
      <div className="absolute inset-x-0 bottom-0 h-[min(40vh,24rem)] bg-gradient-to-t from-muted/35 to-transparent dark:from-muted/20" />

      {/* Fine grid: very low contrast, reads in both themes */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in oklch, var(--border) 35%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklch, var(--border) 35%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 75%)",
        }}
      />
    </div>
  )
}

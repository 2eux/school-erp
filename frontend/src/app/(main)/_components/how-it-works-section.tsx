import { Badge } from "~/components/ui/badge";

const steps = [
  {
    step: "01",
    title: "Sign Up & Configure",
    desc: "Create your school account and configure your academic structure in minutes.",
  },
  {
    step: "02",
    title: "Import Your Data",
    desc: "Bulk import students, staff, and historical records via CSV or our migration tool.",
  },
  {
    step: "03",
    title: "Go Live",
    desc: "Invite your team, set permissions, and start running your school smarter.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">How It Works</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Up and running in 3 steps
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.step} className="relative text-center">
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  className="absolute top-6 left-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] bg-border sm:block"
                />
              )}
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {s.step}
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

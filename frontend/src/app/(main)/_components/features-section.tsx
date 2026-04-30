import { Badge } from "~/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { GraduationCap, Users, DollarSign, BarChart3, Bell, Shield } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Academic Management",
    description: "Manage curricula, timetables, classes, and academic calendars with ease.",
  },
  {
    icon: Users,
    title: "Student & Staff Records",
    description: "Centralised profiles for every student, teacher, and staff member.",
  },
  {
    icon: DollarSign,
    title: "Fee & Finance",
    description: "Automate fee collection, generate invoices, and track payments in real time.",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description: "Gain instant insights with customisable dashboards and exportable reports.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Send SMS, email, and in-app alerts to parents, students, and staff.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Granular permissions ensure every user only sees what they need.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything your school needs
          </h2>
          <p className="mt-4 text-muted-foreground">
            Purpose-built tools that work together seamlessly, replacing a
            patchwork of spreadsheets and legacy software.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title} className="gap-4">
                <CardHeader>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-5 text-foreground" />
                  </div>
                  <CardTitle className="mt-2 text-base">{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

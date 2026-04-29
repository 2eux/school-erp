import { Badge } from "~/components/ui/badge";
import {
  BookOpen,
  Users,
  DollarSign,
  Calendar,
  Building2,
  ClipboardList,
  MessageSquare,
  Layers,
} from "lucide-react";

const modules = [
  {
    icon: BookOpen,
    name: "Academics",
    desc: "Curriculum, timetables, exams, and results",
  },
  {
    icon: ClipboardList,
    name: "Attendance",
    desc: "Biometric & manual attendance tracking",
  },
  {
    icon: DollarSign,
    name: "Finance",
    desc: "Fees, payroll, ledger, and receipts",
  },
  {
    icon: Users,
    name: "HR & Payroll",
    desc: "Staff management and salary processing",
  },
  {
    icon: MessageSquare,
    name: "Communication",
    desc: "Parent portal, notice board, and messaging",
  },
  {
    icon: Building2,
    name: "Hostel",
    desc: "Room allocation, warden management",
  },
  {
    icon: Layers,
    name: "Library",
    desc: "Book catalogue, issue/return tracking",
  },
  {
    icon: Calendar,
    name: "Events",
    desc: "School events, holidays, and scheduling",
  },
];

export function ModulesSection() {
  return (
    <section id="modules" className="bg-muted/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">Modules</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            One platform, every department
          </h2>
          <p className="mt-4 text-muted-foreground">
            From academics to hostel management, every module is connected so
            data flows freely across your institution.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.name}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </div>
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

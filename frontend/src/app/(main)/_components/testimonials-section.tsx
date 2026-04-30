import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "SchoolERP transformed how we manage 3,000 students. Fee collection alone saves us 40 hours a month.",
    author: "Priya Mehta",
    role: "Principal, Delhi Public School",
  },
  {
    quote:
      "The parent portal reduced our phone enquiries by 60%. Parents love the real-time updates.",
    author: "James Okafor",
    role: "Admin Head, Greenfield Academy",
  },
  {
    quote:
      "Onboarding took two days. The support team was exceptional. Highly recommended.",
    author: "Ananya Sharma",
    role: "Director, Sunrise International",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-muted/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by school leaders
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.author}>
              <CardContent className="flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-foreground text-foreground" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-medium">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

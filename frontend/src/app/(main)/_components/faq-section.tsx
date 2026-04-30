import { Badge } from "~/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes — every plan comes with a 14-day free trial, no credit card required. You can explore all features before committing.",
  },
  {
    q: "Can I migrate data from my existing system?",
    a: "Absolutely. We provide CSV import tools and a dedicated migration team to ensure a smooth transition from any existing software.",
  },
  {
    q: "Is my data secure?",
    a: "Your data is encrypted at rest and in transit using AES-256 and TLS 1.3. We are ISO 27001 certified and comply with DPDP regulations.",
  },
  {
    q: "Do you support multiple branches?",
    a: "Yes. Our Enterprise plan supports unlimited branches with a unified admin dashboard and consolidated reporting.",
  },
  {
    q: "What kind of support do you offer?",
    a: "We offer email support on all plans, priority chat on Growth, and a dedicated account manager on Enterprise. Our average response time is under 2 hours.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-muted/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">FAQ</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="rounded-xl border border-border bg-card px-6 shadow-xs"
          >
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

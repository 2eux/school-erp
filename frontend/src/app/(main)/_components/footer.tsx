import Link from "next/link";
import { GraduationCap } from "lucide-react";

const productLinks = ["Features", "Modules", "Pricing", "Changelog"];
const companyLinks = ["About", "Blog", "Careers", "Contact"];
const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="size-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">SchoolERP</span>
            </Link>
            <p className="mt-3 text-xs text-muted-foreground">
              The modern school management platform built for the 21st century.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium">Product</p>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              {productLinks.map((l) => (
                <li key={l}>
                  <Link href="#" className="hover:text-foreground">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium">Company</p>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              {companyLinks.map((l) => (
                <li key={l}>
                  <Link href="#" className="hover:text-foreground">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium">Legal</p>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              {legalLinks.map((l) => (
                <li key={l}>
                  <Link href="#" className="hover:text-foreground">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SchoolERP. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ♥ for educators everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

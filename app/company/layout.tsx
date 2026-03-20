"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { OrganizationSwitcher, Protect, UserButton } from "@clerk/nextjs";
import { Bell, BriefcaseBusiness, FileText, LayoutDashboard, Plus } from "lucide-react";
import { NotificationBell } from "@/components/notification-bell";
import { SiteLogo } from "@/components/site-logo";
import { useLanguage } from "@/components/i18n/language-context";
import { SyncCompanyPlan } from "./_components/sync-company-plan";

const exactRoutes = new Set(["/company/jobs/new", "/company/billing"]);

// รายการเมนูฝั่งผู้ให้บริการ — ใช้ labelKey แทน label เพื่อรองรับ i18n
const navItemKeys = [
  { href: "/company", labelKey: "company.dashboard" as const, icon: LayoutDashboard, exact: true },
  { href: "/company/jobs", labelKey: "company.learningPrograms" as const, icon: BriefcaseBusiness },
  { href: "/company/applications", labelKey: "company.enrollments" as const, icon: FileText },
];

function isNavActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return (pathname === href || pathname.startsWith(href + "/")) && !exactRoutes.has(pathname);
}

export default function CompanyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  // เรียกใช้ระบบแปลภาษา
  const { t, lang, setLang } = useLanguage();

  return (
    <main className="min-h-screen bg-background pb-16 lg:pb-0">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-2 overflow-hidden px-4 py-2.5 md:gap-4 md:px-6 lg:gap-6">
          <div className="flex shrink-0 items-center gap-2 md:gap-2.5">
            <SiteLogo />
            <span
              className="inline-flex shrink-0 items-center rounded-full border-2 border-terracotta/30 bg-terracotta px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white md:px-3 md:text-xs"
              aria-label="Jobly Learning Provider panel"
            >
              Learning Provider
            </span>
          </div>

          <nav className="hidden min-w-0 flex-1 items-center gap-1 lg:flex lg:gap-1.5 [&::-webkit-scrollbar]:h-0">
            {navItemKeys.map((item) => {
              const isActive = isNavActive(pathname, item.href, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors lg:px-3.5 ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="size-3.5" />
                  {t(item.labelKey)}
                </Link>
              );
            })}

            <Protect condition={(has) => has({ role: "org:admin" }) || has({ role: "org:recruiter" })}>
              <Link
                href="/company/jobs/new"
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors lg:px-3.5 ${
                  pathname === "/company/jobs/new"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Plus className="size-3.5" />
                {t("company.postProgram")}
              </Link>
            </Protect>

            {/* Billing/Pricing is intentionally hidden in this NSC demo. */}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 md:gap-3">
            {/* ปุ่มสลับภาษาแบบมินิมอล (TH / EN) — ฝั่งผู้ให้บริการ */}
            <button
              type="button"
              onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="hidden items-center rounded-full border border-border/40 bg-secondary/30 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground lg:inline-flex"
              aria-label="Toggle language"
            >
              {lang === "th" ? "TH" : "EN"}
              <span className="mx-1 text-border">|</span>
              <span className="text-muted-foreground/50">{lang === "th" ? "EN" : "TH"}</span>
            </button>
            <OrganizationSwitcher hidePersonal />
            <NotificationBell />
            <UserButton />
          </div>
        </div>
      </header>

      <SyncCompanyPlan />
      <div className="mx-auto w-full max-w-7xl px-6 py-8">
        {children}
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-lg lg:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-around">
          {navItemKeys.map((item) => {
            const isActive = isNavActive(pathname, item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon className="size-5" />
                {t(item.labelKey)}
              </Link>
            );
          })}

          <Link
            href="/notifications"
            className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${
              pathname === "/notifications" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <Bell className="size-5" />
            {t("nav.alerts")}
          </Link>

          <Protect condition={(has) => has({ role: "org:admin" }) || has({ role: "org:recruiter" })}>
            <Link
              href="/company/jobs/new"
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${
                pathname === "/company/jobs/new" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Plus className="size-5" />
              {t("company.post")}
            </Link>
          </Protect>

          {/* Billing/Pricing is intentionally hidden in this NSC demo. */}
        </div>
      </nav>
    </main>
  );
}

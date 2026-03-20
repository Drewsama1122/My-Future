"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Bell, Briefcase, Heart, FileText, Pencil, Search, UserRound } from "lucide-react";
import { NotificationBell } from "@/components/notification-bell";
import { SiteLogo } from "@/components/site-logo";
import { useLanguage, type TranslationKey } from "@/components/i18n/language-context";

// เมนู Navbar ฝั่งผู้เรียน — ลบลิงก์ "สำหรับผู้ให้โปรแกรมเรียน" แล้วเพิ่ม "โปรไฟล์" แทน
const navItems = [
  { href: "/jobs", labelKey: "nav.skillPaths" as TranslationKey, icon: Search },
  { href: "/applications", labelKey: "nav.learningProgress" as TranslationKey, icon: FileText },
  { href: "/profile", labelKey: "nav.profile" as TranslationKey, icon: UserRound },
  { href: "/favorites", labelKey: "nav.saved" as TranslationKey, icon: Heart },
];

// เมนู Mobile Navbar — เพิ่ม "โปรไฟล์" เข้ามาด้วย
const mobileNavItems = [
  { href: "/jobs", labelKey: "nav.skillPaths" as TranslationKey, icon: Search },
  { href: "/applications", labelKey: "nav.learningProgress" as TranslationKey, icon: FileText },
  { href: "/profile", labelKey: "nav.profile" as TranslationKey, icon: UserRound },
  { href: "/notifications", labelKey: "nav.alerts" as TranslationKey, icon: Bell },
  { href: "/favorites", labelKey: "nav.saved" as TranslationKey, icon: Heart },
];

export default function CandidateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  return (
    <main className="min-h-screen bg-background pb-16 md:pb-0">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-6 px-6 py-2.5">
          <SiteLogo />

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.slice(0, 2).map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-jade text-white"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="size-3.5" />
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <div className="hidden items-center gap-1 md:flex">
              {navItems.slice(2).map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-jade text-white"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-3.5" />
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </div>

            {/* ปุ่มสลับภาษาแบบมินิมอล (TH / EN) */}
            <button
              type="button"
              onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="hidden items-center rounded-full border border-border/40 bg-secondary/30 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground md:inline-flex"
              aria-label="Toggle language"
            >
              {lang === "th" ? "TH" : "EN"}
              <span className="mx-1 text-border">|</span>
              <span className="text-muted-foreground/50">{lang === "th" ? "EN" : "TH"}</span>
            </button>

            <NotificationBell />
            <div className="ml-2">
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label={t("profile.editMyProfile")}
                    labelIcon={<Pencil className="size-4" />}
                    href="/profile"
                  />
                  <UserButton.Link
                    label={t("profile.experience")}
                    labelIcon={<Briefcase className="size-4" />}
                    href="/profile#experience"
                  />
                  <UserButton.Link
                    label={t("profile.resume")}
                    labelIcon={<FileText className="size-4" />}
                    href="/profile#resume"
                  />
                  <UserButton.Action label="manageAccount" />
                  <UserButton.Action label="signOut" />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        {children}
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-lg md:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-around">
          {mobileNavItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${
                  isActive
                    ? "text-jade"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="size-5" />
                {t(item.labelKey)}
              </Link>
            );
          })}
        </div>
      </nav>
    </main>
  );
}

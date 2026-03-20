"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  ArrowRight,
  Bookmark,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  FileText,
  Heart,
  Menu,
  PenLine,
  Pencil,
  Search,
  Send,
  Shield,
  Sparkles,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLogo } from "@/components/site-logo";
import { useLanguage } from "@/components/i18n/language-context";

const AVATARS = [
  { src: "https://i.pravatar.cc/120?img=1", size: 72, top: "12%", left: "6%", delay: "0s" },
  { src: "https://i.pravatar.cc/120?img=5", size: 52, top: "6%", left: "20%", delay: "1.2s" },
  { src: "https://i.pravatar.cc/120?img=12", size: 56, top: "52%", left: "4%", delay: "2.4s" },
  { src: "https://i.pravatar.cc/120?img=8", size: 48, top: "8%", right: "8%", delay: "0.8s" },
  { src: "https://i.pravatar.cc/120?img=15", size: 68, top: "14%", right: "20%", delay: "2s" },
  { src: "https://i.pravatar.cc/120?img=20", size: 52, top: "50%", right: "6%", delay: "1.6s" },
];

const DECORATIONS = [
  { color: "bg-jade", size: 14, top: "18%", left: "16%", delay: "0.5s" },
  { color: "bg-amber-accent", size: 10, top: "38%", left: "10%", delay: "1.8s" },
  { color: "bg-jade/40", size: 8, top: "10%", right: "16%", delay: "1s" },
  { color: "bg-amber-accent", size: 12, top: "44%", right: "14%", delay: "2.2s" },
  { color: "bg-jade/30", size: 6, top: "28%", left: "22%", delay: "0.3s" },
  { color: "bg-rose-300", size: 6, top: "30%", right: "22%", delay: "1.4s" },
];

const COMPANIES = [
  { name: "Goople", className: "text-2xl font-medium tracking-tight" },
  { name: "amazom", className: "text-xl font-bold tracking-tight" },
  { name: "dribble", className: "text-2xl font-bold italic tracking-tight" },
  { name: "slak", className: "text-2xl font-bold tracking-tight" },
  { name: "Vina", className: "text-2xl font-light italic tracking-wide" },
  { name: "airbnp", className: "text-xl font-bold tracking-tight" },
];

const POPULAR_TAGS = ["Design", "Art", "Business", "Video Editing"];

const HOW_IT_WORKS = [
  {
    icon: UserRound,
    title: "Create Account",
    description: "It's easy to open an account and start your journey.",
  },
  {
    icon: ClipboardList,
    title: "Complete your profile",
    description: "Complete your profile with all the info to get attention of clients.",
  },
  {
    icon: PenLine,
    title: "Explore Skill Paths",
    description: "Discover learning paths that match market needs and your profile.",
  },
];

const EMPLOYMENT_TYPES = [
  { value: "", label: "All types" },
  { value: "full_time", label: "Full-time" },
  { value: "part_time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "temporary", label: "Temporary" },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">
          <SiteLogo />

          {/* Desktop nav — ปุ่มสลับภาษาอยู่ตรงกลาง */}
          <nav className="hidden items-center gap-1 md:flex">
            <button
              type="button"
              onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="inline-flex items-center rounded-full border border-border/40 bg-secondary/30 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
              aria-label="Toggle language"
            >
              {lang === "th" ? "TH" : "EN"}
              <span className="mx-1 text-border">|</span>
              <span className="text-muted-foreground/50">{lang === "th" ? "EN" : "TH"}</span>
            </button>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {/* ลิงก์โปรไฟล์พร้อมไอคอน */}
            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <UserRound className="size-4" />
              {t("nav.profile")}
            </Link>

            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-foreground/20 px-5 text-sm font-medium"
                >
                  {t("action.loginSignup")}
                </Button>
              </SignInButton>
              <Button
                asChild
                size="sm"
                className="rounded-full bg-jade px-5 text-sm font-medium text-white hover:bg-jade/90"
              >
                <Link href="/company">{t("action.postLearningProgram")}</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button asChild variant="outline" size="sm" className="rounded-full px-5">
                <Link href="/jobs">{t("nav.skillPaths")}</Link>
              </Button>
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
            </SignedIn>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <SignedIn>
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
            </SignedIn>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-border/40 bg-background px-6 pb-5 pt-3 md:hidden">
            {/* Mobile nav — โปรไฟล์พร้อมไอคอน */}
            <nav className="flex flex-col gap-1">
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <UserRound className="size-4" />
                {t("nav.profile")}
              </Link>
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <SignedOut>
                <SignInButton mode="modal" forceRedirectUrl="/">
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-foreground/20 text-sm font-medium"
                  >
                    {t("action.loginSignup")}
                  </Button>
                </SignInButton>
                <Button
                  asChild
                  className="w-full rounded-full bg-jade text-sm font-medium text-white hover:bg-jade/90"
                >
                  <Link href="/company" onClick={() => setMobileOpen(false)}>
                    {t("action.postLearningProgram")}
                  </Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button asChild className="w-full rounded-full bg-jade text-white hover:bg-jade/90">
                  <Link href="/jobs" onClick={() => setMobileOpen(false)}>
                    {t("nav.skillPaths")}
                  </Link>
                </Button>
              </SignedIn>
            </div>
          </div>
        )}
      </header>

      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-8 md:pt-24 md:pb-12">
        {AVATARS.map((avatar, i) => (
          <div
            key={i}
            className="animate-float absolute hidden rounded-full shadow-lg ring-4 ring-background lg:block"
            style={{
              width: avatar.size,
              height: avatar.size,
              top: avatar.top,
              left: avatar.left,
              right: avatar.right,
              animationDelay: avatar.delay,
            }}
          >
            <Image
              src={avatar.src}
              alt=""
              width={avatar.size}
              height={avatar.size}
              className="rounded-full object-cover"
              unoptimized
            />
          </div>
        ))}

        {DECORATIONS.map((dot, i) => (
          <div
            key={i}
            className={`animate-float absolute hidden rounded-full ${dot.color} lg:block`}
            style={{
              width: dot.size,
              height: dot.size,
              top: dot.top,
              left: dot.left,
              right: dot.right,
              animationDelay: dot.delay,
            }}
          />
        ))}

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          {/* หัวข้อ Hero — เปลี่ยนเป็น EdTech wording */}
          <h1 className="animate-fade-in font-(family-name:--font-bricolage) text-4xl leading-[1.1] font-bold tracking-tight md:text-5xl lg:text-6xl">
            {t("landing.heroTitle1")}
            <br />
            {t("landing.heroTitle2")}
          </h1>

          <p className="animate-fade-in stagger-2 mx-auto mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
            {t("landing.heroDescription")}
          </p>

          <div className="@container animate-slide-up stagger-3 mx-auto mt-10 max-w-xl">
            <form
              action="/jobs"
              method="GET"
              className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm @sm:flex-row @sm:items-center"
            >
              <div className="flex flex-1 flex-col divide-y divide-border @sm:flex-row @sm:items-center @sm:divide-x @sm:divide-y-0">
                <div className="relative flex-1 px-4 py-3">
                  <label className="mb-0.5 block text-left text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                    {t("landing.employmentType")}
                  </label>
                  <select
                    name="type"
                    defaultValue=""
                    className="w-full appearance-none bg-transparent text-sm font-medium text-foreground outline-none"
                  >
                    {EMPLOYMENT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 px-4 py-3">
                  <label className="mb-0.5 block text-left text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                    {t("landing.keywordsOrTitle")}
                  </label>
                  <input
                    type="text"
                    name="q"
                    placeholder={t("landing.keywordsPlaceholder")}
                    className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/60 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="m-2 flex items-center justify-center gap-2 rounded-md bg-jade px-6 py-3 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-jade/90"
              >
                <Search className="size-4" />
                {t("action.search")}
              </button>
            </form>
          </div>

          <div className="animate-slide-up stagger-4 mt-5 flex items-center justify-center gap-1 text-sm">
            <span className="font-semibold text-foreground">{t("landing.popular")}</span>
            {POPULAR_TAGS.map((tag, i) => (
              <span key={tag}>
                <Link
                  href={`/jobs?q=${encodeURIComponent(tag)}`}
                  className="text-muted-foreground transition-colors hover:text-jade"
                >
                  {tag}
                </Link>
                {i < POPULAR_TAGS.length - 1 && (
                  <span className="text-muted-foreground">,</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="animate-fade-in stagger-5 border-t border-border/40">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-8 px-6 py-10 md:py-14">
          {COMPANIES.map((company) => (
            <span
              key={company.name}
              className={`select-none text-muted-foreground/40 transition-colors hover:text-muted-foreground/70 ${company.className}`}
            >
              {company.name}
            </span>
          ))}
        </div>
      </section>

      <section className="border-t border-border/40 bg-linear-to-b from-secondary/40 to-background py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* หัวข้อ "How it works" — รองรับ i18n */}
          <h2 className="animate-fade-in text-center font-(family-name:--font-bricolage) text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t("landing.howItWorks")}
          </h2>

          <div className="relative mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-0">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="animate-slide-up relative flex flex-col items-center text-center" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
                {i < HOW_IT_WORKS.length - 1 && (
                  <svg
                    className="absolute top-7 left-[60%] hidden h-5 w-[80%] md:block"
                    viewBox="0 0 200 20"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 10 C60 -5, 140 25, 200 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="5 4"
                      className="text-muted-foreground/40"
                    />
                    <path
                      d="M193 5 L200 10 L193 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      className="text-muted-foreground/40"
                    />
                  </svg>
                )}

                <div className="flex size-14 items-center justify-center rounded-full bg-jade text-white shadow-md">
                  <step.icon className="size-6" />
                </div>

                <h3 className="mt-5 font-(family-name:--font-bricolage) text-lg font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidate path */}
      <section className="border-t border-border/40 py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-jade/10 px-3 py-1 text-xs font-semibold tracking-wide text-jade uppercase">
              <Heart className="size-3" />
              {t("landing.forLearners")}
            </span>
            <h2 className="mt-4 font-(family-name:--font-bricolage) text-3xl font-bold tracking-tight md:text-4xl">
              {t("landing.learnersTitle")}
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              {t("landing.learnersDesc")}
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-jade/10 text-jade">
                  <Search className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{t("landing.smartSearch")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("landing.smartSearchDesc")}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-jade/10 text-jade">
                  <Bookmark className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{t("landing.saveFavorites")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("landing.saveFavoritesDesc")}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-jade/10 text-jade">
                  <Send className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">
                    {t("action.startLearningOneClick")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("landing.oneClickDesc")}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-jade/10 text-jade">
                  <FileText className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{t("landing.profileResume")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("landing.profileResumeDesc")}
                  </p>
                </div>
              </li>
            </ul>
            <div className="mt-8">
              <Button
                asChild
                className="rounded-full bg-jade px-6 text-white hover:bg-jade/90"
              >
                <Link href="/jobs">
                  {t("action.browseAllSkillPaths")}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="grid w-full max-w-sm gap-3">
              {[
                { title: "Senior Product Designer", company: "Figma", location: "Remote", type: "Full-time", salary: "$120k – $180k" },
                { title: "Frontend Engineer", company: "Vercel", location: "San Francisco, CA", type: "Full-time", salary: "$140k – $200k" },
                { title: "Marketing Manager", company: "Notion", location: "New York, NY", type: "Contract", salary: "$90k – $130k" },
              ].map((job, i) => (
                <div
                  key={job.title}
                  className="animate-slide-up rounded-xl border border-border bg-card p-4 warm-shadow transition-all hover:warm-shadow-md"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{job.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {job.company} &middot; {job.location}
                      </p>
                    </div>
                    <Bookmark className="size-4 shrink-0 text-muted-foreground/40" />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium">
                      {job.type}
                    </span>
                    <span className="ml-auto text-xs font-medium text-muted-foreground">
                      {job.salary}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company path */}
      <section className="border-t border-border/40 bg-linear-to-b from-secondary/30 to-background py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="relative flex items-center justify-center">
              <div className="w-full max-w-sm space-y-4">
                <div className="rounded-xl border border-border bg-card p-5 warm-shadow">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-terracotta/10 text-terracotta">
                      <Building2 className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Your Learning Provider</p>
                      <p className="text-xs text-muted-foreground">3 active programs &middot; 12 learners</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-secondary/60 p-3 text-center">
                      <p className="font-(family-name:--font-bricolage) text-xl font-bold">3</p>
                      <p className="text-[11px] text-muted-foreground">Active Programs</p>
                    </div>
                    <div className="rounded-lg bg-secondary/60 p-3 text-center">
                      <p className="font-(family-name:--font-bricolage) text-xl font-bold">12</p>
                      <p className="text-[11px] text-muted-foreground">Learners</p>
                    </div>
                    <div className="rounded-lg bg-secondary/60 p-3 text-center">
                      <p className="font-(family-name:--font-bricolage) text-xl font-bold">4</p>
                      <p className="text-[11px] text-muted-foreground">Team</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-4 warm-shadow">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recent Applications</p>
                  <div className="mt-3 space-y-2.5">
                    {[
                      { name: "Sarah K.", role: "Senior Designer", status: "In review", statusColor: "bg-amber-accent/20 text-amber-accent" },
                      { name: "James L.", role: "Frontend Engineer", status: "Accepted", statusColor: "bg-jade/10 text-jade" },
                      { name: "Mia T.", role: "Marketing Manager", status: "Submitted", statusColor: "bg-secondary text-muted-foreground" },
                    ].map((app) => (
                      <div key={app.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-7 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
                            {app.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-medium">{app.name}</p>
                            <p className="text-[11px] text-muted-foreground">{app.role}</p>
                          </div>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${app.statusColor}`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta/10 px-3 py-1 text-xs font-semibold tracking-wide text-terracotta uppercase">
              <Building2 className="size-3" />
              {t("landing.forProviders")}
            </span>
            <h2 className="mt-4 font-(family-name:--font-bricolage) text-3xl font-bold tracking-tight md:text-4xl">
              {t("landing.providersTitle")}
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              {t("landing.providersDesc")}
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-terracotta/10 text-terracotta">
                  <BriefcaseBusiness className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{t("landing.publishManage")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("landing.publishManageDesc")}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-terracotta/10 text-terracotta">
                  <Shield className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{t("landing.reviewProgress")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("landing.reviewProgressDesc")}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-terracotta/10 text-terracotta">
                  <Users className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{t("landing.teamAccess")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("landing.teamAccessDesc")}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-terracotta/10 text-terracotta">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{t("landing.flexPackages")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("landing.flexPackagesDesc")}
                  </p>
                </div>
              </li>
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <Button
                asChild
                className="rounded-full bg-terracotta px-6 text-white hover:bg-terracotta/90"
              >
                <Link href="/company">
                  {t("action.learningProviderWorkspace")}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              {/* Billing/Pricing is hidden in this NSC demo. */}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border/40 py-12 md:py-16">
        <div className="mx-auto grid max-w-4xl gap-8 px-6 md:grid-cols-4">
          {[
            { value: "$0", label: t("landing.statFree") },
            { value: "3", label: t("landing.statPackages") },
            { value: "10", label: t("landing.statSeats") },
            { value: "24/7", label: t("landing.statRealtime") },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-(family-name:--font-bricolage) text-3xl font-bold tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 bg-foreground py-16 text-background md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          {/* หัวข้อ CTA — รองรับ i18n */}
          <h2 className="font-(family-name:--font-bricolage) text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t("landing.readyTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-background/60">
            {t("landing.readyDesc")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/jobs">
                <Button
                  size="lg"
                  className="rounded-full bg-jade px-8 text-white hover:bg-jade/90"
                >
                  {t("action.signUpFree")}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </SignInButton>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-background/40 bg-background/10 px-8 text-background hover:bg-background/20"
              >
                <Link href="/jobs">{t("action.browseLearningPaths")}</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-jade px-8 text-white hover:bg-jade/90"
              >
                <Link href="/jobs">
                  {t("action.goToDashboard")}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-background/40 bg-background/10 px-8 text-background hover:bg-background/20"
              >
                <Link href="/company">{t("action.learningProviderWorkspace")}</Link>
              </Button>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
          <SiteLogo />
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/jobs" className="transition-colors hover:text-foreground">
              {t("nav.skillPaths")}
            </Link>
            <Link href="/company" className="transition-colors hover:text-foreground">
              {t("nav.forLearningProviders")}
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} MyFuture.
          </p>
        </div>
      </footer>
    </main>
  );
}

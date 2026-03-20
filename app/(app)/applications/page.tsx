"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getErrorMessage } from "@/lib/convex-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  FileText,
  GraduationCap,
  Lightbulb,
  MapPin,
  Play,
  Search,
  XCircle,
} from "lucide-react";
import { useLanguage } from "@/components/i18n/language-context";

/* ------------------------------------------------------------------ */
/* Mock learning-in-progress data                                       */
/* ------------------------------------------------------------------ */
type MockLearning = {
  id: string;
  titleTh: string;
  titleEn: string;
  providerTh: string;
  providerEn: string;
  skills: string[];
  progress: number;
  totalModules: number;
  completedModules: number;
  statusTh: string;
  statusEn: string;
  statusClass: string;
  icon: React.ReactNode;
  gradient: string;
  tagLabel: string;
  tagClass: string;
  enrolledDate: string;
};

const MOCK_LEARNINGS: MockLearning[] = [
  {
    id: "ml1",
    titleTh: "Data Analyst Expert Path",
    titleEn: "Data Analyst Expert Path",
    providerTh: "MyFuture Academy",
    providerEn: "MyFuture Academy",
    skills: ["Python", "SQL", "Tableau", "Power BI"],
    progress: 65,
    totalModules: 12,
    completedModules: 8,
    statusTh: "กำลังเรียน",
    statusEn: "In Progress",
    statusClass: "bg-jade/10 text-jade border-jade/20",
    icon: <BarChart3 className="size-5 text-jade" />,
    gradient: "from-jade via-jade/70 to-emerald-400",
    tagLabel: "เหมาะกับผู้สูงวัย",
    tagClass: "bg-emerald-500/15 text-emerald-700 border border-emerald-200",
    enrolledDate: "15 ม.ค. 2569",
  },
  {
    id: "ml2",
    titleTh: "UX/UI Designer มืออาชีพ",
    titleEn: "Professional UX/UI Designer",
    providerTh: "DesignLab Thailand",
    providerEn: "DesignLab Thailand",
    skills: ["Figma", "User Research", "Prototyping"],
    progress: 30,
    totalModules: 10,
    completedModules: 3,
    statusTh: "กำลังเรียน",
    statusEn: "In Progress",
    statusClass: "bg-jade/10 text-jade border-jade/20",
    icon: <Lightbulb className="size-5 text-amber-500" />,
    gradient: "from-amber-400 via-amber-400/70 to-orange-300",
    tagLabel: "สำหรับนักศึกษาและบุคคลทั่วไป",
    tagClass: "bg-amber-500/15 text-amber-700 border border-amber-200",
    enrolledDate: "3 ก.พ. 2569",
  },
  {
    id: "ml3",
    titleTh: "Full-Stack Web Development",
    titleEn: "Full-Stack Web Development",
    providerTh: "CodeCamp TH",
    providerEn: "CodeCamp TH",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    progress: 100,
    totalModules: 8,
    completedModules: 8,
    statusTh: "เรียนจบแล้ว",
    statusEn: "Completed",
    statusClass: "bg-blue-50 text-blue-700 border-blue-200",
    icon: <BookOpen className="size-5 text-cyan-600" />,
    gradient: "from-cyan-500 via-cyan-400/70 to-sky-300",
    tagLabel: "คนพิการทำได้จากที่บ้าน",
    tagClass: "bg-cyan-500/15 text-cyan-700 border border-cyan-200",
    enrolledDate: "20 พ.ย. 2568",
  },
  {
    id: "ml4",
    titleTh: "Digital Marketing Specialist",
    titleEn: "Digital Marketing Specialist",
    providerTh: "GrowthHackers Academy",
    providerEn: "GrowthHackers Academy",
    skills: ["Facebook Ads", "Google Ads", "SEO"],
    progress: 10,
    totalModules: 9,
    completedModules: 1,
    statusTh: "เพิ่งเริ่มเรียน",
    statusEn: "Just Started",
    statusClass: "bg-amber-accent/10 text-amber-accent border-amber-accent/20",
    icon: <Briefcase className="size-5 text-violet-500" />,
    gradient: "from-violet-500 via-violet-400/70 to-purple-300",
    tagLabel: "สำหรับนักศึกษาและบุคคลทั่วไป",
    tagClass: "bg-amber-500/15 text-amber-700 border border-amber-200",
    enrolledDate: "10 มี.ค. 2569",
  },
  {
    id: "ml5",
    titleTh: "AI & Large Language Models",
    titleEn: "AI & Large Language Models",
    providerTh: "DeepLearn TH",
    providerEn: "DeepLearn TH",
    skills: ["Python", "TensorFlow", "LLM", "Prompt Engineering"],
    progress: 45,
    totalModules: 14,
    completedModules: 6,
    statusTh: "กำลังเรียน",
    statusEn: "In Progress",
    statusClass: "bg-jade/10 text-jade border-jade/20",
    icon: <BarChart3 className="size-5 text-rose-500" />,
    gradient: "from-rose-500 via-rose-400/70 to-pink-300",
    tagLabel: "เหมาะกับผู้สูงวัย",
    tagClass: "bg-emerald-500/15 text-emerald-700 border border-emerald-200",
    enrolledDate: "28 ม.ค. 2569",
  },
  {
    id: "ml6",
    titleTh: "Video Content Creator",
    titleEn: "Video Content Creator",
    providerTh: "FilmFactory Studio",
    providerEn: "FilmFactory Studio",
    skills: ["Premiere Pro", "After Effects", "Storytelling"],
    progress: 80,
    totalModules: 10,
    completedModules: 8,
    statusTh: "ใกล้เรียนจบ",
    statusEn: "Almost Done",
    statusClass: "bg-jade/10 text-jade border-jade/20",
    icon: <GraduationCap className="size-5 text-teal-500" />,
    gradient: "from-teal-500 via-teal-400/70 to-emerald-300",
    tagLabel: "คนพิการทำได้จากที่บ้าน",
    tagClass: "bg-cyan-500/15 text-cyan-700 border border-cyan-200",
    enrolledDate: "5 ธ.ค. 2568",
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  submitted: { label: "Submitted", className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800" },
  in_review: { label: "In review", className: "bg-amber-accent/10 text-amber-accent border-amber-accent/20" },
  accepted: { label: "Accepted", className: "bg-jade/10 text-jade border-jade/20" },
  rejected: { label: "Not selected", className: "bg-destructive/10 text-destructive border-destructive/20" },
  withdrawn: { label: "Withdrawn", className: "border-border text-muted-foreground" },
};

export default function ApplicationsPage() {
  // เรียกใช้ระบบแปลภาษา
  const { t } = useLanguage();
  const applications = useQuery(api.applications.listMyApplications, { limit: 100 });
  const withdrawApplication = useMutation(api.applications.withdrawApplication);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const sorted = applications
    ? [...applications].sort((a, b) => {
        if (a.status === "withdrawn" && b.status !== "withdrawn") return 1;
        if (a.status !== "withdrawn" && b.status === "withdrawn") return -1;
        return 0;
      })
    : undefined;

  return (
    <section className="animate-fade-in space-y-6">
      <div>
        {/* หัวข้อหน้าความก้าวหน้าการเรียนรู้ — รองรับ i18n */}
        <h1 className="font-(family-name:--font-bricolage) text-2xl font-bold tracking-tight">
          {t("apps.pageTitle")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("apps.pageDesc")}
        </p>
      </div>

      {statusText && (
        <p className="text-xs text-muted-foreground">{statusText}</p>
      )}

      {applications === undefined && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-secondary" />
          ))}
        </div>
      )}

      {sorted?.length === 0 && (
        <div className="space-y-8">
          <Card className="warm-shadow">
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
                <FileText className="size-5 text-muted-foreground" />
              </div>
              <p className="font-medium">{t("apps.noAppsYet")}</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                {t("apps.noAppsDesc")}
              </p>
              <Button asChild className="mt-2 rounded-full bg-jade text-white hover:bg-jade/90">
                <Link href="/jobs">
                  <Search className="mr-1.5 size-3.5" />
                  {t("apps.browsePaths")}
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Mock learning-in-progress section */}
          <MockLearningSection />
        </div>
      )}

      <div className="space-y-3">
        {sorted?.map((application, index) => {
          const config = statusConfig[application.status] ?? statusConfig.submitted;
          const isExpanded = expandedIds.has(application._id);
          const isWithdrawn = application.status === "withdrawn";
          const canWithdraw =
            application.status === "submitted" || application.status === "in_review";
          const job = application.job;

          return (
            <Card
              key={application._id}
              className={`@container animate-slide-up warm-shadow overflow-hidden transition-all hover:warm-shadow-md ${isWithdrawn ? "opacity-50" : ""}`}
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              {/* Compact header row */}
              <div
                className="flex cursor-pointer items-center gap-3 p-4 @sm:gap-4 @sm:p-5"
                onClick={() => toggleExpanded(application._id)}
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <Briefcase className="size-4 text-muted-foreground" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-(family-name:--font-bricolage) font-semibold tracking-tight">
                    {job?.title ?? t("apps.pathUnavailable")}
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                    <Building2 className="size-3" />
                    {job?.companyName ?? t("apps.unknownProvider")}
                    <span className="text-border">·</span>
                    <MapPin className="size-3" />
                    {job?.location ?? "—"}
                  </p>
                </div>

                <div className="flex items-center gap-2 @sm:gap-3">
                  <span className="hidden text-xs text-muted-foreground @sm:block">
                    {new Date(application.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <Badge
                    variant="outline"
                    className={`shrink-0 whitespace-nowrap rounded-full text-xs ${config.className}`}
                  >
                    {config.label}
                  </Badge>
                  {isExpanded ? (
                    <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="border-t border-border bg-secondary/20 p-4 @sm:p-5">
                  <div className="grid gap-5 @3xl:grid-cols-[1fr_240px]">
                    {/* Left: details */}
                    <div className="space-y-4">
                      {/* Job info */}
                      {job && (
                        <div className="flex flex-wrap gap-2">
                          {job.employmentType && (
                            <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                              <Clock className="size-3" />
                              {job.employmentType.replace("_", " ")}
                            </span>
                          )}
                          {job.workplaceType && (
                            <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                              <MapPin className="size-3" />
                              {job.workplaceType.replace("_", " ")}
                            </span>
                          )}
                          {(job.salaryMin != null || job.salaryMax != null) && (
                            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/80">
                              {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Tags */}
                      {job && job.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {job.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="rounded-full border-jade/20 bg-jade/5 px-2.5 py-0.5 text-[11px] text-jade"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Cover letter */}
                      {application.coverLetter && (
                        <div>
                          <h3 className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-foreground/80">
                            <FileText className="size-3" />
                            {t("apps.yourNote")}
                          </h3>
                          <p className="rounded-lg border border-border/60 bg-card p-3 text-sm leading-relaxed text-foreground/70">
                            {application.coverLetter}
                          </p>
                        </div>
                      )}

                    </div>

                    {/* Right sidebar */}
                    <div className="space-y-4">
                      {/* Timeline */}
                      <div>
                        <h4 className="mb-1.5 text-xs font-semibold uppercase text-muted-foreground">{t("apps.timeline")}</h4>
                        <div className="space-y-1.5 text-sm">
                          <p className="text-foreground/80">
                            {t("apps.enrolled")} {new Date(application.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                          {application.updatedAt !== application.createdAt && (
                            <p className="text-muted-foreground">
                              {t("apps.updated")} {new Date(application.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                          )}
                          {application.decidedAt && (
                            <p className="text-muted-foreground">
                              {t("apps.decision")} {new Date(application.decidedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* View job link */}
                      {job && (
                        <Button asChild size="sm" variant="outline" className="w-full rounded-lg text-xs">
                          <Link href={`/jobs/${application.jobId}`}>
                            <ExternalLink className="mr-2 size-3" />
                            {t("apps.viewPath")}
                          </Link>
                        </Button>
                      )}

                      {/* Withdraw */}
                      {canWithdraw && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full rounded-lg text-xs text-destructive hover:bg-destructive/10"
                          disabled={withdrawingId === application._id}
                          onClick={async (e) => {
                            e.stopPropagation();
                            setStatusText(null);
                            setWithdrawingId(application._id);
                            try {
                              await withdrawApplication({ applicationId: application._id });
                              setStatusText(t("apps.withdrawn"));
                            } catch (error) {
                              setStatusText(getErrorMessage(error, t("apps.couldNotWithdraw")));
                            } finally {
                              setWithdrawingId(null);
                            }
                          }}
                        >
                          <XCircle className="mr-2 size-3" />
                          {withdrawingId === application._id ? t("apps.withdrawing") : t("apps.withdraw")}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mock Learning Section — แสดงตัวอย่างคอร์สที่กำลังเรียน/ฝึกสกิล       */
/* ------------------------------------------------------------------ */
function MockLearningSection() {
  const { lang } = useLanguage();
  const isTh = lang === "th";
  return (
    <div>
      <p className="mb-3 text-sm font-semibold tracking-tight text-foreground">
        {isTh ? "คอร์สที่คุณกำลังเรียนและฝึกสกิลอยู่" : "Courses you're currently learning"}
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_LEARNINGS.map((item, index) => (
          <Card
            key={item.id}
            className="@container animate-slide-up warm-shadow overflow-hidden border-dashed transition-all hover:warm-shadow-md"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className={`h-2 w-full bg-gradient-to-r ${item.gradient}`} />
            <div className="p-4 space-y-4">
              {/* Header: icon + title + status */}
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary/60">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-(family-name:--font-bricolage) text-sm font-semibold leading-snug tracking-tight">
                    {isTh ? item.titleTh : item.titleEn}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <GraduationCap className="size-3" />
                    {isTh ? item.providerTh : item.providerEn}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`shrink-0 whitespace-nowrap rounded-full text-[10px] ${item.statusClass}`}
                >
                  {isTh ? item.statusTh : item.statusEn}
                </Badge>
              </div>

              {/* Inclusive tag */}
              <div className="flex justify-end">
                <Badge className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${item.tagClass}`}>
                  {item.tagLabel}
                </Badge>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {item.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="rounded-full border-jade/30 bg-jade/5 text-[11px] text-jade"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {item.completedModules}/{item.totalModules} {isTh ? "บทเรียน" : "modules"}
                  </span>
                  <span className="font-semibold text-foreground">{item.progress}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full transition-all ${item.progress === 100 ? "bg-blue-500" : "bg-jade"}`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              {/* Enrolled date + action */}
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Clock className="size-3" />
                  {isTh ? "ลงทะเบียน" : "Enrolled"} {item.enrolledDate}
                </span>
                {item.progress === 100 ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-blue-600">
                    <CheckCircle2 className="size-3.5" />
                    {isTh ? "สำเร็จ" : "Done"}
                  </span>
                ) : (
                  <Button size="sm" className="h-7 rounded-full bg-jade px-3 text-xs text-white hover:bg-jade/90">
                    <Play className="mr-1 size-3" />
                    {isTh ? "เรียนต่อ" : "Continue"}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function formatSalary(salaryMin?: number, salaryMax?: number, salaryCurrency?: string) {
  if (salaryMin == null && salaryMax == null) return "";
  const currency = salaryCurrency ?? "USD";
  if (salaryMin != null && salaryMax != null) return `${salaryMin.toLocaleString()} – ${salaryMax.toLocaleString()} ${currency}`;
  return `${(salaryMin ?? salaryMax ?? 0).toLocaleString()} ${currency}`;
}

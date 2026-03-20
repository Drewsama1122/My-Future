"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getErrorMessage } from "@/lib/convex-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  GraduationCap,
  Heart,
  Lightbulb,
  MapPin,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useLanguage } from "@/components/i18n/language-context";

function formatSalary(min?: number, max?: number, currency?: string) {
  if (min === undefined && max === undefined) return "Salary not listed";
  const unit = currency ?? "USD";
  if (min !== undefined && max !== undefined) return `${min.toLocaleString()} – ${max.toLocaleString()} ${unit}`;
  return `${(max ?? min ?? 0).toLocaleString()} ${unit}`;
}

// ─── Mockup Pathway Data ───
type MockPathway = {
  titleTh: string;
  titleEn: string;
  providerTh: string;
  providerEn: string;
  skills: string[];
  icon: React.ReactNode;
  gradient: string;
  progress: number;
  tagLabel: string;
  tagClass: string;
};

const MOCK_PATHWAYS: MockPathway[] = [
  {
    titleTh: "เส้นทางสู่ผู้เชี่ยวชาญด้านการวิเคราะห์ข้อมูล",
    titleEn: "Data Analyst Expert Path",
    providerTh: "โดย สถาบัน MyFuture Academy",
    providerEn: "By MyFuture Academy",
    skills: ["Python", "SQL", "Tableau", "Power BI"],
    icon: <BarChart3 className="size-6 text-jade" />,
    gradient: "from-jade via-jade/70 to-emerald-400",
    progress: 0,
    tagLabel: "เหมาะกับผู้สูงวัย",
    tagClass: "bg-emerald-500/15 text-emerald-700 border border-emerald-200",
  },
  {
    titleTh: "เส้นทาง UX/UI Designer มืออาชีพ",
    titleEn: "Professional UX/UI Designer Path",
    providerTh: "โดย DesignLab Thailand",
    providerEn: "By DesignLab Thailand",
    skills: ["Figma", "User Research", "Prototyping", "Design System"],
    icon: <Lightbulb className="size-6 text-amber-500" />,
    gradient: "from-amber-400 via-amber-400/70 to-orange-300",
    progress: 0,
    tagLabel: "สำหรับนักศึกษาและบุคคลทั่วไป",
    tagClass: "bg-amber-500/15 text-amber-700 border border-amber-200",
  },
  {
    titleTh: "เส้นทาง Full-Stack Developer",
    titleEn: "Full-Stack Developer Path",
    providerTh: "โดย CodeCamp TH",
    providerEn: "By CodeCamp TH",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    icon: <BookOpen className="size-6 text-cyan-600" />,
    gradient: "from-cyan-500 via-cyan-400/70 to-sky-300",
    progress: 0,
    tagLabel: "คนพิการทำได้จากที่บ้าน",
    tagClass: "bg-cyan-500/15 text-cyan-700 border border-cyan-200",
  },
  {
    titleTh: "เส้นทาง Digital Marketing Specialist",
    titleEn: "Digital Marketing Specialist Path",
    providerTh: "โดย GrowthHackers Academy",
    providerEn: "By GrowthHackers Academy",
    skills: ["Facebook Ads", "Google Ads", "SEO", "Analytics"],
    icon: <Briefcase className="size-6 text-violet-500" />,
    gradient: "from-violet-500 via-violet-400/70 to-purple-300",
    progress: 0,
    tagLabel: "สำหรับนักศึกษาและบุคคลทั่วไป",
    tagClass: "bg-amber-500/15 text-amber-700 border border-amber-200",
  },
  {
    titleTh: "เส้นทาง AI & Machine Learning Engineer",
    titleEn: "AI & Machine Learning Engineer Path",
    providerTh: "โดย DeepLearn TH",
    providerEn: "By DeepLearn TH",
    skills: ["Python", "TensorFlow", "LLM", "Prompt Engineering"],
    icon: <BarChart3 className="size-6 text-rose-500" />,
    gradient: "from-rose-500 via-rose-400/70 to-pink-300",
    progress: 0,
    tagLabel: "เหมาะกับผู้สูงวัย",
    tagClass: "bg-emerald-500/15 text-emerald-700 border border-emerald-200",
  },
  {
    titleTh: "เส้นทาง Video Content Creator",
    titleEn: "Video Content Creator Path",
    providerTh: "โดย FilmFactory Studio",
    providerEn: "By FilmFactory Studio",
    skills: ["Premiere Pro", "After Effects", "DaVinci", "Storytelling"],
    icon: <GraduationCap className="size-6 text-teal-500" />,
    gradient: "from-teal-500 via-teal-400/70 to-emerald-300",
    progress: 0,
    tagLabel: "คนพิการทำได้จากที่บ้าน",
    tagClass: "bg-cyan-500/15 text-cyan-700 border border-cyan-200",
  },
];

// ─── Mockup Pathway Card ─── แสดงการ์ดจำลองเส้นทางอัปสกิลเมื่อไม่มีข้อมูลจริง
function MockupPathwayCard({ pathway }: { pathway: MockPathway }) {
  const { t, lang } = useLanguage();
  const isTh = lang === "th";
  return (
    <Card className="@container warm-shadow overflow-hidden border-dashed border-jade/30 transition-all hover:warm-shadow-md">
      <div className={`h-2 w-full bg-gradient-to-r ${pathway.gradient}`} />
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary/60">
            {pathway.icon}
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="font-(family-name:--font-bricolage) text-base leading-snug tracking-tight">
              {isTh ? pathway.titleTh : pathway.titleEn}
            </CardTitle>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <GraduationCap className="size-3" />
              {isTh ? pathway.providerTh : pathway.providerEn}
            </p>
          </div>
        </div>
        {/* Inclusive tag — ฝั่งขวาบน */}
        <div className="mt-2 flex justify-end">
          <Badge className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${pathway.tagClass}`}>
            {pathway.tagLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <BookOpen className="size-3" />
            {t("favs.mockSkills")}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {pathway.skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="rounded-full border-jade/30 bg-jade/5 text-xs text-jade"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">
              {t("favs.mockProgress")}
            </span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-jade transition-all"
              style={{ width: `${pathway.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="flex-1 rounded-full bg-jade text-white hover:bg-jade/90"
          >
            {t("action.startLearning")}
            <ArrowRight className="ml-1 size-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FavoritesPage() {
  // เรียกใช้ระบบแปลภาษา
  const { t } = useLanguage();
  const favorites = useQuery(api.favorites.listMyFavorites, { limit: 200 });
  const removeFavorite = useMutation(api.favorites.removeFavorite);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [removingJobId, setRemovingJobId] = useState<string | null>(null);

  return (
    <section className="animate-fade-in space-y-6">
      {/* Page header */}
      <div>
        {/* หัวข้อหน้ารายการที่บันทึกไว้ — รองรับ i18n */}
        <h1 className="font-(family-name:--font-bricolage) text-2xl font-bold tracking-tight">
          {t("favs.pageTitle")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("favs.pageDesc")}
        </p>
      </div>

      {statusText && (
        <p className="text-xs text-muted-foreground">{statusText}</p>
      )}

      {/* Loading */}
      {favorites === undefined && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-secondary" />
          ))}
        </div>
      )}

      {/* ─── Engaging Empty State ─── ข้อความสร้างสรรค์เมื่อยังไม่มีรายการโปรด */}
      {favorites?.length === 0 && (
        <div className="space-y-8">
          {/* กล่องข้อความหลัก */}
          <Card className="warm-shadow border-dashed">
            <CardContent className="flex flex-col items-center gap-4 py-14 text-center">
              <div className="relative">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-amber-accent/10">
                  <Lightbulb className="size-8 text-amber-accent" />
                </div>
                <div className="absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-full bg-jade/10">
                  <Heart className="size-3.5 text-jade" />
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="font-(family-name:--font-bricolage) text-lg font-bold tracking-tight">
                  {t("favs.emptyTitle")}
                </p>
                <p className="max-w-md text-sm text-muted-foreground">
                  {t("favs.emptyDesc")}
                </p>
              </div>
              {/* ปุ่ม CTA ขนาดใหญ่ */}
              <Button
                asChild
                size="lg"
                className="mt-2 rounded-full bg-jade px-8 text-white hover:bg-jade/90"
              >
                <Link href="/jobs">
                  <Search className="mr-2 size-4" />
                  {t("favs.exploreCta")}
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Mockup Section — แนะนำเส้นทางที่เหมาะกับความสามารถ */}
          <div>
            <p className="mb-3 text-sm font-semibold tracking-tight text-foreground">
              {t("favs.mockProvider") === "โดย สถาบัน MyFuture Academy"
                ? "แนะนำเส้นทางที่เหมาะกับความสามารถคุณ"
                : "Recommended pathways for your skills"}
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {MOCK_PATHWAYS.map((pw) => (
                <MockupPathwayCard key={pw.titleEn} pathway={pw} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Favorites Grid ─── แสดง Grid แทน List เพื่อรองรับหลายการ์ดสวยๆ */}
      {(favorites?.length ?? 0) > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites?.map((favorite, index) => {
            const job = favorite.job;
            if (!job) return null;
            return (
              <Card
                key={favorite._id}
                className="@container animate-slide-up warm-shadow overflow-hidden transition-all hover:warm-shadow-md"
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                {/* แถบสีด้านบน */}
                <div className="h-1.5 w-full bg-gradient-to-r from-jade to-jade/50" />
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="font-(family-name:--font-bricolage) text-base leading-snug tracking-tight">
                        <Link
                          href={`/jobs/${job._id}`}
                          className="transition-colors hover:text-jade"
                        >
                          {job.title}
                        </Link>
                      </CardTitle>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <GraduationCap className="size-3" />
                        {job.companyName}
                        <span className="text-border">·</span>
                        <MapPin className="size-3" />
                        {job.location}
                      </p>
                    </div>
                    {/* ปุ่มลบรายการ */}
                    <button
                      className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      disabled={removingJobId === job._id}
                      onClick={async () => {
                        setStatusText(null);
                        setRemovingJobId(job._id);
                        try {
                          await removeFavorite({ jobId: job._id });
                          setStatusText(t("favs.removed"));
                        } catch (error) {
                          setStatusText(getErrorMessage(error, t("favs.couldNotRemove")));
                        } finally {
                          setRemovingJobId(null);
                        }
                      }}
                      aria-label={t("favs.removeFromFavs")}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="gap-1 rounded-full text-xs">
                      <Briefcase className="size-3" />
                      {job.workplaceType.replace("_", " ")}
                    </Badge>
                    <span className="text-xs font-medium text-muted-foreground">
                      {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
                    </span>
                  </div>
                  {/* Mockup progress bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{t("favs.mockProgress")}</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div className="h-full w-0 rounded-full bg-jade" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 rounded-full bg-jade text-white hover:bg-jade/90"
                    >
                      <Link href={`/jobs/${job._id}`}>
                        {t("action.startLearning")}
                        <ArrowRight className="ml-1 size-3.5" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
                      disabled={removingJobId === job._id}
                      onClick={async () => {
                        setStatusText(null);
                        setRemovingJobId(job._id);
                        try {
                          await removeFavorite({ jobId: job._id });
                          setStatusText(t("favs.removed"));
                        } catch (error) {
                          setStatusText(getErrorMessage(error, t("favs.couldNotRemove")));
                        } finally {
                          setRemovingJobId(null);
                        }
                      }}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}

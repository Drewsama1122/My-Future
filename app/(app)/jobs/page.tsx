"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getErrorMessage } from "@/lib/convex-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { stripHtml } from "@/lib/strip-html";
import { ArrowRight, Bookmark, BookmarkCheck, Building2, DollarSign, MapPin, Search, Briefcase } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-context";

type WorkplaceType = "on_site" | "remote" | "hybrid";

/* ------------------------------------------------------------------ */
/* Popular topic definitions                                           */
/* ------------------------------------------------------------------ */
const POPULAR_TOPICS = [
  "Design",
  "Art",
  "Business",
  "Video Editing",
  "Marketing",
  "Programming",
  "Data Science",
  "Photography",
  "Music",
  "AI / ML",
  "Language",
  "Finance",
] as const;

type MockJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  topic: string;
  employmentType: string;
  workplaceType: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  tagLabel: string;
  tagClass: string;
};

/* ------------------------------------------------------------------ */
/* Mock job data — popular topics                                      */
/* ------------------------------------------------------------------ */
const MOCK_JOBS: MockJob[] = [
  { id: "m1",  title: "UX/UI Design Fundamentals",          company: "DesignLab",       location: "Bangkok",    description: "เรียนรู้หลักการออกแบบ UX/UI ตั้งแต่เริ่มต้น ครอบคลุม Figma, wireframe และ prototype สำหรับผู้เริ่มต้น",                    topic: "Design",        employmentType: "full_time", workplaceType: "remote",  salaryMin: 0,     salaryMax: 0,     currency: "THB", tagLabel: "เหมาะกับผู้สูงวัย",   tagClass: "bg-emerald-500/15 text-emerald-700 border border-emerald-200" },
  { id: "m2",  title: "Graphic Design Masterclass",         company: "CreativeHub",     location: "Online",     description: "Master Adobe Illustrator & Photoshop. สร้างโปสเตอร์ โลโก้ และ branding ระดับมืออาชีพ",                                      topic: "Design",        employmentType: "part_time", workplaceType: "remote",  salaryMin: 2500,  salaryMax: 4500,  currency: "THB", tagLabel: "คนพิการทำได้จากที่บ้าน", tagClass: "bg-cyan-500/15 text-cyan-700 border border-cyan-200" },
  { id: "m3",  title: "Digital Art & Illustration",         company: "ArtStation Academy", location: "Bangkok", description: "วาดภาพดิจิทัลด้วย Procreate & Clip Studio Paint เหมาะสำหรับนักวาดที่ต้องการพัฒนาทักษะเชิงพาณิชย์",                          topic: "Art",           employmentType: "part_time", workplaceType: "hybrid",  salaryMin: 1500,  salaryMax: 3000,  currency: "THB", tagLabel: "สำหรับนักศึกษาและบุคคลทั่วไป",    tagClass: "bg-amber-500/15 text-amber-700 border border-amber-200" },
  { id: "m4",  title: "Contemporary Art Workshop",          company: "BangkokArt",      location: "Bangkok",    description: "Workshop ศิลปะร่วมสมัย ทดลองเทคนิค mixed media, sculpture และ installation art",                                           topic: "Art",           employmentType: "contract",  workplaceType: "on_site", salaryMin: 3500,  salaryMax: 5000,  currency: "THB", tagLabel: "เหมาะกับผู้สูงวัย",   tagClass: "bg-emerald-500/15 text-emerald-700 border border-emerald-200" },
  { id: "m5",  title: "Business Strategy & Innovation",     company: "BizAcademy",      location: "Bangkok",    description: "เรียนรู้การวางกลยุทธ์ธุรกิจ วิเคราะห์ตลาด และพัฒนานวัตกรรมสำหรับ Startup และ SME",                                        topic: "Business",      employmentType: "full_time", workplaceType: "hybrid",  salaryMin: 5000,  salaryMax: 12000, currency: "THB", tagLabel: "คนพิการทำได้จากที่บ้าน", tagClass: "bg-cyan-500/15 text-cyan-700 border border-cyan-200" },
  { id: "m6",  title: "Entrepreneurship 101",               company: "StartupSchool",   location: "Chiang Mai",description: "คอร์สพื้นฐานสำหรับผู้ที่ต้องการเริ่มต้นธุรกิจ ครอบคลุม business model canvas, pitching และ funding",                       topic: "Business",      employmentType: "internship",workplaceType: "remote",  salaryMin: 0,     salaryMax: 0,     currency: "THB", tagLabel: "สำหรับนักศึกษาและบุคคลทั่วไป",    tagClass: "bg-amber-500/15 text-amber-700 border border-amber-200" },
  { id: "m7",  title: "Video Editing with Premiere Pro",    company: "FilmFactory",     location: "Online",     description: "ตัดต่อวิดีโอระดับมืออาชีพด้วย Adobe Premiere Pro ตั้งแต่ basic cut ถึง color grading และ motion graphics",                    topic: "Video Editing", employmentType: "part_time", workplaceType: "remote",  salaryMin: 2000,  salaryMax: 5000,  currency: "THB", tagLabel: "เหมาะกับผู้สูงวัย",   tagClass: "bg-emerald-500/15 text-emerald-700 border border-emerald-200" },
  { id: "m8",  title: "YouTube Content Creation",           company: "ContentPro",      location: "Bangkok",    description: "สร้างคอนเทนต์ YouTube ตั้งแต่วางแผน ถ่ายทำ ตัดต่อ จนถึง SEO และการสร้างรายได้จากช่อง",                                    topic: "Video Editing", employmentType: "full_time", workplaceType: "hybrid",  salaryMin: 3000,  salaryMax: 7000,  currency: "THB", tagLabel: "คนพิการทำได้จากที่บ้าน", tagClass: "bg-cyan-500/15 text-cyan-700 border border-cyan-200" },
  { id: "m9",  title: "Digital Marketing Bootcamp",         company: "GrowthHackers",   location: "Bangkok",    description: "เจาะลึก Facebook Ads, Google Ads, SEO, Email Marketing และ Analytics เพื่อเพิ่มยอดขายจริง",                                  topic: "Marketing",     employmentType: "full_time", workplaceType: "hybrid",  salaryMin: 4000,  salaryMax: 9000,  currency: "THB", tagLabel: "สำหรับนักศึกษาและบุคคลทั่วไป",    tagClass: "bg-amber-500/15 text-amber-700 border border-amber-200" },
  { id: "m10", title: "Social Media Strategy",              company: "BrandBoost",      location: "Online",     description: "วางแผนกลยุทธ์โซเชียลมีเดีย สร้าง content calendar และวัดผล engagement สำหรับแบรนด์",                                       topic: "Marketing",     employmentType: "part_time", workplaceType: "remote",  salaryMin: 1500,  salaryMax: 3500,  currency: "THB", tagLabel: "เหมาะกับผู้สูงวัย",   tagClass: "bg-emerald-500/15 text-emerald-700 border border-emerald-200" },
  { id: "m11", title: "Full-Stack Web Development",         company: "CodeCamp TH",     location: "Bangkok",    description: "เรียนรู้ React, Node.js, TypeScript และ Database จากศูนย์สู่การเป็น Full-Stack Developer",                                  topic: "Programming",   employmentType: "full_time", workplaceType: "on_site", salaryMin: 8000,  salaryMax: 15000, currency: "THB", tagLabel: "คนพิการทำได้จากที่บ้าน", tagClass: "bg-cyan-500/15 text-cyan-700 border border-cyan-200" },
  { id: "m12", title: "Python for Beginners",               company: "PyLearn",         location: "Online",     description: "เริ่มต้นเขียนโปรแกรมด้วย Python ครอบคลุม syntax, data types, functions และ mini projects",                                  topic: "Programming",   employmentType: "part_time", workplaceType: "remote",  salaryMin: 1200,  salaryMax: 2500,  currency: "THB", tagLabel: "สำหรับนักศึกษาและบุคคลทั่วไป",    tagClass: "bg-amber-500/15 text-amber-700 border border-amber-200" },
  { id: "m13", title: "Data Science with Python & SQL",     company: "DataDojo",        location: "Bangkok",    description: "วิเคราะห์ข้อมูลด้วย Python, Pandas, SQL และสร้าง dashboard ด้วย Power BI สำหรับการตัดสินใจเชิงธุรกิจ",                     topic: "Data Science",  employmentType: "full_time", workplaceType: "hybrid",  salaryMin: 6000,  salaryMax: 12000, currency: "THB", tagLabel: "เหมาะกับผู้สูงวัย",   tagClass: "bg-emerald-500/15 text-emerald-700 border border-emerald-200" },
  { id: "m14", title: "Machine Learning Fundamentals",      company: "AI Academy",      location: "Online",     description: "หลักพื้นฐาน ML: regression, classification, clustering และ neural networks ด้วย scikit-learn & TensorFlow",                   topic: "Data Science",  employmentType: "contract",  workplaceType: "remote",  salaryMin: 4500,  salaryMax: 8500,  currency: "THB", tagLabel: "คนพิการทำได้จากที่บ้าน", tagClass: "bg-cyan-500/15 text-cyan-700 border border-cyan-200" },
  { id: "m15", title: "Photography Essentials",             company: "ShutterSchool",   location: "Bangkok",    description: "เรียนรู้พื้นฐานการถ่ายภาพ แสง composition และการตั้งค่ากล้อง DSLR / Mirrorless อย่างมืออาชีพ",                              topic: "Photography",   employmentType: "part_time", workplaceType: "on_site", salaryMin: 2000,  salaryMax: 4000,  currency: "THB", tagLabel: "สำหรับนักศึกษาและบุคคลทั่วไป",    tagClass: "bg-amber-500/15 text-amber-700 border border-amber-200" },
  { id: "m16", title: "Product Photography & Editing",      company: "StudioPro",       location: "Bangkok",    description: "ถ่ายภาพสินค้าเพื่อ e-commerce และตกแต่งภาพด้วย Lightroom สำหรับร้านค้าออนไลน์",                                             topic: "Photography",   employmentType: "contract",  workplaceType: "hybrid",  salaryMin: 2500,  salaryMax: 5500,  currency: "THB", tagLabel: "เหมาะกับผู้สูงวัย",   tagClass: "bg-emerald-500/15 text-emerald-700 border border-emerald-200" },
  { id: "m17", title: "Music Production with Ableton",      company: "BeatMakers",      location: "Online",     description: "สร้างเพลงด้วย Ableton Live ครอบคลุม beat making, mixing, mastering และ sound design",                                       topic: "Music",         employmentType: "part_time", workplaceType: "remote",  salaryMin: 1800,  salaryMax: 3500,  currency: "THB", tagLabel: "คนพิการทำได้จากที่บ้าน", tagClass: "bg-cyan-500/15 text-cyan-700 border border-cyan-200" },
  { id: "m18", title: "Songwriting & Composition",          company: "MelodyLab",       location: "Bangkok",    description: "เทคนิคการแต่งเพลง ทฤษฎีดนตรี chord progression และการเขียนเนื้อร้องสำหรับ Pop, R&B และ Thai music",                         topic: "Music",         employmentType: "part_time", workplaceType: "hybrid",  salaryMin: 1500,  salaryMax: 3000,  currency: "THB", tagLabel: "สำหรับนักศึกษาและบุคคลทั่วไป",    tagClass: "bg-amber-500/15 text-amber-700 border border-amber-200" },
  { id: "m19", title: "AI & Large Language Models",         company: "DeepLearn TH",    location: "Online",     description: "เจาะลึก LLM, Prompt Engineering, RAG และ Fine-tuning สำหรับ AI applications ในโลกจริง",                                      topic: "AI / ML",       employmentType: "full_time", workplaceType: "remote",  salaryMin: 7000,  salaryMax: 15000, currency: "THB", tagLabel: "เหมาะกับผู้สูงวัย",   tagClass: "bg-emerald-500/15 text-emerald-700 border border-emerald-200" },
  { id: "m20", title: "AI for Business Automation",         company: "AutomateX",       location: "Bangkok",    description: "ใช้ AI และ no-code tools ในการทำ automation สำหรับธุรกิจ: chatbot, document processing และ workflow",                         topic: "AI / ML",       employmentType: "contract",  workplaceType: "hybrid",  salaryMin: 5000,  salaryMax: 10000, currency: "THB", tagLabel: "คนพิการทำได้จากที่บ้าน", tagClass: "bg-cyan-500/15 text-cyan-700 border border-cyan-200" },
  { id: "m21", title: "English for Career Development",     company: "LangPro",         location: "Online",     description: "พัฒนาทักษะภาษาอังกฤษเพื่อการทำงาน ครอบคลุม business writing, presentation skills และ interview prep",                      topic: "Language",      employmentType: "part_time", workplaceType: "remote",  salaryMin: 1200,  salaryMax: 2800,  currency: "THB", tagLabel: "สำหรับนักศึกษาและบุคคลทั่วไป",    tagClass: "bg-amber-500/15 text-amber-700 border border-amber-200" },
  { id: "m22", title: "Japanese for Beginners (N5-N4)",     company: "NihongoHub",      location: "Bangkok",    description: "เรียนภาษาญี่ปุ่นตั้งแต่ Hiragana จนถึง N4 พร้อม conversation practice และวัฒนธรรมญี่ปุ่น",                                  topic: "Language",      employmentType: "part_time", workplaceType: "on_site", salaryMin: 1500,  salaryMax: 3000,  currency: "THB", tagLabel: "เหมาะกับผู้สูงวัย",   tagClass: "bg-emerald-500/15 text-emerald-700 border border-emerald-200" },
  { id: "m23", title: "Personal Finance & Investing",       company: "MoneyWise",       location: "Online",     description: "เรียนรู้การจัดการเงิน การออม การลงทุนในหุ้น กองทุน และคริปโต สำหรับมือใหม่",                                                topic: "Finance",       employmentType: "part_time", workplaceType: "remote",  salaryMin: 0,     salaryMax: 0,     currency: "THB", tagLabel: "คนพิการทำได้จากที่บ้าน", tagClass: "bg-cyan-500/15 text-cyan-700 border border-cyan-200" },
  { id: "m24", title: "Financial Modeling & Excel",         company: "FinanceAcademy",  location: "Bangkok",    description: "สร้าง financial model ด้วย Excel สำหรับ startup valuation, budget planning และ scenario analysis",                          topic: "Finance",       employmentType: "full_time", workplaceType: "hybrid",  salaryMin: 4000,  salaryMax: 8000,  currency: "THB", tagLabel: "สำหรับนักศึกษาและบุคคลทั่วไป",    tagClass: "bg-amber-500/15 text-amber-700 border border-amber-200" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */
function formatSalary(min?: number, max?: number, currency?: string, fallback?: string) {
  if ((min === undefined || min === 0) && (max === undefined || max === 0)) return fallback ?? "Salary not listed";
  const unit = currency ?? "USD";
  if (min !== undefined && min > 0 && max !== undefined && max > 0) return `${min.toLocaleString()} – ${max.toLocaleString()} ${unit}`;
  return `${(max ?? min ?? 0).toLocaleString()} ${unit}`;
}

export default function JobsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [searchText, setSearchText] = useState(searchParams.get("q") ?? "");
  const [location, setLocation] = useState("");
  const [workplaceType, setWorkplaceType] = useState<WorkplaceType | "">("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const jobs = useQuery(api.jobs.searchJobListings, {
    searchText: searchText.trim() || undefined,
    location: location.trim() || undefined,
    workplaceType: workplaceType || undefined,
    limit: 30,
  });
  const favorites = useQuery(api.favorites.listMyFavorites, { limit: 200 });
  const addFavorite = useMutation(api.favorites.addFavorite);
  const removeFavorite = useMutation(api.favorites.removeFavorite);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [pendingFavoriteJobId, setPendingFavoriteJobId] = useState<string | null>(null);

  const favoriteJobIds = useMemo(
    () => new Set((favorites ?? []).map((item) => item.job?._id).filter(Boolean)),
    [favorites],
  );

  // Filter mock jobs by topic + search text + location + workplace
  const filteredMockJobs = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    const loc = location.trim().toLowerCase();
    return MOCK_JOBS.filter((m) => {
      if (selectedTopic && m.topic !== selectedTopic) return false;
      if (workplaceType && m.workplaceType !== workplaceType) return false;
      if (loc && !m.location.toLowerCase().includes(loc)) return false;
      if (q) {
        const haystack = `${m.title} ${m.company} ${m.description} ${m.topic}`.toLowerCase();
        return haystack.includes(q);
      }
      return true;
    });
  }, [searchText, location, workplaceType, selectedTopic]);

  // Merge: real DB jobs first, then mock
  const allDisplayJobs = useMemo(() => {
    const realCards = (jobs ?? []).map((job) => ({ type: "real" as const, data: job }));
    const mockCards = filteredMockJobs.map((m) => ({ type: "mock" as const, data: m }));
    return [...realCards, ...mockCards];
  }, [jobs, filteredMockJobs]);

  const salaryFallback = t("jobs.salaryNotListed");

  return (
    <section className="animate-fade-in space-y-6">
      <div>
        <h1 className="font-(family-name:--font-bricolage) text-2xl font-bold tracking-tight">
          {t("jobs.pageTitle")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("jobs.pageDesc")}
        </p>
      </div>

      {/* Search & filter bar */}
      <div className="@container">
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 warm-shadow @2xl:flex-row @2xl:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
              placeholder={t("jobs.searchPlaceholder")}
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>
          <div className="hidden h-8 w-px bg-border @2xl:block" />
          <div className="relative flex-1">
            <MapPin className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
              placeholder={t("jobs.locationPlaceholder")}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
          <div className="hidden h-8 w-px bg-border @2xl:block" />
          <select
            className="h-9 rounded-lg border-0 bg-transparent px-3 text-sm text-foreground outline-none"
            value={workplaceType}
            onChange={(event) => setWorkplaceType(event.target.value as WorkplaceType | "")}
          >
            <option value="">{t("jobs.anyWorkplace")}</option>
            <option value="remote">{t("jobs.remote")}</option>
            <option value="hybrid">{t("jobs.hybrid")}</option>
            <option value="on_site">{t("jobs.onSite")}</option>
          </select>
        </div>
      </div>

      {/* Popular topic chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-foreground">{t("jobs.popularTopics")}</span>
        <button
          onClick={() => setSelectedTopic("")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            selectedTopic === ""
              ? "bg-jade text-white"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
          }`}
        >
          {t("jobs.allTopics")}
        </button>
        {POPULAR_TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(selectedTopic === topic ? "" : topic)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedTopic === topic
                ? "bg-jade text-white"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {statusText && (
        <p className="text-xs text-muted-foreground">{statusText}</p>
      )}

      {/* Job listing cards */}
      <div className="space-y-3">
        {jobs === undefined && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-36 animate-pulse rounded-xl bg-secondary" />
            ))}
          </div>
        )}

        {jobs !== undefined && allDisplayJobs.length === 0 && (
          <Card className="warm-shadow">
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-jade/10">
                <Search className="size-5 text-jade" />
              </div>
              <p className="font-medium">{t("jobs.noMatch")}</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                {t("jobs.tryBroadening")}
              </p>
            </CardContent>
          </Card>
        )}

        {allDisplayJobs.map((item, index) => {
          if (item.type === "real") {
            const job = item.data;
            const isFavorite = favoriteJobIds.has(job._id);
            const salary = formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, salaryFallback);
            const jobUrl = `/jobs/${job._id}`;
            return (
              <div
                key={job._id}
                role="link"
                tabIndex={0}
                onClick={() => router.push(jobUrl)}
                onKeyDown={(e) => { if (e.key === "Enter") router.push(jobUrl); }}
                className="@container relative animate-slide-up group cursor-pointer rounded-xl border border-border bg-card warm-shadow transition-all duration-200 hover:-translate-y-0.5 hover:border-jade/30 hover:warm-shadow-md active:translate-y-0 active:shadow-sm"
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                <div className="flex gap-4 p-4 @sm:p-5">
                  <div className="hidden size-11 shrink-0 items-center justify-center rounded-lg bg-jade/10 text-jade transition-colors group-hover:bg-jade/20 @xs:flex">
                    <Building2 className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-(family-name:--font-bricolage) text-base font-semibold tracking-tight transition-colors group-hover:text-jade @sm:text-lg">
                          {job.title}
                        </span>
                        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                          {job.companyName}
                          <span className="text-border">&middot;</span>
                          <MapPin className="size-3" />
                          {job.location}
                        </p>
                      </div>
                      <button
                        className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                          isFavorite
                            ? "bg-jade/10 text-jade hover:bg-jade/20"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                        disabled={pendingFavoriteJobId === job._id}
                        onClick={async (e) => {
                          e.stopPropagation();
                          setStatusText(null);
                          setPendingFavoriteJobId(job._id);
                          try {
                            if (isFavorite) {
                              await removeFavorite({ jobId: job._id });
                              setStatusText(t("jobs.removedFromSaved"));
                            } else {
                              await addFavorite({ jobId: job._id });
                              setStatusText(t("jobs.savedToFavorites"));
                            }
                          } catch (error) {
                            setStatusText(getErrorMessage(error, "Could not update saved jobs."));
                          } finally {
                            setPendingFavoriteJobId(null);
                          }
                        }}
                        aria-label={isFavorite ? "Remove from saved" : "Save job"}
                      >
                        {isFavorite ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
                      </button>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {stripHtml(job.description)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 border-t border-border/50 px-4 py-3 @sm:flex-row @sm:flex-wrap @sm:items-center @sm:px-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="gap-1 rounded-full text-xs">
                      <Briefcase className="size-3" />
                      {job.employmentType.replace("_", " ")}
                    </Badge>
                    <Badge variant="outline" className="rounded-full text-xs">
                      {job.workplaceType.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 @sm:ml-auto">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-jade/10 px-3 py-1 text-sm font-semibold text-jade">
                      <DollarSign className="size-3.5" />
                      {salary}
                    </span>
                    <Button size="sm" className="rounded-full bg-jade px-5 text-white transition-all hover:bg-jade/90 group-hover:shadow-md">
                      {t("action.details")}
                      <ArrowRight className="ml-1 size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          }

          // Mock job card
          const mock = item.data;
          const salary = formatSalary(mock.salaryMin, mock.salaryMax, mock.currency, salaryFallback);
          return (
            <div
              key={mock.id}
              className="@container relative animate-slide-up group rounded-xl border border-border bg-card warm-shadow transition-all duration-200 hover:-translate-y-0.5 hover:border-jade/30 hover:warm-shadow-md active:translate-y-0 active:shadow-sm"
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              <div className="flex gap-4 p-4 @sm:p-5">
                <div className="hidden size-11 shrink-0 items-center justify-center rounded-lg bg-jade/10 text-jade transition-colors group-hover:bg-jade/20 @xs:flex">
                  <Building2 className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-(family-name:--font-bricolage) text-base font-semibold tracking-tight transition-colors group-hover:text-jade @sm:text-lg">
                        {mock.title}
                      </span>
                      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                        {mock.company}
                        <span className="text-border">&middot;</span>
                        <MapPin className="size-3" />
                        {mock.location}
                      </p>
                    </div>
                    <Badge className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium ${mock.tagClass}`}>
                      {mock.tagLabel}
                    </Badge>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {mock.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 border-t border-border/50 px-4 py-3 @sm:flex-row @sm:flex-wrap @sm:items-center @sm:px-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="gap-1 rounded-full text-xs">
                    <Briefcase className="size-3" />
                    {mock.employmentType.replace("_", " ")}
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-xs">
                    {mock.workplaceType.replace("_", " ")}
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-jade/20 bg-jade/5 text-xs text-jade">
                    {mock.topic}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 @sm:ml-auto">
                  {salary !== salaryFallback && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-jade/10 px-3 py-1 text-sm font-semibold text-jade">
                      <DollarSign className="size-3.5" />
                      {salary}
                    </span>
                  )}
                  <Button size="sm" className="rounded-full bg-jade px-5 text-white transition-all hover:bg-jade/90 group-hover:shadow-md">
                    {t("action.details")}
                    <ArrowRight className="ml-1 size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

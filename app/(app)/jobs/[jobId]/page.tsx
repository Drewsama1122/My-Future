"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { getErrorMessage } from "@/lib/convex-error";
import { toast } from "sonner";
import type { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextDisplay } from "@/components/rich-text-display";
import { useLanguage } from "@/components/i18n/language-context";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Lightbulb,
  MapPin,
  Pencil,
  Send,
  UserCircle,
} from "lucide-react";

function formatSalary(min?: number, max?: number, currency?: string) {
  if (min === undefined && max === undefined) return "Salary not listed";
  const unit = currency ?? "USD";
  if (min !== undefined && max !== undefined) return `${min.toLocaleString()} – ${max.toLocaleString()} ${unit}`;
  return `${(max ?? min ?? 0).toLocaleString()} ${unit}`;
}

export default function JobDetailPage() {
  const { t } = useLanguage();
  const params = useParams<{ jobId: string }>();
  const jobId = params.jobId as Id<"jobListings">;
  const [coverLetter, setCoverLetter] = useState("");
  const [statusText, setStatusText] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileInfoOpen, setProfileInfoOpen] = useState(false);

  const job = useQuery(api.jobs.getJobListingById, { jobId });
  const myProfile = useQuery(api.profiles.getMyProfile, {});
  const isFavorited = useQuery(api.favorites.isJobFavorited, { jobId });
  const addFavorite = useMutation(api.favorites.addFavorite);
  const removeFavorite = useMutation(api.favorites.removeFavorite);
  const applyToJob = useMutation(api.applications.applyToJob);

  const { profileComplete, profileSummary } = useMemo(() => {
    if (!myProfile) {
      return { profileComplete: false, profileSummary: null };
    }
    const { user, profile, experiences, education } = myProfile;
    const firstName = (profile?.firstName ?? user?.firstName ?? "").trim();
    const lastName = (profile?.lastName ?? user?.lastName ?? "").trim();
    const complete = firstName.length > 0 && lastName.length > 0;
    const name = [firstName, lastName].filter(Boolean).join(" ") || "—";
    const summary = complete
      ? {
          name,
          imageUrl: user?.imageUrl ?? null,
          headline: profile?.headline ?? null,
          location: profile?.location ?? null,
          summary: profile?.summary ?? profile?.bio ?? null,
          skills: profile?.skills ?? [],
          experienceCount: experiences.length,
          educationCount: education.length,
        }
      : null;
    return { profileComplete: complete, profileSummary: summary };
  }, [myProfile]);

  if (job === undefined) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-secondary" />
        <div className="h-64 animate-pulse rounded-2xl bg-secondary" />
      </div>
    );
  }

  if (!job) {
    return (
      <Card className="warm-shadow">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <p className="font-medium">{t("detail.notAvailable")}</p>
          <p className="text-sm text-muted-foreground">
            {t("detail.notAvailableDesc")}
          </p>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/jobs">
              <ArrowLeft className="mr-1.5 size-3.5" />
              {t("detail.allPaths")}
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="animate-fade-in space-y-6">
      {/* Back link */}
      {/* ลิงก์กลับหน้ารวมเส้นทางการเรียนรู้ */}
      <Link
        href="/jobs"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        {t("detail.backToAll")}
      </Link>

      <div className="@container">
      <div className="grid gap-6 @4xl:grid-cols-[1.5fr_1fr]">
        {/* Job details */}
        <Card className="warm-shadow">
          <CardHeader className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1 rounded-full">
                <Briefcase className="size-3" />
                {job.employmentType.replace("_", " ")}
              </Badge>
              <Badge variant="outline" className="rounded-full">
                {job.workplaceType.replace("_", " ")}
              </Badge>
            </div>
            <CardTitle className="font-(family-name:--font-bricolage) text-2xl tracking-tight">
              {job.title}
            </CardTitle>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              {job.companyName}
              <span className="text-border">·</span>
              <MapPin className="size-3" />
              {job.location}
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="font-(family-name:--font-bricolage) text-lg font-semibold">
              {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
            </p>

            <div className="rounded-xl bg-secondary/50 p-4">
              <RichTextDisplay content={job.description} />
            </div>

            {(job.tags ?? []).length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {(job.tags ?? []).slice(0, 8).map((tag) => (
                  <Badge key={tag} variant="outline" className="rounded-full text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Mockup Section: ทักษะที่คุณจะได้เรียนรู้ (Skills You Will Learn) */}
            <div className="rounded-xl border border-dashed border-jade/40 bg-jade/5 p-5">
              <h3 className="flex items-center gap-2 font-(family-name:--font-bricolage) text-base font-semibold tracking-tight text-jade">
                <Lightbulb className="size-4" />
                {t("detail.skillsYouWillLearn")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("detail.skillsComingSoon")}
              </p>
              {/* placeholder สำหรับแสดงรายการทักษะจริงในอนาคต */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                {["Critical Thinking", "Data Analysis", "Communication", "Problem Solving", "Digital Literacy", "Adaptability"].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-jade/10 px-3 py-1.5 text-center text-xs font-medium text-jade/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
              {/* ปุ่มกลับหน้ารวมเส้นทาง */}
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link href="/jobs">
                  <ArrowLeft className="mr-1 size-3" />
                  {t("detail.allPaths")}
                </Link>
              </Button>
              <Button
                variant={isFavorited ? "secondary" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => {
                  if (isFavorited) {
                    void removeFavorite({ jobId }).catch((error) =>
                      toast.error(getErrorMessage(error, "Could not update saved jobs."))
                    );
                  } else {
                    void addFavorite({ jobId }).catch((error) =>
                      toast.error(getErrorMessage(error, "Could not update saved jobs."))
                    );
                  }
                }}
              >
                {isFavorited ? (
                  <>
                    <BookmarkCheck className="mr-1 size-3.5" />
                    {t("detail.saved")}
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-1 size-3.5" />
                    {t("detail.savePath")}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Apply form */}
        <Card className="warm-shadow h-fit @4xl:sticky @4xl:top-28">
          <CardHeader>
            <CardTitle className="font-(family-name:--font-bricolage) text-xl tracking-tight">
              {t("action.startLearning")}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {t("detail.startLearningDesc")}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {!profileComplete && myProfile !== undefined && (
              <div className="rounded-xl border border-amber-accent/40 bg-amber-accent/10 p-4">
                <p className="flex items-center gap-2 text-sm font-medium text-amber-accent">
                  <UserCircle className="size-4 shrink-0" />
                  {t("action.completeProfileToStartLearning")}
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {t("detail.addNameInfo")}
                </p>
                <Button asChild variant="outline" size="sm" className="mt-3 rounded-full">
                  <Link href="/profile">{t("action.completeProfile")}</Link>
                </Button>
              </div>
            )}

            {profileComplete && profileSummary && (
              <div className="rounded-xl border border-border/80 bg-secondary/30">
                <button
                  type="button"
                  onClick={() => setProfileInfoOpen((open) => !open)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-secondary/50"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {t("detail.profileShared")}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {t("action.learningProvidersWillSeeFollowing")}
                    </p>
                  </div>
                  {profileInfoOpen ? (
                    <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                  )}
                </button>

                {profileInfoOpen && (
                  <div className="border-t border-border/80 px-4 py-4 space-y-4">
                    {/* Profile header */}
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-semibold text-muted-foreground ring-2 ring-background">
                        {profileSummary.imageUrl ? (
                          <img // eslint-disable-line @next/next/no-img-element
                            src={profileSummary.imageUrl}
                            alt=""
                            className="size-full object-cover"
                          />
                        ) : (
                          profileSummary.name[0]?.toUpperCase() ?? "?"
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-(family-name:--font-bricolage) text-sm font-semibold text-foreground">
                          {profileSummary.name}
                        </p>
                        {profileSummary.headline && (
                          <p className="line-clamp-1 text-xs text-muted-foreground">
                            {profileSummary.headline}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Location */}
                    {profileSummary.location && (
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="size-3 shrink-0" />
                        {profileSummary.location}
                      </p>
                    )}

                    {/* Skills */}
                    {profileSummary.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {profileSummary.skills.slice(0, 6).map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="rounded-full border-jade/20 bg-jade/5 px-2.5 py-0.5 text-[11px] text-jade"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {profileSummary.skills.length > 6 && (
                          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] text-muted-foreground">
                            +{profileSummary.skills.length - 6} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-md bg-muted/80 px-2 py-0.5 text-[11px] text-muted-foreground">
                        <Briefcase className="size-2.5" />
                        {profileSummary.experienceCount}{" "}
                        {profileSummary.experienceCount === 1 ? "role" : "roles"}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-muted/80 px-2 py-0.5 text-[11px] text-muted-foreground">
                        <GraduationCap className="size-2.5" />
                        {profileSummary.educationCount}{" "}
                        {profileSummary.educationCount === 1 ? "entry" : "entries"}
                      </span>
                    </div>

                    {/* Edit link */}
                    <div className="flex justify-end">
                      <Link
                        href="/profile"
                        className="inline-flex items-center gap-1 text-xs font-medium text-jade hover:underline"
                      >
                        <Pencil className="size-3" />
                        {t("action.editProfile")}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              {/* ช่องบันทึกถึงผู้สอน */}
              <Label htmlFor="coverLetter">{t("detail.coverLetter")}</Label>
              <Textarea
                id="coverLetter"
                rows={8}
                placeholder={t("detail.coverLetterPlaceholder")}
                value={coverLetter}
                onChange={(event) => setCoverLetter(event.target.value)}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {t("detail.coverLetterHint")}
              </p>
            </div>
            <Button
              className="w-full rounded-xl bg-jade text-white hover:bg-jade/90"
              disabled={isSubmitting || !profileComplete}
              onClick={async () => {
                setIsSubmitting(true);
                setStatusText(null);
                try {
                  await applyToJob({
                    jobId,
                    coverLetter: coverLetter.trim() || undefined,
                  });
                  setStatusText(t("action.learningStartedSuccess"));
                  setCoverLetter("");
                } catch (error) {
                  setStatusText(getErrorMessage(error, t("action.couldNotStartLearning")));
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <Send className="mr-1.5 size-4" />
              {isSubmitting ? t("action.startLearningStarting") : t("action.startLearning")}
            </Button>
            {statusText && (
              <p className={`text-xs ${statusText.includes("success") ? "text-jade" : "text-muted-foreground"}`}>
                {statusText}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      </div>
    </section>
  );
}

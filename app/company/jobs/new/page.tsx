"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { api } from "@/convex/_generated/api";
import { getErrorMessage } from "@/lib/convex-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/rich-text-editor";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/i18n/language-context";

type JobFormValues = {
  title: string;
  description: string;
  location: string;
  employmentType: "full_time" | "part_time" | "contract" | "internship" | "temporary";
  workplaceType: "on_site" | "remote" | "hybrid";
  salaryMin: string;
  salaryMax: string;
  salaryCurrency: string;
  tags: string;
  autoCloseOnAccept: boolean;
};

export default function NewCompanyJobPage() {
  const router = useRouter();
  const { orgId } = useAuth();
  const { t } = useLanguage();
  const [statusText, setStatusText] = useState<string | null>(null);

  const companyContext = useQuery(
    api.companies.getMyCompanyContext,
    orgId ? { clerkOrgId: orgId } : "skip",
  );
  const usage = useQuery(
    api.companies.getCompanyUsage,
    companyContext ? { companyId: companyContext.companyId } : "skip",
  );
  const createJobListing = useMutation(api.jobs.createJobListing);

  const jobLimit = companyContext?.jobLimit ?? 1;
  const atJobLimit =
    usage !== undefined &&
    usage !== null &&
    usage.activeJobCount >= jobLimit;

  const form = useForm<JobFormValues>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      employmentType: "full_time",
      workplaceType: "hybrid",
      salaryMin: "",
      salaryMax: "",
      salaryCurrency: "USD",
      tags: "",
      autoCloseOnAccept: false,
    },
  });

  if (!orgId) {
    return (
      <Card className="warm-shadow">
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          {t("companyNew.selectOrg")}
        </CardContent>
      </Card>
    );
  }

  if (companyContext === undefined) {
    return (
      <div className="h-64 animate-pulse rounded-2xl bg-secondary" />
    );
  }

  if (!companyContext) {
    return (
      <Card className="warm-shadow">
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          {t("companyNew.syncing")}
        </CardContent>
      </Card>
    );
  }

  const canManage =
    companyContext.role === "admin" || companyContext.role === "recruiter";
  if (!canManage) {
    return (
      <Card className="warm-shadow">
        <CardContent className="flex flex-col items-center gap-2 py-8 text-center">
          <p className="font-medium">{t("companyNew.readOnly")}</p>
          <p className="text-sm text-muted-foreground">
            {t("companyNew.readOnlyDesc")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="animate-fade-in space-y-6">
      {/* Back link */}
      <Link
        href="/company/jobs"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        {t("companyNew.backToJobs")}
      </Link>

      {/* Page header */}
      <div>
        <h1 className="font-[family-name:var(--font-bricolage)] text-2xl font-bold tracking-tight">
          {t("companyNew.title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("companyNew.subtitle")}
        </p>
      </div>

      {atJobLimit && (
        <Card className="border-amber-accent/30 bg-amber-accent/5">
          <CardContent className="py-4">
            <p className="text-sm font-medium text-amber-accent">
              {t("companyNew.limitReached")} ({usage?.activeJobCount ?? 0}/{jobLimit})
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("companyNew.closeToContinue")}
            </p>
            {/* Billing/Pricing is hidden in this NSC demo. */}
          </CardContent>
        </Card>
      )}

      <Card className="@container warm-shadow">
        <CardContent className="p-4 @sm:p-6">
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(async (values) => {
                setStatusText(null);

                try {
                  await createJobListing({
                    companyId: companyContext.companyId,
                    title: values.title.trim(),
                    description: values.description.trim(),
                    location: values.location.trim(),
                    employmentType: values.employmentType,
                    workplaceType: values.workplaceType,
                    salaryMin: Number(values.salaryMin),
                    salaryMax: Number(values.salaryMax),
                    salaryCurrency: values.salaryCurrency.trim(),
                    tags: values.tags
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                    autoCloseOnAccept: values.autoCloseOnAccept,
                  });
                  setStatusText("Job listing created.");
                  router.push("/company/jobs");
                } catch (error) {
                  setStatusText(getErrorMessage(error, "Could not create job listing."));
                }
              })}
            >
              {/* Basics */}
              <div className="space-y-4">
                <h3 className="font-[family-name:var(--font-bricolage)] text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("companyNew.basics")}
                </h3>
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: "Title is required." }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("companyNew.programTitle")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("companyNew.programTitlePlaceholder")} {...field} />
                      </FormControl>
                      <FormDescription>{t("companyNew.programTitleDesc")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  rules={{ required: "Description is required." }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("companyNew.description")}</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={t("companyNew.descPlaceholder")}
                        />
                      </FormControl>
                      <FormDescription>{t("companyNew.descHint")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Details */}
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-[family-name:var(--font-bricolage)] text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("companyNew.details")}
                </h3>
                <div className="grid gap-4 @xl:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="location"
                    rules={{ required: "Location is required." }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("companyNew.location")}</FormLabel>
                        <FormControl>
                          <Input placeholder="San Francisco, CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("companyNew.employmentType")}</FormLabel>
                        <FormControl>
                          <select
                            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
                            {...field}
                          >
                            <option value="full_time">{t("companyNew.fullTime")}</option>
                            <option value="part_time">{t("companyNew.partTime")}</option>
                            <option value="contract">{t("companyNew.contract")}</option>
                            <option value="internship">{t("companyNew.internship")}</option>
                            <option value="temporary">{t("companyNew.temporary")}</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="workplaceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("companyNew.workplaceType")}</FormLabel>
                        <FormControl>
                          <select
                            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
                            {...field}
                          >
                            <option value="on_site">{t("companyNew.onSite")}</option>
                            <option value="hybrid">{t("companyNew.hybrid")}</option>
                            <option value="remote">{t("companyNew.remote")}</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 @xl:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="salaryMin"
                    rules={{ required: "Minimum salary is required." }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("companyNew.salaryMin")}</FormLabel>
                        <FormControl>
                          <Input inputMode="numeric" placeholder="120000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salaryMax"
                    rules={{ required: "Maximum salary is required." }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("companyNew.salaryMax")}</FormLabel>
                        <FormControl>
                          <Input inputMode="numeric" placeholder="160000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salaryCurrency"
                    rules={{ required: "Currency is required." }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("companyNew.currency")}</FormLabel>
                        <FormControl>
                          <Input placeholder="USD" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("companyNew.tags")}</FormLabel>
                      <FormControl>
                        <Input placeholder="typescript, design, saas" {...field} />
                      </FormControl>
                      <FormDescription>{t("companyNew.tagsDesc")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Settings */}
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-[family-name:var(--font-bricolage)] text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("companyNew.settings")}
                </h3>
                <FormField
                  control={form.control}
                  name="autoCloseOnAccept"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3 rounded-xl border border-border bg-secondary/30 p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(!!checked)}
                        />
                      </FormControl>
                      <div>
                        <FormLabel>{t("companyNew.autoCloseLabel")}</FormLabel>
                        <FormDescription>
                          {t("companyNew.autoCloseDesc")}
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit */}
              <div className="flex items-center gap-3 border-t border-border pt-6">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting || atJobLimit}
                  className="rounded-full bg-terracotta text-white hover:bg-terracotta/90"
                >
                  <Send className="mr-1.5 size-3.5" />
                  {form.formState.isSubmitting ? t("companyNew.creating") : t("companyNew.publish")}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => router.push("/company/jobs")}
                >
                  {t("companyNew.cancel")}
                </Button>
                {statusText && <p className="text-xs text-muted-foreground">{statusText}</p>}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}

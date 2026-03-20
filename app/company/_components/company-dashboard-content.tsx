"use client";

// คอมโพเนนต์แสดงเนื้อหาแดชบอร์ดฝั่งผู้ให้บริการ — รองรับ i18n
// แยกออกจาก page.tsx (Server Component) เพราะต้องใช้ useLanguage hook

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, GraduationCap, Users } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-context";

/** แสดงเมื่อยังไม่ได้เลือก Organization */
export function CompanyDashboardNoOrg() {
  const { t } = useLanguage();
  return (
    <Card className="warm-shadow">
      <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
          <Users className="size-5 text-muted-foreground" />
        </div>
        {/* ข้อความเมื่อยังไม่เลือก Organization — รองรับ i18n */}
        <p className="font-medium">{t("companyDash.selectOrg")}</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          {t("companyDash.selectOrgDesc")}
        </p>
      </CardContent>
    </Card>
  );
}

/** แสดงเนื้อหาหลักของแดชบอร์ด */
export function CompanyDashboardMain() {
  const { t } = useLanguage();
  return (
    <section className="animate-fade-in space-y-4">
      <div>
        {/* หัวข้อแดชบอร์ดผู้ให้บริการ — รองรับ i18n */}
        <h1 className="font-[family-name:var(--font-bricolage)] text-2xl font-bold tracking-tight">
          {t("companyDash.title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("companyDash.subtitle")}
        </p>
      </div>

      <Card className="warm-shadow">
        <CardContent className="flex flex-col gap-4 p-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary">
            <GraduationCap className="size-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            {t("companyDash.disabledNote")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link href="/company/jobs">
                {t("companyDash.viewPrograms")}
                <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
            <Button asChild size="sm" className="rounded-full bg-terracotta text-white hover:bg-terracotta/90">
              <Link href="/company/applications">
                {t("companyDash.reviewLearners")}
                <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

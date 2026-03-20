// หน้าแดชบอร์ดฝั่งผู้ให้บริการ — Server Component ตรวจสอบ auth
// แล้วส่งต่อให้ Client Component ที่รองรับ i18n แสดงผล
import { auth } from "@clerk/nextjs/server";
import {
  CompanyDashboardMain,
  CompanyDashboardNoOrg,
} from "./_components/company-dashboard-content";

export default async function CompanyDashboardPage() {
  const { orgId } = await auth();

  if (!orgId) {
    return <CompanyDashboardNoOrg />;
  }

  return <CompanyDashboardMain />;
}


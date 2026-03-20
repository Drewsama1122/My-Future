import { auth } from "@clerk/nextjs/server";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Lock } from "lucide-react";

export default async function CompanyBillingPage() {
  const { orgId } = await auth();
  if (!orgId) {
    return (
      <Card className="warm-shadow">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
            <CreditCard className="size-5 text-muted-foreground" />
          </div>
          <p className="font-medium">Select an organization first</p>
          <p className="text-sm text-muted-foreground">
            Use the organization switcher above, then return to billing.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="warm-shadow">
      <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
          <Lock className="size-5 text-muted-foreground" />
        </div>
        <p className="font-medium">Billing & plan are hidden</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          This NSC demo focuses on learners. Billing/Pricing UI is intentionally disabled for a cleaner edu-tech experience.
        </p>
      </CardContent>
    </Card>
  );
}

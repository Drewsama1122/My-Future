import { auth } from "@clerk/nextjs/server";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { SiteLogo } from "@/components/site-logo";

export default async function PricingPage() {
  const { orgId } = await auth();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-7xl items-center px-6 py-3">
          <SiteLogo />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12">
        <div className="animate-fade-in space-y-2 text-center">
          <h1 className="font-[family-name:var(--font-bricolage)] text-3xl font-bold tracking-tight">
            Pricing is hidden
          </h1>
          <p className="text-muted-foreground">
            This NSC demo focuses on learners and learning outcomes. Billing/Pricing UI is intentionally disabled.
          </p>
        </div>

        <Card className="animate-slide-up warm-shadow mx-auto w-full max-w-lg">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
              <Lock className="size-5 text-muted-foreground" />
            </div>
            <p className="font-medium">
              {orgId ? "Billing is unavailable for this demo." : "Sign in with an organization to manage billing."}
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
              You can continue exploring learning programs and your profile without upgrading plans.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

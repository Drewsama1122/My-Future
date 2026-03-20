import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/components/i18n/language-context";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

// Metadata หลัก — เปลี่ยนเป็น EdTech wording สำหรับ NSC
export const metadata: Metadata = {
  title: "MyFuture — Reskill & Upskill Platform",
  description:
    "A friendly learning platform for reskilling and upskilling. Explore, learn, and grow with confidence.",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${figtree.variable} antialiased`}
      >
        <ClerkProvider
          dynamic
          appearance={{
            cssLayerName: "clerk",
            variables: {
              colorPrimary: "var(--terracotta)",
              colorBackground: "var(--background)",
              colorForeground: "var(--foreground)",
              colorPrimaryForeground: "var(--primary-foreground)",
              colorMuted: "var(--muted)",
              colorMutedForeground: "var(--muted-foreground)",
              colorBorder: "var(--border)",
              colorInput: "var(--input)",
              colorInputForeground: "var(--foreground)",
              colorRing: "var(--ring)",
              borderRadius: "var(--radius)",
              fontFamily: "var(--font-figtree), var(--font-sans), sans-serif",
            },
          }}
        >
          <ConvexClientProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </ConvexClientProvider>
          <Toaster richColors closeButton position="bottom-right" />
        </ClerkProvider>
      </body>
    </html>
  );
}

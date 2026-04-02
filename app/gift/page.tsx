import Link from "next/link";
import { Suspense } from "react";
import { ChevronLeft } from "lucide-react";
import { GiftFlow } from "@/components/gift-flow";
import { Logo } from "@/components/logo";
import { PhoneBody, PhoneFrame, PhoneHeader, PhoneScreen, Shell } from "@/components/ui";

export default function GiftPage() {
  return (
    <main className="grain min-h-screen pb-6 pt-4 sm:pb-8 sm:pt-6">
      <Shell>
        <PhoneFrame>
          <PhoneScreen>
            <PhoneHeader className="pb-2">
              <div className="flex justify-center">
                <Logo size="page" href={undefined} className="max-h-[32px]" />
              </div>
              <Link href="/" className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] text-[color:var(--muted)]">
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous page
              </Link>
            </PhoneHeader>
            <PhoneBody className="pb-2">
              <Suspense fallback={<div className="text-[11px] text-[color:var(--muted)]">Loading...</div>}>
                <GiftFlow />
              </Suspense>
            </PhoneBody>
          </PhoneScreen>
        </PhoneFrame>
      </Shell>
    </main>
  );
}

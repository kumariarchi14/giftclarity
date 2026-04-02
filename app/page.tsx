"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, BadgeHelp, Heart } from "lucide-react";
import { Logo } from "@/components/logo";
import { clearSession } from "@/lib/storage";
import { Card, PhoneBody, PhoneFooter, PhoneFrame, PhoneHeader, PhoneScreen, Shell } from "@/components/ui";

function InfoCard({
  icon,
  title,
  body
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Card className="p-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-soft)]">{icon}</div>
      <h3 className="mt-2 text-[13px] font-semibold">{title}</h3>
      <p className="mt-1 text-[12px] leading-5 text-[color:var(--muted)]">{body}</p>
    </Card>
  );
}

export default function HomePage() {
  return (
    <main className="grain min-h-screen pb-6 pt-4 sm:pb-8 sm:pt-6">
      <Shell>
        <PhoneFrame className="overflow-hidden">
          <PhoneScreen>
            <PhoneHeader className="pb-2 pt-4">
              <div className="flex justify-center">
                <Logo size="hero" href={undefined} className="max-h-[50px]" />
              </div>
            </PhoneHeader>

            <PhoneBody scroll={false} className="flex flex-col justify-center gap-2.5">
              <div className="rounded-[22px] bg-[var(--surface-strong)] p-3.5">
                <h1 className="balanced-text text-center text-[25px] font-semibold tracking-tight leading-7">
                  Choose meaningful gifts with confidence.
                </h1>
                <p className="mt-2 text-center text-[12px] leading-5 text-[color:var(--muted)]">
                  GiftClarity helps you decide before you buy, without turning gifting into a marketplace or catalog.
                </p>
              </div>

              <div className="grid gap-2">
                <InfoCard
                  icon={<Heart className="h-5 w-5 text-[var(--accent)]" />}
                  title="Meaning first"
                  body="Start with recipient context and emotional intent before example ideas."
                />
                <InfoCard
                  icon={<BadgeHelp className="h-5 w-5 text-[var(--accent)]" />}
                  title="Not a marketplace"
                  body="No stores, deals, or endless grids. Just clearer gifting decisions."
                />
              </div>
            </PhoneBody>

            <PhoneFooter className="space-y-2.5">
              <Link
                href="/gift?fresh=1"
                onClick={() => clearSession()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 py-3 text-[13px] font-medium text-white shadow-[0_16px_30px_rgba(195,109,69,0.28)]"
              >
                Find a gift now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </PhoneFooter>
          </PhoneScreen>
        </PhoneFrame>
      </Shell>
    </main>
  );
}

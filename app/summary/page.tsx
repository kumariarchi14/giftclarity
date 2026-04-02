"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, Copy, Download } from "lucide-react";
import { Logo } from "@/components/logo";
import { Card, PhoneBody, PhoneFooter, PhoneFrame, PhoneHeader, PhoneScreen, SectionLabel, Shell } from "@/components/ui";
import { getGiftItemImageSrc } from "@/lib/gift-item-visual";
import { normalizeGiftResult } from "@/lib/result-utils";
import { loadSession } from "@/lib/storage";
import type { GiftSession } from "@/lib/types";

function buildText(session: GiftSession) {
  return [
    "GiftClarity Summary",
    `Generated: ${new Date(session.generatedAt).toLocaleString()}`,
    "",
    `Recipient: ${session.inputs.relationship} | ${session.inputs.occasion}`,
    `Traits: ${session.inputs.traits.join(", ")}`,
    `Interests: ${session.inputs.interests}`,
    `Intent: ${session.inputs.expression}`,
    "",
    `Gift Direction: ${session.result.direction}`,
    "",
    "Suggested Items:",
    ...session.result.giftItems.slice(0, 3).flatMap((item) => [
      `- ${item.title}`,
      `  ${item.description}`,
      `  Why suggested: ${item.whySuggested}`
    ]),
    "",
    "Why This Works:",
    ...session.result.whyThisWorks.slice(0, 3).map((bullet) => `- ${bullet}`),
    "",
    session.result.reassurance
  ].join("\n");
}

export default function SummaryPage() {
  const [session, setSession] = useState<GiftSession | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = loadSession();
    if (!stored) {
      setSession(null);
      return;
    }

    const normalizedResult = normalizeGiftResult(stored.result);
    if (!normalizedResult) {
      setSession(null);
      return;
    }

    setSession({
      ...stored,
      result: normalizedResult
    });
  }, []);

  async function handleCopy() {
    if (!session) {
      return;
    }

    await navigator.clipboard.writeText(buildText(session));
    setCopied(true);
  }

  function handleDownload() {
    if (!session) {
      return;
    }

    const blob = new Blob([buildText(session)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "giftclarity-summary.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="grain min-h-screen pb-6 pt-4 sm:pb-8 sm:pt-6">
      <Shell>
        <PhoneFrame>
          <PhoneScreen>
            <PhoneHeader className="pb-2">
              <div className="flex justify-center">
              <Logo size="page" href={undefined} className="max-h-[32px]" />
              </div>
              <Link href="/gift" className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] text-[color:var(--muted)]">
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous page
              </Link>
            </PhoneHeader>

            <PhoneBody className="pb-2">
              <Card className="p-2.5">
              {!session ? (
                <div className="rounded-[18px] bg-[var(--surface-strong)] p-3">
                  <SectionLabel>No summary yet</SectionLabel>
                  <h1 className="text-[16px] font-semibold">Generate a gift direction first.</h1>
                  <p className="mt-1.5 text-[11px] leading-4 text-[color:var(--muted)]">
                    This page shows the latest saved session once a direction has been generated.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="rounded-[18px] bg-[var(--surface-strong)] p-2.5">
                    <SectionLabel>Summary</SectionLabel>
                    <h1 className="text-[16px] font-semibold tracking-tight leading-5">Recipient snapshot and final direction</h1>
                    <p className="mt-1 text-[11px] leading-4 text-[color:var(--muted)]">
                      Generated on {new Date(session.generatedAt).toLocaleString()}.
                    </p>
                  </div>

                  <div className="rounded-[16px] border border-[color:var(--border)] bg-white/75 p-2.5">
                    <SectionLabel>Recipient</SectionLabel>
                    <div className="space-y-1 text-[11px] leading-4">
                      <p><strong>Relationship:</strong> {session.inputs.relationship}</p>
                      <p><strong>Occasion:</strong> {session.inputs.occasion}</p>
                      <p><strong>Intent:</strong> {session.inputs.expression}</p>
                      <p><strong>Interests:</strong> {session.inputs.interests}</p>
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-[color:var(--border)] bg-white/75 p-2.5">
                    <SectionLabel>Direction</SectionLabel>
                    <h2 className="text-[15px] font-semibold tracking-tight leading-5">{session.result.direction}</h2>
                    <div className="mt-2 space-y-1.5">
                      {session.result.giftItems.slice(0, 3).map((item) => (
                        <div key={item.title} className="rounded-[12px] border border-[color:var(--border)] bg-[var(--surface-strong)] p-2">
                          <Image
                            src={getGiftItemImageSrc(item.title)}
                            alt={item.title}
                            width={320}
                            height={220}
                            className="h-20 w-full rounded-[10px] object-cover"
                            unoptimized
                          />
                          <div className="flex items-start justify-between gap-2">
                            <div className="mt-1.5 text-[11px] font-medium leading-4">{item.title}</div>
                            {item.tag ? (
                              <span className="mt-1.5 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-medium text-[color:var(--accent)]">
                                {item.tag}
                              </span>
                            ) : null}
                          </div>
                          <div className="mt-1 text-[10px] leading-4 text-[color:var(--muted)]">{item.description}</div>
                          <div className="mt-1 text-[10px] leading-4 text-[color:var(--foreground)]">
                            Why suggested: {item.whySuggested}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2">
                      <SectionLabel>Why this works</SectionLabel>
                      <ul className="space-y-1 text-[11px] leading-4 text-[color:var(--muted)]">
                        {session.result.whyThisWorks.slice(0, 3).map((bullet) => (
                          <li key={bullet}>- {bullet}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-2 rounded-[12px] bg-[var(--accent-soft)] p-2 text-[11px] leading-4 text-[color:var(--muted)]">
                      {session.result.reassurance}
                    </div>
                  </div>
                </div>
              )}
            </Card>
            </PhoneBody>
            {session && (
              <PhoneFooter className="pt-1">
                <div className="grid gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-3.5 py-2 text-[11px] font-medium text-white"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copied ? "Copied" : "Copy summary"}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--border)] px-3.5 py-2 text-[11px]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              </PhoneFooter>
            )}
          </PhoneScreen>
        </PhoneFrame>
      </Shell>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, Copy, Download } from "lucide-react";
import { Logo } from "@/components/logo";
import { Card, PhoneBody, PhoneFooter, PhoneFrame, PhoneHeader, PhoneScreen, SectionLabel, Shell } from "@/components/ui";
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
    ...session.result.exampleIdeas.slice(0, 3).map((idea) => `- ${idea}`),
    "",
    session.result.reassurance
  ].join("\n");
}

export default function SummaryPage() {
  const [session, setSession] = useState<GiftSession | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSession(loadSession());
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
              <Logo size="page" href={undefined} className="max-h-[38px]" />
              </div>
              <Link href="/gift" className="mt-1 inline-flex items-center gap-2 text-[12px] text-[color:var(--muted)]">
                <ChevronLeft className="h-4 w-4" />
                Previous page
              </Link>
            </PhoneHeader>

            <PhoneBody className="pb-3">
              <Card className="p-3">
              {!session ? (
                <div className="rounded-[20px] bg-[var(--surface-strong)] p-4">
                  <SectionLabel>No summary yet</SectionLabel>
                  <h1 className="text-[18px] font-semibold">Generate a gift direction first.</h1>
                  <p className="mt-2 text-[12px] leading-5 text-[color:var(--muted)]">
                    This page shows the latest saved session once a direction has been generated.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-[20px] bg-[var(--surface-strong)] p-3">
                    <SectionLabel>Summary</SectionLabel>
                    <h1 className="text-[18px] font-semibold tracking-tight leading-6">Recipient snapshot and final direction</h1>
                    <p className="mt-1.5 text-[12px] leading-5 text-[color:var(--muted)]">
                      Generated on {new Date(session.generatedAt).toLocaleString()}.
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-[color:var(--border)] bg-white/75 p-3">
                    <SectionLabel>Recipient</SectionLabel>
                    <div className="space-y-1.5 text-[12px] leading-5">
                      <p><strong>Relationship:</strong> {session.inputs.relationship}</p>
                      <p><strong>Occasion:</strong> {session.inputs.occasion}</p>
                      <p><strong>Intent:</strong> {session.inputs.expression}</p>
                      <p><strong>Interests:</strong> {session.inputs.interests}</p>
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-[color:var(--border)] bg-white/75 p-3">
                    <SectionLabel>Direction</SectionLabel>
                    <h2 className="text-[17px] font-semibold tracking-tight leading-6">{session.result.direction}</h2>
                    <div className="mt-2.5 space-y-1.5">
                      {session.result.exampleIdeas.slice(0, 3).map((idea) => (
                        <div key={idea} className="rounded-[14px] border border-[color:var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-[12px]">
                          {idea}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2.5">
                      <SectionLabel>Why this works</SectionLabel>
                      <ul className="space-y-1 text-[12px] leading-5 text-[color:var(--muted)]">
                        {session.result.whyThisWorks.slice(0, 3).map((bullet) => (
                          <li key={bullet}>- {bullet}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-2.5 rounded-[14px] bg-[var(--accent-soft)] p-2.5 text-[12px] text-[color:var(--muted)]">
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2.5 text-[12px] font-medium text-white"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied" : "Copy summary"}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--border)] px-4 py-2.5 text-[12px]"
                  >
                    <Download className="h-4 w-4" />
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

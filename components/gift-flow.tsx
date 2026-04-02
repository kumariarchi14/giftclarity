"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Copy, Download, HeartHandshake, LoaderCircle, Sparkles } from "lucide-react";
import { PillButton, SectionLabel } from "@/components/ui";
import {
  demoScenarios,
  expressionOptions,
  occasionOptions,
  personalityOptions,
  relationshipOptions
} from "@/lib/data";
import { generateGiftRecommendation } from "@/lib/ai";
import { getGiftItemImageSrc } from "@/lib/gift-item-visual";
import { normalizeGiftResult } from "@/lib/result-utils";
import { clearSession, loadSession, saveSession } from "@/lib/storage";
import type { GiftFormData, GiftResult, GiftSession, TonePreference } from "@/lib/types";

const initialForm: GiftFormData = {
  relationship: "",
  occasion: "",
  traits: [],
  interests: "",
  expression: "",
  budget: "",
  context: ""
};

const stepNames = ["Recipient", "Context", "Direction", "Summary"] as const;

function prettyValue(value: string) {
  if (!value) {
    return "Not specified";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function FieldLabel({ label }: { label: string }) {
  return <label className="text-[11px] font-medium text-[color:var(--foreground)]">{label}</label>;
}

function ResultCard({ result }: { result: GiftResult }) {
  return (
    <div className="space-y-2 rounded-[18px] bg-[var(--surface-strong)] p-2.5">
      <div>
        <SectionLabel>Gift direction</SectionLabel>
        <h2 className="text-[16px] font-semibold leading-5 tracking-tight">{result.direction}</h2>
      </div>

      <div>
        <SectionLabel>Suggested items</SectionLabel>
        <div className="grid gap-2">
          {result.giftItems.slice(0, 3).map((item) => (
            <div key={item.title} className="rounded-[14px] border border-[color:var(--border)] bg-white/85 p-2.5">
              <div className="overflow-hidden rounded-[12px] border border-[color:var(--border)] bg-[var(--surface-strong)]">
                <Image
                  src={getGiftItemImageSrc(item.title)}
                  alt={item.title}
                  width={320}
                  height={220}
                  className="h-24 w-full object-cover"
                  unoptimized
                />
              </div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="mt-2 text-[12px] font-semibold leading-4 text-[color:var(--foreground)]">{item.title}</h3>
                {item.tag ? (
                  <span className="mt-2 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[9px] font-medium text-[color:var(--accent)]">
                    {item.tag}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-[10px] leading-4 text-[color:var(--muted)]">{item.description}</p>
              <div className="mt-1.5 rounded-[10px] bg-[var(--surface-strong)] px-2 py-1 text-[10px] leading-4 text-[color:var(--foreground)]">
                Why suggested: {item.whySuggested}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Why this works</SectionLabel>
        <ul className="space-y-1 text-[11px] leading-4 text-[color:var(--muted)]">
          {result.whyThisWorks.slice(0, 3).map((bullet) => (
            <li key={bullet}>- {bullet}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-[12px] bg-[var(--accent-soft)] p-2 text-[11px] leading-4 text-[color:var(--muted)]">
        <span className="font-medium text-[color:var(--foreground)]">Confidence check:</span> {result.reassurance}
      </div>
    </div>
  );
}

function SummaryBlock({
  form,
  result,
  feelsRight
}: {
  form: GiftFormData;
  result: GiftResult;
  feelsRight: boolean;
}) {
  return (
    <div className="space-y-2 rounded-[18px] bg-[var(--surface-strong)] p-2.5">
      <div>
        <SectionLabel>Recipient snapshot</SectionLabel>
        <p className="text-[11px] leading-4 text-[color:var(--muted)]">
          {prettyValue(form.relationship)} | {prettyValue(form.occasion)} | {form.expression}
        </p>
      </div>

      <div>
        <SectionLabel>Final gift direction</SectionLabel>
        <h3 className="text-[15px] font-semibold leading-5">{result.direction}</h3>
      </div>

      <div>
        <SectionLabel>Suggested items</SectionLabel>
        <div className="space-y-1.5">
          {result.giftItems.slice(0, 3).map((item) => (
            <div key={item.title} className="rounded-[12px] border border-[color:var(--border)] bg-white/80 p-2">
              <div className="flex gap-2">
                <Image
                  src={getGiftItemImageSrc(item.title)}
                  alt={item.title}
                  width={84}
                  height={64}
                  className="h-14 w-16 rounded-[10px] object-cover"
                  unoptimized
                />
                <div className="min-w-0">
                  <div className="text-[11px] font-medium leading-4">{item.title}</div>
                  <div className="mt-1 text-[10px] leading-4 text-[color:var(--muted)]">{item.whySuggested}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Why this works</SectionLabel>
        <ul className="space-y-1 text-[11px] leading-4 text-[color:var(--muted)]">
          {result.whyThisWorks.slice(0, 3).map((bullet) => (
            <li key={bullet}>- {bullet}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-[12px] border border-[color:var(--border)] p-2 text-[11px] leading-4 text-[color:var(--muted)]">
        {feelsRight ? "Marked as a strong fit." : "You can still refine before finalizing."}
      </div>
    </div>
  );
}

export function GiftFlow() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [form, setForm] = useState<GiftFormData>(initialForm);
  const [tone, setTone] = useState<TonePreference>("balanced");
  const [result, setResult] = useState<GiftResult | null>(null);
  const [alternativeCount, setAlternativeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feelsRight, setFeelsRight] = useState(false);

  useEffect(() => {
    const isFresh = searchParams.get("fresh") === "1";
    if (isFresh) {
      clearSession();
      return;
    }

    const session = loadSession();
    if (!session) {
      return;
    }

    const normalizedResult = normalizeGiftResult(session.result);
    if (!normalizedResult) {
      clearSession();
      return;
    }

    setForm(session.inputs);
    setTone(session.tone);
    setResult(normalizedResult);
    setAlternativeCount(session.alternativeCount);
    setStep(3);
  }, [searchParams]);

  const canContinueFirstStep = Boolean(form.relationship && form.occasion && form.traits.length > 0);
  const canGenerate = Boolean(form.expression && form.interests.trim());

  function update<K extends keyof GiftFormData>(key: K, value: GiftFormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleTrait(trait: string) {
    setForm((current) => ({
      ...current,
      traits: current.traits.includes(trait)
        ? current.traits.filter((value) => value !== trait)
        : [...current.traits, trait]
    }));
  }

  function loadDemo(index: number) {
    const scenario = demoScenarios[index];
    if (!scenario) {
      return;
    }

    setForm(scenario.value);
    setResult(null);
    setFeelsRight(false);
    setAlternativeCount(0);
    setStep(1);
  }

  async function handleGenerate(nextAngle = alternativeCount) {
    setLoading(true);
    setCopied(false);
    setFeelsRight(false);

    try {
      const generated = await generateGiftRecommendation({
        inputs: form,
        tone,
        angle: nextAngle
      });

      const session: GiftSession = {
        inputs: form,
        result: generated,
        tone,
        alternativeCount: nextAngle,
        generatedAt: new Date().toISOString()
      };

      setResult(generated);
      setAlternativeCount(nextAngle);
      setStep(3);
      saveSession(session);
    } finally {
      setLoading(false);
    }
  }

  function buildSummaryText() {
    if (!result) {
      return "";
    }

    return [
      "GiftClarity Summary",
      "",
      `Gift Direction: ${result.direction}`,
      "",
      "Suggested Items:",
      ...result.giftItems.slice(0, 3).flatMap((item) => [
        `- ${item.title}`,
        `  ${item.description}`,
        `  Why suggested: ${item.whySuggested}`
      ]),
      "",
      "Why This Works:",
      ...result.whyThisWorks.slice(0, 3).map((bullet) => `- ${bullet}`),
      "",
      `Confidence Check: ${result.reassurance}`
    ].join("\n");
  }

  async function handleCopy() {
    const text = buildSummaryText();
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }

  function handleDownload() {
    const blob = new Blob([buildSummaryText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "giftclarity-summary.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[22px] border border-[color:var(--border)] bg-white/70">
      <div className="shrink-0 space-y-1.5 px-2.5 pb-1.5 pt-2.5">
        <div>
          <SectionLabel>{stepNames[step - 1]}</SectionLabel>
          <h1 className="text-[17px] font-semibold leading-5 tracking-tight">
            {step === 1 && "Who is this gift for?"}
            {step === 2 && "Add the context that matters."}
            {step === 3 && "Here is your gift direction."}
            {step === 4 && "Your final gifting summary."}
          </h1>
        </div>

        <div className="flex items-center gap-1">
          {stepNames.map((name, index) => (
            <div key={name} className="min-w-0 flex-1">
              <div className={`h-1 rounded-full ${index < step ? "bg-[var(--accent)]" : "bg-white/90"}`} />
              <div className="mt-0.5 truncate text-[9px] text-[color:var(--muted)]">{name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2.5 pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {step === 1 && (
          <div className="space-y-2.5">
            <div>
              <FieldLabel label="Recipient relationship" />
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {relationshipOptions.map((item) => (
                  <PillButton key={item} active={form.relationship === item} onClick={() => update("relationship", item)}>
                    {prettyValue(item)}
                  </PillButton>
                ))}
              </div>
            </div>

            <div>
              <FieldLabel label="Occasion" />
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {occasionOptions.map((item) => (
                  <PillButton key={item} active={form.occasion === item} onClick={() => update("occasion", item)}>
                    {prettyValue(item)}
                  </PillButton>
                ))}
              </div>
            </div>

            <div>
              <FieldLabel label="Personality signals" />
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {personalityOptions.map((item) => (
                  <PillButton key={item} active={form.traits.includes(item)} onClick={() => toggleTrait(item)}>
                    {prettyValue(item)}
                  </PillButton>
                ))}
              </div>
            </div>

            <details className="rounded-[16px] border border-[color:var(--border)] bg-white/60 px-3 py-2.5">
              <summary className="cursor-pointer text-[11px] text-[color:var(--muted)]">Try a demo setup</summary>
              <div className="mt-2 grid gap-1.5">
                {demoScenarios.slice(0, 2).map((scenario, index) => (
                  <button
                    key={scenario.label}
                    type="button"
                    onClick={() => loadDemo(index)}
                    className="rounded-[14px] border border-[color:var(--border)] bg-white/70 px-3 py-2 text-left"
                  >
                    <div className="text-[11px] font-medium">{scenario.label}</div>
                    <div className="mt-0.5 text-[10px] text-[color:var(--muted)]">
                      {scenario.value.relationship}, {scenario.value.occasion}
                    </div>
                  </button>
                ))}
              </div>
            </details>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2.5">
            <div className="rounded-[14px] border border-[color:var(--border)] bg-white/70 px-2.5 py-2 text-[11px] leading-4 text-[color:var(--muted)]">
              {prettyValue(form.relationship)} | {prettyValue(form.occasion)}
            </div>

            <div>
              <FieldLabel label="Interests, tastes, or category cues" />
              <textarea
                className="mt-1.5 min-h-16 w-full rounded-[16px] border border-[color:var(--border)] bg-white/80 px-3 py-2 outline-none placeholder:text-[color:var(--muted)]"
                placeholder="Wellness, coffee rituals, travel gear, sketching..."
                value={form.interests}
                onChange={(event) => update("interests", event.target.value)}
                style={{ fontSize: "11px", lineHeight: "1rem" }}
              />
            </div>

            <div>
              <FieldLabel label="What should the gift express?" />
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {expressionOptions.map((item) => (
                  <PillButton key={item} active={form.expression === item} onClick={() => update("expression", item)}>
                    {prettyValue(item)}
                  </PillButton>
                ))}
              </div>
            </div>

            <div>
              <FieldLabel label="Anything else?" />
              <textarea
                className="mt-1.5 min-h-16 w-full rounded-[16px] border border-[color:var(--border)] bg-white/80 px-3 py-2 outline-none placeholder:text-[color:var(--muted)]"
                placeholder="One detail that would make the gift feel right."
                value={form.context}
                onChange={(event) => update("context", event.target.value)}
                style={{ fontSize: "11px", lineHeight: "1rem" }}
              />
            </div>

            <details className="rounded-[16px] border border-[color:var(--border)] bg-white/60 px-3 py-2.5">
              <summary className="cursor-pointer text-[11px] text-[color:var(--muted)]">Optional preferences</summary>
              <div className="mt-2 space-y-2">
                <div>
                  <FieldLabel label="Budget range" />
                  <input
                    className="mt-1.5 w-full rounded-[14px] border border-[color:var(--border)] bg-white/80 px-3 py-2 text-[11px] outline-none placeholder:text-[color:var(--muted)]"
                    placeholder="Example: $30-$75"
                    value={form.budget}
                    onChange={(event) => update("budget", event.target.value)}
                  />
                </div>

                <div>
                  <FieldLabel label="Direction lens" />
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {(["balanced", "sentimental", "practical"] as TonePreference[]).map((item) => (
                      <PillButton key={item} active={tone === item} onClick={() => setTone(item)}>
                        {prettyValue(item)}
                      </PillButton>
                    ))}
                  </div>
                </div>
              </div>
            </details>
          </div>
        )}

        {step === 3 && result && (
          <div className="space-y-2">
            <div className="rounded-[12px] border border-[color:var(--border)] bg-white/70 px-2.5 py-1.5 text-[11px] leading-4 text-[color:var(--muted)]">
              {prettyValue(form.relationship)} | {prettyValue(form.occasion)} | {form.traits.join(", ")}
            </div>
            <ResultCard result={result} />
            <div className="rounded-[16px] border border-[color:var(--border)] bg-white/75 p-2.5">
              <FieldLabel label="Confidence check" />
              <p className="mt-1 text-[11px] leading-4 text-[color:var(--muted)]">{result.confidencePrompt}</p>
            </div>
          </div>
        )}

        {step === 4 && result && (
          <div className="space-y-2.5">
            <SummaryBlock form={form} result={result} feelsRight={feelsRight} />
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-[color:var(--border)] bg-white/75 px-2.5 pb-2.5 pt-2">
        {step === 1 && (
          <div className="flex items-center justify-between gap-2.5">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] px-2.5 py-1.5 text-[11px] text-[color:var(--muted)]"
              onClick={() => loadDemo(0)}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Use demo
            </button>
            <button
              type="button"
              disabled={!canContinueFirstStep}
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 py-2 text-[11px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex items-center justify-between gap-2.5">
            <button
              type="button"
              className="rounded-full border border-[color:var(--border)] px-2.5 py-1.5 text-[11px]"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button
              type="button"
              disabled={!canGenerate || loading}
              onClick={() => handleGenerate()}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 py-2 text-[11px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <HeartHandshake className="h-3.5 w-3.5" />}
              Get direction
            </button>
          </div>
        )}

        {step === 3 && result && (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => {
                setFeelsRight(true);
                setStep(4);
              }}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 py-2 text-[11px] font-medium text-white"
            >
              <Check className="h-3.5 w-3.5" />
              This feels right
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full rounded-full border border-[color:var(--border)] px-2.5 py-1.5 text-[11px]"
            >
              Refine
            </button>
          </div>
        )}

        {step === 4 && result && (
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 py-2 text-[11px] font-medium text-white"
            >
              <Copy className="h-3.5 w-3.5" />
              {copied ? "Copied" : "Copy summary"}
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 rounded-full border border-[color:var(--border)] px-2.5 py-1.5 text-[11px]"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Download className="h-3.5 w-3.5" />
                  Download
                </span>
              </button>
              <Link href="/summary" className="flex-1 rounded-full border border-[color:var(--border)] px-2.5 py-1.5 text-center text-[11px]">
                Open page
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

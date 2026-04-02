import type { GiftResult } from "@/lib/types";

function normalizeIdeas(ideas: unknown) {
  if (!Array.isArray(ideas)) {
    return [];
  }

  return ideas.filter((idea): idea is string => typeof idea === "string" && idea.trim().length > 0).slice(0, 3);
}

function normalizeBullets(bullets: unknown) {
  if (!Array.isArray(bullets)) {
    return [];
  }

  return bullets.filter((bullet): bullet is string => typeof bullet === "string" && bullet.trim().length > 0).slice(0, 3);
}

export function normalizeGiftResult(result: Partial<GiftResult> | null | undefined): GiftResult | null {
  if (!result?.direction || typeof result.direction !== "string") {
    return null;
  }

  const exampleIdeas = normalizeIdeas(result.exampleIdeas);
  const whyThisWorks = normalizeBullets(result.whyThisWorks);

  if (!result.confidencePrompt || !result.reassurance || exampleIdeas.length < 2 || whyThisWorks.length < 3) {
    return null;
  }

  const rawItems = Array.isArray(result.giftItems) ? result.giftItems : [];
  const normalizedItems = rawItems
    .filter(
      (item): item is NonNullable<GiftResult["giftItems"]>[number] =>
        !!item &&
        typeof item.title === "string" &&
        typeof item.description === "string" &&
        typeof item.whySuggested === "string"
    )
    .map((item, index) => ({
      title: item.title.trim(),
      description: item.description.trim(),
      whySuggested: item.whySuggested.trim(),
      tag: typeof item.tag === "string" ? item.tag.trim() : whyThisWorks[index] ?? "Good fit"
    }))
    .filter((item) => item.title && item.description && item.whySuggested)
    .slice(0, 3);

  const fallbackItems = exampleIdeas.map((idea, index) => ({
    title: idea,
    description: `${idea} gives the direction a concrete shape without feeling overly generic.`,
    whySuggested: whyThisWorks[index] ?? "It matches the recipient context you shared.",
    tag: whyThisWorks[index] ?? "Good fit"
  }));

  return {
    direction: result.direction.trim(),
    exampleIdeas,
    giftItems: normalizedItems.length >= 2 ? normalizedItems : fallbackItems,
    whyThisWorks,
    confidencePrompt: result.confidencePrompt,
    confidenceScore: typeof result.confidenceScore === "number" ? result.confidenceScore : 75,
    reassurance: result.reassurance
  };
}

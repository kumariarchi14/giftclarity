import { generateMockGiftResult } from "@/lib/mock-ai";
import { normalizeGiftResult } from "@/lib/result-utils";
import type { GiftFormData, GiftResult, TonePreference } from "@/lib/types";

type GenerateParams = {
  inputs: GiftFormData;
  tone?: TonePreference;
  angle?: number;
};

export async function generateGiftRecommendation({
  inputs,
  tone = "balanced",
  angle = 0
}: GenerateParams): Promise<GiftResult> {
  if (typeof window === "undefined") {
    return generateMockGiftResult(inputs, tone, angle);
  }

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs, tone, angle })
    });

    if (!response.ok) {
      return generateMockGiftResult(inputs, tone, angle);
    }

    const result = normalizeGiftResult((await response.json()) as GiftResult);

    if (!result) {
      return generateMockGiftResult(inputs, tone, angle);
    }

    return result;
  } catch {
    return generateMockGiftResult(inputs, tone, angle);
  }
}

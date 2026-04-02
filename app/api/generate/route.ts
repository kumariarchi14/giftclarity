import { NextResponse } from "next/server";
import { generateMockGiftResult } from "@/lib/mock-ai";
import type { GiftFormData, GiftResult, TonePreference } from "@/lib/types";

type RequestBody = {
  inputs: GiftFormData;
  tone?: TonePreference;
  angle?: number;
};

function buildPrompt(inputs: GiftFormData, tone: TonePreference, angle: number) {
  return `You are GiftClarity, an intelligent gifting decision assistant.
Return JSON only with keys: direction, exampleIdeas, whyThisWorks, confidencePrompt, confidenceScore, reassurance.
Avoid marketplaces, stores, brands, discounts, and generic top-10 framing.
Prefer emotional fit and recipient understanding over shopping behavior.

Tone lens: ${tone}
Alternative angle number: ${angle}

Inputs:
- relationship: ${inputs.relationship}
- occasion: ${inputs.occasion}
- traits: ${inputs.traits.join(", ")}
- interests: ${inputs.interests}
- expression: ${inputs.expression}
- budget: ${inputs.budget || "not specified"}
- context: ${inputs.context || "none"}

Requirements:
- direction should describe a category or direction, not a specific store item
- direction should be one strong headline-length statement
- exampleIdeas should contain exactly 2-3 concise examples
- whyThisWorks should be an array of exactly 3 short bullets
- confidencePrompt should be one short sentence that helps the user assess whether it feels right
- confidenceScore should be an integer 0-100
- reassurance should be one of: "Strong fit", "Good fit, with room to refine", "Worth adjusting before deciding"`;
}

async function generateWithOpenAI(
  inputs: GiftFormData,
  tone: TonePreference,
  angle: number
): Promise<GiftResult | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: buildPrompt(inputs, tone, angle)
    })
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const text = data.output_text as string | undefined;
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as GiftResult;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as RequestBody;
  const inputs = body.inputs;
  const tone = body.tone ?? "balanced";
  const angle = body.angle ?? 0;

  if (!inputs?.relationship || !inputs?.occasion || !inputs?.expression || !inputs?.interests) {
    return NextResponse.json({ error: "Missing required inputs." }, { status: 400 });
  }

  const liveResult = await generateWithOpenAI(inputs, tone, angle);
  const result = liveResult ?? generateMockGiftResult(inputs, tone, angle);

  return NextResponse.json(result);
}

import { NextResponse } from "next/server";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = subscribeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const endpoint = process.env.FORMSPREE_NEWSLETTER_ENDPOINT;

  if (endpoint) {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(parsed.data),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: "Sign-up failed, please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  }

  // No provider configured yet (see README "Wire up lead delivery"). The
  // address is not stored anywhere, so the client offers a mailto fallback.
  console.warn(
    "[subscribe] FORMSPREE_NEWSLETTER_ENDPOINT is not set — address not stored",
  );

  return NextResponse.json({ ok: true, delivered: false });
}

import { NextResponse } from "next/server";
import { contactSchema, rebuildSchema } from "@/lib/contact-schema";

/**
 * Handles both enquiry paths. A body carrying lead_type "rebuild" is
 * validated against the rebuild schema and forwarded with that label, so
 * rebuild leads can be triaged separately from new-project enquiries.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const isRebuild = body?.lead_type === "rebuild";
  const parsed = isRebuild
    ? rebuildSchema.safeParse(body)
    : contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const payload = {
    ...parsed.data,
    lead_type: isRebuild ? "rebuild" : "project",
  };
  const endpoint = process.env.FORMSPREE_ENDPOINT;

  if (endpoint) {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "Delivery failed, please try again or email us directly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  }

  // No email provider configured yet (see README "Wire up lead delivery").
  // The submission is accepted so the on-screen flow works end to end, but
  // it is NOT stored or emailed anywhere — the client falls back to a
  // pre-filled mailto: link so a real lead still reaches the founder.
  console.warn(
    "[contact] FORMSPREE_ENDPOINT is not set — submission was not delivered",
    { lead_type: payload.lead_type, email: parsed.data.email },
  );

  return NextResponse.json({ ok: true, delivered: false });
}

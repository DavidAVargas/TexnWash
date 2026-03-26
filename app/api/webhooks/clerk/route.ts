import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(request: NextRequest) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Missing webhook secret" }, { status: 500 });
  }

  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const body = await request.text();

  let event: { type: string; data: { id: string; email_addresses: { email_address: string }[]; first_name: string; last_name: string } };
  try {
    const wh = new Webhook(secret);
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as typeof event;
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  if (event.type !== "user.created") {
    return NextResponse.json({ received: true });
  }

  const { email_addresses, first_name, last_name } = event.data;
  const email = email_addresses?.[0]?.email_address;

  if (!email) {
    return NextResponse.json({ error: "No email found" }, { status: 400 });
  }

  const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      email,
      attributes: {
        FIRSTNAME: first_name || "",
        LASTNAME: last_name || "",
      },
      listIds: [7], // Community list
      updateEnabled: true,
    }),
  });

  if (!brevoRes.ok && brevoRes.status !== 204) {
    const err = await brevoRes.text();
    console.error("Brevo error:", err);
    return NextResponse.json({ error: "Failed to add contact to Brevo" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

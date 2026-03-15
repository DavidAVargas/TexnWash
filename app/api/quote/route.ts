import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    const body = await request.json();
    const { recaptchaToken, ...formData } = body;

    // Only require reCAPTCHA for guests (not signed-in Clerk users)
    if (!userId) {
      if (!process.env.RECAPTCHA_SECRET_KEY) {
        console.error("Missing RECAPTCHA_SECRET_KEY");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
      }
      if (!recaptchaToken) {
        return NextResponse.json({ error: "Please complete the reCAPTCHA" }, { status: 400 });
      }
      const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        }),
      });
      const recaptchaData = await recaptchaResponse.json();
      if (!recaptchaData.success) {
        return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
      }
    }

    const ordered = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      ...(formData.businessName && { businessName: formData.businessName }),
      type: formData.type,
      services: formData.services,
      addOns: formData.addOns,
      address: formData.address,
      squareFootage: formData.squareFootage,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      notes: formData.notes,
      termsAccepted: formData.termsAccepted,
      verifiedViaClerk: !!userId,
    };

    const formspreeResponse = await fetch("https://formspree.io/f/mzzgqrya", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(ordered),
    });

    if (!formspreeResponse.ok) {
      return NextResponse.json({ error: "Failed to send quote request" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

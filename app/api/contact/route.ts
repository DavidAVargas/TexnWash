import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error("Missing RECAPTCHA_SECRET_KEY");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const { fullName, email, message, recaptchaToken } = await request.json();

    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "Please complete the reCAPTCHA" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const recaptchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        }),
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // Forward to Formspree
    const formspreeResponse = await fetch(
      "https://formspree.io/f/xpwreryr",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ fullName, email, message }),
      }
    );

    if (!formspreeResponse.ok) {
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    // Add to Brevo Leads list (non-blocking)
    if (process.env.BREVO_API_KEY) {
      const [firstName, ...rest] = fullName.trim().split(" ");
      fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": process.env.BREVO_API_KEY },
        body: JSON.stringify({
          email,
          attributes: { FIRSTNAME: firstName, LASTNAME: rest.join(" ") },
          listIds: [6],
          updateEnabled: true,
        }),
      }).catch((err) => console.error("Brevo contact error:", err));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

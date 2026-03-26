import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { instagram, tiktok, facebook } = await request.json();

  const client = await clerkClient();
  await client.users.updateUser(userId, {
    unsafeMetadata: { instagram: instagram || "", tiktok: tiktok || "", facebook: facebook || "" },
  });

  return NextResponse.json({ success: true });
}

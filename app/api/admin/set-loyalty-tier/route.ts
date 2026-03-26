import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/is-admin";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await currentUser();
  if (!isAdmin(user?.emailAddresses?.[0]?.emailAddress)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { targetUserId, tier, serviceCount } = await request.json();
  if (!targetUserId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const client = await clerkClient();
  const existing = await client.users.getUser(targetUserId);
  const currentMeta = (existing.publicMetadata ?? {}) as Record<string, unknown>;

  const updates: Record<string, unknown> = { ...currentMeta };
  if (tier !== undefined && [0, 1, 2, 3].includes(tier)) updates.loyaltyTier = tier;
  if (serviceCount !== undefined && serviceCount >= 0) updates.serviceCount = serviceCount;

  await client.users.updateUser(targetUserId, { publicMetadata: updates });

  return NextResponse.json({ success: true });
}

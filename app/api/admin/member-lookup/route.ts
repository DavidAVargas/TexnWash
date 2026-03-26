import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/is-admin";

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ isMember: false });

  const user = await currentUser();
  if (!isAdmin(user?.emailAddresses?.[0]?.emailAddress)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const email = request.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ isMember: false });

  const client = await clerkClient();
  const result = await client.users.getUserList({ emailAddress: [email] });

  if (result.data.length === 0) return NextResponse.json({ isMember: false });

  const member = result.data[0];
  return NextResponse.json({
    isMember: true,
    name: `${member.firstName || ""} ${member.lastName || ""}`.trim(),
    tier: (member.publicMetadata?.loyaltyTier as number) ?? 1,
    userId: member.id,
  });
}

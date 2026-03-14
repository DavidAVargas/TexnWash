import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { PhotoSet } from "@/lib/models/PhotoSet";
import { isAdmin } from "@/lib/is-admin";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const email = user?.emailAddresses?.[0]?.emailAddress;

  if (!userId || !isAdmin(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { customerEmail, customerName, jobDate, serviceType, notes, beforePhotos, afterPhotos } =
    await req.json();

  await connectDB();
  const photoSet = await PhotoSet.create({
    customerEmail,
    customerName,
    jobDate: new Date(jobDate),
    serviceType,
    notes,
    beforePhotos,
    afterPhotos,
  });

  return NextResponse.json(photoSet, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;

  if (!userId || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userIsAdmin = isAdmin(user.emailAddresses?.[0]?.emailAddress);
  const requestedEmail = req.nextUrl.searchParams.get("email");

  if (!requestedEmail) {
    return NextResponse.json({ error: "email param required" }, { status: 400 });
  }

  const userEmail = user.emailAddresses?.[0]?.emailAddress;
  if (!userIsAdmin && userEmail !== requestedEmail) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectDB();
  const photoSets = await PhotoSet.find({ customerEmail: requestedEmail })
    .sort({ jobDate: -1 })
    .lean();

  return NextResponse.json(photoSets);
}

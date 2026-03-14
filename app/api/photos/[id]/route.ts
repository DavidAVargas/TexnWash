import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { PhotoSet } from "@/lib/models/PhotoSet";
import { isAdmin } from "@/lib/is-admin";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await connectDB();
  const job = await PhotoSet.findById(id).lean();
  return NextResponse.json(JSON.parse(JSON.stringify(job)));
}

async function requireAdmin() {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const email = user?.emailAddresses?.[0]?.emailAddress;
  if (!userId || !isAdmin(email)) return null;
  return user;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  await connectDB();

  const update: Record<string, unknown> = {};
  const push: Record<string, unknown> = {};
  const pull: Record<string, unknown> = {};

  // Add photos
  if (body.addBefore?.length) push.beforePhotos = { $each: body.addBefore };
  if (body.addAfter?.length) push.afterPhotos = { $each: body.addAfter };

  // Remove individual photo
  if (body.removeBefore) pull.beforePhotos = body.removeBefore;
  if (body.removeAfter) pull.afterPhotos = body.removeAfter;

  // Update text fields
  if (body.address !== undefined) update.address = body.address;
  if (body.notes !== undefined) update.notes = body.notes;
  if (body.serviceType !== undefined) update.serviceType = body.serviceType;
  if (body.jobDate !== undefined) update.jobDate = new Date(body.jobDate);
  if (body.customerName !== undefined) update.customerName = body.customerName;

  const mongoUpdate: Record<string, unknown> = {};
  if (Object.keys(update).length) mongoUpdate.$set = update;
  if (Object.keys(push).length) mongoUpdate.$push = push;
  if (Object.keys(pull).length) mongoUpdate.$pull = pull;

  const updated = await PhotoSet.findByIdAndUpdate(id, mongoUpdate, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  await PhotoSet.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

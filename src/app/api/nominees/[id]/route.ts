import { NextRequest, NextResponse } from "next/server";
import { ReviewStatus } from "@prisma/client";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Context = { params: Promise<{ id: string }> };

function parseStatus(value: unknown) {
  return Object.values(ReviewStatus).includes(value as ReviewStatus) ? (value as ReviewStatus) : ReviewStatus.PENDING;
}

export async function GET(_request: NextRequest, context: Context) {
  try {
    const { id } = await context.params;
    const nominee = await prisma.nominee.findUnique({ where: { id }, include: { category: true, _count: { select: { votes: true } } } });
    if (!nominee) return NextResponse.json({ message: "Nominee not found" }, { status: 404 });
    return NextResponse.json(nominee);
  } catch (error) {
    return apiError(error);
  }
}

export async function PUT(request: NextRequest, context: Context) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const { id } = await context.params;
    const body = await request.json();
    const nominee = await prisma.nominee.update({
      where: { id },
      data: {
        fullName: String(body.fullName ?? "").trim(),
        photo: String(body.photo ?? "").trim() || null,
        biography: String(body.biography ?? "").trim(),
        categoryId: String(body.categoryId ?? "").trim(),
        organization: String(body.organization ?? "").trim() || null,
        state: String(body.state ?? "").trim(),
        status: parseStatus(body.status)
      }
    });
    return NextResponse.json(nominee);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const { id } = await context.params;
    await prisma.nominee.delete({ where: { id } });
    return NextResponse.json({ message: "Nominee deleted" });
  } catch (error) {
    return apiError(error);
  }
}

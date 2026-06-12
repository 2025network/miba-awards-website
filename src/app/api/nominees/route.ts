import { NextRequest, NextResponse } from "next/server";
import { ReviewStatus } from "@prisma/client";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function parseStatus(value: unknown) {
  return Object.values(ReviewStatus).includes(value as ReviewStatus) ? (value as ReviewStatus) : ReviewStatus.PENDING;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const categoryId = searchParams.get("categoryId");
    const nominees = await prisma.nominee.findMany({
      where: {
        ...(status ? { status: parseStatus(status) } : {}),
        ...(categoryId ? { categoryId } : {})
      },
      include: { category: true, _count: { select: { votes: true } } },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(nominees);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const body = await request.json();
    const nominee = await prisma.nominee.create({
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
    return NextResponse.json(nominee, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({ orderBy: { createdAt: "desc" }, include: { _count: { select: { nominees: true, nominations: true } } } });
    return NextResponse.json(categories);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const body = await request.json();
    const category = await prisma.category.create({
      data: {
        name: String(body.name ?? "").trim(),
        description: String(body.description ?? "").trim()
      }
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}

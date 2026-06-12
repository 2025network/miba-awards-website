import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const isAdmin = isAdminRequest(request);
    const announcements = await prisma.announcement.findMany({
      where: isAdmin ? {} : { published: true },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(announcements);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const body = await request.json();
    const announcement = await prisma.announcement.create({
      data: {
        title: String(body.title ?? "").trim(),
        content: String(body.content ?? "").trim(),
        published: Boolean(body.published)
      }
    });
    return NextResponse.json(announcement, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}

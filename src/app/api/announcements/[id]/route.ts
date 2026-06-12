import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: Context) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const { id } = await context.params;
    const body = await request.json();
    const announcement = await prisma.announcement.update({
      where: { id },
      data: {
        title: String(body.title ?? "").trim(),
        content: String(body.content ?? "").trim(),
        published: Boolean(body.published)
      }
    });
    return NextResponse.json(announcement);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const { id } = await context.params;
    await prisma.announcement.delete({ where: { id } });
    return NextResponse.json({ message: "Announcement deleted" });
  } catch (error) {
    return apiError(error);
  }
}

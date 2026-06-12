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
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: String(body.name ?? "").trim(),
        description: String(body.description ?? "").trim()
      }
    });
    return NextResponse.json(category);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const { id } = await context.params;
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    return apiError(error);
  }
}

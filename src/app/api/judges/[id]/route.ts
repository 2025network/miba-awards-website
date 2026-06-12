import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: Context) {
  try {
    const { id } = await context.params;
    const judge = await prisma.judge.findUnique({ where: { id }, include: { assignments: { include: { category: true } }, _count: { select: { scores: true } } } });
    if (!judge) return NextResponse.json({ message: "Judge not found" }, { status: 404 });
    const { password, ...safeJudge } = judge;
    void password;
    return NextResponse.json(safeJudge);
  } catch (error) {
    return apiError(error);
  }
}

export async function PUT(request: NextRequest, context: Context) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const { id } = await context.params;
    const body = await request.json();
    const judge = await prisma.judge.update({
      where: { id },
      data: {
        fullName: String(body.fullName ?? "").trim(),
        email: String(body.email ?? "").trim().toLowerCase(),
        photo: String(body.photo ?? "").trim() || null,
        title: String(body.title ?? "").trim(),
        organization: String(body.organization ?? "").trim(),
        biography: String(body.biography ?? "").trim(),
        ...(String(body.password ?? "").trim() ? { password: String(body.password).trim() } : {})
      }
    });
    return NextResponse.json(judge);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const { id } = await context.params;
    await prisma.judge.delete({ where: { id } });
    return NextResponse.json({ message: "Judge deleted" });
  } catch (error) {
    return apiError(error);
  }
}


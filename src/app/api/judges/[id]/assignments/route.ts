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
    const categoryIds: string[] = Array.isArray(body.categoryIds) ? body.categoryIds.map(String) : [];
    await prisma.judgeCategory.deleteMany({ where: { judgeId: id } });
    if (categoryIds.length) {
      await prisma.judgeCategory.createMany({
        data: categoryIds.map((categoryId) => ({ judgeId: id, categoryId })),
        skipDuplicates: true
      });
    }
    const assignments = await prisma.judgeCategory.findMany({ where: { judgeId: id }, include: { category: true } });
    return NextResponse.json(assignments);
  } catch (error) {
    return apiError(error);
  }
}


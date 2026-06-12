import { NextRequest, NextResponse } from "next/server";
import { getJudgeId, unauthorized } from "@/lib/auth";
import { apiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const judgeId = getJudgeId(request);
  if (!judgeId) return unauthorized();

  try {
    const judge = await prisma.judge.findUnique({
      where: { id: judgeId },
      include: { assignments: { include: { category: true } }, scores: { include: { nominee: true, category: true } } }
    });
    if (!judge) return NextResponse.json({ message: "Judge not found" }, { status: 404 });
    const { password, ...safeJudge } = judge;
    void password;
    return NextResponse.json(safeJudge);
  } catch (error) {
    return apiError(error);
  }
}


import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { getJudgeId, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const judgeId = getJudgeId(request);
  if (!judgeId) return unauthorized();

  try {
    const scores = await prisma.judgeScore.findMany({ where: { judgeId }, include: { nominee: true, category: true }, orderBy: { createdAt: "desc" } });
    const ranked = scores
      .map((item) => ({
        id: item.id,
        nomineeName: item.nominee.fullName,
        categoryName: item.category.name,
        totalScore: item.scoreLeadership + item.scoreInnovation + item.scoreImpact + item.scoreInfluence + item.scoreOverall,
        comments: item.comments,
        createdAt: item.createdAt
      }))
      .sort((a, b) => b.totalScore - a.totalScore);
    return NextResponse.json(ranked);
  } catch (error) {
    return apiError(error);
  }
}

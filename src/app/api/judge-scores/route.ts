import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const scores = await prisma.judgeScore.findMany({
      include: { judge: true, nominee: true, category: true },
      orderBy: { createdAt: "desc" }
    });
    const rows = scores.map((score) => ({
      id: score.id,
      judgeName: score.judge.fullName,
      nomineeName: score.nominee.fullName,
      categoryName: score.category.name,
      scoreLeadership: score.scoreLeadership,
      scoreInnovation: score.scoreInnovation,
      scoreImpact: score.scoreImpact,
      scoreInfluence: score.scoreInfluence,
      scoreOverall: score.scoreOverall,
      totalScore: score.scoreLeadership + score.scoreInnovation + score.scoreImpact + score.scoreInfluence + score.scoreOverall,
      comments: score.comments,
      createdAt: score.createdAt
    }));
    return NextResponse.json(rows);
  } catch (error) {
    return apiError(error);
  }
}

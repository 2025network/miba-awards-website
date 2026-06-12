import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { getJudgeId, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getWorkflowStatus } from "@/lib/workflow";

function score(value: unknown) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.min(20, Math.max(0, Math.round(parsed)));
}

export async function GET(request: NextRequest) {
  const judgeId = getJudgeId(request);
  if (!judgeId) return unauthorized();

  try {
    const assignments = await prisma.judgeCategory.findMany({ where: { judgeId }, select: { categoryId: true } });
    const categoryIds = assignments.map((assignment) => assignment.categoryId);
    const nominees = await prisma.nominee.findMany({
      where: { status: "APPROVED", categoryId: { in: categoryIds } },
      include: { category: true, judgeScores: { where: { judgeId } } },
      orderBy: { fullName: "asc" }
    });
    return NextResponse.json(nominees);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  const judgeId = getJudgeId(request);
  if (!judgeId) return unauthorized();

  try {
    const event = await prisma.awardEvent.findFirst({ orderBy: { eventDate: "desc" } });
    if (!getWorkflowStatus(event).judgeScoringOpen) return NextResponse.json({ message: "Judge scoring is closed" }, { status: 403 });
    const body = await request.json();
    const nomineeId = String(body.nomineeId ?? "");
    const nominee = await prisma.nominee.findUnique({ where: { id: nomineeId } });
    if (!nominee) return NextResponse.json({ message: "Nominee not found" }, { status: 404 });

    const assigned = await prisma.judgeCategory.findUnique({ where: { judgeId_categoryId: { judgeId, categoryId: nominee.categoryId } } });
    if (!assigned) return NextResponse.json({ message: "This nominee is outside assigned categories" }, { status: 403 });

    const data = {
      judgeId,
      nomineeId,
      categoryId: nominee.categoryId,
      scoreLeadership: score(body.scoreLeadership),
      scoreInnovation: score(body.scoreInnovation),
      scoreImpact: score(body.scoreImpact),
      scoreInfluence: score(body.scoreInfluence),
      scoreOverall: score(body.scoreOverall),
      comments: String(body.comments ?? "").trim() || null
    };

    const judgeScore = await prisma.judgeScore.upsert({
      where: { judgeId_nomineeId: { judgeId, nomineeId } },
      update: data,
      create: data
    });
    return NextResponse.json({ ...judgeScore, totalScore: data.scoreLeadership + data.scoreInnovation + data.scoreImpact + data.scoreInfluence + data.scoreOverall });
  } catch (error) {
    return apiError(error);
  }
}


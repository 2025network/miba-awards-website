import { NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { getWorkflowStatus, totalJudgeScore } from "@/lib/workflow";

export async function GET() {
  try {
    const event = await prisma.awardEvent.findFirst({ orderBy: { eventDate: "desc" } });
    const status = getWorkflowStatus(event);
    const scores = await prisma.judgeScore.findMany({ include: { nominee: true, category: true, judge: true } });
    const grouped = new Map<string, { nomineeId: string; nomineeName: string; categoryName: string; total: number; judges: number }>();

    for (const score of scores) {
      const current = grouped.get(score.nomineeId) ?? {
        nomineeId: score.nomineeId,
        nomineeName: score.nominee.fullName,
        categoryName: score.category.name,
        total: 0,
        judges: 0
      };
      current.total += totalJudgeScore(score);
      current.judges += 1;
      grouped.set(score.nomineeId, current);
    }

    const rankings = [...grouped.values()]
      .map((item) => ({ ...item, averageScore: item.judges ? Math.round(item.total / item.judges) : 0 }))
      .sort((a, b) => b.averageScore - a.averageScore);

    return NextResponse.json({ event, published: status.winnerAnnouncementReady, rankings });
  } catch (error) {
    return apiError(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { apiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { formatStatus, getWorkflowStatus } from "@/lib/workflow";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const [totalNominations, approvedNominees, pendingReviews, votesReceived, sponsors, categories, judges, judgeScores, emailLogs, announcements, activeEvent] = await Promise.all([
      prisma.nomination.count(),
      prisma.nominee.count({ where: { status: "APPROVED" } }),
      prisma.nomination.count({ where: { status: "PENDING" } }),
      prisma.vote.count(),
      prisma.sponsor.count(),
      prisma.category.count(),
      prisma.judge.count(),
      prisma.judgeScore.count(),
      prisma.emailLog.count(),
      prisma.announcement.count({ where: { published: true } }),
      prisma.awardEvent.findFirst({ orderBy: { eventDate: "desc" } })
    ]);
    const workflow = getWorkflowStatus(activeEvent);

    return NextResponse.json({
      activeEvent: activeEvent?.title ?? "No active event",
      totalNominations,
      approvedNominees,
      pendingReviews,
      votesReceived,
      sponsors,
      categories,
      judges,
      judgeScores,
      emailLogs,
      announcements,
      votingStatus: formatStatus(workflow.votingOpen),
      nominationStatus: formatStatus(workflow.nominationsOpen),
      judgeScoringStatus: formatStatus(workflow.judgeScoringOpen)
    });
  } catch (error) {
    return apiError(error);
  }
}

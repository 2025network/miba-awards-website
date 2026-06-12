import { NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { formatStatus, getWorkflowStatus } from "@/lib/workflow";

export async function GET() {
  try {
    const event = await prisma.awardEvent.findFirst({ orderBy: { eventDate: "desc" } });
    const status = getWorkflowStatus(event);
    return NextResponse.json({
      event,
      ...status,
      votingStatus: formatStatus(status.votingOpen),
      nominationStatus: formatStatus(status.nominationsOpen),
      judgeScoringStatus: formatStatus(status.judgeScoringOpen)
    });
  } catch (error) {
    return apiError(error);
  }
}

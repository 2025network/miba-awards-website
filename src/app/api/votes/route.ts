import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getWorkflowStatus } from "@/lib/workflow";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const votes = await prisma.vote.findMany({ include: { nominee: { include: { category: true } } }, orderBy: { createdAt: "desc" } });
    return NextResponse.json(votes);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const event = await prisma.awardEvent.findFirst({ orderBy: { eventDate: "desc" } });
    if (!getWorkflowStatus(event).votingOpen) return NextResponse.json({ message: "Voting is closed" }, { status: 403 });
    const body = await request.json();
    const vote = await prisma.vote.create({
      data: {
        nomineeId: String(body.nomineeId ?? "").trim(),
        voterEmail: String(body.voterEmail ?? "").trim()
      }
    });
    return NextResponse.json(vote, { status: 201 });
  } catch (error) {
    return apiError(error, "Vote could not be recorded");
  }
}


import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { assertSameOrigin, getClientIp, rateLimit } from "@/lib/security";
import { validateVotePayload } from "@/lib/validation";
import { getWorkflowStatus } from "@/lib/workflow";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const votes = await prisma.vote.findMany({ include: { nominee: { include: { category: true } } }, orderBy: { createdAt: "desc" } });
    return NextResponse.json(votes);
  } catch (error) {
    return apiError(error, "Could not load votes");
  }
}

export async function POST(request: NextRequest) {
  const csrfError = assertSameOrigin(request);
  if (csrfError) return csrfError;

  const limitError = rateLimit({ key: `vote:${getClientIp(request)}`, limit: 20, windowMs: 60 * 60 * 1000 });
  if (limitError) return limitError;

  try {
    const event = await prisma.awardEvent.findFirst({ orderBy: { eventDate: "desc" } });
    if (!getWorkflowStatus(event).votingOpen) return NextResponse.json({ message: "Voting is closed" }, { status: 403 });

    const body = await request.json() as Record<string, unknown>;
    const validated = validateVotePayload(body);
    if (!validated.ok) return NextResponse.json({ message: validated.message }, { status: 400 });

    const nominee = await prisma.nominee.findUnique({ where: { id: validated.data.nomineeId } });
    if (!nominee || nominee.status !== "APPROVED") return NextResponse.json({ message: "Nominee is not available for voting." }, { status: 400 });

    const vote = await prisma.vote.create({ data: validated.data });
    return NextResponse.json(vote, { status: 201 });
  } catch (error) {
    return apiError(error, "Vote could not be recorded");
  }
}

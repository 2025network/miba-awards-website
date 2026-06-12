import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function dateValue(value: unknown) {
  return new Date(String(value));
}

export async function GET() {
  try {
    const event = await prisma.awardEvent.findFirst({ orderBy: { eventDate: "desc" } });
    return NextResponse.json(event);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const body = await request.json();
    const data = {
      title: String(body.title ?? "").trim(),
      venue: String(body.venue ?? "").trim(),
      eventDate: dateValue(body.eventDate),
      registrationOpen: dateValue(body.registrationOpen),
      registrationClose: dateValue(body.registrationClose),
      votingOpen: dateValue(body.votingOpen),
      votingClose: dateValue(body.votingClose),
      judgeScoringOpen: dateValue(body.judgeScoringOpen),
      judgeScoringClose: dateValue(body.judgeScoringClose),
      winnerAnnouncementAt: body.winnerAnnouncementAt ? dateValue(body.winnerAnnouncementAt) : null
    };
    const existing = await prisma.awardEvent.findFirst({ orderBy: { eventDate: "desc" } });
    const event = existing ? await prisma.awardEvent.update({ where: { id: existing.id }, data }) : await prisma.awardEvent.create({ data });
    return NextResponse.json(event);
  } catch (error) {
    return apiError(error);
  }
}

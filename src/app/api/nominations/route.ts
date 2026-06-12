import { NextRequest, NextResponse } from "next/server";
import { ReviewStatus } from "@prisma/client";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendMibaEmail } from "@/lib/mailer";
import { getWorkflowStatus } from "@/lib/workflow";

function parseStatus(value: unknown) {
  return Object.values(ReviewStatus).includes(value as ReviewStatus) ? (value as ReviewStatus) : ReviewStatus.PENDING;
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const nominations = await prisma.nomination.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } });
    return NextResponse.json(nominations);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const event = await prisma.awardEvent.findFirst({ orderBy: { eventDate: "desc" } });
    if (!getWorkflowStatus(event).nominationsOpen) return NextResponse.json({ message: "Nominations are closed" }, { status: 403 });
    const body = await request.json();
    const nomination = await prisma.nomination.create({
      data: {
        nomineeName: String(body.nomineeName ?? "").trim(),
        nomineeEmail: String(body.nomineeEmail ?? "").trim(),
        nomineePhone: String(body.nomineePhone ?? "").trim(),
        categoryId: String(body.categoryId ?? "").trim(),
        reason: String(body.reason ?? "").trim(),
        submittedBy: String(body.submittedBy ?? "").trim(),
        submitterEmail: String(body.submitterEmail ?? "").trim(),
        status: parseStatus(body.status)
      }
    });
    await sendMibaEmail({ recipient: nomination.submitterEmail, template: "nominationSubmitted", data: { nomineeName: nomination.nomineeName } });
    return NextResponse.json(nomination, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}



import { NextRequest, NextResponse } from "next/server";
import { ReviewStatus } from "@prisma/client";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { sendMibaEmail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import { assertSameOrigin, getClientIp, rateLimit } from "@/lib/security";
import { validateNominationPayload } from "@/lib/validation";
import { getWorkflowStatus } from "@/lib/workflow";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const nominations = await prisma.nomination.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } });
    return NextResponse.json(nominations);
  } catch (error) {
    return apiError(error, "Could not load nominations");
  }
}

export async function POST(request: NextRequest) {
  const csrfError = assertSameOrigin(request);
  if (csrfError) return csrfError;

  const limitError = rateLimit({ key: `nomination:${getClientIp(request)}`, limit: 5, windowMs: 60 * 60 * 1000 });
  if (limitError) return limitError;

  try {
    const event = await prisma.awardEvent.findFirst({ orderBy: { eventDate: "desc" } });
    if (!getWorkflowStatus(event).nominationsOpen) return NextResponse.json({ message: "Nominations are closed" }, { status: 403 });

    const body = await request.json() as Record<string, unknown>;
    const validated = validateNominationPayload(body);
    if (!validated.ok) return NextResponse.json({ message: validated.message }, { status: 400 });

    const categoryExists = await prisma.category.findUnique({ where: { id: validated.data.categoryId } });
    if (!categoryExists) return NextResponse.json({ message: "Selected category does not exist." }, { status: 400 });

    const nomination = await prisma.nomination.create({
      data: {
        ...validated.data,
        status: ReviewStatus.PENDING
      }
    });
    await sendMibaEmail({ recipient: nomination.submitterEmail, template: "nominationSubmitted", data: { nomineeName: nomination.nomineeName } });
    return NextResponse.json(nomination, { status: 201 });
  } catch (error) {
    return apiError(error, "Nomination could not be submitted");
  }
}

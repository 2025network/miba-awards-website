import { NextRequest, NextResponse } from "next/server";
import { ReviewStatus } from "@prisma/client";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendMibaEmail } from "@/lib/mailer";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: Context) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const { id } = await context.params;
    const body = await request.json();
    const status = body.status === ReviewStatus.APPROVED ? ReviewStatus.APPROVED : body.status === ReviewStatus.REJECTED ? ReviewStatus.REJECTED : ReviewStatus.PENDING;
    const nomination = await prisma.nomination.update({ where: { id }, data: { status }, include: { category: true } });

    if (status === ReviewStatus.APPROVED) {
      await prisma.nominee.create({
        data: {
          fullName: nomination.nomineeName,
          biography: nomination.reason,
          categoryId: nomination.categoryId,
          organization: "Pending profile update",
          state: "Middle Belt",
          status: ReviewStatus.APPROVED
        }
      });
    }

    await sendMibaEmail({
      recipient: nomination.submitterEmail,
      template: status === ReviewStatus.APPROVED ? "nominationApproved" : status === ReviewStatus.REJECTED ? "nominationRejected" : "nominationSubmitted",
      data: { nomineeName: nomination.nomineeName }
    });
    return NextResponse.json(nomination);
  } catch (error) {
    return apiError(error);
  }
}


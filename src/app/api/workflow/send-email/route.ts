import { NextRequest, NextResponse } from "next/server";
import { type EmailTemplateKey } from "@/lib/email-templates";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { sendMibaEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const body = await request.json();
    const log = await sendMibaEmail({
      recipient: String(body.recipient ?? ""),
      template: String(body.template ?? "contactFormReceived") as EmailTemplateKey,
      data: body.data ?? {}
    });
    return NextResponse.json(log);
  } catch (error) {
    return apiError(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { sendMibaEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const recipient = String(body.email ?? body.recipient ?? "");
    const log = await sendMibaEmail({ recipient, template: "contactFormReceived", data: { name: body.name } });
    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}

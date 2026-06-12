import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { sendMibaEmail } from "@/lib/mailer";
import { assertSameOrigin, getClientIp, rateLimit } from "@/lib/security";
import { validateSponsorInquiryPayload } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const csrfError = assertSameOrigin(request);
  if (csrfError) return csrfError;

  const limitError = rateLimit({ key: `sponsor:${getClientIp(request)}`, limit: 8, windowMs: 60 * 60 * 1000 });
  if (limitError) return limitError;

  try {
    const body = await request.json() as Record<string, unknown>;
    const validated = validateSponsorInquiryPayload(body);
    if (!validated.ok) return NextResponse.json({ message: validated.message }, { status: 400 });

    const log = await sendMibaEmail({ recipient: validated.data.recipient, template: "sponsorInquiryReceived", data: { name: validated.data.companyName } });
    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    return apiError(error, "Sponsor inquiry could not be received");
  }
}

import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendMibaEmail } from "@/lib/mailer";

export async function GET() {
  try {
    const judges = await prisma.judge.findMany({
      include: { assignments: { include: { category: true } }, _count: { select: { scores: true } } },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(judges.map((judge) => {
      const { password, ...safeJudge } = judge;
      void password;
      return safeJudge;
    }));
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const body = await request.json();
    const judge = await prisma.judge.create({
      data: {
        fullName: String(body.fullName ?? "").trim(),
        email: String(body.email ?? "").trim().toLowerCase(),
        photo: String(body.photo ?? "").trim() || null,
        title: String(body.title ?? "").trim(),
        organization: String(body.organization ?? "").trim(),
        biography: String(body.biography ?? "").trim(),
        password: String(body.password ?? "").trim()
      }
    });
    await sendMibaEmail({ recipient: judge.email, template: "judgeAccountCreated", data: { name: judge.fullName } });
    return NextResponse.json(judge, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}



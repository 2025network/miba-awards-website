import { NextRequest, NextResponse } from "next/server";
import { judgeCookieResponse } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "").trim();
  const judge = await prisma.judge.findUnique({ where: { email } });

  if (judge && judge.password === password) {
    return judgeCookieResponse({ message: "Logged in", judge: { id: judge.id, fullName: judge.fullName } }, judge.id);
  }

  return NextResponse.json({ message: "Invalid judge credentials" }, { status: 401 });
}

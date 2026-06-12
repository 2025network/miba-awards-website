import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const logs = await prisma.emailLog.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
    return NextResponse.json(logs);
  } catch (error) {
    return apiError(error);
  }
}

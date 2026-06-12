import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sponsors = await prisma.sponsor.findMany({ orderBy: [{ tier: "asc" }, { createdAt: "desc" }] });
    return NextResponse.json(sponsors);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const body = await request.json();
    const sponsor = await prisma.sponsor.create({
      data: {
        companyName: String(body.companyName ?? "").trim(),
        logo: String(body.logo ?? "").trim() || null,
        website: String(body.website ?? "").trim() || null,
        tier: String(body.tier ?? "").trim()
      }
    });
    return NextResponse.json(sponsor, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}

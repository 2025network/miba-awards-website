import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: Context) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const { id } = await context.params;
    const body = await request.json();
    const sponsor = await prisma.sponsor.update({
      where: { id },
      data: {
        companyName: String(body.companyName ?? "").trim(),
        logo: String(body.logo ?? "").trim() || null,
        website: String(body.website ?? "").trim() || null,
        tier: String(body.tier ?? "").trim()
      }
    });
    return NextResponse.json(sponsor);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const { id } = await context.params;
    await prisma.sponsor.delete({ where: { id } });
    return NextResponse.json({ message: "Sponsor deleted" });
  } catch (error) {
    return apiError(error);
  }
}

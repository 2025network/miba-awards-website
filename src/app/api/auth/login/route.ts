import { NextRequest, NextResponse } from "next/server";
import { adminCookieResponse } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = String(body.email ?? "").trim();
  const password = String(body.password ?? "").trim();
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@mibaawards.africa";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "miba-admin-2026";

  if (email === adminEmail && password === adminPassword) {
    return adminCookieResponse({ message: "Logged in" });
  }

  return NextResponse.json({ message: "Invalid admin credentials" }, { status: 401 });
}

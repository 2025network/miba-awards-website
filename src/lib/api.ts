import { NextResponse } from "next/server";
import { logError } from "@/lib/logger";

export function apiError(error: unknown, fallback = "Request failed") {
  logError(error, fallback);
  const isProduction = process.env.NODE_ENV === "production";
  const message = isProduction ? fallback : error instanceof Error ? error.message : fallback;
  return NextResponse.json({ message }, { status: 500 });
}

export function readString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

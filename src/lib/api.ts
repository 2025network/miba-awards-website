import { NextResponse } from "next/server";

export function apiError(error: unknown, fallback = "Request failed") {
  const message = error instanceof Error ? error.message : fallback;
  return NextResponse.json({ message }, { status: 500 });
}

export function readString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

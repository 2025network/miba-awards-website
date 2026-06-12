import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "miba_admin";
const JUDGE_COOKIE = "miba_judge";
const ADMIN_COOKIE_VALUE = "authenticated";

export function isAdminRequest(request: NextRequest) {
  return request.cookies.get(ADMIN_COOKIE)?.value === ADMIN_COOKIE_VALUE;
}

export function getJudgeId(request: NextRequest) {
  return request.cookies.get(JUDGE_COOKIE)?.value ?? null;
}

export function unauthorized() {
  return NextResponse.json({ message: "Authentication required" }, { status: 401 });
}

export function adminCookieResponse(payload: unknown) {
  const response = NextResponse.json(payload);
  response.cookies.set(ADMIN_COOKIE, ADMIN_COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/"
  });
  return response;
}

export function judgeCookieResponse(payload: unknown, judgeId: string) {
  const response = NextResponse.json(payload);
  response.cookies.set(JUDGE_COOKIE, judgeId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/"
  });
  return response;
}

export function clearAdminCookieResponse(payload: unknown) {
  const response = NextResponse.json(payload);
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/"
  });
  return response;
}

export function clearJudgeCookieResponse(payload: unknown) {
  const response = NextResponse.json(payload);
  response.cookies.set(JUDGE_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/"
  });
  return response;
}

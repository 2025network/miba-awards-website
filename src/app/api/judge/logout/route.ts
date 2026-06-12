import { clearJudgeCookieResponse } from "@/lib/auth";

export async function POST() {
  return clearJudgeCookieResponse({ message: "Logged out" });
}

import { clearAdminCookieResponse } from "@/lib/auth";

export async function POST() {
  return clearAdminCookieResponse({ message: "Logged out" });
}

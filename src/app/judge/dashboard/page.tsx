import { JudgeDashboardClient } from "@/components/judge/JudgeDashboardClient";
import { JudgeShell } from "@/components/judge/JudgeShell";

export default function JudgeDashboardPage() {
  return <JudgeShell><JudgeDashboardClient /></JudgeShell>;
}

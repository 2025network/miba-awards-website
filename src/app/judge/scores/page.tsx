import { JudgeScoreSummaryClient } from "@/components/judge/JudgeScoreSummaryClient";
import { JudgeShell } from "@/components/judge/JudgeShell";

export default function JudgeScoresPage() {
  return <JudgeShell><JudgeScoreSummaryClient /></JudgeShell>;
}

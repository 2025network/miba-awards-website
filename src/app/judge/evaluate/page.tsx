import { JudgeEvaluationClient } from "@/components/judge/JudgeEvaluationClient";
import { JudgeShell } from "@/components/judge/JudgeShell";

export default function JudgeEvaluatePage() {
  return <JudgeShell><JudgeEvaluationClient /></JudgeShell>;
}

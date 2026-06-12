import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function csvCell(value: unknown) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  const scores = await prisma.judgeScore.findMany({ include: { judge: true, nominee: true, category: true }, orderBy: { createdAt: "desc" } });
  const header = ["Judge", "Nominee", "Category", "Leadership", "Innovation", "Impact", "Influence", "Overall", "Total", "Comments", "Created"];
  const lines = scores.map((score) => [
    score.judge.fullName,
    score.nominee.fullName,
    score.category.name,
    score.scoreLeadership,
    score.scoreInnovation,
    score.scoreImpact,
    score.scoreInfluence,
    score.scoreOverall,
    score.scoreLeadership + score.scoreInnovation + score.scoreImpact + score.scoreInfluence + score.scoreOverall,
    score.comments ?? "",
    score.createdAt.toISOString()
  ].map(csvCell).join(","));

  return new NextResponse([header.map(csvCell).join(","), ...lines].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=\"miba-judge-scores.csv\""
    }
  });
}

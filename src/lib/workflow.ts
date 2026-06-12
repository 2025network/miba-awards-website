import type { AwardEvent } from "@prisma/client";

export type WorkflowStatus = {
  nominationsOpen: boolean;
  votingOpen: boolean;
  judgeScoringOpen: boolean;
  winnerAnnouncementReady: boolean;
};

export function getWorkflowStatus(event: AwardEvent | null, now = new Date()): WorkflowStatus {
  if (!event) {
    return { nominationsOpen: false, votingOpen: false, judgeScoringOpen: false, winnerAnnouncementReady: false };
  }

  return {
    nominationsOpen: now >= event.registrationOpen && now <= event.registrationClose,
    votingOpen: now >= event.votingOpen && now <= event.votingClose,
    judgeScoringOpen: now >= event.judgeScoringOpen && now <= event.judgeScoringClose,
    winnerAnnouncementReady: Boolean(event.winnerAnnouncementAt && now >= event.winnerAnnouncementAt)
  };
}

export function formatStatus(value: boolean) {
  return value ? "OPEN" : "CLOSED";
}

export function totalJudgeScore(score: {
  scoreLeadership: number;
  scoreInnovation: number;
  scoreImpact: number;
  scoreInfluence: number;
  scoreOverall: number;
}) {
  return score.scoreLeadership + score.scoreInnovation + score.scoreImpact + score.scoreInfluence + score.scoreOverall;
}

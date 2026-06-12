CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE "EmailStatus" AS ENUM ('QUEUED', 'SENT', 'FAILED');

CREATE TABLE "Category" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Nominee" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "photo" TEXT,
  "biography" TEXT NOT NULL,
  "categoryId" TEXT NOT NULL,
  "organization" TEXT,
  "state" TEXT NOT NULL,
  "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Nominee_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Nomination" (
  "id" TEXT NOT NULL,
  "nomineeName" TEXT NOT NULL,
  "nomineeEmail" TEXT NOT NULL,
  "nomineePhone" TEXT NOT NULL,
  "categoryId" TEXT NOT NULL,
  "reason" TEXT NOT NULL,
  "submittedBy" TEXT NOT NULL,
  "submitterEmail" TEXT NOT NULL,
  "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Nomination_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Vote" (
  "id" TEXT NOT NULL,
  "nomineeId" TEXT NOT NULL,
  "voterEmail" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Sponsor" (
  "id" TEXT NOT NULL,
  "companyName" TEXT NOT NULL,
  "logo" TEXT,
  "website" TEXT,
  "tier" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Judge" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "photo" TEXT,
  "title" TEXT NOT NULL,
  "organization" TEXT NOT NULL,
  "biography" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Judge_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "JudgeCategory" (
  "id" TEXT NOT NULL,
  "judgeId" TEXT NOT NULL,
  "categoryId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "JudgeCategory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "JudgeScore" (
  "id" TEXT NOT NULL,
  "judgeId" TEXT NOT NULL,
  "nomineeId" TEXT NOT NULL,
  "categoryId" TEXT NOT NULL,
  "scoreLeadership" INTEGER NOT NULL,
  "scoreInnovation" INTEGER NOT NULL,
  "scoreImpact" INTEGER NOT NULL,
  "scoreInfluence" INTEGER NOT NULL,
  "scoreOverall" INTEGER NOT NULL,
  "comments" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "JudgeScore_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "EmailLog" (
  "id" TEXT NOT NULL,
  "recipient" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "status" "EmailStatus" NOT NULL DEFAULT 'QUEUED',
  "sentAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "EmailLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Announcement" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AwardEvent" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "venue" TEXT NOT NULL,
  "eventDate" TIMESTAMP(3) NOT NULL,
  "registrationOpen" TIMESTAMP(3) NOT NULL,
  "registrationClose" TIMESTAMP(3) NOT NULL,
  "votingOpen" TIMESTAMP(3) NOT NULL,
  "votingClose" TIMESTAMP(3) NOT NULL,
  "judgeScoringOpen" TIMESTAMP(3) NOT NULL,
  "judgeScoringClose" TIMESTAMP(3) NOT NULL,
  "winnerAnnouncementAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AwardEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
CREATE UNIQUE INDEX "Vote_nomineeId_voterEmail_key" ON "Vote"("nomineeId", "voterEmail");
CREATE UNIQUE INDEX "Judge_email_key" ON "Judge"("email");
CREATE UNIQUE INDEX "JudgeCategory_judgeId_categoryId_key" ON "JudgeCategory"("judgeId", "categoryId");
CREATE UNIQUE INDEX "JudgeScore_judgeId_nomineeId_key" ON "JudgeScore"("judgeId", "nomineeId");

ALTER TABLE "Nominee" ADD CONSTRAINT "Nominee_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Nomination" ADD CONSTRAINT "Nomination_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_nomineeId_fkey" FOREIGN KEY ("nomineeId") REFERENCES "Nominee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "JudgeCategory" ADD CONSTRAINT "JudgeCategory_judgeId_fkey" FOREIGN KEY ("judgeId") REFERENCES "Judge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "JudgeCategory" ADD CONSTRAINT "JudgeCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "JudgeScore" ADD CONSTRAINT "JudgeScore_judgeId_fkey" FOREIGN KEY ("judgeId") REFERENCES "Judge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "JudgeScore" ADD CONSTRAINT "JudgeScore_nomineeId_fkey" FOREIGN KEY ("nomineeId") REFERENCES "Nominee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "JudgeScore" ADD CONSTRAINT "JudgeScore_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

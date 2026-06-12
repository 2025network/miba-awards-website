import { PrismaClient, ReviewStatus } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  ["Leadership Excellence Award", "Honoring visionary leaders, public servants, civic voices, and institutional builders driving measurable progress."],
  ["Entrepreneur of the Year", "Celebrating founders and business leaders creating jobs, value chains, and sustainable economic growth."],
  ["Technology Innovator of the Year", "Recognizing digital builders, engineers, product creators, and technology leaders solving real problems."],
  ["Agricultural Excellence Award", "Honoring farmers, agribusiness leaders, food-system innovators, and rural enterprise champions."],
  ["Education Excellence Award", "Celebrating educators, institutions, mentors, and advocates improving learning access and outcomes."],
  ["Youth Impact Award", "Recognizing young achievers demonstrating leadership, service, creativity, and continental ambition."],
  ["Woman of Impact Award", "Honoring women whose leadership, enterprise, advocacy, or service creates lasting social value."],
  ["Creative Excellence Award", "Celebrating artists, performers, filmmakers, designers, writers, and creators advancing culture and imagination."],
  ["Community Development Award", "Recognizing changemakers improving local communities through service, inclusion, infrastructure, and empowerment."],
  ["Healthcare Excellence Award", "Honoring healthcare professionals, advocates, innovators, and organizations improving wellbeing and access to care."],
  ["Media Excellence Award", "Celebrating journalists, broadcasters, publishers, and media creators shaping informed public conversation."],
  ["Lifetime Achievement Award", "A signature honor for sustained excellence, legacy, mentorship, service, and generational contribution."]
];

async function main() {
  const savedCategories = await Promise.all(
    categories.map(([name, description]) =>
      prisma.category.upsert({ where: { name }, update: { description }, create: { name, description } })
    )
  );

  const technology = savedCategories.find((category) => category.name === "Technology Innovator of the Year")!;
  const education = savedCategories.find((category) => category.name === "Education Excellence Award")!;
  const enterprise = savedCategories.find((category) => category.name === "Entrepreneur of the Year")!;
  const community = savedCategories.find((category) => category.name === "Community Development Award")!;
  const youth = savedCategories.find((category) => category.name === "Youth Impact Award")!;

  const savedNominees = [];
  const nominees = [
    {
      id: "amina-dogo",
      fullName: "Amina Dogo",
      biography: "Digital governance builder creating civic data tools for youth innovation and public service.",
      categoryId: technology.id,
      organization: "Civic Labs Africa",
      state: "Plateau",
      status: ReviewStatus.APPROVED
    },
    {
      id: "dr-luka-pam",
      fullName: "Dr. Luka Pam",
      biography: "Education advocate expanding STEM mentorship, scholarships, and practical learning access.",
      categoryId: education.id,
      organization: "Future Scholars Initiative",
      state: "Benue",
      status: ReviewStatus.APPROVED
    },
    {
      id: "zainab-audu",
      fullName: "Zainab Audu",
      biography: "Founder scaling agro-processing, women-led supply chains, and regional job creation.",
      categoryId: enterprise.id,
      organization: "Savannah Foods Cooperative",
      state: "Nasarawa",
      status: ReviewStatus.APPROVED
    }
  ];

  for (const nominee of nominees) {
    savedNominees.push(await prisma.nominee.upsert({ where: { id: nominee.id }, update: nominee, create: nominee }));
  }

  await prisma.nomination.createMany({
    data: [
      {
        nomineeName: "Samuel Oche",
        nomineeEmail: "samuel@example.com",
        nomineePhone: "+234000000001",
        categoryId: community.id,
        reason: "Led clean water and youth skills projects across underserved communities.",
        submittedBy: "Grace Ene",
        submitterEmail: "grace@example.com"
      },
      {
        nomineeName: "Maryam Bitrus",
        nomineeEmail: "maryam@example.com",
        nomineePhone: "+234000000002",
        categoryId: youth.id,
        reason: "Built a peer learning network supporting young women in technology and enterprise.",
        submittedBy: "Daniel Musa",
        submitterEmail: "daniel@example.com"
      }
    ],
    skipDuplicates: true
  });

  await prisma.sponsor.createMany({
    data: [
      { companyName: "Continental Trust", tier: "Platinum", website: "https://example.com" },
      { companyName: "Savannah Bank", tier: "Gold", website: "https://example.com" },
      { companyName: "Nexus Media", tier: "Media Partner", website: "https://example.com" }
    ],
    skipDuplicates: true
  });

  const judge = await prisma.judge.upsert({
    where: { email: "judge@mibaawards.africa" },
    update: {
      fullName: "Justice Hauwa Madaki",
      title: "Chair, Independent Jury Council",
      organization: "MIBA Grand Jury",
      biography: "A respected civic leader and mentor with deep experience evaluating leadership, impact, and institutional excellence.",
      password: "miba-judge-2026"
    },
    create: {
      fullName: "Justice Hauwa Madaki",
      email: "judge@mibaawards.africa",
      title: "Chair, Independent Jury Council",
      organization: "MIBA Grand Jury",
      biography: "A respected civic leader and mentor with deep experience evaluating leadership, impact, and institutional excellence.",
      password: "miba-judge-2026"
    }
  });

  await Promise.all(
    [technology.id, education.id, enterprise.id].map((categoryId) =>
      prisma.judgeCategory.upsert({
        where: { judgeId_categoryId: { judgeId: judge.id, categoryId } },
        update: {},
        create: { judgeId: judge.id, categoryId }
      })
    )
  );

  await prisma.judgeScore.upsert({
    where: { judgeId_nomineeId: { judgeId: judge.id, nomineeId: savedNominees[0].id } },
    update: {
      scoreLeadership: 18,
      scoreInnovation: 19,
      scoreImpact: 18,
      scoreInfluence: 17,
      scoreOverall: 19,
      comments: "Strong technical originality and measurable civic impact."
    },
    create: {
      judgeId: judge.id,
      nomineeId: savedNominees[0].id,
      categoryId: savedNominees[0].categoryId,
      scoreLeadership: 18,
      scoreInnovation: 19,
      scoreImpact: 18,
      scoreInfluence: 17,
      scoreOverall: 19,
      comments: "Strong technical originality and measurable civic impact."
    }
  });

  const eventDate = new Date("2026-12-12T18:00:00+01:00");
  await prisma.awardEvent.create({
    data: {
      title: "MIBA Awards Ceremony 2026",
      venue: "Grand Ballroom, Middle Belt Civic Centre",
      eventDate,
      registrationOpen: new Date("2026-06-01T09:00:00+01:00"),
      registrationClose: new Date("2026-10-30T23:59:00+01:00"),
      votingOpen: new Date("2026-11-01T09:00:00+01:00"),
      votingClose: new Date("2026-11-30T23:59:00+01:00"),
      judgeScoringOpen: new Date("2026-11-15T09:00:00+01:00"),
      judgeScoringClose: new Date("2026-12-05T23:59:00+01:00"),
      winnerAnnouncementAt: eventDate
    }
  });

  await prisma.announcement.createMany({
    data: [
      { title: "MIBA 2026 nominations are open", content: "The Middle Belt Impact Awards nomination window is now open for leaders, creators, founders, and changemakers.", published: true },
      { title: "Judging framework announced", content: "Nominees will be reviewed across leadership, innovation, impact, influence, and overall excellence.", published: true }
    ],
    skipDuplicates: true
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

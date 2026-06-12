import {
  BriefcaseBusiness,
  Crown,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Mic2,
  Newspaper,
  Rocket,
  Sprout,
  Trophy,
  Users
} from "lucide-react";

export const awardCategories = [
  {
    title: "Leadership Excellence Award",
    description: "Honoring visionary leaders, public servants, civic voices, and institutional builders driving measurable progress.",
    icon: Crown
  },
  {
    title: "Entrepreneur of the Year",
    description: "Celebrating founders and business leaders creating jobs, value chains, and sustainable economic growth.",
    icon: BriefcaseBusiness
  },
  {
    title: "Technology Innovator of the Year",
    description: "Recognizing digital builders, engineers, product creators, and technology leaders solving real problems.",
    icon: Rocket
  },
  {
    title: "Agricultural Excellence Award",
    description: "Honoring farmers, agribusiness leaders, food-system innovators, and rural enterprise champions.",
    icon: Sprout
  },
  {
    title: "Education Excellence Award",
    description: "Celebrating educators, institutions, mentors, and advocates improving learning access and outcomes.",
    icon: GraduationCap
  },
  {
    title: "Youth Impact Award",
    description: "Recognizing young achievers demonstrating leadership, service, creativity, and continental ambition.",
    icon: Users
  },
  {
    title: "Woman of Impact Award",
    description: "Honoring women whose leadership, enterprise, advocacy, or service creates lasting social value.",
    icon: Crown
  },
  {
    title: "Creative Excellence Award",
    description: "Celebrating artists, performers, filmmakers, designers, writers, and creators advancing culture and imagination.",
    icon: Mic2
  },
  {
    title: "Community Development Award",
    description: "Recognizing changemakers improving local communities through service, inclusion, infrastructure, and empowerment.",
    icon: HandHeart
  },
  {
    title: "Healthcare Excellence Award",
    description: "Honoring healthcare professionals, advocates, innovators, and organizations improving wellbeing and access to care.",
    icon: HeartPulse
  },
  {
    title: "Media Excellence Award",
    description: "Celebrating journalists, broadcasters, publishers, and media creators shaping informed public conversation.",
    icon: Newspaper
  },
  {
    title: "Lifetime Achievement Award",
    description: "A signature honor for sustained excellence, legacy, mentorship, service, and generational contribution.",
    icon: Trophy
  }
];

export const fallbackCategories = awardCategories.map((category, index) => ({
  id: `fallback-category-${index + 1}`,
  name: category.title,
  description: category.description,
  _count: { nominees: 0, nominations: 0 }
}));

export const nominationSteps = [
  {
    step: "01",
    title: "Submit Nomination",
    description: "Share the nominee's story, evidence of impact, and the category that best fits their work."
  },
  {
    step: "02",
    title: "Review & Verification",
    description: "The MIBA review panel validates eligibility, impact, documentation, and category alignment."
  },
  {
    step: "03",
    title: "Public Voting",
    description: "Approved nominees enter a transparent voting stage supported by jury scoring."
  },
  {
    step: "04",
    title: "Awards Ceremony",
    description: "Finalists and winners are celebrated at a premium ceremony with partners and media."
  }
];

export const winners = [
  {
    name: "Amina Dogo",
    category: "Technology Innovator of the Year",
    year: "2025",
    achievement: "Built a civic data platform connecting local innovators with public service opportunities."
  },
  {
    name: "Dr. Luka Pam",
    category: "Education Excellence Award",
    year: "2025",
    achievement: "Expanded STEM mentorship and scholarship access for students across rural districts."
  },
  {
    name: "Zainab Audu",
    category: "Entrepreneur of the Year",
    year: "2024",
    achievement: "Scaled a women-led agro-processing company into a regional employer and export brand."
  },
  {
    name: "Samuel Oche",
    category: "Community Development Award",
    year: "2024",
    achievement: "Led clean water, skills training, and youth empowerment projects across underserved communities."
  }
];

export const fallbackNominees = [
  {
    id: "preview-amina-dogo",
    fullName: "Amina Dogo",
    biography: "Digital governance builder creating civic data tools for youth innovation and public service.",
    organization: "Civic Labs Africa",
    state: "Plateau",
    status: "APPROVED",
    category: { name: "Technology Innovator of the Year" },
    _count: { votes: 0 }
  },
  {
    id: "preview-luka-pam",
    fullName: "Dr. Luka Pam",
    biography: "Education advocate expanding STEM mentorship, scholarships, and practical learning access.",
    organization: "Future Scholars Initiative",
    state: "Benue",
    status: "APPROVED",
    category: { name: "Education Excellence Award" },
    _count: { votes: 0 }
  },
  {
    id: "preview-zainab-audu",
    fullName: "Zainab Audu",
    biography: "Founder scaling agro-processing, women-led supply chains, and regional job creation.",
    organization: "Savannah Foods Cooperative",
    state: "Nasarawa",
    status: "APPROVED",
    category: { name: "Entrepreneur of the Year" },
    _count: { votes: 0 }
  }
];

export const fallbackJudges = [
  {
    id: "preview-justice-hauwa-madaki",
    fullName: "Justice Hauwa Madaki",
    photo: null,
    title: "Chair, Independent Jury Council",
    organization: "MIBA Grand Jury",
    biography: "A respected civic leader and mentor with deep experience evaluating leadership, impact, and institutional excellence.",
    assignments: [
      { category: { name: "Leadership Excellence Award" } },
      { category: { name: "Technology Innovator of the Year" } }
    ]
  },
  {
    id: "preview-prof-david-ache",
    fullName: "Prof. David Ache",
    photo: null,
    title: "Education and Innovation Reviewer",
    organization: "Middle Belt Policy Forum",
    biography: "An academic advisor focused on education, innovation, youth development, and measurable community outcomes.",
    assignments: [
      { category: { name: "Education Excellence Award" } },
      { category: { name: "Youth Impact Award" } }
    ]
  },
  {
    id: "preview-maryam-bitrus",
    fullName: "Maryam Bitrus",
    photo: null,
    title: "Enterprise and Culture Advisor",
    organization: "Savannah Enterprise Network",
    biography: "A business mentor and culture advocate supporting entrepreneurs, creators, women leaders, and social impact builders.",
    assignments: [
      { category: { name: "Entrepreneur of the Year" } },
      { category: { name: "Creative Excellence Award" } }
    ]
  }
];

export const fallbackAnnouncements = [
  {
    id: "preview-announcement-1",
    title: "MIBA 2026 platform preparing for launch",
    content: "The Middle Belt Impact Awards team is preparing nominations, voting, judging, and ceremony updates for the next awards cycle.",
    createdAt: "2026-06-13T09:00:00.000Z"
  },
  {
    id: "preview-announcement-2",
    title: "Award categories announced",
    content: "Twelve award categories will recognize leadership, entrepreneurship, technology, agriculture, education, youth impact, media, healthcare, and lifetime achievement.",
    createdAt: "2026-06-13T09:30:00.000Z"
  }
];

export const fallbackEvent = {
  title: "MIBA Awards Ceremony 2026",
  venue: "Grand Ballroom, Middle Belt Civic Centre",
  eventDate: "2026-12-12T18:00:00+01:00",
  registrationClose: "2026-10-30T23:59:00+01:00",
  votingClose: "2026-11-30T23:59:00+01:00"
};

export const fallbackWinnerRankings = winners.map((winner, index) => ({
  nomineeId: `preview-winner-${index + 1}`,
  nomineeName: winner.name,
  categoryName: winner.category,
  averageScore: [96, 93, 91, 89][index] ?? 85,
  judges: 5
}));

export const sponsors = [
  "Continental Trust",
  "Savannah Bank",
  "Nexus Media",
  "Aurum Energy",
  "Bridge Foundation",
  "Heritage Group",
  "Civic Labs",
  "Unity Telecom"
];

export const galleryItems = [
  "Gold carpet arrivals",
  "Lifetime honoree moment",
  "Youth excellence spotlight",
  "Cultural performance",
  "Partner reception",
  "Winner interviews"
];



export type EmailTemplateKey =
  | "nominationSubmitted"
  | "nominationApproved"
  | "nominationRejected"
  | "votingOpen"
  | "votingClosed"
  | "judgeInvitation"
  | "judgeAccountCreated"
  | "winnerNotification"
  | "sponsorInquiryReceived"
  | "contactFormReceived";

type TemplateInput = Record<string, string | number | undefined>;

type EmailTemplate = {
  subject: string;
  html: string;
  text: string;
};

function shell(title: string, body: string) {
  return `
    <div style="background:#060504;color:#fff8e6;font-family:Arial,sans-serif;padding:32px">
      <div style="max-width:640px;margin:0 auto;border:1px solid rgba(217,164,65,.35);padding:28px;background:#10100f">
        <p style="letter-spacing:4px;color:#d9a441;font-size:12px;font-weight:700;text-transform:uppercase">MIBA Awards</p>
        <h1 style="color:#f6e7bc;font-size:28px;margin:12px 0">${title}</h1>
        <div style="color:#f6e7bc;line-height:1.7;font-size:15px">${body}</div>
      </div>
    </div>`;
}

export function renderEmailTemplate(key: EmailTemplateKey, input: TemplateInput = {}): EmailTemplate {
  const name = input.name ?? input.nomineeName ?? "MIBA participant";
  const eventTitle = input.eventTitle ?? "MIBA Awards Ceremony";
  const templates: Record<EmailTemplateKey, EmailTemplate> = {
    nominationSubmitted: {
      subject: "MIBA nomination received",
      html: shell("Nomination Submitted", `<p>Thank you. The nomination for <strong>${name}</strong> has been received and is now pending review.</p>`),
      text: `Nomination submitted for ${name}.`
    },
    nominationApproved: {
      subject: "MIBA nomination approved",
      html: shell("Nomination Approved", `<p>Congratulations. The nomination for <strong>${name}</strong> has been approved for the MIBA Awards process.</p>`),
      text: `Nomination approved for ${name}.`
    },
    nominationRejected: {
      subject: "MIBA nomination update",
      html: shell("Nomination Reviewed", `<p>The nomination for <strong>${name}</strong> has been reviewed and was not approved for this cycle.</p>`),
      text: `Nomination rejected for ${name}.`
    },
    votingOpen: {
      subject: "MIBA public voting is open",
      html: shell("Voting Open", `<p>Public voting for <strong>${eventTitle}</strong> is now open. Support verified nominees before the voting window closes.</p>`),
      text: `Voting is open for ${eventTitle}.`
    },
    votingClosed: {
      subject: "MIBA public voting has closed",
      html: shell("Voting Closed", `<p>Public voting for <strong>${eventTitle}</strong> has closed. Results will proceed to final review.</p>`),
      text: `Voting is closed for ${eventTitle}.`
    },
    judgeInvitation: {
      subject: "Invitation to judge the MIBA Awards",
      html: shell("Judge Invitation", `<p>You are invited to serve as a MIBA Awards judge. Your expertise will help recognize excellence with integrity.</p>`),
      text: "You are invited to serve as a MIBA Awards judge."
    },
    judgeAccountCreated: {
      subject: "Your MIBA judge account is ready",
      html: shell("Judge Account Created", `<p>Your judge account is ready. Sign in with your registered email to review assigned categories.</p>`),
      text: "Your MIBA judge account is ready."
    },
    winnerNotification: {
      subject: "MIBA winner notification",
      html: shell("Winner Notification", `<p>Congratulations <strong>${name}</strong>. You have been selected as a MIBA Awards winner.</p>`),
      text: `Winner notification for ${name}.`
    },
    sponsorInquiryReceived: {
      subject: "MIBA sponsor inquiry received",
      html: shell("Sponsor Inquiry Received", `<p>Your sponsorship inquiry has been received. The MIBA partnerships team will follow up shortly.</p>`),
      text: "Sponsor inquiry received."
    },
    contactFormReceived: {
      subject: "MIBA contact message received",
      html: shell("Contact Form Received", `<p>Thank you for contacting MIBA. Your message has been received by the team.</p>`),
      text: "Contact form received."
    }
  };

  return templates[key];
}

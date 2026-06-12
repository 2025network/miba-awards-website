import nodemailer from "nodemailer";
import { EmailStatus } from "@prisma/client";
import { renderEmailTemplate, type EmailTemplateKey } from "@/lib/email-templates";
import { prisma } from "@/lib/prisma";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

export async function sendMibaEmail({
  recipient,
  template,
  data
}: {
  recipient: string;
  template: EmailTemplateKey;
  data?: Record<string, string | number | undefined>;
}) {
  const rendered = renderEmailTemplate(template, data);
  const log = await prisma.emailLog.create({
    data: { recipient, subject: rendered.subject, status: EmailStatus.QUEUED }
  });

  const transporter = getTransporter();
  if (!transporter) {
    return prisma.emailLog.update({ where: { id: log.id }, data: { status: EmailStatus.FAILED } });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? "MIBA Awards <no-reply@mibaawards.africa>",
      to: recipient,
      subject: rendered.subject,
      text: rendered.text,
      html: rendered.html
    });
    return prisma.emailLog.update({ where: { id: log.id }, data: { status: EmailStatus.SENT, sentAt: new Date() } });
  } catch {
    return prisma.emailLog.update({ where: { id: log.id }, data: { status: EmailStatus.FAILED } });
  }
}

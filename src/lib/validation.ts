export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s-]{7,24}$/;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function text(value: unknown, label: string, min = 1, max = 500) {
  const next = String(value ?? "").trim();
  if (next.length < min) return { value: next, error: `${label} is required.` };
  if (next.length > max) return { value: next, error: `${label} must be ${max} characters or less.` };
  return { value: next };
}

function email(value: unknown, label: string) {
  const next = String(value ?? "").trim().toLowerCase();
  if (!emailPattern.test(next)) return { value: next, error: `${label} must be a valid email address.` };
  return { value: next };
}

export function validateNominationPayload(body: Record<string, unknown>) {
  const nomineeName = text(body.nomineeName, "Nominee name", 2, 120);
  const nomineeEmail = email(body.nomineeEmail, "Nominee email");
  const nomineePhone = text(body.nomineePhone, "Nominee phone", 7, 24);
  const categoryId = text(body.categoryId, "Category", 8, 80);
  const reason = text(body.reason, "Reason", 30, 2000);
  const submittedBy = text(body.submittedBy, "Submitter name", 2, 120);
  const submitterEmail = email(body.submitterEmail, "Submitter email");

  for (const field of [nomineeName, nomineeEmail, nomineePhone, categoryId, reason, submittedBy, submitterEmail]) {
    if (field.error) return { ok: false as const, message: field.error };
  }

  if (!phonePattern.test(nomineePhone.value)) return { ok: false as const, message: "Nominee phone must be a valid phone number." };

  return {
    ok: true as const,
    data: {
      nomineeName: nomineeName.value,
      nomineeEmail: nomineeEmail.value,
      nomineePhone: nomineePhone.value,
      categoryId: categoryId.value,
      reason: reason.value,
      submittedBy: submittedBy.value,
      submitterEmail: submitterEmail.value
    }
  };
}

export function validateVotePayload(body: Record<string, unknown>) {
  const nomineeId = text(body.nomineeId, "Nominee", 8, 80);
  const voterEmail = email(body.voterEmail, "Voter email");

  if (nomineeId.error) return { ok: false as const, message: nomineeId.error };
  if (voterEmail.error) return { ok: false as const, message: voterEmail.error };

  return { ok: true as const, data: { nomineeId: nomineeId.value, voterEmail: voterEmail.value } };
}

export function validateContactPayload(body: Record<string, unknown>) {
  const name = text(body.name, "Name", 2, 120);
  const recipient = email(body.email ?? body.recipient, "Email");
  if (name.error) return { ok: false as const, message: name.error };
  if (recipient.error) return { ok: false as const, message: recipient.error };
  return { ok: true as const, data: { name: name.value, recipient: recipient.value } };
}

export function validateSponsorInquiryPayload(body: Record<string, unknown>) {
  const companyName = text(body.companyName ?? body.name, "Company name", 2, 160);
  const recipient = email(body.email ?? body.recipient, "Email");
  if (companyName.error) return { ok: false as const, message: companyName.error };
  if (recipient.error) return { ok: false as const, message: recipient.error };
  return { ok: true as const, data: { companyName: companyName.value, recipient: recipient.value } };
}

export function validateImageUpload(file: File, maxBytes = 2 * 1024 * 1024) {
  if (!allowedImageTypes.has(file.type)) return { ok: false as const, message: "Only JPG, PNG, and WebP files are allowed." };
  if (file.size > maxBytes) return { ok: false as const, message: "Image must be 2MB or smaller." };
  return { ok: true as const, data: file };
}

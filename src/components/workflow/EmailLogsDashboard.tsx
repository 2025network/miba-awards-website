"use client";

import { useCallback, useEffect, useState } from "react";

type EmailLog = { id: string; recipient: string; subject: string; status: string; sentAt: string | null; createdAt: string };

export function EmailLogsDashboard() {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [message, setMessage] = useState("Loading email logs...");

  const load = useCallback(async () => {
    const response = await fetch("/api/email-logs");
    if (!response.ok) {
      setMessage("Admin login required or database unavailable.");
      return;
    }
    setLogs((await response.json()) as EmailLog[]);
    setMessage("");
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div>
      <h1 className="text-4xl font-black uppercase text-pearl">Email Logs</h1>
      <p className="mt-3 text-sm text-champagne/68">Track recipients, subjects, sent timestamps, and delivery status for automated workflow emails.</p>
      {message ? <p className="mt-6 text-sm text-aureate">{message}</p> : null}
      <div className="mt-8 overflow-x-auto border border-champagne/12"><table className="w-full min-w-[820px] bg-obsidian/72 text-left text-sm"><thead className="bg-pearl/[0.06] text-xs uppercase tracking-[0.18em] text-aureate"><tr><th className="p-4">Recipient</th><th className="p-4">Subject</th><th className="p-4">Status</th><th className="p-4">Sent</th><th className="p-4">Created</th></tr></thead><tbody>{logs.map((log) => <tr className="border-t border-champagne/10" key={log.id}><td className="p-4 text-pearl">{log.recipient}</td><td className="p-4 text-champagne/78">{log.subject}</td><td className="p-4 text-aureate">{log.status}</td><td className="p-4 text-champagne/58">{log.sentAt ? new Date(log.sentAt).toLocaleString() : "--"}</td><td className="p-4 text-champagne/58">{new Date(log.createdAt).toLocaleString()}</td></tr>)}</tbody></table></div>
    </div>
  );
}

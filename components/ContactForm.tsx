"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    setStatus(res.ok ? "sent" : "error");
    if (res.ok) {
      setName("");
      setEmail("");
      setMessage("");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg bg-tw-bg p-6 text-center">
        <p className="font-bold text-tw-ink">Thank you — we&apos;ve received your message.</p>
        <p className="text-sm text-tw-muted mt-1">Our team will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <textarea
        placeholder="How can we help?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        required
        className="w-full rounded-lg border border-tw-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-tw-red/30"
      />
      {status === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

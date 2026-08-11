"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type Message = {
  id: string;
  body: string;
  createdAt: string;
  senderId: string;
  sender: { firstName: string; lastName: string };
};

export function MessageThread({ bookingId, currentUserId }: { bookingId: string; currentUserId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch(`/api/bookings/${bookingId}/messages`)
      .then((r) => r.json())
      .then(setMessages);
  }, [bookingId]);

  async function send() {
    if (!body.trim()) return;
    setSending(true);
    const res = await fetch(`/api/bookings/${bookingId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    });
    if (res.ok) {
      const msg = await res.json();
      setMessages((m) => [...m, msg]);
      setBody("");
    }
    setSending(false);
  }

  return (
    <div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.senderId === currentUserId ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs rounded-lg px-3 py-2 text-sm ${
                m.senderId === currentUserId ? "bg-tw-red text-white" : "bg-tw-bg text-tw-ink"
              }`}
            >
              <p>{m.body}</p>
              <p className="mt-1 text-[10px] opacity-70">{m.sender.firstName}</p>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-sm text-tw-muted">No messages yet.</p>}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 rounded-lg border border-tw-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-tw-red/30"
        />
        <Button onClick={send} disabled={sending} size="sm">
          Send
        </Button>
      </div>
    </div>
  );
}

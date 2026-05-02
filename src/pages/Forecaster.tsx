import { useRef, useState } from "react";
import { hasAnthropicKey, streamToFincast, type Message } from "@/lib/claude";
import { answerAskFincastLocal } from "@/lib/askFincastLocal";
import { GlassCard } from "@/components/ui/GlassCard";

const PROMPTS = [
  "WHY THE FRONT?",
  "HOME GOAL",
  "RECESSION?",
  "WHY BONDS?",
  "EXPENSE RATIO",
  "COMPOUNDING",
];

export default function Forecaster() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "I'm Fincast AI — ask anything about your money and I'll answer in weather language, using mainstream portfolio research and market history as context. Educational, not a tailored plan.",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  function stop() {
    abortRef.current?.abort();
    abortRef.current = null;
  }

  async function send(text: string) {
    if (!text.trim() || streaming) return;
    stop();

    const userMsg: Message = { role: "user", content: text.trim() };
    const thread: Message[] = [...messages, userMsg];
    setInput("");

    if (!hasAnthropicKey()) {
      const reply = answerAskFincastLocal(userMsg.content);
      setMessages([...thread, { role: "assistant", content: reply }]);
      requestAnimationFrame(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }));
      return;
    }

    setStreaming(true);
    setWaiting(true);
    setMessages([...thread, { role: "assistant", content: "" }]);

    const ac = new AbortController();
    abortRef.current = ac;

    let assistant = "";
    try {
      await streamToFincast(
        thread,
        (tok) => {
          setWaiting(false);
          assistant += tok;
          setMessages((m) => {
            const copy = [...m];
            copy[copy.length - 1] = { role: "assistant", content: assistant };
            return copy;
          });
        },
        () => {
          bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        },
        () => {
          setMessages((m) => {
            const copy = [...m];
            copy[copy.length - 1] = {
              role: "assistant",
              content:
                copy[copy.length - 1].content ||
                "We couldn’t finish that answer. Check your connection and try again.",
            };
            return copy;
          });
        },
        ac.signal,
      );
    } finally {
      abortRef.current = null;
      setStreaming(false);
      setWaiting(false);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <GlassCard className="flex min-h-[560px] flex-col overflow-hidden p-0">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--glass-border)] px-4 py-3">
          <p className="label-caps">Fincast AI · research-style guidance</p>
          {streaming ? (
            <button
              type="button"
              onClick={stop}
              className="btn-ghost text-[10px] font-semibold text-[var(--sun)]"
            >
              Stop
            </button>
          ) : null}
        </div>

        <div className="flex min-h-[200px] flex-1 flex-col gap-2.5 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border text-[9px] font-bold ${
                  m.role === "assistant"
                    ? "border-[var(--sun-border)] bg-[rgba(255,209,102,0.2)] text-[var(--sun)]"
                    : "border-[var(--glass-border)] bg-[var(--glass)] text-[var(--sub)]"
                }`}
              >
                {m.role === "assistant" ? "FC" : "AK"}
              </div>
              <div
                className={`max-w-[85%] border px-3 py-2.5 text-[13px] font-light ${
                  m.role === "assistant"
                    ? "rounded-md rounded-tl-[4px] border-[var(--glass-border)] bg-[var(--glass)] text-[var(--text)]"
                    : "rounded-md rounded-tr-[4px] border-[rgba(255,209,102,0.35)] bg-[rgba(255,209,102,0.15)] text-[var(--sun)]"
                }`}
              >
                {m.content}
                {!m.content && waiting && i === messages.length - 1 && m.role === "assistant" ? (
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--sun)] [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--sun)] [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--sun)]" />
                  </span>
                ) : null}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-[var(--glass-border)] p-3">
          <div className="mb-2 flex flex-wrap gap-2">
            {PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => send(p)}
                disabled={streaming}
                className="rounded-md border border-[rgba(255,255,255,0.18)] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[var(--sub)] transition-colors hover:border-[var(--sun-border)] hover:bg-[var(--sun-glass)] hover:text-[var(--sun)] disabled:opacity-50"
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
              placeholder="Ask in plain English…"
              className="focus-sun glass-card flex-1 rounded-lg border border-[var(--glass-border)] bg-[var(--glass)] px-3 py-2 text-[12px] text-[var(--text)] placeholder:text-[var(--dim)]"
            />
            <button
              type="button"
              onClick={() => send(input)}
              disabled={streaming}
              className="btn-gold px-4 py-2 text-[11px] disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

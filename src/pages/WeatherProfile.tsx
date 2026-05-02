import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/GlassCard";

const Q = [
  {
    q: "Your portfolio drops $15,000 in a sudden squall. What do you do?",
    opts: ["Hold the course", "Reduce exposure", "Add shelter assets"],
  },
  {
    q: "How far away is your financial horizon?",
    opts: ["Under 5 years", "5–15 years", "15+ years"],
  },
  {
    q: "Which forecast sounds most like you?",
    opts: ["Mostly sunny", "Mixed fronts", "Storm season"],
  },
  {
    q: "Does your daily life depend on this money right now?",
    opts: ["No", "Partially", "Yes, materially"],
  },
];

const GOAL_OPTS = [
  { id: "emergency", label: "Safety net & monthly bills" },
  { id: "home", label: "Home or next big purchase" },
  { id: "education", label: "Kids’ education" },
  { id: "retire", label: "Retirement" },
];

const PROFILES = [
  { id: "calm", name: "Calm Skies", sub: "You prefer a smoother ride" },
  { id: "mixed", name: "Mixed Forecast", sub: "Balanced between growth and shelter" },
  { id: "storm", name: "Storm Chaser", sub: "You can handle more ups and downs" },
];

function profileIndexFromAnswers(quizAnswers: number[]): number {
  const sum = quizAnswers.reduce((a, b) => a + b, 0);
  if (sum <= 4) return 0;
  if (sum <= 9) return 1;
  return 2;
}

export default function WeatherProfile() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [goalIds, setGoalIds] = useState<string[]>([]);
  const [phase, setPhase] = useState<"quiz" | "goals" | "done">("quiz");

  const profile = useMemo(() => {
    if (answers.length < 4) return 1;
    return profileIndexFromAnswers(answers.slice(0, 4));
  }, [answers]);

  function selectQuiz(i: number) {
    const next = [...answers];
    next[step] = i;
    setAnswers(next);
    if (step < Q.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 320);
    } else {
      setTimeout(() => setPhase("goals"), 320);
    }
  }

  function toggleGoal(id: string) {
    setGoalIds((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]));
  }

  function finishGoals() {
    localStorage.setItem("fincast-onboarding", "1");
    localStorage.setItem("fincast-goals", JSON.stringify(goalIds.length ? goalIds : ["general"]));
    setPhase("done");
  }

  const quizProgress = phase === "quiz" ? step + 1 : Q.length;

  return (
    <div className="p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          {phase === "quiz" ? (
            <>
              <p className="label-caps">What&apos;s your weather tolerance?</p>
              <p className="body-sub mt-2">
                Four quick questions — no Sharpe ratios, no Greek letters. We map how you handle squalls and clear
                spells.
              </p>
              <div className="mt-4 flex gap-1">
                {Q.map((_, i) => (
                  <div
                    key={i}
                    className="h-[3px] flex-1 overflow-hidden rounded-[3px] bg-[rgba(255,255,255,0.1)]"
                  >
                    <div
                      className="h-full bg-[var(--sun)] transition-all duration-300"
                      style={{ width: i <= step ? "100%" : "0%" }}
                    />
                  </div>
                ))}
              </div>
              <p className="label-caps mt-6">
                Question {quizProgress} of {Q.length}
              </p>
              <p className="mt-3 text-[14px] font-medium leading-snug text-[var(--text)]">{Q[step].q}</p>
              <div className="mt-5 flex flex-col gap-2">
                {Q[step].opts.map((o, i) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => selectQuiz(i)}
                    className={`glass-card border px-3 py-2.5 text-left text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sun)] ${
                      answers[step] === i
                        ? "border-[rgba(255,209,102,0.5)] bg-[rgba(255,209,102,0.15)] text-[var(--sun)]"
                        : "text-[var(--text)]"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </>
          ) : phase === "goals" ? (
            <>
              <p className="label-caps">What are you saving for?</p>
              <p className="body-sub mt-2">
                Pick any that matter — we use this to frame advice in plain language, not to score you.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                {GOAL_OPTS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => toggleGoal(g.id)}
                    className={`glass-card border px-3 py-2.5 text-left text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sun)] ${
                      goalIds.includes(g.id)
                        ? "border-[rgba(255,209,102,0.5)] bg-[rgba(255,209,102,0.15)] text-[var(--sun)]"
                        : "text-[var(--text)]"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
              <button type="button" className="btn-gold mt-6 w-full py-2.5 text-[11px]" onClick={finishGoals}>
                Save and see my profile
              </button>
            </>
          ) : (
            <>
              <p className="label-caps">You&apos;re set</p>
              <p className="body-sub mt-2">
                Goals saved. Your weather style is a gentle guide — match it to real timelines and cash needs before
                changing investments.
              </p>
              <Link to="/" className="btn-gold mt-6 inline-block w-full py-2.5 text-center text-[11px]">
                Back to dashboard
              </Link>
            </>
          )}
        </GlassCard>

        <div className="flex flex-col gap-3">
          {PROFILES.map((p, i) => (
            <GlassCard
              key={p.id}
              className={`p-4 ${
                phase === "done" && profile === i ? "border-[rgba(255,209,102,0.4)] bg-[rgba(255,209,102,0.1)]" : ""
              }`}
            >
              <p className="text-[14px] font-semibold text-[var(--text)]">{p.name}</p>
              <p className="label-caps mt-1 text-[8px]">{p.sub}</p>
            </GlassCard>
          ))}
          <GlassCard className="border-[rgba(255,209,102,0.3)] bg-[rgba(255,209,102,0.12)] p-4">
            <p className="label-caps">Your profile</p>
            <p className="mt-2 text-[15px] font-semibold text-[var(--sun)]">
              {phase === "done" ? PROFILES[profile].name : "Finish the steps"}
            </p>
            <p className="body-sub mt-2">
              {phase === "done"
                ? PROFILES[profile].sub
                : "Answer the questions — then pick what you’re saving for."}
            </p>
            {phase === "done" && goalIds.length > 0 ? (
              <p className="body-sub mt-2 text-[10px] text-[var(--sub)]">
                Priorities:{" "}
                {goalIds
                  .map((id) => GOAL_OPTS.find((g) => g.id === id)?.label)
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            ) : null}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

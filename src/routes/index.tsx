import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: ComingSoon })

// Change this to the real launch date.
const LAUNCH_DATE = new Date("2027-01-01T00:00:00+06:00")

function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  if (now === null) return null
  const diff = Math.max(0, target.getTime() - now)
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}

function ComingSoon() {
  const time = useCountdown(LAUNCH_DATE)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const units = [
    { label: "Days", value: time?.days },
    { label: "Hours", value: time?.hours },
    { label: "Minutes", value: time?.minutes },
    { label: "Seconds", value: time?.seconds },
  ]

  return (
    <main className="cs-root relative isolate min-h-svh overflow-hidden text-[var(--cs-cream)]">
      {/* Atmosphere */}
      <div aria-hidden className="cs-sun" />
      <div aria-hidden className="cs-horizon" />
      <div aria-hidden className="cs-grain" />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col px-6 py-8 md:px-10 md:py-10">
        {/* Header */}
        <header className="cs-reveal flex items-center justify-between" style={{ animationDelay: "0.1s" }}>
          <a href="/" className="font-display text-2xl tracking-tight">
            hotelbd<span className="text-[var(--cs-sun)]">18</span>
          </a>
          <span className="hidden text-xs tracking-[0.3em] text-[var(--cs-muted)] uppercase sm:block">
            Dhaka · Cox&apos;s Bazar · Sylhet · Sundarbans
          </span>
        </header>

        {/* Hero */}
        <section className="grid flex-1 items-center gap-12 py-12 md:grid-cols-[1.4fr_1fr] md:py-10">
          <div>
            <p
              className="cs-reveal font-bangla mb-4 text-lg text-[var(--cs-brass)]"
              style={{ animationDelay: "0.25s" }}
            >
              স্বাগতম — welcome
            </p>
            <h1
              className="cs-reveal font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.92] tracking-[-0.03em]"
              style={{ animationDelay: "0.4s" }}
            >
              Your room
              <br />
              in Bangladesh
              <br />
              <em className="text-[var(--cs-sun)]">is almost ready.</em>
            </h1>
            <p
              className="cs-reveal mt-6 max-w-md text-base leading-relaxed text-[var(--cs-muted)] md:text-lg"
              style={{ animationDelay: "0.6s" }}
            >
              We&apos;re building a simpler way to find and book hotels across
              Bangladesh, from city stays to the longest sea beach in the world.
              Opening soon.
            </p>

            {/* Notify form */}
            <form
              className="cs-reveal mt-8 max-w-md"
              style={{ animationDelay: "0.75s" }}
              onSubmit={(e) => {
                e.preventDefault()
                // TODO: send `email` to a mailing list / backend endpoint.
                setSubmitted(true)
              }}
            >
              {submitted ? (
                <p className="border-b border-[var(--cs-brass)] pb-3 text-[var(--cs-brass)]">
                  Thank you. We&apos;ll email you when we open.
                </p>
              ) : (
                <div className="flex items-end gap-3 border-b border-[var(--cs-line)] pb-2 transition-colors focus-within:border-[var(--cs-brass)]">
                  <label className="flex-1">
                    <span className="sr-only">Email address</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-transparent py-2 text-lg placeholder:text-[var(--cs-muted)]/60 focus:outline-none"
                    />
                  </label>
                  <button
                    type="submit"
                    className="group flex items-center gap-2 py-2 text-xs font-semibold tracking-[0.25em] whitespace-nowrap uppercase text-[var(--cs-brass)] transition-colors hover:text-[var(--cs-cream)]"
                  >
                    Notify me
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Key tag */}
          <div className="cs-reveal flex justify-center md:justify-end" style={{ animationDelay: "0.9s" }}>
            <div className="cs-keytag" aria-hidden>
              <div className="cs-keytag-hole" />
              <span className="mt-16 text-[0.65rem] tracking-[0.4em] uppercase opacity-70">Room</span>
              <span className="font-display text-7xl leading-none">18</span>
              <span className="mt-auto mb-8 text-[0.6rem] tracking-[0.35em] uppercase opacity-70">
                Opening soon
              </span>
            </div>
          </div>
        </section>

        {/* Countdown */}
        <footer className="cs-reveal border-t border-[var(--cs-line)] pt-6" style={{ animationDelay: "1.05s" }}>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <dl className="grid grid-cols-4 gap-6 md:gap-12">
              {units.map((u) => (
                <div key={u.label}>
                  <dd className="font-display text-4xl tabular-nums md:text-5xl">
                    {u.value === undefined ? "--" : String(u.value).padStart(2, "0")}
                  </dd>
                  <dt className="mt-1 text-[0.65rem] tracking-[0.3em] text-[var(--cs-muted)] uppercase">
                    {u.label}
                  </dt>
                </div>
              ))}
            </dl>
            <p className="text-xs text-[var(--cs-muted)]">
              © {new Date().getFullYear()} hotelbd18.com
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}

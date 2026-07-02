import { Link } from 'react-router-dom'
import { Logo } from '../components/Layout'

function MockResume({ variant }: { variant: 'sidebar' | 'classic' | 'photo' }) {
  if (variant === 'sidebar') {
    return (
      <div className="flex h-full overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="w-[30%] bg-slate-800 p-2">
          <div className="mb-2 h-2 w-8 rounded bg-violet-400" />
          <div className="mb-1 h-1 w-full rounded bg-slate-600" />
          <div className="h-1 w-3/4 rounded bg-slate-600" />
        </div>
        <div className="flex-1 p-2">
          <div className="mb-2 h-1 w-full rounded bg-slate-200" />
          <div className="mb-1 h-1 w-full rounded bg-slate-100" />
          <div className="h-1 w-4/5 rounded bg-slate-100" />
        </div>
      </div>
    )
  }
  if (variant === 'photo') {
    return (
      <div className="flex h-full gap-2 overflow-hidden rounded-lg bg-white p-2 shadow-xl">
        <div className="flex w-[28%] flex-col items-center">
          <div className="mb-1 h-5 w-5 rounded-full bg-violet-400" />
          <div className="h-1 w-full rounded bg-slate-200" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="h-1 w-full rounded bg-violet-200" />
          <div className="h-1 w-full rounded bg-slate-100" />
        </div>
      </div>
    )
  }
  return (
    <div className="h-full overflow-hidden rounded-lg bg-white p-2 shadow-xl">
      <div className="mb-2 h-2 w-10 rounded bg-slate-800" />
      <div className="mb-2 h-px w-full bg-slate-300" />
      <div className="space-y-1">
        <div className="h-1 w-full rounded bg-slate-200" />
        <div className="h-1 w-4/5 rounded bg-slate-100" />
      </div>
    </div>
  )
}

const STEPS = [
  { n: '01', title: 'Pick a template', desc: '33 professional layouts — modern, ATS, photo & more.' },
  { n: '02', title: 'Fill your details', desc: 'Live preview updates as you type. Auto-saved locally.' },
  { n: '03', title: 'Download PDF', desc: 'Export a print-ready resume in one click. No signup.' },
]

const STATS = [
  { value: '33+', label: 'Templates' },
  { value: '100%', label: 'Free' },
  { value: '0', label: 'Signups needed' },
]

export function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-600/10" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <div className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-violet-700 backdrop-blur-sm dark:border-violet-800 dark:bg-slate-900/80 dark:text-violet-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Free · Private · No account required
            </div>

            <h1 className="animate-fade-up-delay-1 text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              Craft a resume that{' '}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
                opens doors
              </span>
            </h1>

            <p className="animate-fade-up-delay-2 mt-5 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              SatCraft helps you build a stunning, ATS-friendly resume in minutes.
              Choose a template, fill in your story, download — all in your browser.
            </p>

            <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/templates"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:shadow-xl hover:brightness-110"
              >
                Start crafting
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/templates/modern"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-base font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-violet-600 dark:hover:text-violet-400"
              >
                Browse templates
              </Link>
            </div>

            <div className="mt-10 flex gap-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating resume previews */}
          <div className="relative mx-auto h-[340px] w-full max-w-sm lg:max-w-none">
            <div className="animate-float absolute left-0 top-4 h-44 w-32 sm:h-52 sm:w-36">
              <MockResume variant="classic" />
            </div>
            <div className="animate-float-delayed absolute right-0 top-0 h-48 w-36 sm:h-56 sm:w-40">
              <MockResume variant="sidebar" />
            </div>
            <div className="animate-float absolute bottom-0 left-1/2 h-44 w-32 -translate-x-1/2 sm:h-48 sm:w-36">
              <MockResume variant="photo" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl border border-violet-200/60 bg-white/60 px-5 py-3 text-center shadow-lg backdrop-blur-sm dark:border-violet-800/40 dark:bg-slate-900/60">
                <Logo size="sm" />
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Your resume, crafted perfectly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Ready in 3 simple steps
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-slate-600 dark:text-slate-400">
            No learning curve. No clutter. Just a beautiful resume.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-violet-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-violet-600"
              >
                <span className="text-3xl font-bold text-violet-200 dark:text-violet-800">{step.n}</span>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-3 sm:px-6">
          {[
            { icon: '◆', title: '33 Templates', desc: 'Modern, simple, professional & ATS-optimized layouts.' },
            { icon: '◎', title: 'Live Preview', desc: 'Watch your resume come alive as you type each word.' },
            { icon: '⬡', title: '100% Private', desc: 'Data never leaves your device. No servers, no tracking.' },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="text-2xl text-violet-500">{f.icon}</span>
              <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 px-8 py-12 shadow-xl shadow-violet-500/20">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Your dream job starts here</h2>
            <p className="mx-auto mt-3 max-w-md text-violet-100">
              Join thousands who craft their future with SatCraft — free forever.
            </p>
            <Link
              to="/templates"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Build my resume — it&apos;s free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

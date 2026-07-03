export function LockedScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl font-bold text-white shadow-lg">
          S
        </div>
        <h1 className="text-2xl font-bold text-white">SatCraft</h1>
        <p className="mt-4 text-lg font-medium text-slate-300">Unauthorized copy</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          This application is licensed for authorized deployment only.
          Cloned or unofficial builds cannot run without a valid deploy license.
        </p>
        <a
          href="https://satwinder777.github.io/resume/"
          className="mt-8 inline-block rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
        >
          Visit official site
        </a>
      </div>
    </div>
  )
}

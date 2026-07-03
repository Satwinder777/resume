/** FNV-1a style hash — used to verify deploy key at runtime without storing raw key twice */
export function licenseSig(key: string): string {
  let h = 2166136261
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(36)
}

/** Hosts allowed to run SatCraft (production + local dev for owner) */
export const ALLOWED_HOSTS = [
  'satwinder777.github.io',
  'localhost',
  '127.0.0.1',
] as const

export function isAppAuthorized(): boolean {
  const key = import.meta.env.VITE_SATCRAFT_DEPLOY_KEY
  const sig = import.meta.env.VITE_SATCRAFT_LICENSE_SIG

  if (!key || key.length < 32) return false
  if (!sig || licenseSig(key) !== sig) return false

  const host = window.location.hostname
  if (!ALLOWED_HOSTS.includes(host as (typeof ALLOWED_HOSTS)[number])) return false

  return true
}

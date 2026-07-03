import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function licenseSig(key: string): string {
  let h = 2166136261
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(36)
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const deployKey = env.VITE_SATCRAFT_DEPLOY_KEY ?? ''
  const sig = deployKey ? licenseSig(deployKey) : ''

  return {
    plugins: [react(), tailwindcss()],
    base: '/resume/',
    define: {
      'import.meta.env.VITE_SATCRAFT_LICENSE_SIG': JSON.stringify(sig),
    },
  }
})

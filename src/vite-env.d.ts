/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SATCRAFT_DEPLOY_KEY: string
  readonly VITE_SATCRAFT_LICENSE_SIG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

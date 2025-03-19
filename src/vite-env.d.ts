/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEXIE_CLOUD_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

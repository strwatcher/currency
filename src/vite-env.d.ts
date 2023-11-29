/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_EXCHANGE_API_KEY: string
    readonly VITE_EXCHANGE_BASE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}



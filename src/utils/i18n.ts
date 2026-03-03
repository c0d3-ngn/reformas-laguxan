import es from "../locales/es.json"

export const languages = {
  es: "Español",
}

export const defaultLang = "es"

export const ui = {
  es,
} as const

export type TranslationKey = keyof (typeof ui)["es"] | string

export function useTranslations() {
  return function t(key: TranslationKey): string {
    const value = ui[defaultLang][key as keyof (typeof ui)["es"]]
    return value || key
  }
}

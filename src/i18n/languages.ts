export type Language =
  | "ru"
  | "en"
  | "kk"
  | "be";

export const LANGUAGES: {
  code: Language;
  label: string;
  nativeLabel: string;
}[] = [
  {
    code: "ru",
    label: "Русский",
    nativeLabel: "RU",
  },
  {
    code: "en",
    label: "English",
    nativeLabel: "EN",
  },
  {
    code: "kk",
    label: "Қазақша",
    nativeLabel: "KZ",
  },
  {
    code: "be",
    label: "Беларуская",
    nativeLabel: "BY",
  },
];

export const DEFAULT_LANGUAGE: Language =
  "ru";

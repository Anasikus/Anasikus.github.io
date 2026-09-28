import { createContext } from "react";

import type { UiDictionary } from "./dictionaries/ru";
import type { Language } from "./languages";

export interface LanguageContextValue {
  language: Language;
  setLanguage: (
    language: Language
  ) => void;
  t: UiDictionary;
}

export const LanguageContext =
  createContext<LanguageContextValue | null>(
    null
  );

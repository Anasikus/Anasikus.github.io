import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DEFAULT_LANGUAGE,
  type Language,
} from "./languages";

import ru from "./dictionaries/ru";
import en from "./dictionaries/en";
import kk from "./dictionaries/kk";
import be from "./dictionaries/be";

import type { UiDictionary } from "./dictionaries/ru";

import {
  LanguageContext,
  type LanguageContextValue,
} from "./context";

const dictionaries: Record<
  Language,
  UiDictionary
> = { ru, en, kk, be };

const STORAGE_KEY = "portfolio-language";

const readStoredLanguage =
  (): Language => {
    if (typeof window === "undefined") {
      return DEFAULT_LANGUAGE;
    }

    const stored =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    if (
      stored === "ru" ||
      stored === "en" ||
      stored === "kk" ||
      stored === "be"
    ) {
      return stored;
    }

    return DEFAULT_LANGUAGE;
  };

/*
 * Сам контекст и useLanguage() вынесены в отдельные файлы
 * (./context и ./useLanguage) — иначе react-refresh ругается
 * на файл, который одновременно экспортирует и компонент,
 * и что-то ещё (ломает fast refresh).
 */
export const LanguageProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [language, setLanguageState] =
    useState<Language>(
      readStoredLanguage
    );

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      language
    );

    document.documentElement.lang =
      language;
  }, [language]);

  const value = useMemo<
    LanguageContextValue
  >(
    () => ({
      language,
      setLanguage: setLanguageState,
      t: dictionaries[language],
    }),
    [language]
  );

  return (
    <LanguageContext.Provider
      value={value}
    >
      {children}
    </LanguageContext.Provider>
  );
};

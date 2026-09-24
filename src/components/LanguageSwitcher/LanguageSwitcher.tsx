import { useEffect, useRef, useState } from "react";

import { LANGUAGES } from "../../i18n/languages";
import { useLanguage } from "../../i18n/useLanguage";

import styles from "./LanguageSwitcher.module.scss";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } =
    useLanguage();

  const [isOpen, setIsOpen] =
    useState(false);

  const rootRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen]);

  const current = LANGUAGES.find(
    (item) => item.code === language
  );

  return (
    <div
      ref={rootRef}
      className={styles.wrapper}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t.languageSwitcher.label}
        onClick={() =>
          setIsOpen((open) => !open)
        }
      >
        <span
          className={styles.icon}
          aria-hidden="true"
        >
          ⊕
        </span>

        {current?.nativeLabel}
      </button>

      {isOpen && (
        <ul
          className={styles.menu}
          role="listbox"
        >
          {LANGUAGES.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                role="option"
                aria-selected={
                  item.code === language
                }
                className={
                  item.code === language
                    ? styles.optionActive
                    : styles.option
                }
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
              >
                <span
                  className={
                    styles.optionCode
                  }
                >
                  {item.nativeLabel}
                </span>

                <span>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;

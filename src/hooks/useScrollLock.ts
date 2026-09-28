import { useEffect } from "react";

import { getLenisInstance } from "./useLenis";

/*
 * Пока открыта модалка/лайтбокс, страница под ней не должна
 * прокручиваться. Одного overflow:hidden на body мало — Lenis
 * перехватывает колесо мыши и продолжает крутить фон, поэтому
 * его нужно ещё и остановить.
 */
export const useScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (!locked) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    getLenisInstance()?.stop();

    return () => {
      document.body.style.overflow =
        previousOverflow;

      getLenisInstance()?.start();
    };
  }, [locked]);
};

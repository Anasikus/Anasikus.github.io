import { useEffect, useLayoutEffect, useRef } from "react";

import {
  useLocation,
  useNavigationType,
} from "react-router-dom";

import { getLenisInstance } from "../../hooks/useLenis";

const HEADER_OFFSET = 90;
const MAX_FRAMES = 30;

const storageKey = (key: string) =>
  `portfolio-scroll:${key}`;

const jumpTo = (y: number) => {
  const lenis = getLenisInstance();

  if (lenis) {
    /*
     * Lenis кэширует высоту страницы и обновляет её асинхронно
     * (ResizeObserver). Сразу после смены маршрута лимит ещё от
     * предыдущей, короткой страницы, и scrollTo упирается в него —
     * поэтому пересчитываем размеры вручную.
     */
    lenis.resize();

    lenis.scrollTo(y, {
      immediate: true,
      force: true,
    });
  } else {
    window.scrollTo(0, y);
  }
};

/*
 * SPA не сбрасывает и не восстанавливает скролл сам: при переходе
 * на страницу проекта окно оставалось на «случайной» высоте, а при
 * возврате назад попадало не туда, откуда пользователь ушёл. Здесь:
 * - позиция каждой записи истории (location.key) запоминается;
 * - при "Назад/Вперёд" (POP) она восстанавливается — с повторами,
 *   пока страница дорисовывается и становится достаточно высокой;
 * - при обычном переходе (PUSH) страница открывается сверху, а для
 *   ссылок с #якорем — докручивается к разделу.
 */
const ScrollManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  const keyRef = useRef(location.key);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    let frame = 0;

    const save = () => {
      frame = 0;

      try {
        sessionStorage.setItem(
          storageKey(keyRef.current),
          String(Math.round(window.scrollY))
        );
      } catch {
        // sessionStorage недоступен — просто не запоминаем
      }
    };

    const handleScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(save);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      cancelAnimationFrame(frame);
    };
  }, []);

  useLayoutEffect(() => {
    keyRef.current = location.key;

    let saved = 0;

    try {
      saved = Number(
        sessionStorage.getItem(
          storageKey(location.key)
        )
      );
    } catch {
      saved = 0;
    }

    const findAnchor = () =>
      location.hash
        ? document.querySelector(location.hash)
        : null;

    let cancelled = false;
    let frames = 0;
    let frameId = 0;
    let timeoutId = 0;
    let observer: ResizeObserver | null = null;

    const cleanupSession = () => {
      cancelled = true;

      cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);

      observer?.disconnect();
      observer = null;

      document.removeEventListener("load", apply, true);
      window.removeEventListener("wheel", cleanupSession);
      window.removeEventListener(
        "touchstart",
        cleanupSession
      );
      window.removeEventListener(
        "keydown",
        cleanupSession
      );
    };

    /*
     * Высота страницы после возврата ещё меняется: догружаются
     * картинки, подставляются шрифты, доигрываются анимации. Поэтому
     * позицию не выставляем один раз, а держим, пока страница
     * «устаканивается» (или пока пользователь сам не начал крутить).
     */
    function apply() {
      if (cancelled) {
        return;
      }

      if (location.hash) {
        const anchor = findAnchor();

        if (anchor instanceof HTMLElement) {
          jumpTo(
            anchor.getBoundingClientRect().top +
              window.scrollY -
              HEADER_OFFSET
          );
        }

        return;
      }

      const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (maxScroll >= saved - 2) {
        jumpTo(saved);
      }
    }

    const step = () => {
      if (cancelled) {
        return;
      }

      frames += 1;

      apply();

      if (frames < MAX_FRAMES) {
        frameId = requestAnimationFrame(step);
      }
    };

    if (
      location.hash ||
      (navigationType === "POP" && saved > 0)
    ) {
      frameId = requestAnimationFrame(step);

      observer = new ResizeObserver(apply);
      observer.observe(document.documentElement);
      observer.observe(document.body);

      document.addEventListener("load", apply, true);

      window.addEventListener(
        "wheel",
        cleanupSession,
        { once: true, passive: true }
      );

      window.addEventListener(
        "touchstart",
        cleanupSession,
        { once: true, passive: true }
      );

      window.addEventListener(
        "keydown",
        cleanupSession,
        { once: true }
      );

      timeoutId = window.setTimeout(
        cleanupSession,
        3000
      );
    } else if (navigationType !== "POP") {
      jumpTo(0);
    }

    return cleanupSession;
  }, [location.key, location.hash, navigationType]);

  return null;
};

export default ScrollManager;

import { useEffect, useRef } from "react";
import gsap from "gsap";

import styles from "./CustomCursor.module.scss";

type CursorMode = "default" | "hover" | "view";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const modeRef = useRef<CursorMode>("default");

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (cursor === null || follower === null) {
      return;
    }

    /*
     * Кастомный курсор отключаем
     * на touch-устройствах.
     */
    const mediaQuery = window.matchMedia(
      "(pointer: coarse)"
    );

    if (mediaQuery.matches) {
      return;
    }

    /*
     * Изменение режима курсора.
     */
    const setCursorMode = (mode: CursorMode) => {
      if (modeRef.current === mode) {
        return;
      }

      modeRef.current = mode;

      cursor.dataset.mode = mode;
      follower.dataset.mode = mode;

      switch (mode) {
        case "default":
          gsap.to(cursor, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(follower, {
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
          });

          break;

        case "hover":
          gsap.to(cursor, {
            scale: 0.5,
            duration: 0.3,
            ease: "power3.out",
          });

          gsap.to(follower, {
            scale: 1.5,
            duration: 0.4,
            ease: "power3.out",
          });

          break;

        case "view":
          gsap.to(cursor, {
            scale: 0,
            duration: 0.25,
            ease: "power2.out",
          });

          gsap.to(follower, {
            scale: 1.8,
            duration: 0.4,
            ease: "power3.out",
          });

          break;
      }
    };

    /*
     * Движение курсора.
     */
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.08,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    /*
     * Наведение на интерактивный элемент.
     */
    const handleMouseEnter = (
      event: Event
    ) => {
      const target =
        event.currentTarget as HTMLElement;

      const mode =
        (target.dataset.cursor as CursorMode) ||
        "hover";

      setCursorMode(mode);
    };

    /*
     * Уход курсора с интерактивного элемента.
     */
    const handleMouseLeave = () => {
      setCursorMode("default");
    };

    /*
     * Все элементы с data-cursor.
     */
    const interactiveElements =
      document.querySelectorAll<HTMLElement>(
        "[data-cursor]"
      );

    interactiveElements.forEach((element) => {
      element.addEventListener(
        "mouseenter",
        handleMouseEnter
      );

      element.addEventListener(
        "mouseleave",
        handleMouseLeave
      );
    });

    /*
     * Отслеживаем движение мыши.
     */
    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    /*
     * Очистка.
     */
    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      interactiveElements.forEach((element) => {
        element.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );

        element.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      });

      gsap.killTweensOf(cursor);
      gsap.killTweensOf(follower);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={styles.cursor}
      />

      <div
        ref={followerRef}
        className={styles.follower}
      >
        <span className={styles.viewText}>
          VIEW
        </span>
      </div>
    </>
  );
};

export default CustomCursor;
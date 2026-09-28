import { useEffect } from "react";
import Lenis from "lenis";

/*
 * Единственный экземпляр Lenis хранится здесь же, чтобы
 * scrollToSection (клики по навигации) мог плавно скроллить
 * через тот же движок, а не спорить с ним за контроль над
 * скроллом нативным window.scrollTo.
 */
let lenisInstance: Lenis | null = null;

export const getLenisInstance = () =>
  lenisInstance;

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
    });

    lenisInstance = lenis;

    /*
     * При заходе сразу по ссылке с якорем (например,
     * "/#projects" с другой страницы) браузер пытается
     * проскроллить к нему ДО того, как Lenis перехватит
     * скролл, и Lenis сбрасывает позицию обратно к 0.
     * Поэтому докручиваем к якорю сами, уже после того как
     * Lenis готов.
     */
    if (window.location.hash) {
      const target = document.querySelector(
        window.location.hash
      );

      if (target instanceof HTMLElement) {
        requestAnimationFrame(() => {
          lenis.scrollTo(target, {
            offset: -90,
            immediate: true,
          });
        });
      }
    }

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
};

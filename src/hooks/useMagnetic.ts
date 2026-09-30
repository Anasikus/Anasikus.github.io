import { useEffect, useRef } from "react";

import gsap from "gsap";

const DEFAULT_STRENGTH = 0.35;

/*
 * "Магнитная" кнопка: элемент слегка тянется к курсору,
 * пока тот в его пределах, и плавно возвращается на место
 * при уходе курсора. gsap.quickTo даёт пружинистый, но
 * недёрганый отклик — быстрее, чем tween через setState.
 */
export const useMagnetic = <
  T extends HTMLElement
>(
  strength: number = DEFAULT_STRENGTH
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    /*
     * "Магнитный" сдвиг рассчитан на курсор мыши — на
     * touch-устройствах он бесполезен, а слушатели указателя
     * всё равно ничего не почувствуют без наведения.
     */
    const isCoarsePointer =
      window.matchMedia(
        "(pointer: coarse)"
      ).matches;

    if (prefersReducedMotion || isCoarsePointer) {
      return;
    }

    const xTo = gsap.quickTo(el, "x", {
      duration: 0.4,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(el, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      const rect =
        el.getBoundingClientRect();

      const relX =
        event.clientX -
        (rect.left + rect.width / 2);

      const relY =
        event.clientY -
        (rect.top + rect.height / 2);

      xTo(relX * strength);
      yTo(relY * strength);
    };

    const handlePointerLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener(
      "pointermove",
      handlePointerMove
    );

    el.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    return () => {
      el.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      el.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      xTo(0);
      yTo(0);
    };
  }, [strength]);

  return ref;
};

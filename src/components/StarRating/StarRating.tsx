import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import styles from "./StarRating.module.scss";

interface StarRatingProps {
  value: number;
  /* Если передан — звёзды кликабельны (форма отзыва). */
  onChange?: (value: number) => void;
  ariaLabel?: string;
  size?: "sm" | "md";
}

const STAR_VALUES = [1, 2, 3, 4, 5];

/*
 * Одна и та же звёздная шкала для показа готового рейтинга
 * (onChange не передан) и для выбора оценки в форме отзыва
 * (onChange передан — звёзды становятся кнопками).
 *
 * В интерактивном режиме наведение на звезду N подсвечивает
 * звёзды 1..N слева направо (а не только ту, на которую навели):
 * hoverValue держит номер звезды под курсором и на время
 * наведения подменяет собой value при расчёте заливки.
 *
 * В режиме показа (опубликованные отзывы) звёзды при появлении
 * на экране "выскакивают" по очереди слева направо — это чисто
 * CSS-анимация по классу .popped, которую включает свой лёгкий
 * IntersectionObserver, не завязанный на Reveal вокруг карточки.
 */
const StarRating = ({
  value,
  onChange,
  ariaLabel,
  size = "md",
}: StarRatingProps) => {
  const interactive = Boolean(onChange);

  const [hoverValue, setHoverValue] =
    useState<number | null>(null);

  const [popped, setPopped] = useState(
    interactive
  );

  const rootRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (interactive) {
      return;
    }

    const el = rootRef.current;

    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPopped(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [interactive]);

  const displayValue =
    hoverValue ?? value;

  return (
    <div
      ref={rootRef}
      className={`${styles.stars} ${
        size === "sm" ? styles.sm : ""
      } ${popped ? styles.popped : ""}`}
      role={interactive ? "radiogroup" : "img"}
      aria-label={
        ariaLabel ?? `${value} из 5`
      }
      onMouseLeave={
        interactive
          ? () => setHoverValue(null)
          : undefined
      }
    >
      {STAR_VALUES.map((star) =>
        interactive ? (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} из 5`}
            className={`${styles.star} ${
              star <= displayValue
                ? styles.filled
                : ""
            }`}
            onMouseEnter={() =>
              setHoverValue(star)
            }
            onFocus={() =>
              setHoverValue(star)
            }
            onBlur={() =>
              setHoverValue(null)
            }
            onClick={() =>
              onChange?.(star)
            }
          >
            ★
          </button>
        ) : (
          <span
            key={star}
            aria-hidden="true"
            style={
              {
                "--star-index": star - 1,
              } as CSSProperties
            }
            className={`${styles.star} ${
              star <= displayValue
                ? styles.filled
                : ""
            }`}
          >
            ★
          </span>
        )
      )}
    </div>
  );
};

export default StarRating;

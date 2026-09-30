import { useState } from "react";

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

  const displayValue =
    hoverValue ?? value;

  return (
    <div
      className={`${styles.stars} ${
        size === "sm" ? styles.sm : ""
      }`}
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

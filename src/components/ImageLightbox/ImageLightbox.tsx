import { useEffect } from "react";

import { useScrollLock } from "../../hooks/useScrollLock";

import styles from "./ImageLightbox.module.scss";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
}

/*
 * Просмотр картинок на весь экран: закрытие по крестику, клику
 * вне картинки и Esc, листание стрелками на экране и клавишами.
 */
const ImageLightbox = ({
  images,
  index,
  onIndexChange,
  closeLabel,
  prevLabel,
  nextLabel,
}: ImageLightboxProps) => {
  const isOpen = index !== null;

  useScrollLock(isOpen);

  useEffect(() => {
    if (index === null) {
      return;
    }

    const total = images.length;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onIndexChange(null);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onIndexChange((index - 1 + total) % total);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onIndexChange((index + 1) % total);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [index, images.length, onIndexChange]);

  if (index === null || !images[index]) {
    return null;
  }

  const image = images[index];

  const go = (step: number) =>
    onIndexChange(
      (index + step + images.length) % images.length
    );

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onIndexChange(null);
        }
      }}
    >
      <button
        type="button"
        className={`${styles.control} ${styles.close}`}
        onClick={() => onIndexChange(null)}
        aria-label={closeLabel}
      >
        ×
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.control} ${styles.prev}`}
            onClick={() => go(-1)}
            aria-label={prevLabel}
          >
            ←
          </button>

          <button
            type="button"
            className={`${styles.control} ${styles.next}`}
            onClick={() => go(1)}
            aria-label={nextLabel}
          >
            →
          </button>
        </>
      )}

      <figure
        className={styles.figure}
        role="dialog"
        aria-modal="true"
        aria-label={image.alt}
      >
        <img src={image.src} alt={image.alt} />

        <figcaption>
          {index + 1} / {images.length}
        </figcaption>
      </figure>
    </div>
  );
};

export default ImageLightbox;

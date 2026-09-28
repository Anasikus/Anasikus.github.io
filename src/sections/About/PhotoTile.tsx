import { useRef, type PointerEvent } from "react";

import styles from "./About.module.scss";

interface PhotoTileProps {
  src: string;
  ratio: number;
  alt: string;
  openLabel: string;
  hint: string;
  onOpen: () => void;
}

const MAX_TILT = 12;

/*
 * Карточка документа: лёгкий наклон в покое, а при наведении
 * тянется за курсором в 3D (rotateX/Y по позиции указателя) и
 * ловит блик. Значения кладутся в CSS-переменные — без setState,
 * чтобы не перерисовывать React на каждое движение мыши.
 */
const PhotoTile = ({
  src,
  ratio,
  alt,
  openLabel,
  hint,
  onOpen,
}: PhotoTileProps) => {
  const ref =
    useRef<HTMLButtonElement | null>(null);

  const handleMove = (
    event: PointerEvent<HTMLButtonElement>
  ) => {
    const el = ref.current;

    if (!el || event.pointerType === "touch") {
      return;
    }

    const rect = el.getBoundingClientRect();

    const px =
      (event.clientX - rect.left) / rect.width;

    const py =
      (event.clientY - rect.top) / rect.height;

    el.style.setProperty(
      "--rx",
      `${(0.5 - py) * MAX_TILT}deg`
    );

    el.style.setProperty(
      "--ry",
      `${(px - 0.5) * MAX_TILT}deg`
    );

    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;

    if (!el) {
      return;
    }

    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <button
      ref={ref}
      type="button"
      className={styles.photo}
      style={{ aspectRatio: ratio }}
      aria-label={openLabel}
      onClick={onOpen}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <img src={src} alt={alt} loading="lazy" />

      <span
        className={styles.photoHint}
        aria-hidden="true"
      >
        {hint}
      </span>
    </button>
  );
};

export default PhotoTile;

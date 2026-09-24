import { useEffect, useRef } from "react";

import styles from "./AmbientBackground.module.scss";

/*
 * Максимальное смещение (px) каждого пятна от курсора —
 * разная сила и знак у каждого создают лёгкое ощущение
 * глубины (ближние/дальние слои двигаются по-разному),
 * а не просто одинаковый сдвиг втроём разом.
 */
const PARALLAX_STRENGTH = [22, -16, 26];

const LERP_FACTOR = 0.06;

const GRID_SPACING = 46;
const INTERACTION_RADIUS = 160;
const DOT_IDLE_SIZE = 5;
const DOT_ACTIVE_SIZE = 15;
const DOT_IDLE_ALPHA = 0.3;
const DOT_ACTIVE_ALPHA = 0.9;

const SPRITE_SIZE = 64;

/*
 * Один общий "спрайт" точки — канвас с мягким радиальным
 * градиентом (не плоская заливка), нарисованный один раз на
 * все секции. Дальше он просто масштабируется/накладывается
 * через drawImage с разной прозрачностью — на порядок дешевле,
 * чем создавать градиент и рисовать arc() для каждой точки
 * заново на каждом кадре.
 */
let sharedDotSprite: HTMLCanvasElement | null =
  null;

const getDotSprite = () => {
  if (sharedDotSprite) {
    return sharedDotSprite;
  }

  const sprite =
    document.createElement("canvas");

  sprite.width = SPRITE_SIZE;
  sprite.height = SPRITE_SIZE;

  const sctx = sprite.getContext("2d");

  if (sctx) {
    const gradient =
      sctx.createRadialGradient(
        SPRITE_SIZE / 2,
        SPRITE_SIZE / 2,
        0,
        SPRITE_SIZE / 2,
        SPRITE_SIZE / 2,
        SPRITE_SIZE / 2
      );

    gradient.addColorStop(
      0,
      "rgba(216, 180, 254, 1)"
    );

    gradient.addColorStop(
      0.5,
      "rgba(192, 132, 252, 0.7)"
    );

    gradient.addColorStop(
      1,
      "rgba(168, 85, 247, 0)"
    );

    sctx.fillStyle = gradient;
    sctx.fillRect(
      0,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE
    );
  }

  sharedDotSprite = sprite;

  return sprite;
};

interface DotRow {
  y: number;
  xs: number[];
}

interface AmbientBackgroundProps {
  /*
   * Сетка точек — тяжёлая часть эффекта (canvas + rAF), поэтому
   * она включается явно только там, где действительно нужна
   * (сейчас — «О себе» и «От теории к практике»). Цветные пятна
   * рендерятся всегда, они дешёвые (чистый CSS).
   */
  showGrid?: boolean;
}

/*
 * Декоративный слой из трёх размытых цветовых пятен + (опционально)
 * сетки точек-«узора» на canvas. Пятна медленно «дышат» (см.
 * keyframes в module.scss) и тянутся за курсором с инерцией (lerp).
 * Точки сетки в радиусе курсора подсвечиваются и увеличиваются —
 * узор как будто реагирует на присутствие курсора. Сама сетка
 * замаскирована (см. .grid в module.scss): плавно проявляется
 * ниже заголовка секции и гаснет там, где поверх неё уже лежит
 * цветное пятно — на однотонном чёрном фоне точки смотрятся,
 * а поверх фиолетового свечения превращаются в кашу.
 *
 * Секция может быть очень высокой (таймлайн «О себе» — несколько
 * экранов), поэтому сетка хранится по строкам: на каждом кадре
 * рисуются только строки, попадающие в текущий видимый диапазон
 * viewport'а, а не вся сетка секции целиком. А IntersectionObserver
 * полностью останавливает rAF-цикл, пока секция не видна.
 */
const AmbientBackground = ({
  showGrid = false,
}: AmbientBackgroundProps) => {
  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const blobRefs = useRef<
    Array<HTMLSpanElement | null>
  >([]);

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const canvas = showGrid
      ? canvasRef.current
      : null;

    const ctx = canvas?.getContext("2d") ?? null;
    const sprite = ctx ? getDotSprite() : null;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;

    let pointerX = -9999;
    let pointerY = -9999;
    let hasPointer = false;

    let rows: DotRow[] = [];

    let width = 0;
    let height = 0;

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    const rebuildGrid = () => {
      if (!canvas) {
        return;
      }

      const rect =
        container.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const nextRows: DotRow[] = [];

      for (
        let y = GRID_SPACING / 2;
        y < height;
        y += GRID_SPACING
      ) {
        const xs: number[] = [];

        for (
          let x = GRID_SPACING / 2;
          x < width;
          x += GRID_SPACING
        ) {
          xs.push(x);
        }

        nextRows.push({ y, xs });
      }

      rows = nextRows;
    };

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      targetX =
        (event.clientX /
          window.innerWidth) *
          2 -
        1;

      targetY =
        (event.clientY /
          window.innerHeight) *
          2 -
        1;

      const rect =
        container.getBoundingClientRect();

      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      hasPointer = true;
    };

    const handlePointerLeave = () => {
      hasPointer = false;
    };

    const drawDot = (
      x: number,
      y: number,
      size: number,
      alpha: number
    ) => {
      if (!ctx || !sprite) {
        return;
      }

      ctx.globalAlpha = alpha;

      ctx.drawImage(
        sprite,
        x - size / 2,
        y - size / 2,
        size,
        size
      );
    };

    const tick = () => {
      currentX +=
        (targetX - currentX) *
        LERP_FACTOR;

      currentY +=
        (targetY - currentY) *
        LERP_FACTOR;

      blobRefs.current.forEach(
        (blob, index) => {
          if (!blob) {
            return;
          }

          const strength =
            PARALLAX_STRENGTH[index] ?? 20;

          blob.style.setProperty(
            "--parallax-x",
            `${currentX * strength}px`
          );

          blob.style.setProperty(
            "--parallax-y",
            `${currentY * strength}px`
          );
        }
      );

      if (canvas && ctx && sprite) {
        ctx.setTransform(
          dpr,
          0,
          0,
          dpr,
          0,
          0
        );
        ctx.clearRect(0, 0, width, height);

        /*
         * Строки сетки идут по порядку с постоянным шагом, так
         * что видимый диапазон вычисляется напрямую по формуле,
         * без перебора всего массива — O(видимых строк), а не
         * O(строк секции).
         */
        const buffer = GRID_SPACING * 2;

        const firstVisibleY = -buffer;

        const lastVisibleY =
          window.innerHeight + buffer;

        const rect =
          container.getBoundingClientRect();

        const startIndex = Math.max(
          0,
          Math.floor(
            (firstVisibleY -
              rect.top -
              GRID_SPACING / 2) /
              GRID_SPACING
          )
        );

        const endIndex = Math.min(
          rows.length - 1,
          Math.ceil(
            (lastVisibleY -
              rect.top -
              GRID_SPACING / 2) /
              GRID_SPACING
          )
        );

        for (
          let rowIndex = startIndex;
          rowIndex <= endIndex;
          rowIndex += 1
        ) {
          const row = rows[rowIndex];

          if (!row) {
            continue;
          }

          for (const x of row.xs) {
            if (
              hasPointer &&
              pointerX >
                -INTERACTION_RADIUS &&
              pointerX <
                width + INTERACTION_RADIUS &&
              pointerY >
                -INTERACTION_RADIUS &&
              pointerY <
                height + INTERACTION_RADIUS
            ) {
              const dx = x - pointerX;
              const dy = row.y - pointerY;
              const distance = Math.sqrt(
                dx * dx + dy * dy
              );

              if (
                distance <=
                INTERACTION_RADIUS
              ) {
                const intensity =
                  1 -
                  distance /
                    INTERACTION_RADIUS;

                const size =
                  DOT_IDLE_SIZE +
                  intensity *
                    (DOT_ACTIVE_SIZE -
                      DOT_IDLE_SIZE);

                const alpha =
                  DOT_IDLE_ALPHA +
                  intensity *
                    (DOT_ACTIVE_ALPHA -
                      DOT_IDLE_ALPHA);

                drawDot(
                  x,
                  row.y,
                  size,
                  alpha
                );

                continue;
              }
            }

            drawDot(
              x,
              row.y,
              DOT_IDLE_SIZE,
              DOT_IDLE_ALPHA
            );
          }
        }

        ctx.globalAlpha = 1;
      }

      rafId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (rafId !== null) {
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    rebuildGrid();

    const resizeObserver = new ResizeObserver(
      () => rebuildGrid()
    );

    resizeObserver.observe(container);

    const intersectionObserver =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startLoop();
          } else {
            stopLoop();
          }
        },
        { rootMargin: "200px 0px" }
      );

    intersectionObserver.observe(container);

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    window.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      stopLoop();
    };
  }, [showGrid]);

  return (
    <div
      ref={containerRef}
      className={styles.ambient}
      aria-hidden="true"
    >
      {showGrid && (
        <canvas
          ref={canvasRef}
          className={styles.grid}
        />
      )}

      <span
        ref={(el) => {
          blobRefs.current[0] = el;
        }}
        className={`${styles.blob} ${styles.blobOne}`}
      />

      <span
        ref={(el) => {
          blobRefs.current[1] = el;
        }}
        className={`${styles.blob} ${styles.blobTwo}`}
      />

      <span
        ref={(el) => {
          blobRefs.current[2] = el;
        }}
        className={`${styles.blob} ${styles.blobThree}`}
      />
    </div>
  );
};

export default AmbientBackground;

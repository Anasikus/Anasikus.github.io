import { useEffect, useRef } from "react";

import styles from "./FlowField.module.scss";

const buildPermutation = (seed: number) => {
  const table = Array.from(
    { length: 256 },
    (_, i) => i
  );

  let state = seed;

  const random = () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };

  for (let i = 255; i > 0; i -= 1) {
    const j = Math.floor(
      random() * (i + 1)
    );

    [table[i], table[j]] = [
      table[j],
      table[i],
    ];
  }

  return [...table, ...table];
};

const PERM = buildPermutation(1337);

const fade = (t: number) =>
  t * t * t * (t * (t * 6 - 15) + 10);

const lerp = (
  a: number,
  b: number,
  t: number
) => a + t * (b - a);

const grad = (
  hash: number,
  x: number,
  y: number
) => {
  const h = hash & 3;
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;

  return (
    (h & 1 ? -u : u) +
    (h & 2 ? -2 * v : 2 * v)
  );
};

const noise2D = (
  x: number,
  y: number
) => {
  const xi = Math.floor(x) & 255;
  const yi = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const u = fade(xf);
  const v = fade(yf);

  const aa = PERM[PERM[xi] + yi];
  const ab = PERM[PERM[xi] + yi + 1];
  const ba = PERM[PERM[xi + 1] + yi];
  const bb =
    PERM[PERM[xi + 1] + yi + 1];

  const x1 = lerp(
    grad(aa, xf, yf),
    grad(ba, xf - 1, yf),
    u
  );

  const x2 = lerp(
    grad(ab, xf, yf - 1),
    grad(bb, xf - 1, yf - 1),
    u
  );

  return lerp(x1, x2, v);
};

const NOISE_FREQ = 0.0022;
const DRIFT_SPEED = 0.00004;
const SWIRLS = 2.4;

const VORTEX_RADIUS = 260;
const VORTEX_MIX = 0.85;

const LINE_COUNT = 64;
const STEPS = 110;
const STEP_LENGTH = 6.5;

const SHIMMER_SPEED = 0.0006;

interface Pointer {
  x: number;
  y: number;
}

interface Line {
  seedX: number;
  seedY: number;
  phase: number;
  widthJitter: number;
  alphaJitter: number;
}

const mixChannel = (
  a: number,
  b: number,
  t: number
) => Math.round(lerp(a, b, t));

const DARK = [16, 11, 22];
const BRIGHT = [186, 120, 250];

const colorAt = (t: number) => {
  const r = mixChannel(DARK[0], BRIGHT[0], t);
  const g = mixChannel(DARK[1], BRIGHT[1], t);
  const b = mixChannel(DARK[2], BRIGHT[2], t);

  return `rgb(${r}, ${g}, ${b})`;
};

const FlowField = () => {
  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    /*
     * На touch-устройствах курсора нет, поэтому и вихрь вокруг
     * него, и сам смысл гонять анимацию 60 раз в секунду ради
     * эффекта, который никто не увидит в движении, отпадают —
     * это была одна из самых тяжёлых частей главного экрана на
     * телефоне. Рисуем один статичный кадр вместо цикла.
     */
    const isCoarsePointer = window.matchMedia(
      "(pointer: coarse)"
    ).matches;

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    let width = 0;
    let height = 0;
    let lines: Line[] = [];
    let rafId: number | null = null;
    let pointer: Pointer | null = null;
    let targetPointer: Pointer | null = null;

    const buildLines = () => {
      const rect =
        container.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const cols = Math.ceil(
        Math.sqrt(
          (LINE_COUNT * width) / height
        )
      );

      const rowsCount = Math.ceil(
        LINE_COUNT / cols
      );

      const nextLines: Line[] = [];

      for (
        let row = 0;
        row < rowsCount;
        row += 1
      ) {
        for (
          let col = 0;
          col < cols;
          col += 1
        ) {
          const jitterX =
            (Math.random() - 0.5) *
            (width / cols);

          const jitterY =
            (Math.random() - 0.5) *
            (height / rowsCount);

          nextLines.push({
            seedX:
              ((col + 0.5) / cols) *
                width +
              jitterX,
            seedY:
              ((row + 0.5) /
                rowsCount) *
                height +
              jitterY,
            phase:
              Math.random() *
              Math.PI *
              2,
            widthJitter:
              0.7 + Math.random() * 1,
            alphaJitter:
              0.35 +
              Math.random() * 0.45,
          });
        }
      }

      lines = nextLines;
    };

    const angleAt = (
      x: number,
      y: number,
      time: number
    ) => {
      const n1 = noise2D(
        x * NOISE_FREQ +
          time * DRIFT_SPEED,
        y * NOISE_FREQ
      );

      const n2 = noise2D(
        x * NOISE_FREQ * 2.1 + 40,
        y * NOISE_FREQ * 2.1 +
          time * DRIFT_SPEED * 1.4
      );

      const baseAngle =
        (n1 * 0.65 + n2 * 0.35) *
        Math.PI *
        2 *
        SWIRLS;

      let dirX = Math.cos(baseAngle);
      let dirY = Math.sin(baseAngle);

      if (pointer) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const dist = Math.hypot(dx, dy);

        if (
          dist < VORTEX_RADIUS &&
          dist > 0.001
        ) {
          const falloff =
            1 - dist / VORTEX_RADIUS;

          const nx = dx / dist;
          const ny = dy / dist;

          const vx = -ny;
          const vy = nx;

          const mix =
            falloff *
            falloff *
            VORTEX_MIX;

          dirX =
            dirX * (1 - mix) +
            vx * mix;

          dirY =
            dirY * (1 - mix) +
            vy * mix;
        }
      }

      return Math.atan2(dirY, dirX);
    };

    const renderFrame = (
      time: number
    ) => {
      if (targetPointer) {
        pointer = pointer
          ? {
              x:
                pointer.x +
                (targetPointer.x -
                  pointer.x) *
                  0.18,
              y:
                pointer.y +
                (targetPointer.y -
                  pointer.y) *
                  0.18,
            }
          : { ...targetPointer };
      }

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (const line of lines) {
        let x = line.seedX;
        let y = line.seedY;

        const shimmer =
          (Math.sin(
            time * SHIMMER_SPEED +
              line.phase
          ) +
            1) /
          2;

        ctx.strokeStyle = colorAt(
          shimmer * 0.8
        );

        ctx.globalAlpha =
          line.alphaJitter *
          (0.55 + shimmer * 0.45);

        ctx.lineWidth =
          line.widthJitter;

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (
          let step = 0;
          step < STEPS;
          step += 1
        ) {
          const angle = angleAt(
            x,
            y,
            time
          );

          x += Math.cos(angle) * STEP_LENGTH;
          y += Math.sin(angle) * STEP_LENGTH;

          ctx.lineTo(x, y);

          if (
            x < -60 ||
            x > width + 60 ||
            y < -60 ||
            y > height + 60
          ) {
            break;
          }
        }

        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    const tick = (time: number) => {
      renderFrame(time);

      rafId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (isCoarsePointer) {
        renderFrame(0);

        return;
      }

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

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      const rect =
        container.getBoundingClientRect();

      targetPointer = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handlePointerLeave = () => {
      targetPointer = null;
      pointer = null;
    };

    buildLines();

    const resizeObserver = new ResizeObserver(
      () => {
        buildLines();

        if (isCoarsePointer) {
          renderFrame(0);
        }
      }
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

    /*
     * Контейнер — декоративный слой с pointer-events: none
     * (клики должны проходить сквозь него к контенту), поэтому
     * сам он события не получит — слушаем на window, а нужные
     * координаты пересчитываем относительно контейнера вручную.
     * На touch-устройствах курсора не бывает, поэтому вихрь
     * вокруг него не нужен — слушатели не вешаем совсем.
     */
    if (!isCoarsePointer) {
      window.addEventListener(
        "pointermove",
        handlePointerMove,
        { passive: true }
      );

      window.addEventListener(
        "pointerleave",
        handlePointerLeave
      );
    }

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
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.field}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FlowField;

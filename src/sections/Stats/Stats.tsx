import { useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "../../i18n/useLanguage";

import AmbientBackground from "../../components/AmbientBackground/AmbientBackground";

import {
  fetchTechStats,
  GITHUB_USERNAME,
  type TechStats,
} from "../../utils/githubStats";

import styles from "./Stats.module.scss";

gsap.registerPlugin(ScrollTrigger);

/*
 * Официальные цвета linguist (жёлтый JS, оранжевый HTML,
 * зелёный C# и т.д.) на GitHub нужны, чтобы с одного взгляда
 * различать десятки чужих репозиториев в списке. Здесь всего
 * пять полос на один сайт, и рядом с каждой уже есть подпись —
 * различать цветом нечего. Зато сайт целиком выстроен вокруг
 * одного фиолетового акцента (кнопки, теги, ссылки, свечение
 * фона), и внезапный жёлто-зелёно-синий ряд рядом с этим смотрелся
 * бы случайным пятном. Поэтому обе шкалы (и языки, и стек)
 * раскрашены одним и тем же фиолетовым семейством — по рангу,
 * от светлого к глубокому.
 */
const BAR_PALETTE = [
  "#d8b4fe",
  "#c084fc",
  "#a855f7",
  "#9333ea",
  "#7c3aed",
  "#6d28d9",
  "#581c87",
];

const colorForIndex = (index: number) =>
  BAR_PALETTE[index % BAR_PALETTE.length];

type Status = "loading" | "ready" | "error";

const StatBar = ({
  name,
  percent,
  color,
}: {
  name: string;
  percent: number;
  color: string;
}) => (
  <div className={styles.row}>
    <div className={styles.rowHead}>
      <span className={styles.rowName}>{name}</span>
      <span
        className={styles.rowPercent}
        data-percent={percent}
      >
        0.0%
      </span>
    </div>

    <div className={styles.track}>
      <div
        className={styles.bar}
        style={{
          width: `${percent}%`,
          background: color,
        }}
      />
    </div>
  </div>
);

const Stats = () => {
  const { t } = useLanguage();

  const sectionRef = useRef<HTMLElement | null>(null);

  const [stats, setStats] = useState<TechStats | null>(
    null
  );

  const [status, setStatus] = useState<Status>("loading");

  useLayoutEffect(() => {
    let cancelled = false;

    fetchTechStats()
      .then((result) => {
        if (cancelled) {
          return;
        }

        setStats(result);

        setStatus(
          result.languages.length === 0
            ? "error"
            : "ready"
        );
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    if (!stats) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.bar}`,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.06,
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      const percentEls =
        sectionRef.current?.querySelectorAll<HTMLSpanElement>(
          `.${styles.rowPercent}`
        ) ?? [];

      percentEls.forEach((el, index) => {
        const target = Number(
          el.dataset.percent ?? 0
        );

        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.06,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${counter.value.toFixed(
              1
            )}%`;
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [stats]);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className={styles.section}
    >
      <AmbientBackground />

      <div className={styles.container}>
        <span className={styles.label}>
          {t.stats.label}
        </span>

        <h2 className={styles.heading}>
          {t.stats.headingLine1}
          <br />
          {t.stats.headingLine2}
        </h2>

        <p className={styles.description}>
          {t.stats.description}
        </p>

        {status === "loading" && (
          <p className={styles.state}>
            {t.stats.loading}
          </p>
        )}

        {status === "error" && (
          <p className={styles.stateError}>
            {t.stats.error}
          </p>
        )}

        {stats && (
          <div className={styles.groups}>
            <div className={styles.group}>
              <h3>{t.stats.languagesTitle}</h3>

              <div className={styles.bars}>
                {stats.languages.map((entry, index) => (
                  <StatBar
                    key={entry.name}
                    name={entry.name}
                    percent={entry.percent}
                    color={colorForIndex(index)}
                  />
                ))}
              </div>
            </div>

            <div className={styles.group}>
              <h3>{t.stats.stackTitle}</h3>

              <div className={styles.bars}>
                {stats.stack.map((entry, index) => (
                  <StatBar
                    key={entry.name}
                    name={entry.name}
                    percent={entry.percent}
                    color={colorForIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className={styles.footnote}>
          <span>
            {t.stats.source.replace(
              "{username}",
              GITHUB_USERNAME
            )}
          </span>

          {stats?.updatedAt && (
            <span>
              {t.stats.updatedAt}:{" "}
              {new Date(
                stats.updatedAt
              ).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Stats;

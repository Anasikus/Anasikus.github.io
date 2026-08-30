import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { experience } from "../../data/experience";

import styles from "./Experience.module.scss";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const [hoveredIndex, setHoveredIndex] =
    useState<number | null>(null);

  const selectedExperience =
    selectedIndex !== null
      ? experience[selectedIndex]
      : null;

  const timelineStart =
    new Date("2024-09-01").getTime();

    const timelineEnd =
    new Date("2027-01-01").getTime();

  const totalDuration =
    timelineEnd - timelineStart;

  const getStartTime = (
    date: string
  ) => {
    return new Date(
      `${date}-01`
    ).getTime();
  };

  const getEndTime = (
    date: string
  ) => {
    const [year, month] =
      date.split("-").map(Number);

    return new Date(
      year,
      month,
      1
    ).getTime();
  };

  const getTimelinePosition = (
    date: string
  ) => {
    const value =
      getStartTime(date);

    return (
      ((value - timelineStart) /
        totalDuration) *
      100
    );
  };

  const getTimelineWidth = (
    startDate: string,
    endDate: string
  ) => {
    const start =
      getStartTime(startDate);

    const end =
      getEndTime(endDate);

    return (
      ((end - start) /
        totalDuration) *
      100
    );
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline =
        sectionRef.current?.querySelector(
          `.${styles.timeline}`
        );

      if (!timeline) {
        return;
      }

      gsap.fromTo(
        timeline,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timeline,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        event.preventDefault();

        setSelectedIndex(null);

        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        setSelectedIndex(
          (current) => {
            if (current === null) {
              return null;
            }

            return current === 0
              ? experience.length - 1
              : current - 1;
          }
        );
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        setSelectedIndex(
          (current) => {
            if (current === null) {
              return null;
            }

            return current ===
              experience.length - 1
              ? 0
              : current + 1;
          }
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedIndex]);

  const handlePrevious = () => {
    setSelectedIndex(
      (current) => {
        if (current === null) {
          return null;
        }

        return current === 0
          ? experience.length - 1
          : current - 1;
      }
    );
  };

  const handleNext = () => {
    setSelectedIndex(
      (current) => {
        if (current === null) {
          return null;
        }

        return current ===
          experience.length - 1
          ? 0
          : current + 1;
      }
    );
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={styles.section}
        id="experience"
      >
        <div className={styles.container}>
          <header className={styles.heading}>
            <span className={styles.label}>
              03 / ОПЫТ
            </span>

            <h2>
              От теории к практике
            </h2>

            <p>
              Проекты, практика и
              стажировка, которые стали
              частью моего
              профессионального пути.
            </p>
          </header>

          <div
            className={
              styles.timelineWrapper
            }
          >
            <div
              className={styles.timeline}
            >
              <div
                className={
                  styles.timelineYears
                }
              >
                <span>2024</span>
                <span>2025</span>
                <span>2026</span>
              </div>

              <div
                className={
                  styles.timelineTrack
                }
              >
                <svg
                  className={
                    styles.futurePath
                  }
                  viewBox="0 0 1000 300"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="futureGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--color-purple-light)"
                      />

                      <stop
                        offset="50%"
                        stopColor="var(--color-purple)"
                      />

                      <stop
                        offset="100%"
                        stopColor="#c084fc"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    className={
                      styles.futureDashedPath
                    }
                    d="M 0 30 H 920 Q 955 30 955 65 Q 955 105 915 135 H 865"
                  />

                    <path
                    className={styles.futureHeart}
                    d="
                        M 850 165
                        C 832 140 790 145 790 177
                        C 790 207 820 225 850 245
                        C 880 225 910 207 910 177
                        C 910 145 868 140 850 165
                        Z
                    "
                    />
                    <path
                    className={styles.futureArrow}
                    d="
                        M 850 270
                        C 850 258 850 250 850 242
                        M 850 270
                        L 838 258
                        M 850 270
                        L 862 258
                    "
                    />
                </svg>

                {experience.map(
                (item, index) => {
                    const originalLeft =
                    getTimelinePosition(
                        item.startDate
                    );

                    const originalWidth =
                    getTimelineWidth(
                        item.startDate,
                        item.endDate
                    );

                    const isShellPrint =
                    item.title === "ШелкоПринт";

                    /*
                    * Для ШелкоПринта:
                    *
                    * визуальная линия:
                    * 1 точка → 3 точка
                    *
                    * текст:
                    * 2 точка → 3 точка
                    *
                    * hover:
                    * 2 точка → 3 точка
                    */
                    const visualLeft =
                    originalLeft;

                    const visualWidth =
                    originalWidth;

                    const interactionLeft =
                    isShellPrint
                        ? getTimelinePosition(
                            "2025-09"
                        ) - originalLeft
                        : 0;

                    const interactionWidth =
                    isShellPrint
                        ? originalWidth -
                        interactionLeft
                        : originalWidth;

                    const isHovered =
                    hoveredIndex === index;

                    return (
                    <div
                        key={`${item.title}-${index}`}
                        className={`
                        ${styles.experienceItem}
                        ${
                            isHovered
                            ? styles.experienceItemActive
                            : ""
                        }
                        ${
                            isShellPrint
                            ? styles.shellPrint
                            : styles.websiteItem
                        }
                        `}
                        style={{
                        left: `${visualLeft}%`,
                        width: `${visualWidth}%`,
                        zIndex: isHovered
                            ? 20
                            : isShellPrint
                            ? 12
                            : 11,
                        }}
                    >
                        <button
                        type="button"
                        className={
                            styles.experienceHitArea
                        }
                        style={{
                            left: isShellPrint
                            ? `${interactionLeft}%`
                            : "0%",
                            width: isShellPrint
                            ? `${interactionWidth}%`
                            : "100%",
                        }}
                        onMouseEnter={() =>
                            setHoveredIndex(index)
                        }
                        onMouseLeave={() =>
                            setHoveredIndex(null)
                        }
                        onFocus={() =>
                            setHoveredIndex(index)
                        }
                        onBlur={() =>
                            setHoveredIndex(null)
                        }
                        onClick={() =>
                            setSelectedIndex(index)
                        }
                        aria-label={`Подробнее: ${item.title}`}
                        />

                        <span
                        className={
                            styles.itemDate
                        }
                        style={{
                            left: isShellPrint
                            ? `${interactionLeft}%`
                            : "0%",
                        }}
                        >
                        {item.period}
                        </span>

                        <span
                        className={
                            styles.itemLine
                        }
                        />

                        <span
                        className={
                            styles.itemPointStart
                        }
                        />

                        <span
                        className={
                            styles.itemPointEnd
                        }
                        />

                        <span
                        className={
                            styles.itemInfo
                        }
                        style={{
                            left: isShellPrint
                            ? `${interactionLeft}%`
                            : "0%",
                        }}
                        >
                        <span
                            className={
                            styles.itemTitle
                            }
                        >
                            {item.title}
                        </span>

                        <span
                            className={
                            styles.itemPosition
                            }
                        >
                            {item.position}
                        </span>
                        </span>
                    </div>
                    );
                }
                )}

                <div
                  className={styles.now}
                >
                  <span />
                  Сегодня
                </div>
              </div>
            </div>
          </div>

          <div className={styles.hint}>
            <span>↗</span>
            Нажмите на отрезок,
            чтобы узнать подробнее
          </div>
        </div>
      </section>

      {selectedExperience && (
        <div
          className={
            styles.modalOverlay
          }
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedIndex(null);
            }
          }}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={
              selectedExperience.title
            }
          >
            <button
              type="button"
              className={styles.close}
              onClick={() =>
                setSelectedIndex(null)
              }
              aria-label="Закрыть"
            >
              ×
            </button>

            <div
              className={
                styles.modalHeader
              }
            >
              <span
                className={
                  styles.modalNumber
                }
              >
                {String(
                  (selectedIndex ?? 0) +
                    1
                ).padStart(2, "0")}
              </span>

              <span
                className={
                  styles.modalPeriod
                }
              >
                {
                  selectedExperience.period
                }
              </span>
            </div>

            <div
              className={
                styles.modalContent
              }
            >
              <h3>
                {
                  selectedExperience.title
                }
              </h3>

              <span
                className={
                  styles.modalPosition
                }
              >
                {
                  selectedExperience.position
                }
              </span>

              <p>
                {
                  selectedExperience.description
                }
              </p>

              <div
                className={
                  styles.modalTechnologies
                }
              >
                <span
                  className={
                    styles.technologiesLabel
                  }
                >
                  ТЕХНОЛОГИИ
                </span>

                <div
                  className={
                    styles.technologies
                  }
                >
                  {selectedExperience.technologies.map(
                    (technology) => (
                      <span
                        key={technology}
                      >
                        {technology}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <div
              className={
                styles.modalFooter
              }
            >
              <button
                type="button"
                className={
                  styles.navigationButton
                }
                onClick={
                  handlePrevious
                }
                aria-label="Предыдущий опыт"
              >
                <span>←</span>
                <small>
                  Назад
                </small>
              </button>

              <span
                className={
                  styles.counter
                }
              >
                {(selectedIndex ?? 0) +
                  1}{" "}
                / {experience.length}
              </span>

              <button
                type="button"
                className={
                  styles.navigationButton
                }
                onClick={handleNext}
                aria-label="Следующий опыт"
              >
                <small>
                  Далее
                </small>
                <span>→</span>
              </button>
            </div>

            <span
              className={
                styles.keyboardHint
              }
            >
              ESC — закрыть&nbsp;&nbsp;
              ← → — переключить
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Experience;

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getLocalizedExperience } from "../../i18n/content/experience";
import { useLanguage } from "../../i18n/useLanguage";
import { useScrollLock } from "../../hooks/useScrollLock";

import AmbientBackground from "../../components/AmbientBackground/AmbientBackground";

import styles from "./Experience.module.scss";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const { t, language } = useLanguage();

  const localizedExperience =
    getLocalizedExperience(language);

  const sectionRef =
    useRef<HTMLElement | null>(null);

  const rowRefs = useRef<
    Array<HTMLLIElement | null>
  >([]);

  const progressRef =
    useRef<HTMLDivElement | null>(null);

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const selectedExperience =
    selectedIndex !== null
      ? localizedExperience[selectedIndex]
      : null;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          {
            scaleY: 0,
          },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger:
                sectionRef.current,
              start: "top 70%",
              end: "bottom 75%",
              scrub: 0.6,
            },
          }
        );
      }

      rowRefs.current.forEach(
        (row) => {
          if (!row) {
            return;
          }

          const dot =
            row.querySelector(
              `.${styles.dot}`
            );

          const card =
            row.querySelectorAll(
              `.${styles.card}, .${styles.cardLinks}`
            );

          const side =
            row.dataset.side ===
            "right"
              ? 1
              : -1;

          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: 48 * side,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            dot,
            {
              scale: 0,
            },
            {
              scale: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  useScrollLock(selectedIndex !== null);

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
              ? localizedExperience.length - 1
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
              localizedExperience.length - 1
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
  }, [
    selectedIndex,
    localizedExperience.length,
  ]);

  const handlePrevious = () => {
    setSelectedIndex(
      (current) => {
        if (current === null) {
          return null;
        }

        return current === 0
          ? localizedExperience.length - 1
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
          localizedExperience.length - 1
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
        <AmbientBackground showGrid />

        <div className={styles.container}>
          <header className={styles.heading}>
            <span className={styles.label}>
              {t.experience.label}
            </span>

            <h2>
              {t.experience.heading}
            </h2>

            <p>
              {t.experience.description}
            </p>
          </header>

          <div
            className={styles.timeline}
          >
            <div
              className={
                styles.timelineLine
              }
            >
              <div
                ref={progressRef}
                className={
                  styles.timelineProgress
                }
              />
            </div>

            <ol
              className={
                styles.timelineList
              }
            >
              {localizedExperience.map(
                (item, index) => (
                  <li
                    key={index}
                    ref={(el) => {
                      rowRefs.current[
                        index
                      ] = el;
                    }}
                    className={
                      styles.row
                    }
                    data-side={
                      index % 2 === 0
                        ? "left"
                        : "right"
                    }
                  >
                    <span
                      className={
                        styles.dot
                      }
                      aria-hidden="true"
                    />

                    <div
                      className={
                        styles.cardWrap
                      }
                    >
                    <button
                      type="button"
                      className={
                        styles.card
                      }
                      onClick={() =>
                        setSelectedIndex(
                          index
                        )
                      }
                    >
                      <span
                        className={
                          styles.cardPeriod
                        }
                      >
                        {item.period}
                      </span>

                      <h3
                        className={
                          styles.cardTitle
                        }
                      >
                        {item.title}
                      </h3>

                      <span
                        className={
                          styles.cardPosition
                        }
                      >
                        {item.position}
                      </span>

                      <p
                        className={
                          styles.cardDescription
                        }
                      >
                        {
                          item.description
                        }
                      </p>

                      <div
                        className={
                          styles.cardTech
                        }
                      >
                        {item.technologies
                          .slice(0, 4)
                          .map(
                            (
                              technology
                            ) => (
                              <span
                                key={
                                  technology
                                }
                              >
                                {
                                  technology
                                }
                              </span>
                            )
                          )}

                        {item
                          .technologies
                          .length >
                          4 && (
                          <span
                            className={
                              styles.cardTechMore
                            }
                          >
                            +
                            {item
                              .technologies
                              .length -
                              4}
                          </span>
                        )}
                      </div>

                      <span
                        className={
                          styles.cardCta
                        }
                      >
                        {t.experience.more}
                        <span>→</span>
                      </span>
                    </button>

                    {item.links && (
                      <div
                        className={
                          styles.cardLinks
                        }
                      >
                        {item.links.map(
                          (link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={
                                styles.linkPill
                              }
                            >
                              {link.kind ===
                              "github"
                                ? "GitHub"
                                : t.experience
                                    .linkSite}
                              <span>↗</span>
                            </a>
                          )
                        )}
                      </div>
                    )}
                    </div>
                  </li>
                )
              )}

              <li
                className={
                  styles.nowRow
                }
              >
                <span
                  className={`${styles.dot} ${styles.dotNow}`}
                  aria-hidden="true"
                />

                <span
                  className={
                    styles.nowLabel
                  }
                >
                  {t.experience.now}
                </span>
              </li>
            </ol>
          </div>

          <div className={styles.hint}>
            <span>↗</span>
            {t.experience.hint}
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
            data-lenis-prevent
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
              aria-label={
                t.experience.modalClose
              }
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

              {selectedExperience.links && (
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
                    {
                      t.experience
                        .linksLabel
                    }
                  </span>

                  <div
                    className={
                      styles.modalLinks
                    }
                  >
                    {selectedExperience.links.map(
                      (link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={
                            styles.linkPill
                          }
                        >
                          {link.kind ===
                          "github"
                            ? "GitHub"
                            : t.experience
                                .linkSite}
                          <span>↗</span>
                        </a>
                      )
                    )}
                  </div>
                </div>
              )}

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
                  {
                    t.experience
                      .modalTechnologiesLabel
                  }
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
                aria-label={
                  t.experience
                    .modalPrevAria
                }
              >
                <span>←</span>
                <small>
                  {
                    t.experience
                      .modalPrev
                  }
                </small>
              </button>

              <span
                className={
                  styles.counter
                }
              >
                {(selectedIndex ?? 0) +
                  1}{" "}
                / {localizedExperience.length}
              </span>

              <button
                type="button"
                className={
                  styles.navigationButton
                }
                onClick={handleNext}
                aria-label={
                  t.experience
                    .modalNextAria
                }
              >
                <small>
                  {
                    t.experience
                      .modalNext
                  }
                </small>
                <span>→</span>
              </button>
            </div>

            <span
              className={
                styles.keyboardHint
              }
            >
              {
                t.experience
                  .modalKeyboardHint
              }
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Experience;

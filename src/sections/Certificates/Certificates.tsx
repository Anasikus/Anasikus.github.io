import { useEffect, useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { certificates } from "../../data/certificates";

import { useLanguage } from "../../i18n/useLanguage";
import { useMagnetic } from "../../hooks/useMagnetic";

import AmbientBackground from "../../components/AmbientBackground/AmbientBackground";

import styles from "./Certificates.module.scss";

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
  const { t } = useLanguage();

  const sectionRef =
    useRef<HTMLElement | null>(null);

  const trackRef =
    useRef<HTMLDivElement | null>(null);

  const prevButtonRef =
    useMagnetic<HTMLButtonElement>();

  const nextButtonRef =
    useMagnetic<HTMLButtonElement>();

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const selectedCertificate =
    selectedIndex !== null
      ? certificates[selectedIndex]
      : null;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.card}`,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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

    document.body.style.overflow = "hidden";

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

        setSelectedIndex((current) => {
          if (current === null) {
            return null;
          }

          return current === 0
            ? certificates.length - 1
            : current - 1;
        });
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        setSelectedIndex((current) => {
          if (current === null) {
            return null;
          }

          return current ===
            certificates.length - 1
            ? 0
            : current + 1;
        });
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

  /*
   * Секция скрывает сама себя, пока в data/certificates.ts
   * пусто — чтобы на сайте не висел пустой блок в ожидании
   * реальных грамот.
   */
  if (certificates.length === 0) {
    return null;
  }

  const scrollByCard = (
    direction: 1 | -1
  ) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const card = track.querySelector(
      `.${styles.card}`
    );

    const cardWidth =
      card instanceof HTMLElement
        ? card.getBoundingClientRect().width +
          24
        : 320;

    track.scrollBy({
      left: cardWidth * direction,
      behavior: "smooth",
    });
  };

  const handlePrevious = () => {
    setSelectedIndex((current) => {
      if (current === null) {
        return null;
      }

      return current === 0
        ? certificates.length - 1
        : current - 1;
    });
  };

  const handleNext = () => {
    setSelectedIndex((current) => {
      if (current === null) {
        return null;
      }

      return current ===
        certificates.length - 1
        ? 0
        : current + 1;
    });
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={styles.section}
        id="certificates"
      >
        <AmbientBackground />

        <div className={styles.container}>
          <header className={styles.heading}>
            <span className={styles.label}>
              {t.certificates.label}
            </span>

            <h2>
              {t.certificates.headingLine1}
              <br />
              {t.certificates.headingLine2}
            </h2>
          </header>

          <div className={styles.carousel}>
            <div
              ref={trackRef}
              className={styles.track}
            >
              {certificates.map(
                (certificate, index) => (
                  <button
                    key={certificate.title}
                    type="button"
                    className={styles.card}
                    data-cursor="view"
                    aria-label={
                      t.certificates.openAria
                    }
                    onClick={() =>
                      setSelectedIndex(index)
                    }
                  >
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      loading="lazy"
                    />

                    <span
                      className={
                        styles.cardCaption
                      }
                    >
                      <span
                        className={
                          styles.cardTitle
                        }
                      >
                        {certificate.title}
                      </span>

                      {(certificate.issuer ||
                        certificate.year) && (
                        <span
                          className={
                            styles.cardMeta
                          }
                        >
                          {[
                            certificate.issuer,
                            certificate.year,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </span>
                      )}
                    </span>
                  </button>
                )
              )}
            </div>

            <div className={styles.controls}>
              <button
                ref={prevButtonRef}
                type="button"
                aria-label={t.certificates.prev}
                onClick={() => scrollByCard(-1)}
              >
                ←
              </button>

              <button
                ref={nextButtonRef}
                type="button"
                aria-label={t.certificates.next}
                onClick={() => scrollByCard(1)}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {selectedCertificate && (
        <div
          className={styles.lightboxOverlay}
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
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label={selectedCertificate.title}
          >
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() =>
                setSelectedIndex(null)
              }
              aria-label={t.certificates.close}
            >
              ×
            </button>

            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={handlePrevious}
              aria-label={t.certificates.prev}
            >
              ←
            </button>

            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={handleNext}
              aria-label={t.certificates.next}
            >
              →
            </button>

            <div className={styles.lightboxImageWrap}>
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
              />
            </div>

            <div className={styles.lightboxInfo}>
              <h3>{selectedCertificate.title}</h3>

              {(selectedCertificate.issuer ||
                selectedCertificate.year) && (
                <span
                  className={styles.lightboxMeta}
                >
                  {[
                    selectedCertificate.issuer,
                    selectedCertificate.year,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              )}

              {selectedCertificate.description && (
                <p>
                  {selectedCertificate.description}
                </p>
              )}

              <span className={styles.lightboxCounter}>
                {(selectedIndex ?? 0) + 1} /{" "}
                {certificates.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Certificates;

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getLocalizedTimeline } from "../../i18n/content/timeline";
import { useLanguage } from "../../i18n/useLanguage";

import AmbientBackground from "../../components/AmbientBackground/AmbientBackground";

import styles from "./About.module.scss";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { t, language } = useLanguage();

  const timeline = getLocalizedTimeline(language);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(
        `.${styles.item}`
      );

      const timelineLine = sectionRef.current?.querySelector(
        `.${styles.lineProgress}`
      );

      /*
       * Основная линия timeline.
       *
       * Она будет прорисовываться по мере
       * движения пользователя по секции.
       */
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          {
            scaleY: 0,
          },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",

            scrollTrigger: {
              trigger: `.${styles.timeline}`,
              start: "top 70%",
              end: "bottom 70%",
              scrub: 1,
            },
          }
        );
      }

      /*
       * Анимация каждого события.
       */
      items.forEach((item) => {
        const marker = item.querySelector(
          `.${styles.marker}`
        );

        const period = item.querySelector(
          `.${styles.period}`
        );

        const title = item.querySelector("h3");

        const description = item.querySelector("p");

        const technologies = item.querySelector(
          `.${styles.technologies}`
        );

        const itemTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions:
              "play none none reverse",
          },
        });

        /*
         * Включаем событие.
         */
        itemTimeline.fromTo(
          item,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.4,
          }
        );

        /*
         * Точка.
         */
        if (marker) {
          itemTimeline.fromTo(
            marker,
            {
              scale: 0.5,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
            },
            "-=0.2"
          );
        }

        /*
         * Период.
         */
        if (period) {
          itemTimeline.fromTo(
            period,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
            },
            "-=0.2"
          );
        }

        /*
         * Заголовок.
         */
        if (title) {
          itemTimeline.fromTo(
            title,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.25"
          );
        }

        /*
         * Описание.
         */
        if (description) {
          itemTimeline.fromTo(
            description,
            {
              opacity: 0,
              y: 25,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
            },
            "-=0.4"
          );
        }

        /*
         * Технологии.
         */
        if (technologies) {
          const tags =
            technologies.querySelectorAll("span");

          itemTimeline.fromTo(
            tags,
            {
              opacity: 0,
              y: 15,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.08,
            },
            "-=0.3"
          );
        }

        /*
         * Небольшой эффект при прохождении
         * точки timeline.
         */
        if (marker) {
          ScrollTrigger.create({
            trigger: item,
            start: "top 60%",
            end: "bottom 40%",

            onEnter: () => {
              marker.classList.add(
                styles.markerActive
              );
            },

            onEnterBack: () => {
              marker.classList.add(
                styles.markerActive
              );
            },

            onLeave: () => {
              marker.classList.remove(
                styles.markerActive
              );
            },

            onLeaveBack: () => {
              marker.classList.remove(
                styles.markerActive
              );
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="about"
    >
      <AmbientBackground showGrid />

      <div className={styles.container}>
        <header className={styles.heading}>
          <span className={styles.label}>
            {t.about.label}
          </span>

          <h2>
            {t.about.headingLine1}
            <br />
            {t.about.headingLine2}
          </h2>

          <p>
            {t.about.description}
          </p>
        </header>

        <div className={styles.timeline}>
          <div className={styles.line}>
            <div
              className={styles.lineProgress}
            />
            <div className={styles.lineEnd} />
          </div>

            {timeline.map((item, index) => (
              <article
                key={item.id}
                className={styles.item}
              >
              <div className={styles.marker}>
                <span>
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>
              </div>

              <div className={styles.content}>
                <span className={styles.period}>
                  {item.period}
                </span>

                <h3>{item.title}</h3>

                <p>
                  {item.description}
                </p>

                {item.technologies &&
                  item.technologies.length > 0 && (
                    <div
                      className={
                        styles.technologies
                      }
                    >
                      {item.technologies.map(
                        (technology) => (
                          <span
                            key={technology}
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
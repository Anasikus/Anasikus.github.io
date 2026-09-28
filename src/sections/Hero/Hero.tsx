import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import { useLanguage } from "../../i18n/useLanguage";
import { scrollToSection } from "../../utils/scrollToSection";

import AmbientBackground from "../../components/AmbientBackground/AmbientBackground";
import FlowField from "../../components/FlowField/FlowField";

import styles from "./Hero.module.scss";

const Hero = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement | null>(null);

  const introRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const [scrolled, setScrolled] = useState(false);

  /*
   * Подсказка «Прокрутить» нужна только пока пользователь ещё на
   * первом экране — стоит ему сдвинуться, она мягко исчезает.
   */
  useEffect(() => {
    const handleScroll = () =>
      setScrolled(window.scrollY > 80);

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          introRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
          }
        )

        .fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
          },
          "-=0.6"
        )

        .fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.6"
        )

        .fromTo(
          metaRef.current,
          {
            opacity: 0,
            x: 30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
          },
          "-=0.5"
        )

        .fromTo(
          scrollRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.4"
        );

      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.75,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
    >
      <AmbientBackground />
      <FlowField />

      <div className={styles.background} />

      <div
        ref={glowRef}
        className={styles.glow}
      />

      <div className={styles.content}>
        <div
          ref={introRef}
          className={styles.intro}
        >
          <span className={styles.number}>
            01
          </span>

          <span className={styles.subtitle}>
            {t.hero.badge}
          </span>
        </div>

        <h1
          ref={titleRef}
          className={styles.title}
        >
          {t.hero.titleLine1}
          <br />
          {t.hero.titleLine2}
        </h1>

        <p
          ref={descriptionRef}
          className={styles.description}
        >
          {t.hero.description}
        </p>
      </div>

      <div
        ref={scrollRef}
        className={styles.scroll}
      >
        <button
          type="button"
          className={`${styles.scrollButton} ${
            scrolled ? styles.scrollHidden : ""
          }`}
          onClick={() => scrollToSection("#about")}
          aria-label={t.hero.scrollAria}
          tabIndex={scrolled ? -1 : 0}
        >
          <span>{t.hero.scroll}</span>

          <span className={styles.arrow}>↓</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
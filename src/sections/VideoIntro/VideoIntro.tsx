import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { VIDEO_POSTER, VIDEO_SRC } from "../../data/videoIntro";

import { useLanguage } from "../../i18n/useLanguage";

import AmbientBackground from "../../components/AmbientBackground/AmbientBackground";

import styles from "./VideoIntro.module.scss";

gsap.registerPlugin(ScrollTrigger);

const VideoIntro = () => {
  const { t } = useLanguage();

  const sectionRef =
    useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.reveal}`,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  /*
   * Секция скрывает сама себя, пока в data/videoIntro.ts не
   * прописан путь к видео — чтобы на сайте не висел пустой блок.
   */
  if (!VIDEO_SRC) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="video"
    >
      <AmbientBackground />

      <div className={styles.container}>
        <span
          className={`${styles.label} ${styles.reveal}`}
        >
          {t.video.label}
        </span>

        <h2
          className={`${styles.heading} ${styles.reveal}`}
        >
          {t.video.headingLine1}
          <br />
          {t.video.headingLine2}
        </h2>

        <p
          className={`${styles.description} ${styles.reveal}`}
        >
          {t.video.description}
        </p>

        <div
          className={`${styles.player} ${styles.reveal}`}
        >
          <video
            controls
            preload="metadata"
            poster={
              VIDEO_POSTER || undefined
            }
          >
            <source
              src={VIDEO_SRC}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
};

export default VideoIntro;

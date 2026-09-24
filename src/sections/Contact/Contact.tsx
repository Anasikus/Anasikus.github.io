import { useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { socialLinks } from "../../data/socialLinks";

import { useLanguage } from "../../i18n/useLanguage";
import { useMagnetic } from "../../hooks/useMagnetic";

import AmbientBackground from "../../components/AmbientBackground/AmbientBackground";
import ContactForm from "../../components/ContactForm/ContactForm";
import MagneticLink from "../../components/MagneticLink/MagneticLink";

import styles from "./Contact.module.scss";

gsap.registerPlugin(ScrollTrigger);

const emailLink = socialLinks.find(
  (link) => link.name === "Email"
);

const email =
  emailLink?.url.replace("mailto:", "") ??
  "";

const Contact = () => {
  const { t } = useLanguage();

  const sectionRef =
    useRef<HTMLElement | null>(null);

  const copyButtonRef =
    useMagnetic<HTMLButtonElement>();

  const toTopRef =
    useMagnetic<HTMLButtonElement>();

  const [copyState, setCopyState] =
    useState<
      "idle" | "copied" | "error"
    >("idle");

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

  const handleCopyEmail = async () => {
    if (!email) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        email
      );

      setCopyState("copied");
    } catch {
      setCopyState("error");
    }

    setTimeout(
      () => setCopyState("idle"),
      2000
    );
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="contact"
    >
      <AmbientBackground />

      <div className={styles.container}>
        <span
          className={`${styles.label} ${styles.reveal}`}
        >
          {t.contact.label}
        </span>

        <h2
          className={`${styles.heading} ${styles.reveal}`}
        >
          {t.contact.headingLine1}
          <br />
          {t.contact.headingLine2}
        </h2>

        <p
          className={`${styles.description} ${styles.reveal}`}
        >
          {t.contact.description}
        </p>

        <div className={styles.reveal}>
          <ContactForm toEmail={email} />
        </div>

        <div
          className={`${styles.directLabel} ${styles.reveal}`}
        >
          {t.contact.directLabel}
        </div>

        <div
          className={`${styles.emailRow} ${styles.reveal}`}
        >
          <a
            href={`mailto:${email}`}
            className={styles.emailLink}
          >
            {email}
          </a>

          <button
            ref={copyButtonRef}
            type="button"
            className={styles.copyButton}
            onClick={handleCopyEmail}
          >
            {copyState === "copied"
              ? t.contact.copied
              : copyState === "error"
              ? t.contact.copyError
              : t.contact.copy}
          </button>
        </div>

        <div
          className={`${styles.links} ${styles.reveal}`}
        >
          {socialLinks.map((link) => {
            const isEmail =
              link.url.startsWith(
                "mailto:"
              );

            return (
              <MagneticLink
                key={link.name}
                href={link.url}
                target={
                  isEmail
                    ? undefined
                    : "_blank"
                }
                rel={
                  isEmail
                    ? undefined
                    : "noopener noreferrer"
                }
                className={
                  styles.linkPill
                }
              >
                {link.name}
                <span>↗</span>
              </MagneticLink>
            );
          })}
        </div>
      </div>

      <div className={styles.footer}>
        <span>
          © {new Date().getFullYear()}{" "}
          · {t.contact.footerCopy}
        </span>

        <button
          ref={toTopRef}
          type="button"
          className={styles.toTop}
          onClick={handleScrollToTop}
        >
          {t.contact.toTop}
        </button>
      </div>
    </section>
  );
};

export default Contact;

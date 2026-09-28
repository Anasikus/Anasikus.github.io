import {
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { socialLinks } from "../../data/socialLinks";
import { EMAIL, PHONE } from "../../data/contactInfo";

import { useLanguage } from "../../i18n/useLanguage";
import { useMagnetic } from "../../hooks/useMagnetic";

import AmbientBackground from "../../components/AmbientBackground/AmbientBackground";
import ContactForm from "../../components/ContactForm/ContactForm";
import MagneticLink from "../../components/MagneticLink/MagneticLink";
import {
  EmailIcon,
  PhoneIcon,
  TelegramIcon,
  VkIcon,
} from "../../components/SocialIcons/SocialIcons";

import styles from "./Contact.module.scss";

gsap.registerPlugin(ScrollTrigger);

const footerIcons: Record<
  string,
  ComponentType
> = {
  VK: VkIcon,
  Telegram: TelegramIcon,
};

const Contact = () => {
  const { t } = useLanguage();

  const sectionRef =
    useRef<HTMLElement | null>(null);

  const toTopRef =
    useMagnetic<HTMLButtonElement>();

  const [toast, setToast] = useState<{
    id: number;
    text: string;
    isError: boolean;
  } | null>(null);

  const toastTimer = useRef<number | null>(null);

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

  const showToast = (
    text: string,
    isError = false
  ) => {
    if (toastTimer.current !== null) {
      window.clearTimeout(toastTimer.current);
    }

    setToast({ id: Date.now(), text, isError });

    toastTimer.current = window.setTimeout(
      () => setToast(null),
      2200
    );
  };

  useLayoutEffect(
    () => () => {
      if (toastTimer.current !== null) {
        window.clearTimeout(toastTimer.current);
      }
    },
    []
  );

  const copyValue = async (
    value: string,
    successText: string
  ) => {
    try {
      await navigator.clipboard.writeText(
        value
      );

      showToast(successText);
    } catch {
      showToast(t.contact.copyError, true);
    }
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
          {t.contact.headingLine1}{" "}
          <br />
          {t.contact.headingLine2}
        </h2>

        <p
          className={`${styles.description} ${styles.reveal}`}
        >
          {t.contact.description}
        </p>

        <div className={styles.grid}>
          <div
            className={`${styles.formColumn} ${styles.reveal}`}
          >
            <ContactForm toEmail={EMAIL} />
          </div>

          <aside
            className={`${styles.infoColumn} ${styles.reveal}`}
          >
            <span
              className={styles.infoLabel}
            >
              {t.contact.directLabel}
            </span>

            <div className={styles.infoRow}>
              <a
                href={PHONE.href}
                className={styles.infoItem}
              >
                <PhoneIcon />
                <span>{PHONE.display}</span>
              </a>

              <button
                type="button"
                className={styles.copyButton}
                onClick={() =>
                  copyValue(
                    PHONE.display,
                    t.contact.copyPhoneDone
                  )
                }
              >
                {t.contact.copy}
              </button>
            </div>

            <div className={styles.infoRow}>
              <a
                href={`mailto:${EMAIL}`}
                className={styles.infoItem}
              >
                <EmailIcon />
                <span>{EMAIL}</span>
              </a>

              <button
                type="button"
                className={styles.copyButton}
                onClick={() =>
                  copyValue(
                    EMAIL,
                    t.contact.copyEmailDone
                  )
                }
              >
                {t.contact.copy}
              </button>
            </div>
          </aside>
        </div>
      </div>

      {toast && (
        <div
          key={toast.id}
          className={`${styles.toast} ${
            toast.isError
              ? styles.toastError
              : ""
          }`}
          role="status"
          aria-live="polite"
        >
          {toast.text}
        </div>
      )}

      <div className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerIcons}>
            {socialLinks.map((link) => {
              const Icon =
                footerIcons[link.name];

              return (
                <MagneticLink
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className={
                    styles.footerIconButton
                  }
                >
                  {Icon && <Icon />}
                </MagneticLink>
              );
            })}

            <MagneticLink
              href={`mailto:${EMAIL}`}
              aria-label={
                t.contact.emailIconAria
              }
              className={
                styles.footerIconButton
              }
            >
              <EmailIcon />
            </MagneticLink>
          </div>

          <div className={styles.footerBottom}>
            <span className={styles.copyright}>
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
        </div>
      </div>
    </section>
  );
};

export default Contact;

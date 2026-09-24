import {
  useState,
  type FormEvent,
} from "react";

import emailjs from "@emailjs/browser";

import { useLanguage } from "../../i18n/useLanguage";
import { useMagnetic } from "../../hooks/useMagnetic";

import styles from "./ContactForm.module.scss";

const SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID;

const TEMPLATE_ID =
  import.meta.env
    .VITE_EMAILJS_TEMPLATE_ID;

const PUBLIC_KEY =
  import.meta.env
    .VITE_EMAILJS_PUBLIC_KEY;

const isEmailjsConfigured = Boolean(
  SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY
);

/*
 * Требует настоящий домен с точкой и буквенной зоной
 * ("test@ya.ru" — ок, "123@123" или "a@b" — нет).
 * Не заменяет проверку доставляемости (MX-запись
 * без бэкенда не проверить), но отсекает большинство
 * опечаток и заведомо фейковых адресов вроде 123@123.
 */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

type Status =
  | "idle"
  | "sending"
  | "success"
  | "error";

interface ContactFormProps {
  toEmail: string;
}

/*
 * Форма отправляет письмо напрямую из браузера через
 * EmailJS — без своего бэкенда. Пока в .env не прописаны
 * VITE_EMAILJS_* (см. .env.example), форма работает как
 * аккуратный fallback: открывает почтовый клиент с уже
 * заполненными полями, вместо тихой ошибки.
 */
const ContactForm = ({
  toEmail,
}: ContactFormProps) => {
  const { t } = useLanguage();

  const magneticRef =
    useMagnetic<HTMLButtonElement>();

  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] =
    useState("");
  const [message, setMessage] =
    useState("");
  const [honeypot, setHoneypot] =
    useState("");
  const [status, setStatus] =
    useState<Status>("idle");
  const [emailTouched, setEmailTouched] =
    useState(false);

  const isEmailValid =
    EMAIL_REGEX.test(fromEmail.trim());

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setEmailTouched(true);

    if (!isEmailValid) {
      return;
    }

    /*
     * Поле-ловушка: невидимо для людей, но большинство
     * спам-ботов заполняют все поля формы подряд. Если оно
     * не пустое — тихо "успешно" завершаем без реальной
     * отправки, не давая боту понять, что его отфильтровали.
     */
    if (honeypot) {
      setStatus("success");
      setName("");
      setFromEmail("");
      setMessage("");
      return;
    }

    if (!isEmailjsConfigured) {
      const subject = encodeURIComponent(
        `${
          t.contact.mailtoSubjectPrefix
        } ${name}`
      );

      const body = encodeURIComponent(
        `${message}\n\n— ${name}\n${t.contact.mailtoReplyLabel}: ${fromEmail}`
      );

      window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;

      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID as string,
        TEMPLATE_ID as string,
        {
          from_name: name,
          from_email: fromEmail,
          message,
          to_email: toEmail,
          reply_to: fromEmail,
        },
        {
          publicKey:
            PUBLIC_KEY as string,
        }
      );

      setStatus("success");
      setName("");
      setFromEmail("");
      setMessage("");
      setEmailTouched(false);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="company"
        value={honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className={styles.honeypot}
        onChange={(event) =>
          setHoneypot(event.target.value)
        }
      />

      <div className={styles.row}>
        <label className={styles.field}>
          <span>
            {t.contact.formName}
          </span>

          <input
            type="text"
            value={name}
            required
            placeholder={
              t.contact
                .formNamePlaceholder
            }
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
          />
        </label>

        <label className={styles.field}>
          <span>
            {t.contact.formEmail}
          </span>

          <input
            type="email"
            value={fromEmail}
            required
            placeholder={
              t.contact
                .formEmailPlaceholder
            }
            aria-invalid={
              emailTouched &&
              !isEmailValid
            }
            onChange={(event) =>
              setFromEmail(
                event.target.value
              )
            }
            onBlur={() =>
              setEmailTouched(true)
            }
          />

          {emailTouched &&
            !isEmailValid && (
              <span
                className={
                  styles.fieldError
                }
              >
                {
                  t.contact
                    .formEmailInvalid
                }
              </span>
            )}
        </label>
      </div>

      <label className={styles.field}>
        <span>
          {t.contact.formMessage}
        </span>

        <textarea
          value={message}
          required
          rows={5}
          placeholder={
            t.contact
              .formMessagePlaceholder
          }
          onChange={(event) =>
            setMessage(
              event.target.value
            )
          }
        />
      </label>

      <div className={styles.footer}>
        <button
          ref={magneticRef}
          type="submit"
          className={styles.submit}
          disabled={
            status === "sending"
          }
        >
          {status === "sending"
            ? t.contact.formSubmitting
            : t.contact.formSubmit}
        </button>

        {status === "success" && (
          <span
            className={
              styles.statusSuccess
            }
          >
            {t.contact.formSuccess}
          </span>
        )}

        {status === "error" && (
          <span
            className={
              styles.statusError
            }
          >
            {t.contact.formError}
          </span>
        )}
      </div>
    </form>
  );
};

export default ContactForm;

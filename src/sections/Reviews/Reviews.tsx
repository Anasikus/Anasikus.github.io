import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";

import { Link } from "react-router-dom";

import {
  supabase,
  isSupabaseConfigured,
} from "../../lib/supabaseClient";
import type { Review } from "../../data/review";

import { getLocalizedProjects } from "../../i18n/content/projects";
import { useLanguage } from "../../i18n/useLanguage";
import { useMagnetic } from "../../hooks/useMagnetic";

import AmbientBackground from "../../components/AmbientBackground/AmbientBackground";
import Reveal from "../../components/Reveal/Reveal";
import StarRating from "../../components/StarRating/StarRating";

import styles from "./Reviews.module.scss";

type LoadState = "loading" | "loaded" | "error";
type SubmitState = "idle" | "sending" | "success" | "error";

const TEXT_MIN = 10;
const TEXT_MAX = 1000;
const NAME_MAX = 80;

/*
 * Раздел сам скрывается, пока не настроен Supabase (см.
 * supabase/README.md) — как VideoIntro скрывается без видео.
 * Отзывы читаются напрямую из Supabase (только status=approved —
 * это гарантируют правила доступа в supabase/schema.sql), а
 * отправленный отзыв всегда уходит со статусом "на проверке":
 * модерация — на странице /admin.
 */
const Reviews = () => {
  const { t, language } = useLanguage();

  const submitRef =
    useMagnetic<HTMLButtonElement>();

  const [reviews, setReviews] = useState<
    Review[]
  >([]);

  const [loadState, setLoadState] =
    useState<LoadState>("loading");

  const [formOpen, setFormOpen] =
    useState(false);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [projectId, setProjectId] =
    useState("");
  const [honeypot, setHoneypot] =
    useState("");

  const [submitState, setSubmitState] =
    useState<SubmitState>("idle");

  const [tried, setTried] = useState(false);

  const [ratingFilter, setRatingFilter] =
    useState<number | null>(null);

  const [projectOnly, setProjectOnly] =
    useState(false);

  /*
   * Отзывов может стать много, поэтому вместо статичной сетки —
   * две бегущие навстречу друг другу ленты (см. renderRow ниже).
   * hoverRow гасится сам при уходе курсора, lockedRow — «залип»
   * после клика и снимается только повторным кликом или кликом
   * снаружи (см. эффект ниже). Пока это не важно (человеку с
   * настройкой "меньше анимации" или пока отзывов совсем мало),
   * показываем обычную сетку без движения.
   */
  const [hoverRow, setHoverRow] = useState<
    "A" | "B" | null
  >(null);

  const [lockedRow, setLockedRow] = useState<
    "A" | "B" | null
  >(null);

  const [prefersReducedMotion] = useState(
    () =>
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
  );

  const marqueeRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lockedRow) {
      return;
    }

    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        marqueeRef.current &&
        !marqueeRef.current.contains(
          event.target as Node
        )
      ) {
        setLockedRow(null);
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "click",
        handleClickOutside
      );
  }, [lockedRow]);

  const projects = getLocalizedProjects(
    language
  );

  const projectTitles = Object.fromEntries(
    projects.map((project) => [
      project.id,
      project.title,
    ])
  );

  const knownProjectIds = new Set(
    projects.map((project) => project.id)
  );

  /*
   * Оценки, которые реально встречаются среди отзывов — чтобы
   * не показывать пилюлю "1★", если единиц никто не ставил
   * (тот же приём, что и с категориями на странице /projects).
   */
  const availableRatings = Array.from(
    new Set(reviews.map((review) => review.rating))
  ).sort((a, b) => b - a);

  const filteredReviews = reviews.filter(
    (review) =>
      (ratingFilter === null ||
        review.rating === ratingFilter) &&
      (!projectOnly || review.project_id)
  );

  const rowA = filteredReviews.filter(
    (_, index) => index % 2 === 0
  );

  const rowB = filteredReviews.filter(
    (_, index) => index % 2 === 1
  );

  /* Чем меньше отзывов в ленте, тем быстрее она крутится —
     держим примерно одинаковую скорость движения. */
  const rowDuration = (count: number) =>
    Math.max(count * 7, 18);

  const renderCard = (review: Review) => (
    <article className={styles.marqueeCard}>
      <StarRating
        value={review.rating}
        size="sm"
      />

      <p className={styles.marqueeText}>
        {review.text}
      </p>

      <div className={styles.meta}>
        <span className={styles.name}>
          {review.name}
        </span>

        {review.project_id &&
          knownProjectIds.has(
            review.project_id
          ) && (
            <Link
              to={`/projects/${review.project_id}`}
              className={
                styles.projectTag
              }
            >
              {
                projectTitles[
                  review.project_id
                ]
              }
            </Link>
          )}
      </div>
    </article>
  );

  const renderRow = (
    rowReviews: Review[],
    rowKey: "A" | "B",
    direction: "left" | "right"
  ) => {
    if (rowReviews.length === 0) {
      return null;
    }

    const isPaused =
      hoverRow === rowKey ||
      lockedRow === rowKey;

    return (
      <div className={styles.marqueeRow}>
        <div
          className={`${styles.track} ${
            direction === "right"
              ? styles.trackRight
              : ""
          } ${
            isPaused
              ? styles.trackPaused
              : ""
          }`}
          style={
            {
              "--marquee-duration": `${rowDuration(
                rowReviews.length
              )}s`,
            } as CSSProperties
          }
          onMouseEnter={() =>
            setHoverRow(rowKey)
          }
          onMouseLeave={() =>
            setHoverRow((current) =>
              current === rowKey
                ? null
                : current
            )
          }
          onFocus={() =>
            setHoverRow(rowKey)
          }
          onBlur={() =>
            setHoverRow((current) =>
              current === rowKey
                ? null
                : current
            )
          }
          onClick={() =>
            setLockedRow((current) =>
              current === rowKey
                ? null
                : rowKey
            )
          }
        >
          {/*
           * Лента показана дважды подряд, чтобы прокрутка на
           * -50% выглядела бесконечной без рывка на стыке.
           * Второй показ спрятан от читалок экрана — это те же
           * самые отзывы, не новые.
           */}
          {rowReviews.map((review) => (
            <div key={review.id}>
              {renderCard(review)}
            </div>
          ))}

          {rowReviews.map((review) => (
            <div
              key={`${review.id}-dup`}
              aria-hidden="true"
            >
              {renderCard(review)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let cancelled = false;

    supabase
      .from("reviews")
      .select(
        "id, created_at, name, rating, text, project_id, status"
      )
      .eq("status", "approved")
      .order("created_at", {
        ascending: false,
      })
      .then(({ data, error }) => {
        if (cancelled) {
          return;
        }

        if (error) {
          setLoadState("error");

          return;
        }

        setReviews((data ?? []) as Review[]);
        setLoadState("loaded");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!isSupabaseConfigured) {
    return null;
  }

  const isNameValid =
    name.trim().length > 0 &&
    name.trim().length <= NAME_MAX;

  const isTextValid =
    text.trim().length >= TEXT_MIN &&
    text.trim().length <= TEXT_MAX;

  const isRatingValid =
    rating >= 1 && rating <= 5;

  const isFormValid =
    isNameValid &&
    isTextValid &&
    isRatingValid;

  const resetForm = () => {
    setName("");
    setRating(0);
    setText("");
    setProjectId("");
    setHoneypot("");
    setTried(false);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setTried(true);

    if (!isFormValid) {
      return;
    }

    /* Ловушка для ботов — см. ContactForm. */
    if (honeypot) {
      setSubmitState("success");
      resetForm();

      return;
    }

    if (!supabase) {
      return;
    }

    setSubmitState("sending");

    const { error } = await supabase
      .from("reviews")
      .insert({
        name: name.trim(),
        rating,
        text: text.trim(),
        project_id: projectId || null,
      });

    if (error) {
      setSubmitState("error");

      return;
    }

    setSubmitState("success");
    resetForm();
  };

  return (
    <section
      id="reviews"
      className={styles.section}
    >
      <AmbientBackground />

      <div className={styles.container}>
        <Reveal>
          <span className={styles.label}>
            {t.reviews.label}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h2 className={styles.heading}>
            {t.reviews.headingLine1}
            <br />
            {t.reviews.headingLine2}
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className={styles.description}>
            {t.reviews.description}
          </p>
        </Reveal>

        {loadState === "loaded" &&
          reviews.length === 0 && (
            <p className={styles.empty}>
              {t.reviews.empty}
            </p>
          )}

        {loadState === "error" && (
          <p className={styles.empty}>
            {t.reviews.loadError}
          </p>
        )}

        {reviews.length > 0 && (
          <div
            className={styles.filters}
            role="tablist"
          >
            {[null, ...availableRatings].map(
              (ratingValue) => (
                <button
                  key={ratingValue ?? "all"}
                  type="button"
                  role="tab"
                  aria-selected={
                    ratingFilter ===
                    ratingValue
                  }
                  className={`${
                    styles.filter
                  } ${
                    ratingFilter ===
                    ratingValue
                      ? styles.filterActive
                      : ""
                  }`}
                  onClick={() =>
                    setRatingFilter(
                      ratingValue
                    )
                  }
                >
                  {ratingValue === null
                    ? t.reviews.filterAll
                    : `${ratingValue} ★`}

                  <span>
                    {ratingValue === null
                      ? reviews.length
                      : reviews.filter(
                          (review) =>
                            review.rating ===
                            ratingValue
                        ).length}
                  </span>
                </button>
              )
            )}

            <button
              type="button"
              role="tab"
              aria-selected={projectOnly}
              className={`${
                styles.filter
              } ${
                projectOnly
                  ? styles.filterActive
                  : ""
              }`}
              onClick={() =>
                setProjectOnly(
                  (value) => !value
                )
              }
            >
              {
                t.reviews
                  .filterProjectOnly
              }

              <span>
                {
                  reviews.filter(
                    (review) =>
                      review.project_id
                  ).length
                }
              </span>
            </button>
          </div>
        )}

        {reviews.length > 0 &&
          filteredReviews.length === 0 && (
            <p className={styles.empty}>
              {t.reviews.emptyFiltered}
            </p>
          )}

        {filteredReviews.length > 0 &&
          prefersReducedMotion && (
            <div className={styles.grid}>
              {filteredReviews.map(
                (review, index) => (
                  <Reveal
                    key={review.id}
                    delay={
                      (index % 3) * 90
                    }
                    className={
                      styles.cell
                    }
                  >
                    <article
                      className={
                        styles.card
                      }
                    >
                      <StarRating
                        value={
                          review.rating
                        }
                        size="sm"
                      />

                      <p
                        className={
                          styles.text
                        }
                      >
                        {review.text}
                      </p>

                      <div
                        className={
                          styles.meta
                        }
                      >
                        <span
                          className={
                            styles.name
                          }
                        >
                          {review.name}
                        </span>

                        {review.project_id &&
                          knownProjectIds.has(
                            review.project_id
                          ) && (
                            <Link
                              to={`/projects/${review.project_id}`}
                              className={
                                styles.projectTag
                              }
                            >
                              {
                                projectTitles[
                                  review
                                    .project_id
                                ]
                              }
                            </Link>
                          )}
                      </div>
                    </article>
                  </Reveal>
                )
              )}
            </div>
          )}

        {filteredReviews.length > 0 &&
          !prefersReducedMotion && (
            <Reveal
              className={
                styles.marqueeWrap
              }
            >
              <div ref={marqueeRef}>
                {renderRow(
                  rowA,
                  "A",
                  "left"
                )}
                {renderRow(
                  rowB,
                  "B",
                  "right"
                )}
              </div>
            </Reveal>
          )}

        <Reveal
          className={styles.formWrap}
        >
          {!formOpen ? (
            <button
              type="button"
              className={
                styles.addButton
              }
              onClick={() =>
                setFormOpen(true)
              }
            >
              {t.reviews.addButton}
            </button>
          ) : submitState ===
            "success" ? (
            <div
              className={
                styles.successBox
              }
            >
              <p>
                {t.reviews.formSuccess}
              </p>

              <button
                type="button"
                className={
                  styles.addButton
                }
                onClick={() => {
                  setFormOpen(false);
                  setSubmitState(
                    "idle"
                  );
                }}
              >
                {t.reviews.cancelButton}
              </button>
            </div>
          ) : (
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
                className={
                  styles.honeypot
                }
                onChange={(event) =>
                  setHoneypot(
                    event.target.value
                  )
                }
              />

              <div className={styles.row}>
                <label
                  className={
                    styles.field
                  }
                >
                  <span>
                    {t.reviews.formName}
                  </span>

                  <input
                    type="text"
                    value={name}
                    maxLength={NAME_MAX}
                    placeholder={
                      t.reviews
                        .formNamePlaceholder
                    }
                    aria-invalid={
                      tried &&
                      !isNameValid
                    }
                    onChange={(event) =>
                      setName(
                        event.target
                          .value
                      )
                    }
                  />
                </label>

                <div
                  className={
                    styles.field
                  }
                >
                  <span>
                    {
                      t.reviews
                        .formRating
                    }
                  </span>

                  <StarRating
                    value={rating}
                    onChange={setRating}
                    ariaLabel={
                      t.reviews
                        .formRating
                    }
                  />
                </div>
              </div>

              <label
                className={styles.field}
              >
                <span>
                  {
                    t.reviews.formProject
                  }
                </span>

                <select
                  value={projectId}
                  onChange={(event) =>
                    setProjectId(
                      event.target.value
                    )
                  }
                >
                  <option value="">
                    {
                      t.reviews
                        .formProjectNone
                    }
                  </option>

                  {projects.map(
                    (project) => (
                      <option
                        key={project.id}
                        value={project.id}
                      >
                        {project.title}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label
                className={styles.field}
              >
                <span>
                  {t.reviews.formText}
                </span>

                <textarea
                  value={text}
                  rows={4}
                  maxLength={TEXT_MAX}
                  placeholder={
                    t.reviews
                      .formTextPlaceholder
                  }
                  aria-invalid={
                    tried && !isTextValid
                  }
                  onChange={(event) =>
                    setText(
                      event.target.value
                    )
                  }
                />
              </label>

              <div
                className={styles.footer}
              >
                <button
                  ref={submitRef}
                  type="submit"
                  className={
                    styles.submit
                  }
                  disabled={
                    submitState ===
                    "sending"
                  }
                >
                  {submitState ===
                  "sending"
                    ? t.reviews
                        .formSubmitting
                    : t.reviews
                        .formSubmit}
                </button>

                <button
                  type="button"
                  className={
                    styles.cancel
                  }
                  onClick={() => {
                    setFormOpen(false);
                    resetForm();
                  }}
                >
                  {
                    t.reviews
                      .cancelButton
                  }
                </button>

                {submitState ===
                  "error" && (
                  <span
                    className={
                      styles.statusError
                    }
                  >
                    {
                      t.reviews
                        .formError
                    }
                  </span>
                )}
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default Reviews;

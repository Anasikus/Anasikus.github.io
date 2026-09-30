import {
  useEffect,
  useLayoutEffect,
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

/* На одну строку — до 10 отзывов, строк не больше трёх. */
const ROW_CAPACITY = 10;
const MAX_ROWS = 3;

/* Скорость прокрутки — px/сек, и нижняя граница длительности,
   чтобы лента с парой карточек не носилась слишком быстро. */
const SCROLL_SPEED = 45;
const MIN_DURATION = 14;

interface ReviewCardProps {
  review: Review;
  projectTitle?: string;
}

const ReviewCard = ({
  review,
  projectTitle,
}: ReviewCardProps) => (
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

      {projectTitle && (
        <Link
          to={`/projects/${review.project_id}`}
          className={styles.projectTag}
        >
          {projectTitle}
        </Link>
      )}
    </div>
  </article>
);

interface MarqueeRowProps {
  reviews: Review[];
  reverse: boolean;
  projectTitles: Record<string, string>;
  knownProjectIds: Set<string>;
}

/*
 * Одна строка отзывов. Пока все карточки помещаются в ширину —
 * стоят неподвижно по центру. Как только не помещаются — едет
 * туда-обратно (CSS animation-direction: alternate), никогда не
 * "перескакивая" обратно к началу — в отличие от привычного трюка
 * с бесконечной лентой (двойной контент + translateX(-50%)), тут
 * нечему рассинхронизироваться и не с чем "срываться": дистанция
 * и скорость честно посчитаны из реальной ширины содержимого, а
 * сами отзывы никогда не дублируются в разметке.
 */
const MarqueeRow = ({
  reviews,
  reverse,
  projectTitles,
  knownProjectIds,
}: MarqueeRowProps) => {
  const rowRef =
    useRef<HTMLDivElement | null>(null);

  const trackRef =
    useRef<HTMLDivElement | null>(null);

  const [overflow, setOverflow] =
    useState(0);

  const [hovered, setHovered] =
    useState(false);

  const [locked, setLocked] =
    useState(false);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const track = trackRef.current;

    if (!row || !track) {
      return;
    }

    const measure = () => {
      setOverflow(
        Math.max(
          0,
          track.scrollWidth - row.clientWidth
        )
      );
    };

    measure();

    const observer = new ResizeObserver(
      measure
    );

    observer.observe(row);
    observer.observe(track);

    return () => observer.disconnect();
  }, [reviews.length]);

  useEffect(() => {
    if (!locked) {
      return;
    }

    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        rowRef.current &&
        !rowRef.current.contains(
          event.target as Node
        )
      ) {
        setLocked(false);
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
  }, [locked]);

  const isScrolling = overflow > 0;

  const isPaused = hovered || locked;

  const duration = Math.max(
    overflow / SCROLL_SPEED,
    MIN_DURATION
  );

  return (
    <div
      ref={rowRef}
      className={`${styles.marqueeRow} ${
        isScrolling ? styles.masked : ""
      }`}
    >
      <div
        ref={trackRef}
        className={`${styles.track} ${
          isScrolling
            ? styles.trackScrolling
            : styles.trackStatic
        } ${
          reverse ? styles.trackReverse : ""
        } ${
          isScrolling && isPaused
            ? styles.trackPaused
            : ""
        }`}
        style={
          isScrolling
            ? ({
                "--scroll-distance": `${overflow}px`,
                "--scroll-duration": `${duration}s`,
              } as CSSProperties)
            : undefined
        }
        onMouseEnter={() =>
          isScrolling && setHovered(true)
        }
        onMouseLeave={() =>
          setHovered(false)
        }
        onClick={() =>
          isScrolling &&
          setLocked((value) => !value)
        }
      >
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            projectTitle={
              review.project_id &&
              knownProjectIds.has(
                review.project_id
              )
                ? projectTitles[
                    review.project_id
                  ]
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

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

  const [prefersReducedMotion] = useState(
    () =>
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
  );

  const sectionRef =
    useRef<HTMLElement | null>(null);

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

  /*
   * Число строк растёт вместе с числом отзывов: до 10 — одна
   * строка, до 20 — две, дальше — три и больше не прибавляем.
   * Раскладываем по кругу, чтобы новые и старые отзывы не
   * скапливались в одной строке.
   */
  const rowCount =
    filteredReviews.length === 0
      ? 0
      : Math.min(
          MAX_ROWS,
          Math.max(
            1,
            Math.ceil(
              filteredReviews.length /
                ROW_CAPACITY
            )
          )
        );

  const rows: Review[][] = Array.from(
    { length: rowCount },
    () => []
  );

  filteredReviews.forEach((review, index) => {
    rows[index % rowCount]?.push(review);
  });

  /*
   * Запрос к Supabase раньше уходил сразу при открытии сайта —
   * даже если посетитель до "Отзывов" не долистает. На медленном
   * интернете он соревновался за канал с тем, что действительно
   * нужно для первого экрана (тот же приём уже применён к
   * статистике по GitHub — см. Stats.tsx). Ждём, пока раздел не
   * окажется рядом с экраном.
   */
  useEffect(() => {
    if (!supabase) {
      return;
    }

    const section = sectionRef.current;

    if (!section) {
      return;
    }

    let cancelled = false;

    const load = () => {
      supabase
        ?.from("reviews")
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

          setReviews(
            (data ?? []) as Review[]
          );
          setLoadState("loaded");
        });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(section);

    return () => {
      cancelled = true;
      observer.disconnect();
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
      ref={sectionRef}
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
              <div>
                {rows.map((row, index) => (
                  <MarqueeRow
                    key={index}
                    reviews={row}
                    reverse={
                      index % 2 === 1
                    }
                    projectTitles={
                      projectTitles
                    }
                    knownProjectIds={
                      knownProjectIds
                    }
                  />
                ))}
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

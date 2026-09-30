import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type { Session } from "@supabase/supabase-js";

import {
  supabase,
  isSupabaseConfigured,
} from "../../lib/supabaseClient";
import type { Review } from "../../data/review";

import StarRating from "../../components/StarRating/StarRating";

import styles from "./Admin.module.scss";

type Filter =
  | "pending"
  | "approved"
  | "rejected"
  | "all";

/*
 * Страница модерации отзывов. Не переведена на другие языки и
 * не в меню — она только для меня, здесь это не нужно. Доступ
 * защищён не секретностью адреса (хотя он и закрыт в robots.txt),
 * а входом через Supabase Auth: увидеть и изменить что-либо
 * здесь может только тот, кто вошёл под admin-почтой — это
 * обеспечивают правила доступа в supabase/schema.sql, а не код
 * этой страницы.
 */
const Admin = () => {
  useEffect(() => {
    const meta = document.createElement(
      "meta"
    );

    meta.name = "robots";
    meta.content = "noindex, nofollow";

    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const [session, setSession] =
    useState<Session | null>(null);

  const [sessionChecked, setSessionChecked] =
    useState(!isSupabaseConfigured);

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loginError, setLoginError] =
    useState("");

  const [loggingIn, setLoggingIn] =
    useState(false);

  const [reviews, setReviews] = useState<
    Review[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  const [loadError, setLoadError] =
    useState("");

  const [filter, setFilter] =
    useState<Filter>("pending");

  const [busyId, setBusyId] = useState<
    string | null
  >(null);

  /*
   * Вызывается только из промис-колбэков ниже (после входа,
   * при восстановлении сессии) — не из тела эффекта напрямую,
   * чтобы не запускать set-состояние синхронно при рендере.
   */
  const loadReviews = async () => {
    if (!supabase) {
      return;
    }

    setLoading(true);
    setLoadError("");

    const { data, error } = await supabase
      .from("reviews")
      .select(
        "id, created_at, name, rating, text, project_id, status"
      )
      .order("created_at", {
        ascending: false,
      });

    setLoading(false);

    if (error) {
      setLoadError(error.message);

      return;
    }

    setReviews((data ?? []) as Review[]);
  };

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session);
        setSessionChecked(true);

        if (data.session) {
          loadReviews();
        }
      });

    const {
      data: subscription,
    } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);

        if (nextSession) {
          loadReviews();
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p>
            Supabase не настроен — см.
            supabase/README.md.
          </p>
        </div>
      </main>
    );
  }

  if (!sessionChecked) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p>Проверяю вход…</p>
        </div>
      </main>
    );
  }

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!supabase) {
      return;
    }

    setLoggingIn(true);
    setLoginError("");

    const { error } =
      await supabase.auth.signInWithPassword(
        {
          email: email.trim(),
          password,
        }
      );

    setLoggingIn(false);

    if (error) {
      setLoginError(
        "Не удалось войти — проверьте почту и пароль."
      );

      return;
    }

    setPassword("");
  };

  if (!session) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <h1>Вход в модерацию</h1>

          <form
            className={styles.loginForm}
            onSubmit={handleLogin}
          >
            <label className={styles.field}>
              <span>Почта</span>

              <input
                type="email"
                value={email}
                required
                autoComplete="username"
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
              />
            </label>

            <label className={styles.field}>
              <span>Пароль</span>

              <input
                type="password"
                value={password}
                required
                autoComplete="current-password"
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
              />
            </label>

            <button
              type="submit"
              className={styles.submit}
              disabled={loggingIn}
            >
              {loggingIn
                ? "Вхожу…"
                : "Войти"}
            </button>

            {loginError && (
              <span
                className={
                  styles.errorText
                }
              >
                {loginError}
              </span>
            )}
          </form>
        </div>
      </main>
    );
  }

  const setStatus = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    if (!supabase) {
      return;
    }

    setBusyId(id);

    const { error } = await supabase
      .from("reviews")
      .update({ status })
      .eq("id", id);

    setBusyId(null);

    if (!error) {
      setReviews((current) =>
        current.map((review) =>
          review.id === id
            ? { ...review, status }
            : review
        )
      );
    }
  };

  const removeReview = async (
    id: string
  ) => {
    if (!supabase) {
      return;
    }

    if (
      !window.confirm(
        "Удалить отзыв без возможности восстановить?"
      )
    ) {
      return;
    }

    setBusyId(id);

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id);

    setBusyId(null);

    if (!error) {
      setReviews((current) =>
        current.filter(
          (review) => review.id !== id
        )
      );
    }
  };

  const visible =
    filter === "all"
      ? reviews
      : reviews.filter(
          (review) =>
            review.status === filter
        );

  const counts = {
    pending: reviews.filter(
      (review) =>
        review.status === "pending"
    ).length,
    approved: reviews.filter(
      (review) =>
        review.status === "approved"
    ).length,
    rejected: reviews.filter(
      (review) =>
        review.status === "rejected"
    ).length,
    all: reviews.length,
  };

  const filterLabels: Record<
    Filter,
    string
  > = {
    pending: "На проверке",
    approved: "Одобренные",
    rejected: "Отклонённые",
    all: "Все",
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h1>Модерация отзывов</h1>

          <button
            type="button"
            className={styles.signOut}
            onClick={() =>
              supabase?.auth.signOut()
            }
          >
            Выйти
          </button>
        </div>

        <div className={styles.filters}>
          {(
            [
              "pending",
              "approved",
              "rejected",
              "all",
            ] as Filter[]
          ).map((key) => (
            <button
              key={key}
              type="button"
              className={`${
                styles.filter
              } ${
                filter === key
                  ? styles.filterActive
                  : ""
              }`}
              onClick={() =>
                setFilter(key)
              }
            >
              {filterLabels[key]}
              <span>{counts[key]}</span>
            </button>
          ))}
        </div>

        {loading && <p>Загружаю…</p>}

        {loadError && (
          <p className={styles.errorText}>
            {loadError}
          </p>
        )}

        {!loading &&
          visible.length === 0 && (
            <p>Здесь пусто.</p>
          )}

        <div className={styles.list}>
          {visible.map((review) => (
            <article
              key={review.id}
              className={`${styles.card} ${
                styles[review.status]
              }`}
            >
              <div
                className={styles.cardTop}
              >
                <StarRating
                  value={review.rating}
                  size="sm"
                />

                <span
                  className={
                    styles.status
                  }
                >
                  {
                    filterLabels[
                      review.status
                    ]
                  }
                </span>
              </div>

              <p className={styles.text}>
                {review.text}
              </p>

              <div
                className={styles.meta}
              >
                <strong>
                  {review.name}
                </strong>

                {review.project_id && (
                  <span>
                    {review.project_id}
                  </span>
                )}

                <time>
                  {new Date(
                    review.created_at
                  ).toLocaleString(
                    "ru-RU"
                  )}
                </time>
              </div>

              <div
                className={
                  styles.actions
                }
              >
                {review.status !==
                  "approved" && (
                  <button
                    type="button"
                    className={
                      styles.approve
                    }
                    disabled={
                      busyId ===
                      review.id
                    }
                    onClick={() =>
                      setStatus(
                        review.id,
                        "approved"
                      )
                    }
                  >
                    Одобрить
                  </button>
                )}

                {review.status !==
                  "rejected" && (
                  <button
                    type="button"
                    className={
                      styles.reject
                    }
                    disabled={
                      busyId ===
                      review.id
                    }
                    onClick={() =>
                      setStatus(
                        review.id,
                        "rejected"
                      )
                    }
                  >
                    Отклонить
                  </button>
                )}

                <button
                  type="button"
                  className={
                    styles.remove
                  }
                  disabled={
                    busyId === review.id
                  }
                  onClick={() =>
                    removeReview(
                      review.id
                    )
                  }
                >
                  Удалить
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Admin;

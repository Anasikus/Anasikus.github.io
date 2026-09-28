import { useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { getLocalizedProjects } from "../../i18n/content/projects";
import { useLanguage } from "../../i18n/useLanguage";

import ProjectCover from "../../components/ProjectCover/ProjectCover";
import {
  getProjectStatus,
  projectThemeStyle,
} from "../../components/ProjectCover/projectTheme";
import ImageLightbox from "../../components/ImageLightbox/ImageLightbox";
import Reveal from "../../components/Reveal/Reveal";

import styles from "./ProjectDetails.module.scss";

const ProjectDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { t, language } = useLanguage();

  const [shotIndex, setShotIndex] = useState<
    number | null
  >(null);

  const projects = getLocalizedProjects(language);

  const projectIndex = projects.findIndex(
    (item) => item.id === id
  );

  const project = projects[projectIndex];

  /*
   * «Назад» возвращает туда, откуда пользователь пришёл (главная,
   * список проектов…) — с восстановлением скролла (ScrollManager).
   * Если страницу открыли напрямую по ссылке, истории внутри сайта
   * нет — тогда ведём в список проектов.
   */
  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate("/projects");
    }
  };

  if (!project) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <h1>{t.projectDetails.notFoundTitle}</h1>

          <Link to="/projects" className={styles.back}>
            {t.projectDetails.notFoundBack}
          </Link>
        </div>
      </main>
    );
  }

  const status = getProjectStatus(project);

  const statusLabel = {
    live: t.projectDetails.statusLive,
    code: t.projectDetails.statusCode,
    closed: t.projectDetails.statusClosed,
    done: t.projectDetails.statusDone,
  }[status];

  const paragraphs = project.description
    .split("\n")
    .filter(Boolean);

  const shots = (project.gallery ?? []).map(
    (src, index) => ({
      src,
      alt: `${project.title}, ${
        t.projectDetails.galleryAlt
      } ${index + 1}`,
    })
  );

  const previous =
    projects[
      (projectIndex - 1 + projects.length) %
        projects.length
    ];

  const next =
    projects[(projectIndex + 1) % projects.length];

  return (
    <main
      className={styles.page}
      style={projectThemeStyle(project)}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div
        className={`${styles.glow} ${styles.glowTwo}`}
        aria-hidden="true"
      />
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.container}>
        <button
          type="button"
          className={styles.back}
          onClick={handleBack}
        >
          {t.projectDetails.back}
        </button>

        <header className={styles.hero}>
          <div className={styles.heroText}>
            <div className={styles.chips}>
              <span className={styles.number}>
                {String(projectIndex + 1).padStart(
                  2,
                  "0"
                )}
                <em>
                  {" "}
                  / {String(projects.length).padStart(2, "0")}
                </em>
              </span>

              <span>{project.category}</span>
              <span>{project.year}</span>

              <span
                className={`${styles.status} ${styles[status]}`}
              >
                <i />
                {statusLabel}
              </span>
            </div>

            <h1>{project.title}</h1>

            <p className={styles.lead}>
              {project.shortDescription}
            </p>

            <div className={styles.actions}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primary}
                >
                  {t.projectDetails.liveWebsite}
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondary}
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>

          <div className={styles.showcase}>
            <div className={styles.screen}>
              <ProjectCover
                project={project}
                size="hero"
              />
            </div>

            {project.mobileImage && (
              <div className={styles.phone}>
                <div className={styles.phoneScreen}>
                  <img
                    src={project.mobileImage}
                    alt={`${project.title}, ${t.projectDetails.phoneAlt}`}
                  />
                </div>
              </div>
            )}
          </div>
        </header>

        <section className={styles.body}>
          <Reveal className={styles.story}>
            <h2>{t.projectDetails.about}</h2>

            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0 && paragraph.length < 320
                    ? styles.firstParagraph
                    : ""
                }
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={120} className={styles.factsWrap}>
            <aside className={styles.facts}>
              <h2>{t.projectDetails.facts}</h2>

              <dl>
                <div>
                  <dt>{t.projectDetails.year}</dt>
                  <dd>{project.year}</dd>
                </div>

                <div>
                  <dt>{t.projectDetails.type}</dt>
                  <dd>{project.category}</dd>
                </div>

                <div>
                  <dt>{t.projectDetails.status}</dt>
                  <dd>{statusLabel}</dd>
                </div>
              </dl>

              <span className={styles.techLabel}>
                {t.projectDetails.technologiesLabel}
              </span>

              <div className={styles.technologies}>
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </aside>
          </Reveal>
        </section>

        {shots.length > 0 && (
          <section className={styles.gallerySection}>
            <Reveal>
              <h2 className={styles.sectionTitle}>
                {t.projectDetails.screens}
              </h2>
            </Reveal>

            <div
              className={`${styles.gallery} ${
                shots.length === 2 ? styles.galleryTwo : ""
              }`}
            >
              {shots.map((shot, index) => (
                <Reveal key={shot.src} delay={index * 100}>
                  <button
                    type="button"
                    className={`${styles.shot} ${
                      project.appWindow ? styles.shotApp : ""
                    }`}
                    aria-label={t.projectDetails.openShot}
                    onClick={() => setShotIndex(index)}
                  >
                    {!project.appWindow && (
                      <div className={styles.shotBar}>
                        <span />
                        <span />
                        <span />
                      </div>
                    )}

                    <img
                      src={shot.src}
                      alt={shot.alt}
                      loading="lazy"
                    />
                  </button>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <nav className={styles.pager}>
          {[
            {
              item: previous,
              label: t.projectDetails.prevProject,
              side: "prev",
            },
            {
              item: next,
              label: t.projectDetails.nextProject,
              side: "next",
            },
          ].map(({ item, label, side }) => (
            <Link
              key={side}
              to={`/projects/${item.id}`}
              className={`${styles.pagerLink} ${
                side === "next" ? styles.pagerNext : ""
              }`}
              style={projectThemeStyle(item)}
            >
              <span className={styles.pagerLabel}>
                {side === "prev" && "← "}
                {label}
                {side === "next" && " →"}
              </span>

              <strong>{item.title}</strong>
            </Link>
          ))}
        </nav>
      </div>

      <ImageLightbox
        images={shots}
        index={shotIndex}
        onIndexChange={setShotIndex}
        closeLabel={t.projectDetails.closeShot}
        prevLabel={t.projectDetails.prevShot}
        nextLabel={t.projectDetails.nextShot}
      />
    </main>
  );
};

export default ProjectDetails;

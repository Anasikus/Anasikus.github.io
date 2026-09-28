import type { Project } from "../../projects/types";

import { getDisplayUrl } from "./projectTheme";

import styles from "./ProjectCover.module.scss";

interface ProjectCoverProps {
  project: Project;
  /* «hero» — крупный вариант для страницы проекта */
  size?: "card" | "hero";
}

/*
 * Обложка проекта. Если есть скриншот — он показывается внутри
 * «окна браузера». Если скриншота нет (десктопные и закрытые
 * проекты) — рисуется фирменная обложка в цветах проекта:
 * «окно редактора» с описанием проекта в виде кода.
 */
const ProjectCover = ({
  project,
  size = "card",
}: ProjectCoverProps) => {
  const sizeClass =
    size === "hero" ? styles.hero : "";

  if (project.previewImage) {
    return (
      <div className={`${styles.frame} ${sizeClass}`}>
        {!project.appWindow && (
          <div className={styles.bar}>
            <span />
            <span />
            <span />

            <em className={styles.url}>
              {getDisplayUrl(project)}
            </em>
          </div>
        )}

        <div
          className={`${styles.screen} ${
            project.appWindow ? styles.appScreen : ""
          }`}
        >
          <img
            src={project.previewImage}
            alt={project.title}
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  const stack = project.technologies
    .slice(0, 4)
    .map((tech) => `"${tech}"`)
    .join(", ");

  const status = project.githubUrl
    ? '"open source"'
    : '"in development"';

  return (
    <div className={`${styles.art} ${sizeClass}`}>
      <div className={styles.orb} aria-hidden="true" />

      <div
        className={`${styles.orb} ${styles.orbTwo}`}
        aria-hidden="true"
      />

      <div
        className={styles.grid}
        aria-hidden="true"
      />

      <div className={styles.window}>
        <div className={styles.bar}>
          <span />
          <span />
          <span />

          <em className={styles.url}>
            {project.id}.ts
          </em>
        </div>

        <pre className={styles.code}>
          <span className={styles.comment}>
            {`// ${project.category} · ${project.year}`}
          </span>
          {"\n"}
          <span className={styles.keyword}>const</span>{" "}
          <span className={styles.name}>project</span> ={" "}
          {"{"}
          {"\n  "}title:{" "}
          <span className={styles.string}>
            {`"${project.title}"`}
          </span>
          {",\n  "}stack: [
          <span className={styles.string}>{stack}</span>
          ],{"\n  "}status:{" "}
          <span className={styles.string}>{status}</span>
          {",\n"}
          {"};"}
          <span className={styles.caret} />
        </pre>
      </div>
    </div>
  );
};

export default ProjectCover;

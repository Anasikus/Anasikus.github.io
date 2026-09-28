import { useRef, type PointerEvent } from "react";

import { Link } from "react-router-dom";

import type { Project } from "../../projects/types";

import { useLanguage } from "../../i18n/useLanguage";

import ProjectCover from "../ProjectCover/ProjectCover";
import {
  getProjectStatus,
  projectThemeStyle,
} from "../ProjectCover/projectTheme";

import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const MAX_TILT = 7;
const MAX_TECH = 4;

/*
 * Карточка проекта. У каждого проекта свои две краски
 * (project.accent): из них строятся рамка, свечение под курсором
 * и градиент заголовка. Обложка при наведении наклоняется вслед
 * за курсором.
 */
const ProjectCard = ({
  project,
  index,
}: ProjectCardProps) => {
  const { t } = useLanguage();

  const cardRef =
    useRef<HTMLAnchorElement | null>(null);

  const status = getProjectStatus(project);

  const statusLabel = {
    live: t.projectDetails.statusLive,
    code: t.projectDetails.statusCode,
    closed: t.projectDetails.statusClosed,
    done: t.projectDetails.statusDone,
  }[status];

  const handleMove = (
    event: PointerEvent<HTMLAnchorElement>
  ) => {
    const el = cardRef.current;

    if (!el || event.pointerType === "touch") {
      return;
    }

    const rect = el.getBoundingClientRect();

    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.setProperty(
      "--rx",
      `${(0.5 - py) * MAX_TILT}deg`
    );
    el.style.setProperty(
      "--ry",
      `${(px - 0.5) * MAX_TILT}deg`
    );
  };

  const handleLeave = () => {
    const el = cardRef.current;

    if (!el) {
      return;
    }

    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Link
      ref={cardRef}
      to={`/projects/${project.id}`}
      className={styles.card}
      style={projectThemeStyle(project)}
      data-cursor="view"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div className={styles.media}>
        <div className={styles.mediaInner}>
          <ProjectCover project={project} />
        </div>

        <span
          className={`${styles.badge} ${
            styles[status]
          }`}
        >
          <i />
          {statusLabel}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.top}>
          {index !== undefined && (
            <span className={styles.index}>
              {String(index + 1).padStart(2, "0")}
            </span>
          )}

          <span className={styles.category}>
            {project.category}
          </span>

          <span className={styles.year}>
            {project.year}
          </span>
        </div>

        <h3>{project.title}</h3>

        <p className={styles.description}>
          {project.shortDescription}
        </p>

        <div className={styles.tech}>
          {project.technologies
            .slice(0, MAX_TECH)
            .map((technology) => (
              <span key={technology}>
                {technology}
              </span>
            ))}

          {project.technologies.length > MAX_TECH && (
            <span className={styles.more}>
              +{project.technologies.length - MAX_TECH}
            </span>
          )}
        </div>

        <span className={styles.cta}>
          {t.projectsSection.viewProject}

          <span className={styles.arrow}>↗</span>
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;

import { Link } from "react-router-dom";

import type { Project } from "../../projects/types";

import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({
  project,
}: ProjectCardProps) => {
  return (
    <Link
      to={`/projects/${project.id}`}
      className={styles.card}
      data-cursor="view"
    >
      <div className={styles.imageWrapper}>
        {project.previewImage ? (
          <img
            src={project.previewImage}
            alt={project.title}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderNumber}>
              {project.year}
            </span>

            <span className={styles.placeholderTitle}>
              {project.title}
            </span>

            <span className={styles.placeholderCategory}>
              {project.category}
            </span>

            <div className={styles.placeholderGlow} />
            <div className={styles.placeholderGrid} />
          </div>
        )}

        <div className={styles.overlay}>
          <span>VIEW PROJECT</span>
          <span>↗</span>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.mainInfo}>
          <p className={styles.category}>
            {project.category}
          </p>

          <h3>{project.title}</h3>

          <p className={styles.description}>
            {project.shortDescription}
          </p>
        </div>

        <div className={styles.meta}>
          <span>{project.year}</span>

          <span className={styles.arrow}>
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
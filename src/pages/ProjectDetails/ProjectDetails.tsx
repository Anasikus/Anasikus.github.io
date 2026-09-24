import { Link, useParams } from "react-router-dom";

import { getLocalizedProjects } from "../../i18n/content/projects";
import { useLanguage } from "../../i18n/useLanguage";

import styles from "./ProjectDetails.module.scss";

const ProjectDetails = () => {
  const { id } = useParams();

  const { t, language } = useLanguage();

  const project = getLocalizedProjects(
    language
  ).find((item) => item.id === id);

  if (!project) {
    return (
      <main>
        <h1>
          {
            t.projectDetails
              .notFoundTitle
          }
        </h1>

        <Link to="/projects">
          {
            t.projectDetails
              .notFoundBack
          }
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link
          to="/projects"
          className={styles.back}
        >
          {t.projectDetails.back}
        </Link>

        <p className={styles.category}>
          {project.category}
        </p>

        <h1>{project.title}</h1>

        <p className={styles.description}>
          {project.description}
        </p>

        <div className={styles.technologies}>
          {project.technologies.map(
            (technology) => (
              <span key={technology}>
                {technology}
              </span>
            )
          )}
        </div>

        <div className={styles.links}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {
                t.projectDetails
                  .liveWebsite
              }
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          )}
        </div>

        <div className={styles.gallery}>
          {project.gallery?.map(
            (image, index) => (
              <img
                key={image}
                src={image}
                alt={`${project.title}, ${
                  t.projectDetails
                    .galleryAlt
                } ${index + 1}`}
              />
            )
          )}
        </div>
      </div>
    </main>
  );
};

export default ProjectDetails;

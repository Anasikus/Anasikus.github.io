import { Link, useParams } from "react-router-dom";

import { projects } from "../../projects";

import styles from "./ProjectDetails.module.scss";

const ProjectDetails = () => {
  const { id } = useParams();

  const project = projects.find(
    (item) => item.id === id
  );

  if (!project) {
    return (
      <main>
        <h1>Project not found</h1>

        <Link to="/projects">
          Back to projects
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
          ← Back to projects
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
              Live website ↗
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
          {project.gallery.map(
            (image, index) => (
              <img
                key={image}
                src={image}
                alt={`${project.title} screenshot ${
                  index + 1
                }`}
              />
            )
          )}
        </div>
      </div>
    </main>
  );
};

export default ProjectDetails;
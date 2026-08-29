import { Link } from "react-router-dom";

import { projects } from "../../projects";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

import styles from "./Projects.module.scss";

const Projects = () => {
  const featuredProjects = projects.filter(
    (project) => project.featured
  );

  return (
    <section
      id="projects"
      className={styles.section}
    >
      <div className={styles.container}>
        <div className={styles.top}>
          <span className={styles.label}>
            03 / ИЗБРАННЫЕ ПРОЕКТЫ
          </span>
        </div>

        <header className={styles.heading}>
          <div className={styles.titleBlock}>
            <h2>
              Любимые разработки
            </h2>
          </div>

          <div className={styles.intro}>
            <p>
              От первых учебных проектов
              до полноценных веб-приложений.
            </p>

            <p>
              Здесь собраны работы,
              которые лучше всего
              рассказывают о моём пути
              как разработчика.
            </p>

            <Link
              to="/projects"
              className={styles.allProjects}
              data-cursor="hover"
            >
              <span>Все проекты</span>

              <span className={styles.allProjectsArrow}>
                ↗
              </span>
            </Link>
          </div>
        </header>

        <div className={styles.projects}>
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

        <div className={styles.bottomLink}>
          <Link
            to="/projects"
            className={styles.viewAll}
            data-cursor="hover"
          >
            <span>Смотреть все проекты</span>

            <span className={styles.viewAllArrow}>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
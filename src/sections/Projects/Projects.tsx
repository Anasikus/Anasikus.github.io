import { Link } from "react-router-dom";

import { getLocalizedProjects } from "../../i18n/content/projects";
import { useLanguage } from "../../i18n/useLanguage";
import { useMagnetic } from "../../hooks/useMagnetic";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import AmbientBackground from "../../components/AmbientBackground/AmbientBackground";

import styles from "./Projects.module.scss";

const Projects = () => {
  const { t, language } = useLanguage();

  const allProjectsRef =
    useMagnetic<HTMLAnchorElement>();

  const viewAllRef =
    useMagnetic<HTMLAnchorElement>();

  const featuredProjects =
    getLocalizedProjects(
      language
    ).filter(
      (project) => project.featured
    );

  return (
    <section
      id="projects"
      className={styles.section}
    >
      <AmbientBackground />

      <div className={styles.container}>
        <div className={styles.top}>
          <span className={styles.label}>
            {t.projectsSection.label}
          </span>
        </div>

        <header className={styles.heading}>
          <div className={styles.titleBlock}>
            <h2>
              {t.projectsSection.heading}
            </h2>
          </div>

          <div className={styles.intro}>
            <p>
              {
                t.projectsSection
                  .introLine1
              }
            </p>

            <p>
              {
                t.projectsSection
                  .introLine2
              }
            </p>

            <Link
              ref={allProjectsRef}
              to="/projects"
              className={styles.allProjects}
              data-cursor="hover"
            >
              <span>
                {
                  t.projectsSection
                    .allProjects
                }
              </span>

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
            ref={viewAllRef}
            to="/projects"
            className={styles.viewAll}
            data-cursor="hover"
          >
            <span>
              {
                t.projectsSection
                  .viewAllProjects
              }
            </span>

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

import { getLocalizedProjects } from "../../i18n/content/projects";
import { useLanguage } from "../../i18n/useLanguage";

import ProjectCard from "../../components/ProjectCard/ProjectCard";

import styles from "./Projects.module.scss";

const ProjectsPage = () => {
  const { t, language } = useLanguage();

  const projects =
    getLocalizedProjects(language);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <p className={styles.label}>
          {t.projectsPage.label}
        </p>

        <h1>
          {t.projectsPage.headingLine1}
          <br />
          {t.projectsPage.headingLine2}
        </h1>

        <div className={styles.projects}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProjectsPage;

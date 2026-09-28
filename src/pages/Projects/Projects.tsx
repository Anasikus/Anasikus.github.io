import { useState } from "react";

import { getLocalizedProjects } from "../../i18n/content/projects";
import { useLanguage } from "../../i18n/useLanguage";

import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Reveal from "../../components/Reveal/Reveal";

import styles from "./Projects.module.scss";

const ProjectsPage = () => {
  const { t, language } = useLanguage();

  const projects =
    getLocalizedProjects(language);

  const [filter, setFilter] = useState<
    string | null
  >(null);

  const categories = Array.from(
    new Set(
      projects.map((project) => project.category)
    )
  );

  const visible = filter
    ? projects.filter(
        (project) => project.category === filter
      )
    : projects;

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

        <div
          className={styles.filters}
          role="tablist"
        >
          {[null, ...categories].map((category) => (
            <button
              key={category ?? "all"}
              type="button"
              role="tab"
              aria-selected={filter === category}
              className={`${styles.filter} ${
                filter === category
                  ? styles.filterActive
                  : ""
              }`}
              onClick={() => setFilter(category)}
            >
              {category ?? t.projectsPage.filterAll}

              <span>
                {category
                  ? projects.filter(
                      (project) =>
                        project.category === category
                    ).length
                  : projects.length}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.projects}>
          {visible.map((project, index) => (
            <Reveal
              key={project.id}
              delay={(index % 2) * 90}
              className={styles.cell}
            >
              <ProjectCard
                project={project}
                index={projects.indexOf(project)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProjectsPage;

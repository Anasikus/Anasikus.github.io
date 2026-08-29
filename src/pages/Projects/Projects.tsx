import { projects } from "../../projects";

import ProjectCard from "../../components/ProjectCard/ProjectCard";

import styles from "./Projects.module.scss";

const ProjectsPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <p className={styles.label}>
          ALL PROJECTS
        </p>

        <h1>
          Selected
          <br />
          work.
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
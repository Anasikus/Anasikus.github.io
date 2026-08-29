import { skills } from "../../data/skills";

import styles from "./Skills.module.scss";

const Skills = () => {
  return (
    <section
      id="skills"
      className={styles.section}
    >
      <div className={styles.container}>
        <p className={styles.label}>
          02 / СКИЛЫ
        </p>

        <div className={styles.groups}>
          {skills.map((group) => (
            <div
              key={group.title}
              className={styles.group}
            >
              <h3>{group.title}</h3>

              <div className={styles.skills}>
                {group.skills.map((skill) => (
                  <span key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
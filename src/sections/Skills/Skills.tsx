import { skills } from "../../data/skills";

import { useLanguage } from "../../i18n/useLanguage";

import AmbientBackground from "../../components/AmbientBackground/AmbientBackground";

import styles from "./Skills.module.scss";

const Skills = () => {
  const { t } = useLanguage();

  /*
   * "Frontend" и "Backend" — общепринятые термины,
   * не переводятся ни на один язык (см. данные
   * data/skills.ts). А вот "База данных"/"Инструменты" —
   * обычные слова, которые переводятся как любой другой
   * текст интерфейса.
   */
  const groupTitle = (
    title: string
  ) => {
    if (title === "База данных") {
      return t.skills.database;
    }

    if (title === "Инструменты") {
      return t.skills.tools;
    }

    if (title === "Другие языки") {
      return t.skills.otherLanguages;
    }

    return title;
  };

  return (
    <section
      id="skills"
      className={styles.section}
    >
      <AmbientBackground />

      <div className={styles.container}>
        <p className={styles.label}>
          {t.skills.label}
        </p>

        <div className={styles.groups}>
          {skills.map((group) => (
            <div
              key={group.title}
              className={styles.group}
            >
              <h3>
                {groupTitle(
                  group.title
                )}
              </h3>

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

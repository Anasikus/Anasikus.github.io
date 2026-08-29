import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.logo}
      >
        FULL-STACK DEVELOPER
      </Link>

      <nav className={styles.navigation}>
        <a href="/#about">
          О себе
        </a>

        <a href="/#skills">
          Скилы
        </a>

        <a href="/#projects">
          Проекты
        </a>

        <a href="/#experience">
          Опыт
        </a>

        <a href="/#contact">
          Контакты
        </a>
      </nav>

      <a
        href="https://github.com/Anasikus"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.github}
      >
        GitHub ↗
      </a>
    </header>
  );
};

export default Header;
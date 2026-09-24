import { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

import { scrollToSection } from "../../utils/scrollToSection";

import { useLanguage } from "../../i18n/useLanguage";

import styles from "./Header.module.scss";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const location = useLocation();

  const { t } = useLanguage();

  const navLinks = [
    {
      href: "/#about",
      label: t.header.navAbout,
    },
    {
      href: "/#skills",
      label: t.header.navSkills,
    },
    {
      href: "/#projects",
      label: t.header.navProjects,
    },
    {
      href: "/#experience",
      label: t.header.navExperience,
    },
    {
      href: "/#contact",
      label: t.header.navContact,
    },
  ];

  const closeMenu = () =>
    setIsMenuOpen(false);

  /*
   * На главной странице якорные ссылки просто докручивают
   * к разделу (без этого — без preventDefault — переход по
   * ссылке на тот же путь+хэш браузер иногда обрабатывал
   * как «остаться наверху», а не проскроллить к разделу).
   * С других страниц ("/projects" и т.д.) — обычный переход
   * на главную с хэшем, докрутку туда доделает useLenis
   * при монтировании.
   */
  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (location.pathname !== "/") {
      closeMenu();

      return;
    }

    event.preventDefault();

    const hash = href.slice(
      href.indexOf("#")
    );

    window.history.pushState(
      null,
      "",
      hash
    );

    scrollToSection(hash);
    closeMenu();
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          to="/"
          className={styles.logo}
          onClick={closeMenu}
        >
          {t.header.logo}
        </Link>

        <nav className={styles.navigation}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) =>
                handleNavClick(
                  event,
                  link.href
                )
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher />

          <a
            href="https://github.com/Anasikus"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.github}
          >
            GitHub ↗
          </a>

          <button
            type="button"
            className={styles.burger}
            aria-label={
              isMenuOpen
                ? t.header.closeMenu
                : t.header.openMenu
            }
            aria-expanded={isMenuOpen}
            onClick={() =>
              setIsMenuOpen(
                (open) => !open
              )
            }
          >
            <span
              className={
                isMenuOpen
                  ? styles.burgerLineOpen
                  : styles.burgerLine
              }
            />

            <span
              className={
                isMenuOpen
                  ? styles.burgerLineOpen
                  : styles.burgerLine
              }
            />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          className={styles.mobileNav}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) =>
                handleNavClick(
                  event,
                  link.href
                )
              }
            >
              {link.label}
            </a>
          ))}

          <a
            href="https://github.com/Anasikus"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            GitHub ↗
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;

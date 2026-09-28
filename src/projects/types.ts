export interface ProjectAccent {
  from: string;
  to: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;

  shortDescription: string;

  /*
   * Абзацы разделяются символом переноса строки — на странице
   * проекта каждый выводится отдельным <p>.
   */
  description: string;

  technologies: string[];

  /*
   * Две краски проекта: из них строятся свечение фона, рамка
   * карточки, градиент заголовка и кнопки на странице проекта.
   */
  accent: ProjectAccent;

  /* Скриншот главной страницы (16:10) — обложка в карточке. */
  previewImage?: string;

  /* Скриншот с телефона — показывается в макете смартфона. */
  mobileImage?: string;

  gallery?: string[];

  /*
   * Скриншоты — окна десктопного приложения (со своей рамкой
   * Windows), поэтому «окно браузера» вокруг них не рисуем.
   */
  appWindow?: boolean;

  githubUrl?: string;
  liveUrl?: string;

  /* Явный статус, если он не следует из ссылок (например, закрытый, но завершённый проект). */
  status?: "done";

  featured?: boolean;
}

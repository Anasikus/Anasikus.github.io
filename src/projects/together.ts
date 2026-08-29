import type { Project } from "./types";

export const togerher: Project = {
  id: "together",

  title: "Проект Вместе",

  category: "frontend-develop",

  year: "2026",

  shortDescription:
    "Одностраничный сайт с Telegram-интеграцией",

  description:
    "Одностраничный сайт, разработанный за 1 день на заказ. Реализованы адаптивная верстка, мультиязычность, переключение светлой и тёмной темы, FAQ и форма обратной связи с отправкой сообщений в Telegram через Cloudflare Workers.",

  technologies: [
    "HTML",
    "CSS",
    "JavaScript",
    "Cloudflare Workers",
    "Telegram Bot API",
  ],

  previewImage:
    "/projects/together/preview.webp",

  gallery: [
    "/projects/together/01.webp",
    "/projects/together/02.webp",
    "/projects/together/03.webp",
  ],

  githubUrl:
    "https://github.com/Anasikus/project-vmeste/",

  liveUrl: "https://anasikus.github.io/project-vmeste/",

  featured: true,
};
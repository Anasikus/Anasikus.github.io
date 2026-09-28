import type { Project } from "./types";

export const togerher: Project = {
  id: "together",

  title: "Проект Вместе",

  category: "Frontend",

  year: "2026",

  shortDescription:
    "Одностраничный сайт с Telegram-интеграцией",

  description:
    "«Вместе» — одностраничный сайт помощи мигрантам, разработанный на заказ за один день. На нём собраны основные направления поддержки — юридическая помощь, работа и занятость, изучение русского языка, медицинская помощь, — подборка полезных материалов, ответы на частые вопросы и контакты.\nАдаптивная вёрстка, три языка интерфейса (RU / EN / UZ), переключение светлой и тёмной темы. Форма обратной связи отправляет сообщения прямо в Telegram через Cloudflare Workers — без собственного сервера и без переезда на платный хостинг.",

  technologies: [
    "HTML",
    "CSS",
    "JavaScript",
    "Cloudflare Workers",
    "Telegram Bot API",
  ],

  accent: {
    from: "#38bdf8",
    to: "#6366f1",
  },

  previewImage: "/projects/together/cover.webp",

  mobileImage: "/projects/together/mobile.webp",

  gallery: [
    "/projects/together/shot-1.webp",
    "/projects/together/shot-2.webp",
    "/projects/together/shot-3.webp",
  ],

  githubUrl:
    "https://github.com/Anasikus/project-vmeste/",

  liveUrl: "https://anasikus.github.io/project-vmeste/",

  featured: false,
};

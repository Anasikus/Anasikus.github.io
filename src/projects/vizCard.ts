import type { Project } from "./types";

export const vizCard: Project = {
  id: "viz-card",

  title: "Визитная карточка",

  category: "Frontend",

  year: "2025",

  shortDescription:
    "Одностраничный сайт - визитка для преподавателя",

  description:
    "Сайт-визитка для преподавателя, созданная для участия в конкурсе. Знакомит с человеком в несколько прокруток: приветственный экран с фотографиями, раздел «Познакомимся?» с рассказом и фактами о себе, «Копилка достижений» с листаемой галереей грамот и удостоверений, фотоотчёты об активностях и форма обратной связи.\nГлавная задача — сделать так, чтобы за пару минут посетитель увидел живого человека, а не сухое резюме. Отсюда мягкая спокойная палитра, много фотографий и крупная читаемая типографика.",

  technologies: [
    "HTML",
    "CSS",
    "JavaScript",
  ],

  accent: {
    from: "#34d399",
    to: "#0ea5e9",
  },

  previewImage: "/projects/viz-card/cover.webp",

  mobileImage: "/projects/viz-card/mobile.webp",

  gallery: [
    "/projects/viz-card/shot-1.webp",
    "/projects/viz-card/shot-2.webp",
    "/projects/viz-card/shot-3.webp",
  ],

  githubUrl:
    "https://github.com/Anasikus/VizCard",

  liveUrl: "https://anasikus.github.io/VizCard/",

  featured: false,
};

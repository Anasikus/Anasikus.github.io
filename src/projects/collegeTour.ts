import type { Project } from "./types";

export const collegeTour: Project = {
  id: "college-tour",

  title: "Экскурсия по колледжу",

  category: "Frontend",

  year: "2024",

  shortDescription:
    "Интерактивная экскурсия по Ярославскому колледжу управления и профессиональных технологий.",

  description:
    "Сайт-экскурсия по Ярославскому колледжу управления и профессиональных технологий. Интерактивный план здания с вкладками по этажам (с 1 по 4) и условными обозначениями позволяет заранее узнать, где что находится.\nДля тех, кто хочет посмотреть колледж вживую, есть кнопка перехода к видеоэкскурсии. Проект написан на HTML, CSS и JavaScript.",

  technologies: [
    "HTML",
    "CSS",
    "JavaScript",
  ],

  accent: {
    from: "#60a5fa",
    to: "#818cf8",
  },

  previewImage: "/projects/college-tour/cover.webp",

  mobileImage: "/projects/college-tour/mobile.webp",

  gallery: [
    "/projects/college-tour/shot-1.webp",
    "/projects/college-tour/shot-2.webp",
  ],

  githubUrl:
    "https://github.com/Anasikus/College-Tour",

  liveUrl:
    "https://anasikus.github.io/College-Tour/",

  featured: false,
};

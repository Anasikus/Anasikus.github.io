import type { Project } from "./types";

export const flowersLifeDesktop: Project = {
  id: "flowers-life-desktop",

  title: "FlowersLife (Desktop)",

  category: "Desktop",

  year: "2024",

  shortDescription:
    "Настольное приложение для цветочного магазина — более ранняя версия проекта, на C# и MySQL.",

  description:
    "Первая версия «Цветочного магазина» — desktop-приложение на C# с базой данных MySQL. Именно на нём я впервые вплотную поработала с базами данных и бизнес-логикой реального магазина: каталог, заказы, склад.\nПозже та же идея выросла в полноценное веб-приложение FlowersLife с клиентской и серверной частью — и весь опыт, полученный здесь, напрямую пригодился при переходе к вебу.",

  technologies: [
    "C#",
    "MySQL",
  ],

  accent: {
    from: "#e879f9",
    to: "#8b5cf6",
  },

  githubUrl:
    "https://github.com/Anasikus/FlowersLife",

  featured: false,
};

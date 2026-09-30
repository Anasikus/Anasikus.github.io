import type { Project } from "./types";

export const flowersLife: Project = {
  id: "flowers-life",

  title: "FlowersLife",

  category: "Full-stack",

  year: "2026",

  shortDescription:
    'Full-stack веб-приложение "Цветы и подарки".',

  description:
    "FlowersLife — полноценная платформа электронной коммерции для магазина цветов и подарков: витрина для покупателей и панель администратора в одном проекте.\nВнутри каталог и карточки товаров, заказы, зоны доставки, склад, управление продуктами и другие бизнес-функции. Клиентская часть написана на React и TypeScript, сервер — на Node.js и Express с базой MySQL, авторизация построена на JWT.\nЭто итоговый проект обучения, и он всё ещё в активной разработке: исходный код пока не опубликован, а живой версии ещё нет.",

  technologies: [
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "MySQL",
    "JWT",
    "REST API",
  ],

  accent: {
    from: "#f472b6",
    to: "#a855f7",
  },

  previewImage: "/projects/flowers-life/cover.webp",

  gallery: [
    "/projects/flowers-life/cover.webp",
    "/projects/flowers-life/shot-1.webp",
    "/projects/flowers-life/shot-2.webp",
    "/projects/flowers-life/shot-3.webp",
    "/projects/flowers-life/shot-4.webp",
    "/projects/flowers-life/shot-5.webp",
  ],

  featured: true,
};

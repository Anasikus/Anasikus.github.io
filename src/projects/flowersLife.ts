import type { Project } from "./types";

export const flowersLife: Project = {
  id: "flowers-life",

  title: "FlowersLife",

  category: "Full-stack",

  year: "2026",

  shortDescription:
    'Full-stack веб-приложение "Цветы и подарки".',

  description:
    "FlowersLife - это полноценная платформа электронной коммерции, предназначенная для продажи цветов и подарков. Проект включает в себя клиентский интерфейс, панель администрирования, управление продуктами, заказами, зонами доставки, управление складом и другие бизнес-функции. Проект все еще находится в стадии разработки.",

  technologies: [
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "MySQL",
    "JWT",
    "REST API",
  ],

  previewImage:
    "/projects/flowers-life/preview.webp",

  gallery: [
    "/projects/flowers-life/01.webp",
    "/projects/flowers-life/02.webp",
    "/projects/flowers-life/03.webp",
  ],

  githubUrl:
    "https://github.com/Anasikus/FlowersLifeSite",

  liveUrl: undefined,

  featured: true,
};
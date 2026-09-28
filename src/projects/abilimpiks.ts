import type { Project } from "./types";

export const abilimpiks: Project = {
  id: "abilimpiks",

  title: "Программа для Абилимпикс",

  category: "Desktop",

  year: "2024",

  shortDescription:
    "Десктоп-приложение на C# для олимпиады по математике: задания, аналитика ответов и роли пользователей.",

  description:
    "Десктопное приложение на C# (Windows Forms) для проведения олимпиады по математике, сделанное в рамках учебной практики для конкурса «Абилимпикс».\nВ приложении три роли: студент, преподаватель и администратор. Студент решает пять заданий с иллюстрациями и отправляет ответы; на экране «Аналитика» есть таблица ответов с фильтрами по группе, номеру задания и дате; в отдельном окне администратор добавляет, меняет и удаляет пользователей.\nДанные хранятся в локальной базе SQLite. Одна из ключевых функций — генерация видео с помощью модели Qwen: мой первый опыт встраивания AI-модели прямо в десктопное приложение.",

  technologies: [
    "C#",
    "Windows Forms",
    "SQLite",
    "Qwen (AI)",
  ],

  accent: {
    from: "#fb923c",
    to: "#ec4899",
  },

  previewImage: "/projects/abilimpiks/cover.webp",

  gallery: [
    "/projects/abilimpiks/cover.webp",
    "/projects/abilimpiks/shot-1.webp",
    "/projects/abilimpiks/shot-2.webp",
  ],

  appWindow: true,

  status: "done",

  featured: false,
};

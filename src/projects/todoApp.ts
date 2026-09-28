import type { Project } from "./types";

export const todoApp: Project = {
  id: "todo-app",

  title: "Todo-приложение",

  category: "Full-stack",

  year: "2025",

  shortDescription:
    "Первое полноценное веб-приложение — менеджер задач с регистрацией.",

  description:
    "Первое законченное веб-приложение, которое я написала за время производственной практики в НПК «ЯрЛи»: менеджер задач с личным кабинетом.\nРегистрация и авторизация (JWT, bcrypt), добавление и удаление задач, смена статуса — активные и завершённые. Клиент на React, сервер на Node.js и Express, данные хранятся в MongoDB.\nХод работы по дням я вела прямо в README — от разбора ТЗ и выбора стека до инструкции по запуску. Привычка документировать разработку с тех пор осталась.",

  technologies: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "JWT",
  ],

  accent: {
    from: "#a78bfa",
    to: "#34d399",
  },

  githubUrl:
    "https://github.com/Anasikus/todo-app",

  featured: false,
};

export interface ExperienceItem {
  period: string;
  title: string;
  position: string;
  description: string;
  technologies: string[];
}

export const experience: ExperienceItem[] = [
  {
    period: "09.2024 — 10.2024",

    title: "Ареал",

    position: "Стажёр Full-stack разработчик",

    description:
      "Стажировка в качестве Full-stack разработчика. Работа над веб-приложениями, участие в разработке клиентской и серверной частей проекта, работа с базой данных и системой контроля версий.",

    technologies: [
      "Vue.js",
      "PostgreSQL",
      "Node.js",
      "GitHub",
    ],
  },

  {
    period: "06.2025 — 07.2025",

    title: "НПК ЯрЛи",

    position: "Практикант Full-stack разработчик",

    description:
      "Разработка Todo-приложения во время производственной практики в IT-отделе компании «ЯрЛи». Реализация клиентской и серверной частей приложения, работа с базой данных и системой контроля версий.",

    technologies: [
      "MongoDB",
      "React",
      "Node.js",
      "GitHub",
    ],
  },

  {
    period: "09.2025 — 10.2025",

    title: "Сайт-визитка",

    position: "Full-stack разработчик",

    description:
      "Разработка сайта-визитки для преподавателя в рамках участия в конкурсе. Реализация клиентской и серверной частей проекта, работа с базой данных и пользовательским интерфейсом.",

    technologies: [
      "MySQL",
      "PHP",
      "JavaScript",
      "HTML",
      "CSS",
    ],
  },

  {
    period: "09.2025 — 02.2026",

    title: "ШелкоПринт",

    position: "Full-stack разработчик",

    description:
      "Разработка заказного веб-проекта. Работа над клиентской и серверной частями приложения, реализация функциональности, взаимодействие с базой данных и сопровождение проекта.",

    technologies: [
      "MySQL",
      "PHP",
      "JavaScript",
      "HTML",
      "CSS",
      "GitHub",
    ],
  },
];

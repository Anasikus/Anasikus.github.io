export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skills: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "SCSS",
    ],
  },

  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express",
      "REST API",
    ],
  },

  {
    title: "База данных",
    skills: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "SQLite",
    ],
  },

  {
    title: "Другие языки",
    skills: [
      "C#",
      "Python",
    ],
  },

  {
    title: "Инструменты",
    skills: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
    ],
  },
];
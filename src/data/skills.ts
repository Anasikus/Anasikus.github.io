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
    title: "Database",
    skills: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
    ],
  },

  {
    title: "Tools",
    skills: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
    ],
  },
];
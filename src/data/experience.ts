export interface ExperienceItem {
  period: string;
  title: string;
  description: string;
  technologies: string[];
}

export const experience: ExperienceItem[] = [
  {
    period: "2025 — Present",

    title: "Full-stack Developer",

    description:
      "Development of client-server web applications using React, TypeScript, Node.js and relational databases.",

    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "MySQL",
      "Git",
    ],
  },
];
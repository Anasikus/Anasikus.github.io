import type { Project } from "./types";

export const autoDocUpdater: Project = {
  id: "autodoc-updater",

  title: "AutoDoc Updater",

  category: "Automation",

  year: "2026",

  shortDescription:
    "Python-программа, которая сама обновляет цены и сроки в Excel-таблицах по данным Autodoc.",

  description:
    "Программа берёт Excel-таблицу с артикулами, ищет каждый на Autodoc.ru и записывает обратно цену, среднюю цену, срок доставки, рейтинг, количество отзывов и статус обработки. Раньше на это уходили часы ручной работы.\nУ программы графический интерфейс на CustomTkinter: файл можно перетащить в окно, задать лимит строк, включить фильтр аналогов, остановить обработку в любой момент. Поиск идёт через автоматизированный браузер (Playwright) с паузами между запросами и автоматической остановкой, если сайт начинает блокировать.\nНаписана для нужд семейного бизнеса, чтобы избавить от рутинного обновления прайсов.",

  technologies: [
    "Python",
    "Playwright",
    "openpyxl",
    "CustomTkinter",
  ],

  accent: {
    from: "#a3e635",
    to: "#22c55e",
  },

  previewImage: "/projects/autodoc-updater/cover.webp",

  gallery: [
    "/projects/autodoc-updater/cover.webp",
    "/projects/autodoc-updater/shot-2.webp",
  ],

  appWindow: true,

  githubUrl:
    "https://github.com/Anasikus/AutoDoc_Updater",

  featured: false,
};

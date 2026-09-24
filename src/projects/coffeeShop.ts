import type { Project } from "./types";

export const coffeeShop: Project = {
  id: "coffee-shop",

  title: "Coffee & Cake",

  category: "Frontend",

  year: "2023",

  shortDescription:
    "Исторический артефакт",

  description:
    "Мой первый пет-проект, созданный на первос курсе в эпоху, когда я только знакомилась с HTML и CSS. В какой-то момент я решила, что авторизация без backend — это вполне решаемая задача, а адаптивность, судя по всему, была необязательной функцией. Несмотря на всё это, именно с этого проекта началось моё знакомство с самостоятельной разработкой.\nУровень: «работает — не трогай»\nBackend: отсутствует, как и понимание его необходимости\nАдаптив: мы старались\nГлавный результат: я поняла, как делать не надо ",

  technologies: [
    "HTML",
    "CSS",
    "JavaScript",
  ],

  previewImage:
    "/projects/coffeeShop/preview.webp",

  gallery: [
    "/projects/coffeeShop/01.webp",
    "/projects/coffeeShop/02.webp",
    "/projects/coffeeShop/03.webp",
  ],

  githubUrl:
    "https://github.com/Anasikus/CoffeeAndCake/",

  liveUrl: "https://anasikus.github.io/CoffeeAndCake/",

  featured: false,
};
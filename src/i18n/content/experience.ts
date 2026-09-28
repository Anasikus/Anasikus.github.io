import {
  experience,
  type ExperienceItem,
} from "../../data/experience";

import type { Language } from "../languages";

type TranslatedFields = Partial<
  Pick<
    ExperienceItem,
    "title" | "position" | "description"
  >
>;

type ExperienceTranslations = Record<
  string,
  TranslatedFields
>;

const en: ExperienceTranslations = {
  Ареал: {
    position:
      "Full-stack Developer Intern",
    description:
      "Internship as a Full-stack developer. Worked on web applications, took part in developing both the client and server sides of the project, worked with a database and a version control system.",
  },
  "НПК ЯрЛи": {
    position:
      "Full-stack Developer Trainee",
    description:
      "Built a Todo application during a work placement in the IT department of the company ‘YarLi.’ Implemented the client and server sides of the app, worked with a database and a version control system.",
  },
  "Сайт-визитка": {
    title: "Business Card Site",
    position: "Full-stack Developer",
    description:
      "Built a business-card website for a teacher as part of a competition entry. Implemented the client and server sides of the project, worked with a database and the user interface.",
  },
  ШелкоПринт: {
    position: "Full-stack Developer",
    description:
      "Built a custom web project on commission. Worked on the client and server sides of the application, implemented functionality, worked with the database and maintained the project.",
  },
};

const kk: ExperienceTranslations = {
  Ареал: {
    position:
      "Тағылымдамашы Full-stack әзірлеуші",
    description:
      "Full-stack әзірлеуші ретінде тағылымдама. Веб-қосымшалар бойынша жұмыс, жобаның клиенттік және серверлік бөліктерін әзірлеуге қатысу, дерекқормен және нұсқаларды бақылау жүйесімен жұмыс.",
  },
  "НПК ЯрЛи": {
    position:
      "Тәжірибеден өтуші Full-stack әзірлеуші",
    description:
      "«ЯрЛи» компаниясының IT-бөлімінде өндірістік практика кезінде Todo-қосымшасын әзірлеу. Қосымшаның клиенттік және серверлік бөліктерін іске асыру, дерекқормен және нұсқаларды бақылау жүйесімен жұмыс.",
  },
  "Сайт-визитка": {
    title: "Візитка-сайт",
    position: "Full-stack әзірлеуші",
    description:
      "Байқауға қатысу аясында оқытушыға арналған визитка-сайтты әзірлеу. Жобаның клиенттік және серверлік бөліктерін іске асыру, дерекқормен және пайдаланушы интерфейсімен жұмыс.",
  },
  ШелкоПринт: {
    position: "Full-stack әзірлеуші",
    description:
      "Тапсырыс бойынша веб-жобаны әзірлеу. Қосымшаның клиенттік және серверлік бөліктерімен жұмыс, функционалдылықты іске асыру, дерекқормен өзара әрекеттесу және жобаны сүйемелдеу.",
  },
};

const be: ExperienceTranslations = {
  Ареал: {
    position:
      "Стажор Full-stack распрацоўшчык",
    description:
      "Стажыроўка ў якасці Full-stack распрацоўшчыка. Праца над вэб-дадаткамі, удзел у распрацоўцы кліенцкай і сервернай частак праекта, праца з базай дадзеных і сістэмай кантролю версій.",
  },
  "НПК ЯрЛи": {
    position:
      "Практыкант Full-stack распрацоўшчык",
    description:
      "Распрацоўка Todo-дадатку падчас вытворчай практыкі ў IT-аддзеле кампаніі «ЯрЛі». Рэалізацыя кліенцкай і сервернай частак дадатку, праца з базай дадзеных і сістэмай кантролю версій.",
  },
  "Сайт-визитка": {
    title: "Сайт-візітка",
    position: "Full-stack распрацоўшчык",
    description:
      "Распрацоўка сайта-візіткі для выкладчыка ў рамках удзелу ў конкурсе. Рэалізацыя кліенцкай і сервернай частак праекта, праца з базай дадзеных і карыстальніцкім інтэрфейсам.",
  },
  ШелкоПринт: {
    position: "Full-stack распрацоўшчык",
    description:
      "Распрацоўка заказнога вэб-праекта. Праца над кліенцкай і сервернай часткамі дадатку, рэалізацыя функцыянальнасці, узаемадзеянне з базай дадзеных і суправаджэнне праекта.",
  },
};

const translations: Record<
  Exclude<Language, "ru">,
  ExperienceTranslations
> = { en, kk, be };

export const getLocalizedExperience = (
  language: Language
): ExperienceItem[] => {
  if (language === "ru") {
    return experience;
  }

  const dictionary =
    translations[language];

  return experience.map((item) => ({
    ...item,
    ...(dictionary[item.title] ?? {}),
  }));
};

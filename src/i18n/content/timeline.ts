import {
  timeline,
  type TimelineItem,
} from "../../data/timeline";

import type { Language } from "../languages";

type TranslatedFields = Pick<
  TimelineItem,
  "period" | "title" | "description"
>;

type TimelineTranslations = Record<
  string,
  TranslatedFields
>;

const en: TimelineTranslations = {
  "first-interest": {
    period: "GRADE 5",
    title:
      "First introduction to programming",
    description:
      "It was in the fifth grade that I first became interested in programming. Over time, that interest grew into a conscious decision to build my professional life around development.",
  },
  "future-code": {
    period: "STUDIES",
    title: "Code of the future",
    description:
      "During my studies, I decided not to limit myself to the college curriculum and completed an additional course, ‘Easy Entry into IT — Web Development and Java.’ This let me learn the basics of web development before my college coursework even got there.",
  },
  "first-team-projects": {
    period: "YEAR 2",
    title: "First team projects",
    description:
      "In my second year, I got my first experience of team development. I took part in building a website for an animal shelter and the Coffee & Cake project. This stage taught me to account for my teammates’ work and align my own part of a project with the shared result.",
  },
  "commercial-attempt": {
    period: "YEAR 3",
    title:
      "First experience in commercial development",
    description:
      "After connecting with the company ‘Areal,’ I went through an interview and got my first practical trial task. I worked with the structure of a real project, GitHub, Node.js, Vue.js and PostgreSQL. Even though I didn’t finish the trial in time, it became an important professional lesson that showed me how much proper requirements work and planning matter.",
  },
  "college-project": {
    period: "YEAR 3",
    title:
      "Building a website for the college",
    description:
      "Continuing to grow in web development, I took part in building an additional website for the college.",
  },
  yarli: {
    period: "YEAR 3",
    title:
      "YarLi — my first full-fledged application",
    description:
      "During my work placement, I got the chance to intern at the company ‘YarLi.’ There I built my first full-fledged working web application — a Todo app. That project marked an important shift from coursework assignments to building a complete application.",
  },
  shelkoprint: {
    period: "SUMMER",
    title: "First client — ShelkoPrint",
    description:
      "In the summer I got my first client and built the ‘ShelkoPrint’ website. It was my first experience working with a real client, their requirements and expectations.",
  },
  moderation: {
    period: "SUMMER",
    title:
      "Automating internal processes",
    description:
      "Alongside other projects, I worked on a web application to automate processes for senior moderators.",
  },
  "fourth-year": {
    period: "YEAR 4",
    title:
      "More projects — more responsibility",
    description:
      "In my fourth year I was involved in several projects at once: building a business-card site for a teachers’ competition, a site to accompany a coursework presentation, taking part in team development of a web application at EvaTeam as a Backend developer, and continuing to work on my own projects.",
  },
  "flowers-life": {
    period: "2026",
    title: "Flowers and Gifts",
    description:
      "My final study project was the ‘Flowers and Gifts’ online service. The project brought together my knowledge of frontend and backend development, working with databases, APIs, authorization and the architecture of a full-fledged web application.",
  },
  graduation: {
    period: "JUNE 2026",
    title: "Honors diploma",
    description:
      "In June 2026, I received a secondary vocational education degree in ‘Information Systems and Programming’ with honors.",
  },
};

const kk: TimelineTranslations = {
  "first-interest": {
    period: "5-СЫНЫП",
    title:
      "Бағдарламалаумен алғашқы таныстық",
    description:
      "Дәл бесінші сыныпта менде бағдарламалауға деген қызығушылық пайда болды. Уақыт өте келе бұл қызығушылық кәсіби өмірімді әзірлеумен байланыстыруға деген саналы тілекке айналды.",
  },
  "future-code": {
    period: "ОҚУ",
    title: "Болашақ коды",
    description:
      "Оқу кезінде мен колледж бағдарламасымен шектелмеуге шешім қабылдап, «IT-ге жеңіл кіру — Веб-әзірлеу және Java» қосымша бағдарламасынан оқу курсынан өттім. Бұл маған колледждегі тиісті оқу басталғанға дейін веб-әзірлеудің негіздерімен танысуға мүмкіндік берді.",
  },
  "first-team-projects": {
    period: "2-КУРС",
    title:
      "Алғашқы командалық жобалар",
    description:
      "Екінші курста мен алғаш рет командалық әзірлеу тәжірибесін алдым. Панаh үшін сайт пен Coffee & Cake жобасын жасауға қатыстым. Бұл кезең маған команданың басқа мүшелерінің жұмысын ескеруге және жобаның өз бөлігін жалпы нәтижемен үйлестіруге үйретті.",
  },
  "commercial-attempt": {
    period: "3-КУРС",
    title:
      "Коммерциялық әзірлеудегі алғашқы тәжірибе",
    description:
      "«Ареал» компаниясымен танысқаннан кейін мен сұхбаттан өттім және алғашқы практикалық сынақ тапсырмасын алдым. Нақты жобаның құрылымымен, GitHub, Node.js, Vue.js және PostgreSQL-мен жұмыс істедім. Сынақты уақытында аяқтай алмасам да, бұл тәжірибе маңызды кәсіби сабаққа айналды және маған талаптармен сауатты жұмыс пен жоспарлаудың маңыздылығын көрсетті.",
  },
  "college-project": {
    period: "3-КУРС",
    title: "Колледжге сайт әзірлеу",
    description:
      "Веб-әзірлеу бағытында дамуды жалғастыра отырып, мен колледжге қосымша сайт жасауға қатыстым.",
  },
  yarli: {
    period: "3-КУРС",
    title:
      "ЯрЛи — алғашқы толыққанды қосымша",
    description:
      "Өндірістік практика кезінде маған «ЯрЛи» компаниясында практикадан өту мүмкіндігі берілді. Онда мен өзімнің алғашқы толыққанды жұмыс істейтін Todo веб-қосымшамды әзірледім. Дәл осы жоба оқу тапсырмаларынан аяқталған қосымшаны әзірлеуге маңызды өтпелі кезең болды.",
  },
  shelkoprint: {
    period: "ЖАЗ",
    title:
      "Алғашқы тапсырыс беруші — ШелкоПринт",
    description:
      "Жазда мен алғашқы тапсырыс берушіні алдым және «ШелкоПринт» сайтын әзірледім. Бұл нақты клиентпен, оның талаптары мен күтулерімен жұмыс істеудегі алғашқы тәжірибе болды.",
  },
  moderation: {
    period: "ЖАЗ",
    title:
      "Ішкі процестерді автоматтандыру",
    description:
      "Басқа жобалармен қатар мен аға модераторлардың процестерін автоматтандыруға арналған веб-қосымшаны әзірлеумен айналыстым.",
  },
  "fourth-year": {
    period: "4-КУРС",
    title:
      "Көбірек жоба — көбірек жауапкершілік",
    description:
      "Төртінші курста мен бірнеше жобаға бір мезгілде қатыстым: оқытушылар байқауына арналған визитка-сайт, курстық жұмыс презентациясына қосымша сайт жасадым, EvaTeam-де Backend-әзірлеуші рөлінде веб-қосымшаны командалық әзірлеуге қатыстым және өз жобаларым бойынша жұмысты жалғастырдым.",
  },
  "flowers-life": {
    period: "2026",
    title: "Гүлдер мен сыйлықтар",
    description:
      "Оқудың қорытынды жобасы «Гүлдер мен сыйлықтар» интернет-қызметі болды. Жоба менің frontend- және backend-әзірлеу, дерекқорлармен жұмыс, API, авторизация және толыққанды веб-қосымша архитектурасы бойынша білімімді біріктірді.",
  },
  graduation: {
    period: "МАУСЫМ 2026",
    title: "Үздік диплом",
    description:
      "2026 жылдың маусымында мен «Ақпараттық жүйелер және бағдарламалау» мамандығы бойынша орта кәсіптік білімді үздік бітірдім.",
  },
};

const be: TimelineTranslations = {
  "first-interest": {
    period: "5 КЛАС",
    title:
      "Першае знаёмства з праграмаваннем",
    description:
      "Менавіта ў пятым класе ў мяне з’явілася цікавасць да праграмавання. З часам гэтая цікавасць ператварылася ў усвядомленае жаданне звязаць з распрацоўкай сваё прафесійнае жыццё.",
  },
  "future-code": {
    period: "НАВУЧАННЕ",
    title: "Код будучыні",
    description:
      "Падчас навучання я вырашыла не абмяжоўвацца праграмай каледжа і прайшла дадатковае навучанне па праграме «Лёгкі ўваход у IT — Вэб-распрацоўка і Java». Гэта дазволіла мне пазнаёміцца з асновамі вэб-распрацоўкі яшчэ да пачатку адпаведнага навучання ў каледжы.",
  },
  "first-team-projects": {
    period: "2 КУРС",
    title: "Першыя камандныя праекты",
    description:
      "На другім курсе я ўпершыню атрымала досвед каманднай распрацоўкі. Удзельнічала ў стварэнні сайта для прытулку і праекта Coffee & Cake. Гэты этап навучыў мяне ўлічваць працу іншых удзельнікаў каманды і ўзгадняць уласную частку праекта з агульным вынікам.",
  },
  "commercial-attempt": {
    period: "3 КУРС",
    title:
      "Першы досвед камерцыйнай распрацоўкі",
    description:
      "Пасля знаёмства з кампаніяй «Арэал» я прайшла сумоўе і атрымала першае практычнае выпрабаванне. Працавала са структурай рэальнага праекта, GitHub, Node.js, Vue.js і PostgreSQL. Нягледзячы на тое, што выпрабаванне не ўдалося завяршыць у тэрмін, гэты досвед стаў важным прафесійным урокам і паказаў мне значнасць граматнай працы з патрабаваннямі і планавання.",
  },
  "college-project": {
    period: "3 КУРС",
    title:
      "Распрацоўка сайта для каледжа",
    description:
      "Працягваючы развівацца ў напрамку вэб-распрацоўкі, я ўдзельнічала ў стварэнні дадатковага сайта для каледжа.",
  },
  yarli: {
    period: "3 КУРС",
    title:
      "ЯрЛі — першы поўнавартасны дадатак",
    description:
      "Падчас вытворчай практыкі я атрымала магчымасць прайсці практыку ў кампаніі «ЯрЛі». Там я распрацавала свой першы поўнавартасны працоўны вэб-дадатак Todo. Менавіта гэты праект стаў важным пераходам ад навучальных заданняў да распрацоўкі закончанага дадатку.",
  },
  shelkoprint: {
    period: "ЛЕТА",
    title: "Першы заказчык — ШэлкаПрынт",
    description:
      "Летам я атрымала свайго першага заказчыка і распрацавала сайт «ШэлкаПрынт». Гэта быў першы досвед працы з рэальным кліентам, яго патрабаваннямі і чаканнямі.",
  },
  moderation: {
    period: "ЛЕТА",
    title:
      "Аўтаматызацыя ўнутраных працэсаў",
    description:
      "Паралельна з іншымі праектамі я займалася распрацоўкай вэб-дадатку для аўтаматызацыі працэсаў старэйшых мадэратараў.",
  },
  "fourth-year": {
    period: "4 КУРС",
    title:
      "Больш праектаў — больш адказнасці",
    description:
      "На чацвёртым курсе я ўдзельнічала адразу ў некалькіх праектах: распрацоўвала сайт-візітку для конкурсу выкладчыкаў, сайт у дапаўненне да прэзентацыі курсавой працы, удзельнічала ў каманднай распрацоўцы вэб-дадатку ў EvaTeam у ролі Backend-распрацоўшчыка і працягвала працу над уласнымі праектамі.",
  },
  "flowers-life": {
    period: "2026",
    title: "Кветкі і падарункі",
    description:
      "Выніковым праектам навучання стаў інтэрнэт-сэрвіс «Кветкі і падарункі». Праект аб’яднаў мае веды frontend- і backend-распрацоўкі, працы з базамі дадзеных, API, аўтарызацыяй і архітэктурай поўнавартаснага вэб-дадатку.",
  },
  graduation: {
    period: "ЧЭРВЕНЬ 2026",
    title: "Дыплом з адзнакай",
    description:
      "У чэрвені 2026 года я атрымала сярэднюю прафесійную адукацыю па спецыяльнасці «Інфармацыйныя сістэмы і праграмаванне» з адзнакай.",
  },
};

const translations: Record<
  Exclude<Language, "ru">,
  TimelineTranslations
> = { en, kk, be };

export const getLocalizedTimeline = (
  language: Language
): TimelineItem[] => {
  if (language === "ru") {
    return timeline;
  }

  const dictionary =
    translations[language];

  return timeline.map((item) => ({
    ...item,
    ...(dictionary[item.id] ?? {}),
  }));
};

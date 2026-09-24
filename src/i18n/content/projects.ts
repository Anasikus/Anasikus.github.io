import { projects } from "../../projects";
import type { Project } from "../../projects/types";

import type { Language } from "../languages";

type TranslatedFields = Partial<
  Pick<
    Project,
    | "title"
    | "shortDescription"
    | "description"
  >
>;

type ProjectTranslations = Record<
  string,
  TranslatedFields
>;

const en: ProjectTranslations = {
  together: {
    title: "Vmeste Project",
    shortDescription:
      "A single-page site with Telegram integration",
    description:
      "A single-page site built to order in one day. Implemented responsive layout, multilingual support, light/dark theme switching, an FAQ, and a contact form that sends messages to Telegram via Cloudflare Workers.",
  },
  "coffee-shop": {
    shortDescription:
      "A historical artifact",
    description:
      "My first pet project, made in my first year, back when I was just getting acquainted with HTML and CSS. At some point I decided that authorization without a backend was a perfectly solvable problem, and responsiveness was apparently an optional feature. Despite all that, this is the project where my journey into independent development began.\nLevel: 'it works — don't touch it'\nBackend: absent, along with any understanding of why it's needed\nResponsive: we tried\nMain result: I learned how NOT to do it",
  },
  "shelko-print": {
    shortDescription:
      "Priceless experience working with a spec that kept on living its own life.",
    description:
      "This was my first project for a real client — and probably the first project that very quickly explained to me why developers love detailed specs so much. The initial plan was wildly optimistic: 'Well, I think I'll manage it in two weeks.' Spoiler: I didn't. Since the client had no background in development, the spec turned out to be pretty vague. New wishes, clarifications and additions kept appearing as the work went on. As a result, two weeks gradually turned into three months of development and revisions. But that's exactly what made the project especially valuable. For the first time I had to work not from a coursework spec where every requirement is laid out in advance by a teacher, but with a real person who could look at a finished page and say, 'Could we make it a bit different right here?' That's how I got my first experience communicating with a client, clarifying requirements, handling changes, and understanding that sometimes the hardest part of development isn't JavaScript at all. In the end the site was finished, the client was happy, and I got my first commercial project — plus a small immunity to the phrase 'oh, that's only about two weeks of work.'",
  },
  "viz-card": {
    title: "Business Card Site",
    shortDescription:
      "A single-page business-card site for a teacher",
  },
  "college-tour": {
    title: "College Tour",
  },
  "flowers-life-desktop": {
    shortDescription:
      "A desktop application for a flower shop — an earlier version of the project, built with C# and MySQL.",
    description:
      "The first version of the 'Flower Shop' — a desktop application in C# with a MySQL database. This is where I first worked closely with databases and the business logic of a real store: catalog, orders, inventory. Later the same idea grew into the full-fledged FlowersLife web application with a client and server side — and everything I learned here came in handy directly when moving to the web.",
  },
  abilimpiks: {
    title: "Abilimpiks Program",
    shortDescription:
      "Student practicum: a C# application with video generation via Qwen.",
    description:
      "A C# application with an SQLite database, developed as part of a student practicum for the 'Abilimpiks' competition. One of its key features is video generation using the Qwen model. The project let me get hands-on practice with local databases and try integrating an AI model directly into a desktop application.",
  },
  "autodoc-updater": {
    shortDescription:
      "A Python tool for automating document workflows.",
    description:
      "A Python script that automates routine document-handling processes. Written for a family business, to eliminate repetitive manual work and speed up processing.",
  },
};

const kk: ProjectTranslations = {
  together: {
    title: "Vmeste жобасы",
    shortDescription:
      "Telegram интеграциясы бар бір беттік сайт",
    description:
      "Тапсырыс бойынша 1 күнде әзірленген бір беттік сайт. Адаптивті вёрстка, көптілділік, ашық және қараңғы тақырыпты ауыстыру, FAQ және Cloudflare Workers арқылы Telegram-ға хабарлама жіберетін кері байланыс формасы іске асырылды.",
  },
  "coffee-shop": {
    shortDescription: "Тарихи артефакт",
    description:
      "Мен тек HTML пен CSS-пен ғана таныса бастаған кезде, бірінші курста жасалған алғашқы пет-жобам. Бір сәтте мен backend-сіз авторизация толық шешілетін тапсырма деп шештім, ал адаптивтілік, әрине, міндетті емес функция сияқты болды. Осының бәріне қарамастан, дәл осы жобадан менің дербес әзірлеумен танысуым басталды.\nДеңгейі: «жұмыс істейді — тиіспе»\nBackend: жоқ, оның қажеттілігін түсіну де жоқ\nАдаптив: тырыстық\nБасты нәтиже: мен қалай істемеу керектігін түсіндім",
  },
  "shelko-print": {
    shortDescription:
      "Өз бетінше өмір сүре берген ТЖ-мен жұмыс істеудің бағасы жоқ тәжірибесі.",
    description:
      "Бұл — менің нақты тапсырыс беруші үшін жасаған алғашқы жобам, әрі, мүмкін, әзірлеушілердің неге егжей-тегжейлі техникалық тапсырманы осыншама жақсы көретінін маған тез түсіндірген алғашқы жоба. Бастапқы жоспар барынша оптимистік болды: «Ну, ойымша, екі аптада үлгеремін». Спойлер: үлгермедім. Тапсырыс беруші әзірлеумен байланысты болмағандықтан, техникалық тапсырма өте бұлыңғыр болып шықты. Жұмыс барысында жаңа тілектер, нақтылаулар мен толықтырулар пайда бола берді. Нәтижесінде екі апта біртіндеп үш ай әзірлеу мен пысықтауға айналды. Бірақ дәл осы жоба ерекше пайдалы болғанының себебі. Маған алғаш рет барлық талаптары оқытушы тарапынан алдын ала жазылған оқу ТЖ-сы бойынша емес, дайын бетке қарап: «Мұнда сәл басқаша істей аламыз ба?» деп айта алатын нақты адаммен жұмыс істеуге тура келді. Осылайша мен тапсырыс берушімен қарым-қатынас жасаудың, талаптарды нақтылаудың, өзгерістермен жұмыс істеудің алғашқы тәжірибесін алдым және кейде әзірлеудің ең қиын бөлігі JavaScript емес екенін түсіндім. Нәтижесінде сайт аяқталды, тапсырыс беруші риза болды, ал мен өзімнің алғашқы коммерциялық жобамды және «ол жерде жұмыс бар болғаны екі апта» деген сөзге аздап төзімділік алдым.",
  },
  "viz-card": {
    title: "Визитка-сайт",
    shortDescription:
      "Оқытушыға арналған бір беттік визитка-сайт",
  },
  "college-tour": {
    title: "Колледж бойынша экскурсия",
  },
  "flowers-life-desktop": {
    shortDescription:
      "Гүл дүкені үшін desktop-қосымша — жобаның бұрынғы нұсқасы, C# және MySQL негізінде.",
    description:
      "«Гүл дүкенінің» алғашқы нұсқасы — MySQL дерекқорымен C#-тағы desktop-қосымша. Дәл осында мен алғаш рет дерекқорлармен және нақты дүкеннің бизнес-логикасымен тығыз жұмыс істедім: каталог, тапсырыстар, қойма. Кейінірек сол идея клиенттік және серверлік бөлігі бар толыққанды FlowersLife веб-қосымшасына айналды — және осында алынған барлық тәжірибе вебке көшкенде тікелей пайдалы болды.",
  },
  abilimpiks: {
    title: "Абилимпикс бағдарламасы",
    shortDescription:
      "Оқу практикасы: Qwen арқылы видео генерациясы бар C# қосымшасы.",
    description:
      "«Абилимпикс» байқауы үшін оқу практикасы аясында әзірленген, SQLite дерекқоры бар C# қосымшасы. Негізгі функциялардың бірі — Qwen моделі арқылы видео генерациясы. Жоба маған жергілікті дерекқорлармен практикалық жұмыс істеуге және AI-модельді desktop-қосымшаға тікелей біріктіруді байқап көруге мүмкіндік берді.",
  },
  "autodoc-updater": {
    shortDescription:
      "Құжат айналымын автоматтандыруға арналған Python-құралы.",
    description:
      "Құжаттармен жұмыстың күнделікті процестерін автоматтандыратын Python скрипті. Отбасылық бизнестің қажеттіліктері үшін жазылған — қайталанатын қолмен орындалатын операциялардан құтылып, оларды өңдеуді жылдамдату үшін.",
  },
};

const be: ProjectTranslations = {
  together: {
    title: "Праект Vmeste",
    shortDescription:
      "Аднастаронкавы сайт з Telegram-інтэграцыяй",
    description:
      "Аднастаронкавы сайт, распрацаваны за 1 дзень на заказ. Рэалізаваны адаптыўная вёрстка, шматмоўнасць, пераключэнне светлай і цёмнай тэмы, FAQ і форма зваротнай сувязі з адпраўкай паведамленняў у Telegram праз Cloudflare Workers.",
  },
  "coffee-shop": {
    shortDescription:
      "Гістарычны артэфакт",
    description:
      "Мой першы пэт-праект, створаны на першым курсе ў эпоху, калі я толькі знаёмілася з HTML і CSS. У нейкі момант я вырашыла, што аўтарызацыя без backend — гэта цалкам вырашальная задача, а адаптыўнасць, мяркуючы па ўсім, была неабавязковай функцыяй. Нягледзячы на ўсё гэта, менавіта з гэтага праекта пачалося маё знаёмства з самастойнай распрацоўкай.\nУзровень: «працуе — не чапай»\nBackend: адсутнічае, як і разуменне яго неабходнасці\nАдаптыў: мы стараліся\nГалоўны вынік: я зразумела, як рабіць не трэба",
  },
  "shelko-print": {
    shortDescription:
      "Неацэнны досвед працы з ТЗ, якое працягвала жыць сваім жыццём.",
    description:
      "Гэта мой першы праект для сапраўднага заказчыка — і, бадай, першы праект, які вельмі хутка растлумачыў мне, чаму распрацоўшчыкі так любяць падрабязныя тэхнічныя заданні. Пачатковы план быў максімальна аптымістычным: «Ну, думаю, за два тыдні управаюся». Спойлер: не управілася. Паколькі заказчык не быў звязаны з распрацоўкай, тэхнічнае заданне аказалася даволі расплывістым. Ужо ў працэсе працы з’яўляліся новыя пажаданні, удакладненні і дапаўненні. У выніку два тыдні паступова ператварыліся ў тры месяцы распрацоўкі і дапрацовак. Але менавіта гэта і зрабіла праект асабліва карысным. Мне ўпершыню давялося працаваць не па навучальным ТЗ, дзе ўсе патрабаванні загадзя прапісаны выкладчыкам, а з рэальным чалавекам, які мог паглядзець на гатовую старонку і сказаць: «А можна яшчэ вось тут крыху па-іншаму?» Так я атрымала першы досвед зносін з заказчыкам, удакладнення патрабаванняў, працы са зменамі і разумення таго, што часам самая складаная частка распрацоўкі — зусім не JavaScript. У выніку сайт быў завершаны, заказчык застаўся задаволены, а я атрымала свой першы камерцыйны праект і невялікую прышчэпку ад фразы «ды там працы на пару тыдняў».",
  },
  "viz-card": {
    title: "Сайт-візітка",
    shortDescription:
      "Аднастаронкавы сайт-візітка для выкладчыка",
  },
  "college-tour": {
    title: "Экскурсія па каледжы",
  },
  "flowers-life-desktop": {
    shortDescription:
      "Настольны дадатак для кветкавай крамы — больш ранняя версія праекта, на C# і MySQL.",
    description:
      "Першая версія «Кветкавай крамы» — desktop-дадатак на C# з базай дадзеных MySQL. Менавіта на ім я ўпершыню шчыльна папрацавала з базамі дадзеных і бізнес-логікай рэальнай крамы: каталог, заказы, склад. Пазней тая ж ідэя вырасла ў поўнавартасны вэб-дадатак FlowersLife з кліенцкай і сервернай часткай — і ўвесь атрыманы тут досвед напрамую спатрэбіўся пры пераходзе да вэбу.",
  },
  abilimpiks: {
    title: "Праграма для Абілімпікс",
    shortDescription:
      "Навучальная практыка: дадатак на C# з генерацыяй відэа праз Qwen.",
    description:
      "Дадатак на C# з базай дадзеных SQLite, распрацаваны ў рамках навучальнай практыкі для конкурсу «Абілімпікс». Адна з ключавых функцый — генерацыя відэа з дапамогай мадэлі Qwen. Праект дазволіў на практыцы папрацаваць з лакальнымі базамі дадзеных і паспрабаваць інтэграцыю AI-мадэлі прама ў desktop-дадатак.",
  },
  "autodoc-updater": {
    shortDescription:
      "Python-інструмент для аўтаматызацыі дакументазвароту.",
    description:
      "Скрыпт на Python, які аўтаматызуе рутынныя працэсы працы з дакументамі. Напісаны для патрэб сямейнага бізнесу — каб пазбавіцца ад паўтаральных ручных аперацый і паскорыць іх апрацоўку.",
  },
};

const translations: Record<
  Exclude<Language, "ru">,
  ProjectTranslations
> = { en, kk, be };

export const getLocalizedProjects = (
  language: Language
): Project[] => {
  if (language === "ru") {
    return projects;
  }

  const dictionary =
    translations[language];

  return projects.map((project) => ({
    ...project,
    ...(dictionary[project.id] ?? {}),
  }));
};

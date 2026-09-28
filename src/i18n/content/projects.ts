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
  "flowers-life-desktop": {
    shortDescription:
      "A desktop application for a flower shop — an earlier version of the project, built with C# and MySQL.",
    description:
      "The first version of the 'Flower Shop' — a desktop application in C# with a MySQL database. This is where I first worked closely with databases and the business logic of a real store: catalog, orders, inventory. Later the same idea grew into the full-fledged FlowersLife web application with a client and server side — and everything I learned here came in handy directly when moving to the web.",
  },
  abilimpiks: {
    title: "Abilimpiks Program",
    shortDescription:
      "A C# desktop app for a maths olympiad: tasks, answer analytics and user roles.",
    description:
      "A desktop application in C# (Windows Forms) for running a maths olympiad, built during a student practicum for the 'Abilimpiks' competition.\nThe app has three roles: student, teacher and administrator. A student solves five illustrated tasks and submits answers; the 'Analytics' screen shows a table of answers with filters by group, task number and date; a separate window lets the administrator add, edit and delete users.\nData lives in a local SQLite database. One of the key features is video generation using the Qwen model — my first attempt at building an AI model straight into a desktop application.",
  },
  together: {
    title: "Vmeste Project",
    shortDescription:
      "A single-page site with Telegram integration",
    description:
      "“Vmeste” (“Together”) is a single-page site for helping migrants, built to order in a single day. It gathers the main areas of support — legal help, work and employment, learning Russian, medical care — along with useful materials, answers to common questions and contacts.\nResponsive layout, three interface languages (RU / EN / UZ), light and dark theme switching. The contact form sends messages straight to Telegram through Cloudflare Workers — with no server of my own and no paid hosting.",
  },
  "viz-card": {
    title: "Business Card Site",
    shortDescription:
      "A single-page business-card site for a teacher",
    description:
      "A business-card site for a teacher, created for a competition entry. It introduces the person in a few scrolls: a welcome screen with photos, a “Let’s get acquainted” section with a story and facts, an “Achievements” gallery of certificates you can flip through, photo reports of activities and a contact form.\nThe main goal was for a visitor to see a living person within a couple of minutes, not a dry résumé — hence the soft, calm palette, plenty of photos and large, readable typography.",
  },
  "college-tour": {
    title: "College Tour",
    shortDescription:
      "An interactive tour of the Yaroslavl College of Management and Professional Technologies.",
    description:
      "A tour site for the Yaroslavl College of Management and Professional Technologies. An interactive building plan with tabs for floors 1–4 and a legend lets visitors find out in advance what is where.\nFor those who want to see the college in person, there is a button leading to a video tour. Built with HTML, CSS and JavaScript.",
  },
  "autodoc-updater": {
    shortDescription:
      "A Python program that updates prices and delivery times in Excel tables from Autodoc data.",
    description:
      "The program takes an Excel table of part numbers, looks up each one on Autodoc.ru and writes back the price, average price, delivery time, rating, number of reviews and processing status. It used to take hours of manual work.\nIt has a graphical interface built with CustomTkinter: drag a file into the window, set a row limit, turn on the analogue filter, stop processing at any moment. Lookups go through an automated browser (Playwright) with pauses between requests and an automatic stop if the site starts blocking.\nWritten for a family business, to take the routine of updating price lists off their hands.",
  },
  "flowers-life": {
    shortDescription:
      "A full-stack web application ‘Flowers and Gifts’.",
    description:
      "FlowersLife is a full-fledged e-commerce platform for a flower and gift shop: a storefront for customers and an admin panel in one project.\nInside: a catalog and product pages, orders, delivery zones, inventory, product management and other business features. The client side is written in React and TypeScript, the server in Node.js and Express with a MySQL database, with JWT-based authorization.\nIt is the final project of my studies and is still in active development: the source code is not published yet and there is no live version.",
  },
  "todo-app": {
    title: "Todo App",
    shortDescription:
      "My first full-fledged web application — a task manager with sign-up.",
    description:
      "The first complete web application I wrote during my work placement at YarLi: a task manager with a personal account.\nRegistration and authorization (JWT, bcrypt), adding and deleting tasks, changing status — active and completed. React on the client, Node.js and Express on the server, MongoDB for data.\nI kept a day-by-day log of the work right in the README — from analyzing the spec and choosing the stack to launch instructions. The habit of documenting development has stayed with me since.",
  },
  priut: {
    title: "Animal Shelter Site",
    shortDescription:
      "A team-built animal shelter site: a pet catalog, favorites and adoption requests.",
    description:
      "An animal shelter website in PHP and MySQL — one of my first team projects. A pet catalog with filters (cats, dogs, parrots, rodents, gender, “neutered”, “knows commands”, “carrier-trained”, “gets along with dogs”), a personal account, favorites and an adoption request form.\nPhotos, the carousel and texts are pulled from the database, so the site’s content can be changed without touching the code; a separate guide was written for the administrator.\nThe project taught me to split work in a team, agree on the database structure and see what the server side looks like from the inside.",
  },
};

const kk: ProjectTranslations = {
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
  "flowers-life-desktop": {
    shortDescription:
      "Гүл дүкені үшін desktop-қосымша — жобаның бұрынғы нұсқасы, C# және MySQL негізінде.",
    description:
      "«Гүл дүкенінің» алғашқы нұсқасы — MySQL дерекқорымен C#-тағы desktop-қосымша. Дәл осында мен алғаш рет дерекқорлармен және нақты дүкеннің бизнес-логикасымен тығыз жұмыс істедім: каталог, тапсырыстар, қойма. Кейінірек сол идея клиенттік және серверлік бөлігі бар толыққанды FlowersLife веб-қосымшасына айналды — және осында алынған барлық тәжірибе вебке көшкенде тікелей пайдалы болды.",
  },
  abilimpiks: {
    title: "Абилимпикс бағдарламасы",
    shortDescription:
      "Математика олимпиадасына арналған C# desktop-қосымшасы: тапсырмалар, жауаптар аналитикасы және пайдаланушы рөлдері.",
    description:
      "«Абилимпикс» байқауына арналған оқу практикасы аясында жасалған, математика олимпиадасын өткізуге арналған C# (Windows Forms) desktop-қосымшасы.\nҚосымшада үш рөл бар: студент, оқытушы және әкімші. Студент суреттері бар бес тапсырманы шешіп, жауап жібереді; «Аналитика» экранында жауаптар кестесі топ, тапсырма нөмірі және күн бойынша сүзгілермен көрсетіледі; бөлек терезеде әкімші пайдаланушыларды қосады, өзгертеді және жояды.\nДеректер жергілікті SQLite дерекқорында сақталады. Негізгі функциялардың бірі — Qwen моделі арқылы видео генерациясы: AI-модельді desktop-қосымшаға тікелей біріктірудегі алғашқы тәжірибем.",
  },
  together: {
    title: "Vmeste жобасы",
    shortDescription:
      "Telegram интеграциясы бар бір беттік сайт",
    description:
      "«Бірге» (Vmeste) — мигранттарға көмек көрсетуге арналған, тапсырыс бойынша бір күнде әзірленген бір беттік сайт. Онда көмектің негізгі бағыттары — заңгерлік көмек, жұмыс және жұмыспен қамту, орыс тілін үйрену, медициналық көмек — сондай-ақ пайдалы материалдар, жиі қойылатын сұрақтарға жауаптар және байланыс мәліметтері жиналған.\nАдаптивті вёрстка, интерфейстің үш тілі (RU / EN / UZ), ашық және қараңғы тақырыпты ауыстыру. Кері байланыс формасы хабарламаларды Cloudflare Workers арқылы тікелей Telegram-ға жібереді — өз серверінсіз және ақылы хостингсіз.",
  },
  "viz-card": {
    title: "Визитка-сайт",
    shortDescription:
      "Оқытушыға арналған бір беттік визитка-сайт",
    description:
      "Байқауға қатысу үшін жасалған оқытушыға арналған визитка-сайт. Адаммен бірнеше айналдыруда таныстырады: фотосуреттері бар қарсы алу экраны, өзі туралы әңгіме мен деректері бар «Танысайық?» бөлімі, грамоталар мен куәліктерді парақтауға болатын «Жетістіктер қорапшасы» галереясы, іс-шаралардың фотоесептері және кері байланыс формасы.\nБасты мақсат — келуші бірнеше минутта құрғақ түйіндемені емес, тірі адамды көрсін. Сондықтан жұмсақ тыныш түстер, көп фотосурет және ірі оқуға ыңғайлы шрифт.",
  },
  "college-tour": {
    title: "Колледж бойынша экскурсия",
    shortDescription:
      "Ярославль басқару және кәсіби технологиялар колледжіне арналған интерактивті экскурсия.",
    description:
      "Ярославль басқару және кәсіби технологиялар колледжіне арналған экскурсия-сайт. 1-ден 4-ке дейінгі қабаттар бойынша қойындылары және шартты белгілері бар ғимараттың интерактивті жоспары не қайда екенін алдын ала білуге мүмкіндік береді.\nКолледжді тікелей көргісі келетіндер үшін бейнеэкскурсияға өтетін батырма бар. Жоба HTML, CSS және JavaScript-те жазылған.",
  },
  "autodoc-updater": {
    shortDescription:
      "Excel кестелеріндегі бағалар мен мерзімдерді Autodoc деректері бойынша өзі жаңартатын Python бағдарламасы.",
    description:
      "Бағдарлама артикулдері бар Excel кестесін алады, әрқайсысын Autodoc.ru сайтынан іздейді және бағаны, орташа бағаны, жеткізу мерзімін, рейтингті, пікірлер санын және өңдеу мәртебесін кері жазады. Бұрын бұған қолмен істеп, сағаттар кететін.\nБағдарламаның CustomTkinter-дегі графикалық интерфейсі бар: файлды терезеге сүйреп әкелуге, жолдар шегін қоюға, аналогтар сүзгісін қосуға, өңдеуді кез келген сәтте тоқтатуға болады. Іздеу автоматтандырылған браузер (Playwright) арқылы, сұраныстар арасында кідіріспен және сайт бұғаттай бастаса автоматты тоқтатумен жүреді.\nОтбасылық бизнестің қажеттіліктері үшін жазылған — прайс-парақтарды жаңартудың күнделікті жұмысынан құтқару үшін.",
  },
  "flowers-life": {
    shortDescription:
      "«Гүлдер мен сыйлықтар» full-stack веб-қосымшасы.",
    description:
      "FlowersLife — гүлдер мен сыйлықтар дүкеніне арналған толыққанды электрондық коммерция платформасы: бір жобада сатып алушыларға арналған витрина мен әкімші панелі.\nІшінде каталог және тауар карточкалары, тапсырыстар, жеткізу аймақтары, қойма, өнімдерді басқару және басқа да бизнес-функциялар бар. Клиенттік бөлігі React және TypeScript-те, сервері Node.js пен Express-те MySQL дерекқорымен жазылған, авторизация JWT негізінде құрылған.\nБұл — оқудың қорытынды жобасы, ол әлі белсенді әзірленуде: бастапқы коды әзірге жарияланбаған, тірі нұсқасы да жоқ.",
  },
  "todo-app": {
    title: "Todo-қосымша",
    shortDescription:
      "Тіркелуі бар тапсырмалар менеджері — менің алғашқы толыққанды веб-қосымшам.",
    description:
      "«ЯрЛи» ҰӨК-те өндірістік практика кезінде жазған алғашқы аяқталған веб-қосымшам: жеке кабинеті бар тапсырмалар менеджері.\nТіркелу және авторизация (JWT, bcrypt), тапсырмаларды қосу және жою, мәртебені ауыстыру — белсенді және аяқталған. Клиенті React-те, сервері Node.js пен Express-те, деректер MongoDB-де сақталады.\nЖұмыс барысын күн сайын README-ге жазып отырдым — ТТ талдауынан және стекті таңдаудан іске қосу нұсқаулығына дейін. Әзірлеуді құжаттау әдеті содан бері қалды.",
  },
  priut: {
    title: "Жануарлар баспанасының сайты",
    shortDescription:
      "Жануарлар баспанасының командалық сайты: үй жануарлары каталогы, таңдаулылар және асырап алу өтінімдері.",
    description:
      "PHP мен MySQL-дегі жануарлар баспанасының сайты — алғашқы командалық жобаларымның бірі. Сүзгілері бар үй жануарлары каталогы (мысықтар, иттер, тотықұстар, кеміргіштер, жынысы, «зәрсіздендірілген», «командаларды біледі», «көтергішке үйретілген», «иттермен тіл табысады»), жеке кабинет, таңдаулылар және асырап алуға өтінім формасы.\nФотосуреттер, карусель және мәтіндер дерекқордан алынады, сондықтан сайттың мазмұнын кодты өзгертпей-ақ жаңартуға болады; әкімші үшін жеке нұсқаулық жазылған.\nЖоба маған командада жұмысты бөлуді, дерекқор құрылымы туралы келісуді және сервер бөлігінің «ішкі жағынан» қалай көрінетінін түсінуді үйретті.",
  },
};

const be: ProjectTranslations = {
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
  "flowers-life-desktop": {
    shortDescription:
      "Настольны дадатак для кветкавай крамы — больш ранняя версія праекта, на C# і MySQL.",
    description:
      "Першая версія «Кветкавай крамы» — desktop-дадатак на C# з базай дадзеных MySQL. Менавіта на ім я ўпершыню шчыльна папрацавала з базамі дадзеных і бізнес-логікай рэальнай крамы: каталог, заказы, склад. Пазней тая ж ідэя вырасла ў поўнавартасны вэб-дадатак FlowersLife з кліенцкай і сервернай часткай — і ўвесь атрыманы тут досвед напрамую спатрэбіўся пры пераходзе да вэбу.",
  },
  abilimpiks: {
    title: "Праграма для Абілімпікс",
    shortDescription:
      "Desktop-дадатак на C# для алімпіяды па матэматыцы: заданні, аналітыка адказаў і ролі карыстальнікаў.",
    description:
      "Desktop-дадатак на C# (Windows Forms) для правядзення алімпіяды па матэматыцы, зроблены ў рамках навучальнай практыкі для конкурсу «Абілімпікс».\nУ дадатку тры ролі: студэнт, выкладчык і адміністратар. Студэнт рашае пяць заданняў з малюнкамі і адпраўляе адказы; на экране «Аналітыка» ёсць табліца адказаў з фільтрамі па групе, нумары задання і даце; у асобным акне адміністратар дадае, змяняе і выдаляе карыстальнікаў.\nДадзеныя захоўваюцца ў лакальнай базе SQLite. Адна з ключавых функцый — генерацыя відэа з дапамогай мадэлі Qwen: мой першы вопыт убудавання AI-мадэлі прама ў desktop-дадатак.",
  },
  together: {
    title: "Праект Vmeste",
    shortDescription:
      "Аднастаронкавы сайт з Telegram-інтэграцыяй",
    description:
      "«Разам» (Vmeste) — аднастаронкавы сайт дапамогі мігрантам, распрацаваны на заказ за адзін дзень. На ім сабраны асноўныя напрамкі падтрымкі — юрыдычная дапамога, праца і занятасць, вывучэнне рускай мовы, медыцынская дапамога — падборка карысных матэрыялаў, адказы на частыя пытанні і кантакты.\nАдаптыўная вёрстка, тры мовы інтэрфейсу (RU / EN / UZ), пераключэнне светлай і цёмнай тэмы. Форма зваротнай сувязі адпраўляе паведамленні прама ў Telegram праз Cloudflare Workers — без уласнага сервера і без пераходу на платны хостынг.",
  },
  "viz-card": {
    title: "Сайт-візітка",
    shortDescription:
      "Аднастаронкавы сайт-візітка для выкладчыка",
    description:
      "Сайт-візітка для выкладчыка, створаная для ўдзелу ў конкурсе. Знаёміць з чалавекам за некалькі пракруток: прывітальны экран з фотаздымкамі, раздзел «Пазнаёмімся?» з расповедам і фактамі пра сябе, «Скарбонка дасягненняў» з галерэяй грамат і пасведчанняў, якую можна гартаць, фотаадчоты пра актыўнасці і форма зваротнай сувязі.\nГалоўная задача — зрабіць так, каб за пару хвілін наведвальнік убачыў жывога чалавека, а не сухое рэзюмэ. Адсюль мяккая спакойная палітра, шмат фотаздымкаў і буйная чытэльная тыпаграфіка.",
  },
  "college-tour": {
    title: "Экскурсія па каледжы",
    shortDescription:
      "Інтэрактыўная экскурсія па Яраслаўскім каледжы кіравання і прафесійных тэхналогій.",
    description:
      "Сайт-экскурсія па Яраслаўскім каледжы кіравання і прафесійных тэхналогій. Інтэрактыўны план будынка з укладкамі па паверхах (з 1 па 4) і ўмоўнымі абазначэннямі дазваляе загадзя даведацца, дзе што знаходзіцца.\nДля тых, хто хоча паглядзець каледж жыўцом, ёсць кнопка пераходу да відэаэкскурсіі. Праект напісаны на HTML, CSS і JavaScript.",
  },
  "autodoc-updater": {
    shortDescription:
      "Python-праграма, якая сама абнаўляе цэны і тэрміны ў Excel-табліцах па даных Autodoc.",
    description:
      "Праграма бярэ Excel-табліцу з артыкуламі, шукае кожны на Autodoc.ru і запісвае назад цану, сярэднюю цану, тэрмін дастаўкі, рэйтынг, колькасць водгукаў і статус апрацоўкі. Раней на гэта сыходзілі гадзіны ручной працы.\nУ праграмы графічны інтэрфейс на CustomTkinter: файл можна перацягнуць у акно, задаць ліміт радкоў, уключыць фільтр аналагаў, спыніць апрацоўку ў любы момант. Пошук ідзе праз аўтаматызаваны браўзер (Playwright) з паўзамі паміж запытамі і аўтаматычным спыненнем, калі сайт пачынае блакіраваць.\nНапісана для патрэб сямейнага бізнесу, каб пазбавіць ад руціннага абнаўлення прайсаў.",
  },
  "flowers-life": {
    shortDescription:
      "Full-stack вэб-дадатак «Кветкі і падарункі».",
    description:
      "FlowersLife — поўнавартасная платформа электроннай камерцыі для крамы кветак і падарункаў: вітрына для пакупнікоў і панэль адміністратара ў адным праекце.\nЗ сярэдзіны каталог і карткі тавараў, заказы, зоны дастаўкі, склад, кіраванне прадуктамі і іншыя бізнес-функцыі. Кліенцкая частка напісана на React і TypeScript, сервер — на Node.js і Express з базай MySQL, аўтарызацыя пабудавана на JWT.\nГэта выніковы праект навучання, і ён усё яшчэ ў актыўнай распрацоўцы: зыходны код пакуль не апублікаваны, а жывой версіі яшчэ няма.",
  },
  "todo-app": {
    title: "Todo-дадатак",
    shortDescription:
      "Першы поўнавартасны вэб-дадатак — мэнэджар задач з рэгістрацыяй.",
    description:
      "Першы завершаны вэб-дадатак, які я напісала падчас вытворчай практыкі ў НВК «ЯрЛі»: мэнэджар задач з асабістым кабінетам.\nРэгістрацыя і аўтарызацыя (JWT, bcrypt), даданне і выдаленне задач, змена статусу — актыўныя і завершаныя. Кліент на React, сервер на Node.js і Express, даныя захоўваюцца ў MongoDB.\nХод працы па днях я вяла проста ў README — ад разбору ТЗ і выбару стэка да інструкцыі па запуску. Звычка дакументаваць распрацоўку з таго часу засталася.",
  },
  priut: {
    title: "Сайт прытулку",
    shortDescription:
      "Камандная праца: сайт прытулку для жывёл з каталогам гадаванцаў, абраным і заяўкамі на ўсынаўленне.",
    description:
      "Сайт прытулку для жывёл на PHP і MySQL — адзін з першых камандных праектаў. Каталог гадаванцаў з фільтрамі (кошкі, сабакі, папугаі, грызуны, пол, «кастрыраваны», «ведае каманды», «прывучаны да пераноскі», «сябруе з сабакамі»), асабісты кабінет, абранае і форма заяўкі на ўсынаўленне.\nФотаздымкі, карусель і тэксты падцягваюцца з базы дадзеных, таму змест сайта можна змяняць без праўкі кода; для адміністратара напісана асобная інструкцыя.\nПраект навучыў дзяліць працу ў камандзе, дамаўляцца пра структуру базы дадзеных і разумець, як выглядае серверная частка «знутры».",
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

/*
 * Канонический (русский) словарь интерфейса. Его форма
 * (typeof ru) — это и есть тип UiDictionary: en/kk/be
 * обязаны совпадать с ним по структуре, иначе TypeScript
 * укажет на пропущенный или лишний ключ перевода.
 */
const ru = {
  header: {
    logo: "СОЗДАЮ РЕШЕНИЯ",
    navAbout: "О себе",
    navSkills: "Скилы",
    navStats: "Статистика",
    navProjects: "Проекты",
    navExperience: "Опыт",
    navReviews: "Отзывы",
    navContact: "Контакты",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
  },

  hero: {
    badge: "ПРОГРАММНАЯ РАЗРАБОТКА",
    titleLine1: "Создаю цифровые",
    titleLine2: "продукты.",
    description:
      "Разрабатываю веб-приложения и настольные программы на C# и Python, соединяя функциональность, технологичность и визуальную составляющую.",
    scroll: "ПРОКРУТИТЬ",
    scrollAria: "Прокрутить к разделу «Мой путь»",
  },

  about: {
    label: "02 / МОЙ ПУТЬ",
    headingLine1: "Всё началось",
    headingLine2: "с интереса.",
    description:
      "А дальше были годы обучения, первые проекты, ошибки, заказчики и всё более сложные задачи.",
    photoOpenAria: "Открыть на весь экран",
    photoHint: "Открыть ↗",
    viewProject: "Смотреть проект",
    photoClose: "Закрыть",
    photoPrev: "Предыдущее фото",
    photoNext: "Следующее фото",
  },

  skills: {
    label: "04 / СКИЛЫ",
    database: "База данных",
    otherLanguages: "Другие языки",
    tools: "Инструменты",
  },

  stats: {
    label: "05 / СТАТИСТИКА",
    headingLine1: "На чём чаще",
    headingLine2: "всего пишу.",
    description:
      "Автоматический разбор технологий по моим публичным репозиториям на GitHub.",
    languagesTitle: "Языки",
    stackTitle: "Фреймворки и инструменты",
    loading: "Анализирую репозитории…",
    error: "Не удалось получить данные с GitHub, показываю по данным проектов.",
    source: "Источник: github.com/{username}",
    updatedAt: "Обновлено",
  },

  projectsSection: {
    label: "06 / ИЗБРАННЫЕ ПРОЕКТЫ",
    heading: "Любимые разработки",
    introLine1:
      "От первых учебных проектов до полноценных веб-приложений.",
    introLine2:
      "Здесь собраны работы, которые лучше всего рассказывают о моём пути как разработчика.",
    allProjects: "Все проекты",
    viewAllProjects:
      "Смотреть все проекты",
    viewProject: "СМОТРЕТЬ ПРОЕКТ",
  },

  experience: {
    label: "03 / ОПЫТ",
    heading: "От теории к практике",
    description:
      "Проекты, практика и стажировка, которые стали частью моего профессионального пути.",
    hint: "Нажмите на карточку, чтобы узнать подробнее",
    now: "Сегодня",
    more: "Подробнее",
    linkSite: "Сайт",
    linksLabel: "ССЫЛКИ",
    modalTechnologiesLabel:
      "ТЕХНОЛОГИИ",
    modalPrev: "Назад",
    modalNext: "Далее",
    modalPrevAria: "Предыдущий опыт",
    modalNextAria: "Следующий опыт",
    modalClose: "Закрыть",
    modalKeyboardHint:
      "ESC — закрыть   ← → — переключить",
  },

  certificates: {
    label: "07 / ДОСТИЖЕНИЯ",
    headingLine1: "Грамоты",
    headingLine2: "и сертификаты.",
    prev: "Предыдущий сертификат",
    next: "Следующий сертификат",
    close: "Закрыть",
    openAria: "Открыть на весь экран",
    imageCounter: "{current} из {total}",
  },

  reviews: {
    label: "07 / ОТЗЫВЫ",
    headingLine1: "Что говорят",
    headingLine2: "те, с кем я работала.",
    description:
      "Отзывы клиентов и заказчиков. Если мы работали вместе — буду рада, если оставите свой.",
    empty:
      "Пока здесь пусто — станьте первым, кто оставит отзыв.",
    emptyFiltered:
      "По этому фильтру пока ничего нет.",
    loadError:
      "Не удалось загрузить отзывы. Попробуйте обновить страницу.",
    filterAll: "Все",
    filterProjectOnly: "Только с проектом",
    addButton: "Оставить отзыв",
    cancelButton: "Отмена",
    formName: "Имя",
    formNamePlaceholder: "Как к вам обращаться",
    formRating: "Оценка",
    formProject: "Проект (по желанию)",
    formProjectNone: "Без проекта",
    formText: "Отзыв",
    formTextPlaceholder:
      "Расскажите, как прошла работа",
    formSubmit: "Отправить на проверку",
    formSubmitting: "Отправляю…",
    formSuccess:
      "Спасибо! Отзыв отправлен и появится на сайте после проверки.",
    formError:
      "Не удалось отправить отзыв. Попробуйте ещё раз чуть позже.",
  },

  video: {
    label: "08 / ВИДЕО",
    headingLine1: "Пара слов",
    headingLine2: "от меня лично.",
    description:
      "Коротко о том, кто я и чем занимаюсь — своим голосом, а не только текстом на сайте.",
  },

  contact: {
    label: "09 / КОНТАКТЫ",
    headingLine1: "Готова обсудить",
    headingLine2: "вашу задачу.",
    description:
      "Открыта к предложениям о работе и интересным проектам. Оставьте сообщение прямо здесь — отвечу на указанный email.",
    formName: "Имя",
    formNamePlaceholder:
      "Как к вам обращаться",
    formEmail: "Ваш email",
    formEmailPlaceholder: "для ответа",
    formEmailInvalid: "Проверьте адрес почты — похоже, в нём опечатка",
    formMessage: "Сообщение",
    formMessagePlaceholder:
      "Расскажите о задаче или вакансии",
    formSubmit: "Отправить сообщение",
    formSubmitting: "Отправляю…",
    formSuccess:
      "Сообщение отправлено, спасибо! Отвечу как можно скорее.",
    formError:
      "Не удалось отправить. Попробуйте написать на почту напрямую.",
    mailtoSubjectPrefix:
      "Сообщение с портфолио от",
    mailtoReplyLabel:
      "Email для ответа",
    directLabel: "Или напрямую",
    copy: "Скопировать",
    copyPhoneDone: "Номер телефона скопирован",
    copyEmailDone: "Почта скопирована",
    copyError: "Не удалось скопировать",
    emailIconAria: "Написать на почту",
    footerCopy: "Портфолио Давыдовой Анастасии ",
    toTop: "Наверх ↑",
  },

  projectsPage: {
    filterAll: "Все",
    label: "ВСЕ ПРОЕКТЫ",
    headingLine1: "Избранные",
    headingLine2: "работы.",
  },

  projectDetails: {
    about: "О проекте",
    facts: "Детали",
    year: "Год",
    type: "Тип",
    status: "Статус",
    statusLive: "Онлайн",
    statusCode: "Код открыт",
    statusClosed: "В разработке",
    statusDone: "Завершён",
    screens: "Экраны",
    openShot: "Открыть скриншот",
    closeShot: "Закрыть",
    prevShot: "Предыдущий скриншот",
    nextShot: "Следующий скриншот",
    nextProject: "Следующий проект",
    prevProject: "Предыдущий проект",
    phoneAlt: "Мобильная версия",
    back: "← Назад",
    liveWebsite: "Сайт проекта ↗",
    technologiesLabel: "ТЕХНОЛОГИИ",
    notFoundTitle: "Проект не найден",
    notFoundBack: "Назад к проектам",
    galleryAlt: "скриншот",
  },

  languageSwitcher: {
    label: "Язык сайта",
  },
};

export default ru;

export type UiDictionary = typeof ru;

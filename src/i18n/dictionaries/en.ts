import type { UiDictionary } from "./ru";

const en: UiDictionary = {
  header: {
    logo: "BUILDING SOLUTIONS",
    navAbout: "About",
    navSkills: "Skills",
    navStats: "Stats",
    navProjects: "Projects",
    navExperience: "Experience",
    navReviews: "Reviews",
    navContact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    badge: "SOFTWARE DEVELOPMENT",
    titleLine1: "I build digital",
    titleLine2: "products.",
    description:
      "I build web applications and desktop programs in C# and Python, combining functionality, technology and visual design.",
    scroll: "SCROLL",
    scrollAria: "Scroll to the “My path” section",
  },

  about: {
    label: "02 / MY PATH",
    headingLine1: "It all started",
    headingLine2: "with curiosity.",
    description:
      "What followed were years of learning, first projects, mistakes, clients and increasingly complex tasks.",
    photoOpenAria: "Open full screen",
    photoHint: "Open ↗",
    viewProject: "View project",
    photoClose: "Close",
    photoPrev: "Previous photo",
    photoNext: "Next photo",
  },

  skills: {
    label: "04 / SKILLS",
    database: "Database",
    otherLanguages: "Other languages",
    tools: "Tools",
  },

  stats: {
    label: "05 / STATS",
    headingLine1: "What I build",
    headingLine2: "with most.",
    description:
      "An automatic breakdown of technologies across my public GitHub repositories.",
    languagesTitle: "Languages",
    stackTitle: "Frameworks & tools",
    loading: "Analyzing repositories…",
    error: "Couldn't reach GitHub, showing data from my projects instead.",
    source: "Source: github.com/{username}",
    updatedAt: "Updated",
  },

  projectsSection: {
    label: "06 / FEATURED PROJECTS",
    heading: "Favorite builds",
    introLine1:
      "From first learning projects to full-fledged web applications.",
    introLine2:
      "A selection of work that best tells the story of my path as a developer.",
    allProjects: "All projects",
    viewAllProjects:
      "View all projects",
    viewProject: "VIEW PROJECT",
  },

  experience: {
    label: "03 / EXPERIENCE",
    heading: "From theory to practice",
    description:
      "Projects, practice and internships that became part of my professional journey.",
    hint: "Click a card to learn more",
    now: "Now",
    more: "Details",
    linkSite: "Website",
    linksLabel: "LINKS",
    modalTechnologiesLabel:
      "TECHNOLOGIES",
    modalPrev: "Prev",
    modalNext: "Next",
    modalPrevAria: "Previous role",
    modalNextAria: "Next role",
    modalClose: "Close",
    modalKeyboardHint:
      "ESC — close   ← → — switch",
  },

  certificates: {
    label: "07 / ACHIEVEMENTS",
    headingLine1: "Certificates",
    headingLine2: "and awards.",
    prev: "Previous certificate",
    next: "Next certificate",
    close: "Close",
    openAria: "Open full screen",
    imageCounter: "{current} of {total}",
  },

  reviews: {
    label: "07 / REVIEWS",
    headingLine1: "What people",
    headingLine2: "I've worked with say.",
    description:
      "Reviews from clients. If we've worked together, I'd be glad if you left one.",
    empty:
      "Nothing here yet — be the first to leave a review.",
    emptyFiltered:
      "Nothing matches this filter yet.",
    loadError:
      "Couldn't load reviews. Try refreshing the page.",
    filterAll: "All",
    filterProjectOnly: "With a project only",
    addButton: "Leave a review",
    cancelButton: "Cancel",
    formName: "Name",
    formNamePlaceholder: "How should I address you",
    formRating: "Rating",
    formProject: "Project (optional)",
    formProjectNone: "No project",
    formText: "Review",
    formTextPlaceholder:
      "Tell me how the work went",
    formSubmit: "Submit for review",
    formSubmitting: "Sending…",
    formSuccess:
      "Thank you! Your review was sent and will appear once approved.",
    formError:
      "Couldn't send the review. Please try again later.",
  },

  video: {
    label: "08 / VIDEO",
    headingLine1: "A few words",
    headingLine2: "from me, in person.",
    description:
      "A short intro to who I am and what I do — in my own voice, not just text on a page.",
  },

  contact: {
    label: "09 / CONTACT",
    headingLine1: "Ready to discuss",
    headingLine2: "your project.",
    description:
      "Open to job offers and interesting projects. Leave a message right here — I'll reply to the email you provide.",
    formName: "Name",
    formNamePlaceholder:
      "How should I address you",
    formEmail: "Your email",
    formEmailPlaceholder:
      "for a reply",
    formEmailInvalid: "Please check your email address — it looks incomplete",
    formMessage: "Message",
    formMessagePlaceholder:
      "Tell me about the task or role",
    formSubmit: "Send message",
    formSubmitting: "Sending…",
    formSuccess:
      "Message sent, thank you! I'll reply as soon as possible.",
    formError:
      "Couldn't send it. Try emailing me directly instead.",
    mailtoSubjectPrefix:
      "Message from the portfolio —",
    mailtoReplyLabel: "Reply email",
    directLabel: "Or directly",
    copy: "Copy",
    copyPhoneDone: "Phone number copied",
    copyEmailDone: "Email copied",
    copyError: "Couldn’t copy",
    emailIconAria: "Send an email",
    footerCopy: "Developer portfolio",
    toTop: "Back to top ↑",
  },

  projectsPage: {
    filterAll: "All",
    label: "ALL PROJECTS",
    headingLine1: "Selected",
    headingLine2: "work.",
  },

  projectDetails: {
    about: "About the project",
    facts: "Details",
    year: "Year",
    type: "Type",
    status: "Status",
    statusLive: "Live",
    statusCode: "Open source",
    statusClosed: "In development",
    statusDone: "Completed",
    screens: "Screens",
    openShot: "Open screenshot",
    closeShot: "Close",
    prevShot: "Previous screenshot",
    nextShot: "Next screenshot",
    nextProject: "Next project",
    prevProject: "Previous project",
    phoneAlt: "Mobile version",
    back: "← Back",
    liveWebsite: "Live website ↗",
    technologiesLabel: "TECHNOLOGIES",
    notFoundTitle: "Project not found",
    notFoundBack: "Back to projects",
    galleryAlt: "screenshot",
  },

  languageSwitcher: {
    label: "Site language",
  },
};

export default en;

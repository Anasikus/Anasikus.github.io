import { projects } from "../projects";

const GITHUB_USERNAME = "Anasikus";

const CACHE_KEY = "portfolio-github-stats-v1";
const CACHE_TTL = 24 * 60 * 60 * 1000;

/*
 * GitHub определяет только "сырые" языки репозитория (linguist),
 * фреймворки и инструменты он не видит. Поэтому статистика
 * гибридная: доли языков считаются по реальным байтам кода
 * из GitHub API, а фреймворки/инструменты — по тегам technologies,
 * которые уже вручную проставлены у каждого проекта.
 */
const LANGUAGE_NAMES = new Set([
  "HTML",
  "CSS",
  "SCSS",
  "JavaScript",
  "TypeScript",
  "C#",
  "Python",
  "PHP",
  "Java",
  "Go",
  "Ruby",
  "C++",
  "C",
  "Kotlin",
  "Swift",
]);

export interface StatEntry {
  name: string;
  percent: number;
}

export interface TechStats {
  languages: StatEntry[];
  stack: StatEntry[];
  updatedAt: number | null;
}

interface LanguageCache {
  timestamp: number;
  bytesByLanguage: Record<string, number>;
}

const getRepoSlug = (
  githubUrl: string
): string | null => {
  try {
    const { pathname } = new URL(githubUrl);
    const [owner, repo] = pathname
      .replace(/^\/|\/$/g, "")
      .split("/");

    if (!owner || !repo) {
      return null;
    }

    return `${owner}/${repo}`;
  } catch {
    return null;
  }
};

const readCache = (): LanguageCache | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as LanguageCache;

    if (Date.now() - parsed.timestamp > CACHE_TTL) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

const writeCache = (
  bytesByLanguage: Record<string, number>
) => {
  try {
    const payload: LanguageCache = {
      timestamp: Date.now(),
      bytesByLanguage,
    };

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify(payload)
    );
  } catch {
    // localStorage недоступен (приватный режим и т.п.) — не критично
  }
};

const fetchRepoLanguages = async (
  repoSlug: string
): Promise<Record<string, number> | null> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoSlug}/languages`
    );

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as Record<
      string,
      number
    >;
  } catch {
    return null;
  }
};

const bytesToPercentEntries = (
  bytesByLanguage: Record<string, number>
): StatEntry[] => {
  const total = Object.values(
    bytesByLanguage
  ).reduce((sum, value) => sum + value, 0);

  if (total === 0) {
    return [];
  }

  return Object.entries(bytesByLanguage)
    .map(([name, bytes]) => ({
      name,
      percent: (bytes / total) * 100,
    }))
    .sort((a, b) => b.percent - a.percent);
};

const computeStackEntries = (): StatEntry[] => {
  const counts = new Map<string, number>();

  projects.forEach((project) => {
    const uniqueTech = new Set(
      project.technologies.filter(
        (tech) => !LANGUAGE_NAMES.has(tech)
      )
    );

    uniqueTech.forEach((tech) => {
      counts.set(
        tech,
        (counts.get(tech) ?? 0) + 1
      );
    });
  });

  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      percent: (count / projects.length) * 100,
    }))
    .sort((a, b) => b.percent - a.percent);
};

/*
 * Фолбэк на случай недоступности GitHub API (лимит запросов,
 * офлайн, блокировщики): те же языки, но по данным technologies
 * из проектов вместо реальных байт кода.
 */
const computeLanguageFallback =
  (): StatEntry[] => {
    const counts = new Map<string, number>();

    projects.forEach((project) => {
      project.technologies
        .filter((tech) =>
          LANGUAGE_NAMES.has(tech)
        )
        .forEach((tech) => {
          counts.set(
            tech,
            (counts.get(tech) ?? 0) + 1
          );
        });
    });

    const total = Array.from(
      counts.values()
    ).reduce((sum, value) => sum + value, 0);

    if (total === 0) {
      return [];
    }

    return Array.from(counts.entries())
      .map(([name, count]) => ({
        name,
        percent: (count / total) * 100,
      }))
      .sort((a, b) => b.percent - a.percent);
  };

export const fetchTechStats =
  async (): Promise<TechStats> => {
    const stack = computeStackEntries();

    const cached = readCache();

    if (cached) {
      return {
        languages: bytesToPercentEntries(
          cached.bytesByLanguage
        ),
        stack,
        updatedAt: cached.timestamp,
      };
    }

    const repoSlugs = Array.from(
      new Set(
        projects
          .map((project) => project.githubUrl)
          .filter(
            (url): url is string => Boolean(url)
          )
          .map(getRepoSlug)
          .filter(
            (slug): slug is string =>
              Boolean(slug)
          )
      )
    );

    const results = await Promise.all(
      repoSlugs.map(fetchRepoLanguages)
    );

    const bytesByLanguage: Record<
      string,
      number
    > = {};

    let hasAnyResult = false;

    results.forEach((languages) => {
      if (!languages) {
        return;
      }

      hasAnyResult = true;

      Object.entries(languages).forEach(
        ([name, bytes]) => {
          bytesByLanguage[name] =
            (bytesByLanguage[name] ?? 0) +
            bytes;
        }
      );
    });

    if (!hasAnyResult) {
      return {
        languages: computeLanguageFallback(),
        stack,
        updatedAt: null,
      };
    }

    writeCache(bytesByLanguage);

    return {
      languages:
        bytesToPercentEntries(bytesByLanguage),
      stack,
      updatedAt: Date.now(),
    };
  };

export { GITHUB_USERNAME };

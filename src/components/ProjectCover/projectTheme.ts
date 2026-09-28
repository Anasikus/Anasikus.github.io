import type { CSSProperties } from "react";

import type { Project } from "../../projects/types";

/*
 * CSS-переменные с двумя красками проекта. Всё оформление
 * карточки и страницы проекта (рамка, свечение, градиенты,
 * кнопки) строится на них, поэтому у каждого проекта свой
 * характер без отдельного CSS на каждый.
 */
export const projectThemeStyle = (
  project: Project
): CSSProperties =>
  ({
    "--accent-from": project.accent.from,
    "--accent-to": project.accent.to,
  }) as CSSProperties;

export type ProjectStatus =
  | "live"
  | "code"
  | "closed"
  | "done";

export const getProjectStatus = (
  project: Project
): ProjectStatus => {
  if (project.status) {
    return project.status;
  }

  if (project.liveUrl) {
    return "live";
  }

  if (project.githubUrl) {
    return "code";
  }

  return "closed";
};

export const getDisplayUrl = (
  project: Project
): string => {
  const url = project.liveUrl ?? project.githubUrl;

  if (!url) {
    return `${project.id}.local`;
  }

  try {
    const { hostname, pathname } = new URL(url);

    return `${hostname}${
      pathname === "/" ? "" : pathname
    }`.replace(/\/$/, "");
  } catch {
    return url;
  }
};

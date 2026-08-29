import gsap from "gsap";

export const animateHero = (
  element: HTMLElement
) => {
  const title = element.querySelector(
    "[data-hero-title]"
  );

  const subtitle = element.querySelector(
    "[data-hero-subtitle]"
  );

  const description = element.querySelector(
    "[data-hero-description]"
  );

  if (!title) {
    return;
  }

  const timeline = gsap.timeline();

  timeline.fromTo(
    subtitle,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }
  );

  timeline.fromTo(
    title,
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power4.out",
    },
    "-=0.7"
  );

  timeline.fromTo(
    description,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    },
    "-=0.6"
  );

  return timeline;
};
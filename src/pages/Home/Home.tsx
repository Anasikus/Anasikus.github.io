import { lazy, Suspense } from "react";

import Hero from "../../sections/Hero/Hero";

/*
 * Герой — единственное, что должно быть на экране с первой же
 * секунды, и именно по его заголовку браузер измеряет LCP
 * (самый тяжёлый по времени показатель в отчётах о скорости).
 * Раньше все остальные разделы собирались в тот же файл и в тот
 * же самый момент — GSAP и ScrollTrigger заводили анимации сразу
 * для всей страницы, включая то, что ещё на экран не попало, и
 * это отнимало время именно у заголовка. Теперь остальные разделы
 * — отдельные файлы, которые браузер докачивает и включает уже
 * после Hero, параллельно, не задерживая первую отрисовку.
 */
const About = lazy(
  () => import("../../sections/About/About")
);

const Experience = lazy(
  () =>
    import("../../sections/Experience/Experience")
);

const Skills = lazy(
  () => import("../../sections/Skills/Skills")
);

const Stats = lazy(
  () => import("../../sections/Stats/Stats")
);

const Projects = lazy(
  () =>
    import("../../sections/Projects/Projects")
);

const Reviews = lazy(
  () => import("../../sections/Reviews/Reviews")
);

const VideoIntro = lazy(
  () =>
    import("../../sections/VideoIntro/VideoIntro")
);

const Contact = lazy(
  () => import("../../sections/Contact/Contact")
);

const Home = () => {
  return (
    <main>
      <Hero />

      <Suspense fallback={null}>
        <About />
        <Experience />
        <Skills />
        <Stats />

        <Projects />
        <Reviews />
        <VideoIntro />
        <Contact />
      </Suspense>
    </main>
  );
};

export default Home;

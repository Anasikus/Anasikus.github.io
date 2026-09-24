import Hero from "../../sections/Hero/Hero";
import About from "../../sections/About/About";
import Skills from "../../sections/Skills/Skills";
import Stats from "../../sections/Stats/Stats";
import Projects from "../../sections/Projects/Projects";
import Experience from "../../sections/Experience/Experience";
import Certificates from "../../sections/Certificates/Certificates";
import Contact from "../../sections/Contact/Contact";


const Home = () => {
  return (
    <main>
      <Hero />

      <About />
      <Experience />
      <Skills />
      <Stats />

      <Projects />
      <Certificates />
      <Contact />
    </main>
  );
};

export default Home;

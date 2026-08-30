import Hero from "../../sections/Hero/Hero";
import About from "../../sections/About/About";
import Skills from "../../sections/Skills/Skills";
import Projects from "../../sections/Projects/Projects";
import Experience from "../../sections/Experience/Experience";


const Home = () => {
  return (
    <main>
      <Hero />

      <About />
      <Experience />
      <Skills />
      
      <Projects />
    </main>
  );
};

export default Home;
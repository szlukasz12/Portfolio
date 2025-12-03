import { Link } from "react-router-dom";
import AboutMe from "./Components/AboutMe/AboutMe";
import Skills from "./Components/Skills/Skills";
import { useEffect, useRef, useState, type ReactElement } from "react";
import Apps from "./Components/Apps/Applications";

const Home: React.FC = () => {
  const section1= useRef<HTMLElement>(null) // referencja do obiektu HTML
  const section2= useRef<HTMLElement>(null)
  const section3= useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState<number>(0);

  useEffect(()=>{
    const sections = [section1.current, section2.current, section3.current];

    const observer = new IntersectionObserver( //Nowy observer
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target as HTMLElement);
            setActiveSection(index); // ustawiamy aktywną sekcję
          }
        });
      },
      { threshold: 0.5 } // 50% sekcji w widoku
    );

    sections.forEach((sec) => sec && observer.observe(sec)); // załączenie obserwacji
    return () => sections.forEach((sec) => sec && observer.unobserve(sec));// wyłaczenie obserwacji
  },[])


  return (
    <section className="w-full h-[calc(100vh-4rem)] flex flex-col justify-center items-center bg-[#23263A] space-y-8 ">

    <div className="h-[calc(100vh-4rem)] w-full overflow-y-scroll snap-y snap-proximity scroll-smooth ">
      <section ref={section1} className="h-[calc(100vh-4rem)] w-full flex justify-center items-center bg-gray-800 snap-start ">
        <AboutMe />
      </section>

      <section ref={section2} className="h-[calc(100vh-4rem)] w-full flex justify-center items-center bg-gray-800 snap-start ">
        <Skills />
      </section>

      <section ref={section3} className="h-[calc(100vh-4rem)] w-full flex justify-center items-center bg-gray-800 snap-start">
        <Apps />
      </section>
    </div>

    <div className="absolute right-4 sm:right-15 lg:right-25  top-1/2 -translate-y-1/2 h-auto w-auto flex flex-col items-center  ">
      {[0, 1, 2].map(index => 
      <div key={index}>
      <div className={`w-2 h-10 sm:w-10 sm:h-10 border-2 border-red-400 rounded-full flex items-center justify-center text-white text-xl ${activeSection == index ? "bg-red-400" : ""}`}></div>

      {index < 2 ? <div className="relative left-1/2 -translate-x-1/2 w-0.5 h-20 my-2 bg-gray-400"></div> : null}
      </div>)}
    </div>
    </section>
  );
};

export default Home;

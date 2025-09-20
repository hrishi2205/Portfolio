import React, { useEffect, Suspense, lazy } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";

const About = lazy(() =>
  import("./components/About").then((m) => ({ default: m.About }))
);
const Skills = lazy(() =>
  import("./components/Skills").then((m) => ({ default: m.Skills }))
);
const Projects = lazy(() =>
  import("./components/Projects").then((m) => ({ default: m.Projects }))
);
const Contact = lazy(() =>
  import("./components/Contacts").then((m) => ({ default: m.Contact }))
); // <-- FIXED
const Footer = lazy(() =>
  import("./components/Footer").then((m) => ({ default: m.Footer }))
);

function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div className="h-screen" />}>
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-24" />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;

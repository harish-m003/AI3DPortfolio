// import React, { useCallback, useEffect, useRef, useState } from "react";
// import "./styles.css";

// import { Preloader } from "./components/Preloader";
// import { CustomCursor } from "./components/CustomCursor";
// import { CursorTrail } from "./components/CursorTrail";
// import { TopBar } from "./components/TopBar";
// import { NavRail, MobileRail } from "./components/NavRail";
// import { Aurora } from "./components/Aurora";
// import { ThreeBackdrop } from "./components/ThreeBackdrop";
// import { Footer } from "./components/Footer";

// import { Hero } from "./sections/Hero";
// import { About } from "./sections/About";
// import { Projects } from "./sections/Projects";
// import { Skills } from "./sections/Skills";
// import { Contact } from "./sections/Contact";

// // App just wires the pieces together: which section is active (drives the
// // nav rail + background tint + Three.js morph target), and the preloader
// // state that unlocks the hero's entrance animation.
// export default function App() {
//   const [ready, setReady] = useState(false);
//   const [active, setActive] = useState("home");
//   const morphApiRef = useRef(null);
//   const sectionRefs = useRef({});
//   const reduceMotion =
//     typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//   const registerSection = useCallback((id, el) => {
//     sectionRefs.current[id] = el;
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActive(entry.target.id);
//             morphApiRef.current?.(entry.target.id);
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );
//     Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
//     return () => observer.disconnect();
//   }, []);

//   const scrollTo = useCallback((id) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   return (
//     <div className={`pf-root sec-${active}`}>
//       {!ready && <Preloader onDone={() => setReady(true)} />}

//       <div className="tint-layer" />
//       <Aurora />
//       <ThreeBackdrop morphApiRef={morphApiRef} reduceMotion={reduceMotion} />
//       <div className="grain" />
//       <CustomCursor />
//       <CursorTrail reduceMotion={reduceMotion} />

//       <TopBar />
//       <NavRail active={active} onNav={scrollTo} />
//       <MobileRail active={active} onNav={scrollTo} />

//       <main>
//         <Hero ready={ready} registerSection={registerSection} onNav={scrollTo} />
//         <About registerSection={registerSection} />
//         <Projects registerSection={registerSection} />
//         <Skills registerSection={registerSection} />
//         <Contact registerSection={registerSection} />
//       </main>

//       <Footer />
//     </div>
//   );
// }



import React, { useCallback, useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles.css";

import { Preloader } from "./components/Preloader";
import { CustomCursor } from "./components/CustomCursor";
import { CursorTrail } from "./components/CursorTrail";
import { TopBar } from "./components/TopBar";
import { NavRail, MobileRail } from "./components/NavRail";
import { Aurora } from "./components/Aurora";
import { ThreeBackdrop } from "./components/ThreeBackdrop";
import { Footer } from "./components/Footer";

import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Contact } from "./sections/Contact";




// Main portfolio page
function Home() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState("home");
  const morphApiRef = useRef(null);
  const sectionRefs = useRef({});

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const registerSection = useCallback((id, el) => {
    sectionRefs.current[id] = el;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            morphApiRef.current?.(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs.current).forEach(
      (el) => el && observer.observe(el)
    );

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={`pf-root sec-${active}`}>
      {!ready && <Preloader onDone={() => setReady(true)} />}

      <div className="tint-layer" />
      <Aurora />
      <ThreeBackdrop
        morphApiRef={morphApiRef}
        reduceMotion={reduceMotion}
      />
      <div className="grain" />

      <CustomCursor />
      <CursorTrail reduceMotion={reduceMotion} />

      <TopBar />
      <NavRail active={active} onNav={scrollTo} />
      <MobileRail active={active} onNav={scrollTo} />

      <main>
        <Hero
          ready={ready}
          registerSection={registerSection}
          onNav={scrollTo}
        />
        <About registerSection={registerSection} />
        <Projects registerSection={registerSection} />
        <Skills registerSection={registerSection} />
        <Contact registerSection={registerSection} />
      </main>

      <Footer />
    </div>
  );
}

// Additional pages
function NotFound() {
  return (
    <div className="pf-root">
      <h1>404 - Page Not Found</h1>
      <a href="/">Back to Home</a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

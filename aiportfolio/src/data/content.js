// All editable content lives here — swap this file per project,
// no component code needs to change.

export const SECTIONS = [
  { id: "home", label: " Home" },
  { id: "about", label: " About" },
  { id: "projects", label: " Work" },
  { id: "skills", label: " Skills" },
  { id: "contact", label: "Contact" },
];

export const PROJECTS_DATA = [
  {
    tag: "AI - Assited",
    year: "2026",
    title: "AI-Powered 3D Portfolio Website",
    desc: "Built React.js 3D applications using AI-assisted development and a component-based architecture.",
    stack: ["Claude AI", "React JS", "Three JS"],
    github: "https://github.com/harish-m003/AI3DPortfolio",
    demo: "https://harishmportfolio.vercel.app/",
  },
  {
    tag: "Landing Page",
    year: "2024",
    title: "Netflix — Clone Landing Page",
    desc: "Built a Netflix-inspired landing page using React.js with responsive design and modern UI.",
    stack: ["React JS", "JavaScript", "HTML 5", "CSS 3"],
    github: "https://github.com/harish-m003/netflix-landing-page",
    demo: "https://streaming-landing-page.netlify.app/",
  },
  {
    tag: "Mangement App",
    year: "2026",
    title: "CRUD - Task Management App",
    desc: "Built a CRUD application using React.js with full create, read, update, and delete functionality.",
    stack: ["React JS", "Supabase"],
    github: "https://github.com/harish-m003/Supabasetask-crudoperation",
    demo: "https://supabasetask-crudoperation.vercel.app/",
  },
  {
    tag: "soon",
    year: "",
    title: "",
    desc: "",
    stack: [],
    github: "https://github.com/",
    demo: "#",
  },
];

export const VALUES_DATA = [
  { mark: "01", title: "", text: "" },
  { mark: "02", title: "", text: "" },
  { mark: "03", title: "", text: "" },
  { mark: "04", title: "", text: "" },
];

export const SKILLS_DATA = [
  { n: "HTML 5", c: "signal" }, { n: "CSS 3", c: "signal" }, { n: "JavaScript", c: "signal" }, { n: "MySQL", c: "signal" },
  { n: "React.js", c: "spectral" }, { n: "Next.js", c: "spectral" }, { n: "Supabase", c: "spectral" }, { n: "Bootstrap", c: "spectral" },
  { n: "Claude AI", c: "bone" }, { n: "WordPress", c: "bone" }, { n: "ChatGPT", c: "bone" }, { n: "Git & GitHub", c: "bone" },
];

export const LINE_COLOR = { signal: "var(--signal)", spectral: "var(--spectral)", bone: "var(--mist)" };

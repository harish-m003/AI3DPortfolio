# Portfolio App

Same site as before, split into one file per concern so it's easy to scan
and edit.

## Structure

```
src/
  App.jsx                 # wires everything together (active section, ready state)
  main.jsx                # ReactDOM entry point
  styles.css              # all CSS, scoped under .pf-root

  data/
    content.js             # SECTIONS, PROJECTS_DATA, VALUES_DATA, SKILLS_DATA
                            # <- edit THIS file to put in your own content

  utils/
    geometry.js            # fibonacciSphere() — point distribution math

  hooks/
    useInView.js           # scroll-reveal trigger
    useTilt.js              # 3D hover tilt (project cards)
    useAmbientParallax.js   # mouse-follow rotation (hero title, contact headline)
    useMagnetic.js          # buttons that pull toward the cursor

  components/               # things used across more than one section
    Reveal.jsx               # <Reveal variant="flip" | "deal"> scroll animation wrapper
    Preloader.jsx
    CustomCursor.jsx
    CursorTrail.jsx
    TopBar.jsx
    NavRail.jsx              # exports both NavRail and MobileRail
    Aurora.jsx
    CubeDecor.jsx
    Footer.jsx
    ThreeBackdrop.jsx        # the morphing particle "core" behind everything

  sections/                 # one file per page section
    Hero.jsx
    About.jsx
    ValueSphere.jsx          # the rotating card carousel used inside About
    Projects.jsx
    ProjectCard.jsx
    Skills.jsx
    SkillSphere.jsx          # the draggable 3D skill-tag sphere
    Contact.jsx
    ContactForm.jsx
```

## Running it

```bash
npm install
npm run dev
```

Requires Node + npm. `three` is the only non-React runtime dependency —
everything else (scroll reveals, hover tilt, magnetic buttons, the
preloader) is plain CSS transitions + `requestAnimationFrame`, so there's
no GSAP/ScrollTrigger to install.

## Making it yours

1. **Content** — edit `src/data/content.js`: section labels, project cards,
   "what I believe" cards, skill tags.
2. **Colors/type** — edit the `:root` variables at the top of
   `src/styles.css` (`--signal`, `--spectral`, `--void`, fonts).
3. **Copy** — the actual sentences live in `About.jsx` and `Contact.jsx`;
   edit directly.
4. **Résumé link / email** — search `resume.pdf` and `hello@example.dev`
   and replace with your own.

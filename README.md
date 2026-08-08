# Bavya Sri — Portfolio Website

A personal portfolio site built with plain **HTML5, CSS3, and JavaScript** — no frameworks,
so it's easy to read, edit, and grow as you learn more.

## Files

```
portfolio/
├── index.html         → all page content and structure
├── style.css           → all visual styling (colors, fonts, layout, animation)
├── script.js            → nav menu, typing effect, scroll animations, background
├── images/
│   ├── profile.jpg      → your photo (used in the hero + about section)
│   └── projects/        → put project screenshots here as you add them
└── README.md            → this file
```

## How to view it

Just double-click `index.html` to open it in your browser — no server or install needed.

## How to update things later

- **Text content:** open `index.html` and edit the text between the tags. Each section is
  labelled with an HTML comment like `<!-- ============ ABOUT ============ -->`.
- **Colors/fonts:** open `style.css` and look at the `:root { ... }` block at the very top —
  every color and font is defined once there as a variable, so changing `--accent` changes
  the accent color everywhere.
- **Project links:** in `index.html`, find the `<button class="btn btn-disabled">` in the
  Projects section and replace it with a real `<a href="your-link" class="btn btn-primary">`
  once your projects are live somewhere (like GitHub Pages).
- **Contact links:** find the `contact-card` links in the Contact section and swap the `href="#"`
  placeholders and label text for your real email/GitHub/LinkedIn/Instagram once you have them.
- **New project card:** copy one `<article class="project-card ...">` block and edit its content.
- **New skill card:** copy one `<div class="skill-card ...">` block inside `.skills-grid`.

## Notes on the design

- Dark, AI-themed look with a soft neural-network animation in the background (`script.js`,
  `setupNeuralBackground`) — drawn on a `<canvas>`, so it's lightweight and needs no images.
- The little code-style panel in the hero (`bavya.js`) is just styled HTML/CSS, not real
  executable code — a nod to the fact that you're a developer, without needing a code engine.
- All skill levels are shown as honest labels (Learning / Strong Foundation / Building
  Projects) instead of fake percentages — update these labels as your skills actually grow.
- Animations respect `prefers-reduced-motion`, so they turn off automatically for anyone who
  has that accessibility setting enabled.

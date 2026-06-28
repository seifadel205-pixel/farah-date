# FarahDate — a tiny invitation website

This is a small static website that shows a playful date invitation with:
- a friendly UI to pick a date/time/dress code,
- a confirmation view,
- and a downloadable PDF confirmation (uses jsPDF).

Files:
- index.html — main page
- css/styles.css — styles
- js/app.js — behavior
- README.md — this file

How to run locally:
1. Open `index.html` directly in your browser (works fine for static use).
2. Or run a simple static server (recommended) to avoid any file access quirks:
   - Python 3: `python -m http.server 8000`
   - Node (http-server): `npx http-server -p 8000`
   Then open http://localhost:8000

How to deploy:
- GitHub Pages:
  1. Create a new repository and push these files.
  2. In repo Settings → Pages, set the source to the `main` branch (or `gh-pages`) and the root folder.
  3. Save — your site will be available at `https://<your-username>.github.io/<repo>/`.

Notes:
- jsPDF is loaded from CDN in `index.html`. If you want offline hosting, download the library and serve it locally.
- For accessibility improvements, consider keyboard-focusable "No" button behavior and aria attributes.

Enjoy — and congrats, Farah is getting a very cute invitation ❤️

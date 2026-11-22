# 🎂 A Birthday Surprise for Antara ❤️

A phone-first interactive birthday website built with pure HTML, CSS and vanilla JavaScript (no build step, no frameworks).

**Highlights:** countdown + fireworks opening, photo rain, arched hero frame, polaroid gallery with swipeable lightbox, interactive envelope with typewriter letter, 3D-style cake with blow-out candles, wish cards, confetti, background music (play/pause/mute).

## Project structure
```
index.html   style.css   script.js   .nojekyll
assets/antara-1.jpeg … antara-10.jpeg
```

## Publish on GitHub Pages (free)
1. Create a new repository on github.com (e.g. `antara-birthday`).
2. Click **Add file → Upload files**, drag in **everything in this folder** (so `index.html` is at the repo root), then **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. After about a minute your site is live at `https://<your-username>.github.io/antara-birthday/`. Send her that link.

> Tip: use a private-looking repo name, and note that GitHub Pages sites are public to anyone with the link.

## Customising
- Captions, letter text and wishes: top of `script.js`.
- Headings and messages: `index.html`.
- Photos: replace files in `assets/` keeping the same names.

## Notes
- Music is generated in the browser and only starts after a tap (browser rule).
- Fonts load from Google Fonts; system fonts are used as fallback offline.

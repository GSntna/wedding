# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static bilingual (ES/EN) wedding invitation site for Karla & Gus, deployed to GitHub Pages at `karlaygus.gustavo-santana.com`. No build step — open `index.html` directly in a browser to preview.

## Stack

- **Tailwind CSS via CDN** — no build, no `node_modules`. Custom brand colors and fonts are declared in the inline `tailwind.config` block inside `index.html`'s `<head>`.
- **Vanilla JS** — `assets/script.js`
- **Custom CSS** — `assets/style.css` (CSS variables + component styles; Tailwind handles layout utilities)
- **Google Fonts** — Cardo (display/body) + Great Vibes (script headings)

## Architecture

### i18n

`<html lang="es">` is the default. Switching languages flips `document.documentElement.lang` via JS. CSS does the rest:

```css
[lang="es"] .lang-en { display: none !important; }
[lang="en"] .lang-es { display: none !important; }
```

Every bilingual text node uses either `.lang-es` or `.lang-en`. Both instances live in the DOM simultaneously. The language toggle (`.lang-toggle`) is a sliding-pill segmented control that uses `currentColor` so it adapts to both navbar states automatically.

### Navbar

The navbar has two states driven by a JS scroll listener:
- `.transparent` — used at top of page (text dark to contrast the light hero)
- `.scrolled` — pill shape, dark background, light text

The hamburger (`#hamburger-btn`, mobile-only via `sm:hidden`) opens a full-viewport overlay (`#mobile-menu`) with centered nav links. The overlay closes on link click, close-button click, or Escape key.

### Sections and anchors

| Section | id | Style |
|---|---|---|
| Hero | `#hero` | light |
| Countdown | *(no anchor)* | dark |
| Momentos Nuestros | `#nosotros` | light |
| Detalles del Evento | `#evento` | dark |
| — Ceremonia sub-card | `#ceremonia` | (inside `#evento`) |
| — Recepción sub-card | `#recepcion` | (inside `#evento`) |
| Viaje & Hospedaje | `#viaje` | light |
| Gastronomía | `#gastronomia` | light |
| Regalos | `#regalos` | dark |
| FAQ | `#faq` | light |

### Media assets

All images/video live in `images/`. The JS has `onerror` fallbacks for every asset — missing files degrade gracefully (placeholders, hidden wrappers) rather than breaking layout.

### Pending content

Placeholders marked `[PENDIENTE]` in the HTML:
- Bank transfer details (`#bank-details` table): account name, bank, account number, CLABE, IBAN
- Footer closing message
- Several FAQ answers
- Airport/flight info and hiking trail options
- Images: `hero-hacienda.jpg`, `moments-1..6.jpg`, `illustration-capilla.png`, `illustration-dressCode.png`
- Video: `animation-hero.mp4` / `.webm`

### Countdown

Target: `2026-11-14T22:00:00Z` (= 4 PM UTC−6). Currently shows months/days/hours using IDs `#cd-a`, `#cd-b`, `#cd-c`.

## CSS conventions

- CSS variables for the color system are declared in `:root` in `assets/style.css`. Don't use raw hex values in new styles — reference the variables.
- Section alternation: `.section-dark` (dark bg, light text) vs. default light sections. Both classes are defined in `style.css`.
- Tailwind utilities handle spacing/layout; `style.css` handles component-specific rules (navbar pill, polaroid cards, countdown boxes, lang-toggle pill animation, hamburger animation).

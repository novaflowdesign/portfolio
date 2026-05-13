# Projekt: NovaFlowDesign — Portfolio

## Stack
- **Astro 6.x** z TypeScript (strict)
- **Tailwind CSS v4** przez `@tailwindcss/postcss` + `postcss.config.mjs` (bez tailwind.config.ts — konfiguracja w `src/styles/global.css` przez `@theme {}`)
- Statyczny build (`output: "static"`) — FTP na hosting OVH
- Content Collections (Astro 6, nowe API z loaderami) — config w `src/content.config.ts`, pliki `.md` w `src/content/projects/`
- `@astrojs/mdx` + `@astrojs/sitemap`
- Fonty self-hosted: Inter (sans) + Playfair Display (display) przez `@fontsource`

## Struktura
- `src/components/` — komponenty w PascalCase, pliki `.astro`
- `src/layouts/BaseLayout.astro` — jedyny główny layout (przyjmuje `title`, `description`, `ogImage`)
- `src/pages/` — strony; podkatalog `realizacje/` dla dynamicznych tras
- `src/content/projects/` — pliki `.md` z frontmatter wg schematu Zod (`src/content/config.ts`)
- `src/styles/global.css` — `@import "tailwindcss"`, `@theme {}`, fonty, reset
- `public/` — zasoby statyczne (favicon, OG image, robots.txt)

## Nawigacja (strony)
- `/` — strona główna (Hero + grid projektów)
- `/realizacje/` — lista projektów
- `/realizacje/[slug]` — dynamiczne podstrony projektów
- `/oferta` — oferta usług
- `/kontakt` — strona kontaktowa (mailto:)
- `/faq` — najczęściej zadawane pytania

## Konwencje kodu
- TypeScript strict we wszystkich plikach `.ts` i `.astro`
- Brak `any` — używaj właściwych typów lub generics
- Props komponentów jako `interface Props` w bloku frontmatter `.astro`
- Import aliasy: `@components/*`, `@layouts/*`, `@styles/*`, `@content/*` (skonfigurowane w tsconfig.json)

## Tailwind v4 — ważne uwagi
- Konfiguracja kolorów/fontów przez `@theme {}` w `global.css`, nie przez plik JS
- Dark mode: `@custom-variant dark (&:where(.dark, .dark *))` — klasa `.dark` na `<html>`
- Kolory własne: `accent`, `accent-light`, `accent-dark`, `surface`, `surface-elevated`, `surface-card`, `surface-border`
- Fonty własne: `font-display` (Playfair Display), `font-sans` (Inter)
- **Uwaga:** `@tailwindcss/vite` ma bug z Vite 7 (rolldown) używanym przez Astro 6 — nie instaluj go, używaj wyłącznie `@tailwindcss/postcss`
- Impty `@fontsource` są w `BaseLayout.astro` (nie w `global.css`) — tylko tak Vite poprawnie kopiuje pliki `.woff2` do `dist`

## Design
- Dark mode domyślny — klasa `dark` zawsze na `<html>`
- Breakpointy mobile-first: `sm:`, `md:`, `lg:`
- Dużo whitespace — sekcje min. `py-20 md:py-32`
- Wszystkie teksty po polsku

## SEO
- Każda strona dostaje `title`, `description`, `ogImage` przez props BaseLayout
- `@astrojs/sitemap` generuje `sitemap.xml` przy buildzie (`site: 'https://novaflowdesign.pl'`)
- `public/robots.txt` — ręcznie

## Czego unikać
- Nie używaj zewnętrznych CDN-ów (fonty self-hosted przez @fontsource)
- Nie dodawaj zależności bez pytania
- Nie wprowadzaj zmian, których nie poproszono
- Nie usuwaj komentarzy w kodzie
- Nie używaj `any` w TypeScript

## Workflow
- Po każdym ukończonym etapie przypomnij o commicie
- README.md aktualizuj po zakończeniu całego setupu
- Przed buildem: `npm run build` musi przejść bez błędów TS

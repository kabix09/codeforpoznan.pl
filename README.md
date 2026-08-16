# 🏛️ Code for Poznań — Oficjalna Strona / One-Pager

Wysokowydajna, dostępna (A11y) i w pełni zgodna z RODO (GDPR & Consent Mode v2) strona internetowa społeczności civic tech **Code for Poznań**, zbudowana w oparciu o stos **Nuxt 3 / Vue 3 + Tailwind CSS**.

---

## 🚀 Jak uruchomić projekt lokalnie

### Wymagania wstępne
* **Node.js** (zalecana wersja LTS, np. v18+)
* **npm** lub **pnpm**

### 1. Instalacja zależności
```bash
npm install
```

### 2. Uruchomienie serwera deweloperskiego

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

### 3. Budowanie wersji produkcyjnej (SSR + Prerender)

```bash
npm run build
```

---

## 🛠️ Jak sprawdzać poprawność i jakość kodu (CLI Tools)

W projekcie wykorzystujemy zestaw darmowych narzędzi CLI do automatycznego audytu dostępności (A11y), wydajności (CWV) oraz optymalizacji SEO.

### 1. Test Dostępności za pomocą Pa11y

Pa11y to narzędzie CLI skanujące stronę pod kątem zgodności ze standardami WCAG (WCAG 2.1 Level AA).

* **Uruchomienie testu na lokalnym serwerze:**
1. Upewnij się, że serwer deweloperski działa (`npm run dev`).
2. W nowym oknie terminala uruchom:
```bash
npx pa11y http://localhost:3000 --standard WCAG2AA

```

* **Konfiguracja:** Projekt posiada plik `pa11y.json`, który definiuje standardy skanowania silnikiem `axe`.

---

### 2. Audyt Wydajności i SEO za pomocą Lighthouse CI (LHCI)

Lighthouse CI testuje całościową kondycję strony: wydajność (Core Web Vitals), dostępność, dobre praktyki oraz SEO.

* **Konfiguracja:** W głównym katalogu znajduje się plik `lighthouserc.json`, który automatycznie uruchamia serwer deweloperski, wykonuje pomiary i sprawdza progi jakościowe.
* **Uruchomienie testu:**
```bash
export CHROME_PATH="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"

npx lhci autorun
```


* Po zakończeniu testu w konsoli pojawi się podsumowanie punktowe oraz link do wygenerowanego raportu online.

---

## 📦 Przydatne komendy NPM

* `npm run dev` — Uruchamia środowisko deweloperskie z HMR.
* `npm run build` — Buduje aplikację produkcyjną.
* `npm run preview` — Podgląd zbudowanej aplikacji produkcyjnej lokalnie.

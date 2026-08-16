# 📝 Notatka SEO: Code for Poznań (Vue + Nuxt)

## ✅ Zastosowane reguły i wdrożenia
W trakcie optymalizacji komponentów zastosowaliśmy następujące, nowoczesne standardy SEO, optymalizacji wydajności oraz dostępności (A11y):

* **Eliminacja czystego SPA (Server-Side Rendering):** 
  * Zalecono włączenie `ssr: true` w `nuxt.config.ts` oraz prerenderingu dla strony głównej (`routeRules: { '/': { prerender: true } }`), co zapewnia botom wyszukiwarek gotowy kod HTML.
* **Nowoczesne Structured Data (JSON-LD):** 
  * Całkowicie **zrezygnowaliśmy z przestarzałych atrybutów HTML** typu Microdata (`itemscope`, `itemprop`, `itemtype`).
  * Wdrożyliśmy komponent `<StructuredData :data="..." />`, który czysto wstrzykuje tagi `<script type="application/ld+json">`.
* **Implementacja schematu `NGO` + `LocalBusiness`:** 
  * Wskazaliśmy wyszukiwarkom dokładny typ organizacji (`@type: ["NGO", "LocalBusiness"]`) oraz obszar działania (`areaServed: "Poznań"`).
* **Dynamiczne wiązanie danych (Data Binding dla SEO):** 
  * Połączyliśmy dane – użyliśmy tablicy z filarami działalności do automatycznego wygenerowania pola `"knowsAbout"` w Schema.org, ucząc algorytmy ekspertyzy organizacji.
* **Optymalizacja Core Web Vitals (CWV) za pomocą `<NuxtImg>`:** 
  * Wdrożono moduł `@nuxt/image` do automatycznej konwersji zdjęć na format WebP/AVIF.
  * **Sekcja Hero (LCP):** Główny obrazek otrzymał atrybuty `fetchpriority="high"` oraz `preload`, co drastycznie skraca czas ładowania najważniejszego (największego) elementu na stronie.
  * **Sekcje Below-the-fold (Projekty, Formularz):** Zdjęcia na osi czasu oraz formularzu otrzymały atrybut `loading="lazy"`, dzięki czemu nie obciążają transferu przy starcie strony.
* **Dostępność i Kontekst (A11y & UX):** 
  * Wdrożono precyzyjne atrybuty `aria-label` oraz `aria-expanded` (np. dla menu mobilnego, nawigacji, kropek osi czasu czy przycisków społecznościowych).
  * Dodano opisowe atrybuty `title` do głównych przycisków i linków zewnętrznych (`rel="noopener noreferrer"`).
  * Poprawiono dostępność formularza kontaktowego, spinając etykiety z polami za pomocą par `for`/`id` oraz dodając `aria-pressed` dla przycisków wyboru roli.
  * Zmieniono nazwy hashy w URL (np. `#nasze-projekty`, `#o-nas`), aby Google mogło wygenerować polskie *Sitelinks* (linki do sekcji pod głównym wynikiem wyszukiwania).
* **Infrastruktura Techniczna i Analityka:**
  * Wdrożono moduły do automatycznego generowania `sitemap.xml` i `robots.txt` skrojone pod architekturę One-Pagera (z wykluczeniem ścieżek `/admin` i `/api`).
  * Wdrożono GA4 poprzez `nuxt-gtag` ze statusem `initialConsent: false` oraz zintegrowany baner cookies (zgodność z RODO i Consent Mode v2).
  * Stworzono scentralizowany composable (`composables/useTracking.ts`) do czystego śledzenia zdarzeń konwersji (CTA, nawigacja, wysyłka formularzy).

---

## 🚫 Odrzucone / Zmodyfikowane podejścia (Decyzje architektoniczne)
Podczas analizy pierwotnych propozycji wprowadziliśmy kluczowe korekty dostosowane do architektury One-Pagera:

1. **Odrzucenie "puchatego" `nuxt.config.ts`:**
   * *Dlaczego:* Zaproponowany początkowo config był przygotowany pod duży portal z wieloma podstronami. Deklarowanie w pre-renderze ścieżek, których fizycznie nie ma w folderze `pages`, doprowadziłoby do błędu budowania (Build Error).
   * *Rozwiązanie:* Skonfigurowano routing i sitemapę wyłącznie dla ścieżki głównej (`/`).
2. **Odrzucenie minifikacji `terser` v Vite:**
   * *Dlaczego:* Propozycja zmiany domyślnego minifikatora (esbuild) na `terser` wydłużyłaby czas budowania projektu bez zauważalnego zysku na wadze kodu dla One-Pagera.
   * *Rozwiązanie:* Zrezygnowano z ingerencji w `vite.build.minify`.
3. **Zapobieganie kanibalizacji priorytetów obrazków (`fetchpriority="high"`):**
   * *Dlaczego:* Nadawanie priorytetu obrazkom na osi czasu zepsułoby czas ładowania (LCP) strony głównej. Karta "VIP" może być przyznana tylko raz na stronie.
   * *Rozwiązanie:* Zastosowano priorytet wyłącznie dla banera Hero, a pozostałym grafikom wymuszono `loading="lazy"`.
4. **Centralizacja danych Schema.org (JSON-LD):**
   * *Dlaczego:* Rozbicie danych o organizacji na dwa osobne skrypty powoduje, że Google widzi dwie różne encje NGO na jednej stronie.
   * *Rozwiązanie:* Utworzono jeden, połączony obiekt `mergedOrganizationSchema` w głównym komponencie.
5. **Rozdzielenie kompetencji tagów Meta:**
   * *Dlaczego:* Umieszczanie `description` w `nuxt.config.ts` ORAZ w plikach widoków prowadzi do duplikacji tagów.
   * *Rozwiązanie:* `nuxt.config.ts` trzyma tylko infrastrukturę. Cała treść SEO jest wstrzykiwana przez `useSeoMeta`.
6. **Brak `<meta name="keywords">`:**
   * *Dlaczego:* Jest to mechanizm przestarzały i zignorowany przez Google. Słowa kluczowe umieszczono w atrybucie `knowsAbout` w strukturze JSON-LD.
7. **Relatywne vs Absolutne ścieżki dla obrazków OG/Twitter:**
   * *Dlaczego:* Boty social mediów gubią się, gdy obrazek podany jest jako ścieżka relatywna (np. `/og-image.jpg`).
   * *Rozwiązanie:* Wymuszono stosowanie bezwzględnych adresów URL (z przedrostkiem `https://`).
8. **Odrzucenie wewnętrznego dashboardu analitycznego w kodzie:**
   * *Dlaczego:* Pisanie dedykowanego panelu admina z wykresami bezpośrednio na froncie to przerost formy nad treścią (over-engineering) dla strony typu One-Pager.
   * *Rozwiązanie:* Do raportowania wykorzystuje się natywne GA4 połączone z darmowym Google Looker Studio.

---

## ⏳ Niezastosowane / Odłożone na później reguły
Elementy zaparkowane do wdrożenia w kolejnych fazach projektu:

* **Schemat ofert wolontariatu (`JobPosting`):** 
  * Odłożono wdrożenie JSON-LD z parametrem `"employmentType": "VOLUNTEER"` dla Google for Jobs.
* **Schemat Zespołu (`Person`):** 
  * Kod ze szczegółowymi profilami członków zespołu został odłożony na moment tworzenia pełnej podstrony `/o-nas`. 
* **Schemat Wydarzeń (`Event Markup`):**
  * Do wdrożenia, gdy organizacja będzie promować konkretne meetupy i hackathony.

---

## 🗺️ Roadmapa SEO (Plan Naprawczy)

### 1. Architektura i Rendering
* [x] **Zlikwidować JAVASCRIPT-ONLY (SPA bez fallbacku)**
  * *Rozwiązanie:* Implementacja SSR w Nuxt (`ssr: true`).
* [x] **Skonfigurować Sitemapy i plik Robots.txt**
  * *Rozwiązanie:* Ustawienie globalnego adresu URL w obiekcie `site` oraz wykluczenie ścieżek `/api`, `/admin`.

### 2. Meta Dane i Social Media
* [x] **Uzupełnić brakujące Meta Tagi**
  * *Rozwiązanie:* Poprawne wdrożenie `useSeoMeta` w `pages/index.vue` z bezwzględnymi linkami do obrazków i zadeklarowanym formatem `twitterCard: 'summary_large_image'`:
    ```javascript
    useSeoMeta({
      title: 'Code for Poznań',
      description: 'Jesteśmy społecznością IT z Poznania. Tworzymy zaawansowane aplikacje i narzędzia wspierające organizacje pozarządowe. Dołącz do nas!',
      ogTitle: 'Code for Poznań',
      ogDescription: 'Budujemy otwarte narzędzia IT wspierające organizacje społeczne w ich codziennej pracy.',
      ogImage: '[https://codeforpoznan.pl/og-image.jpg](https://codeforpoznan.pl/og-image.jpg)',
      ogUrl: '[https://codeforpoznan.pl](https://codeforpoznan.pl)',
      ogType: 'website',
      ogLocale: 'pl_PL',
      twitterCard: 'summary_large_image', 
      twitterImage: '[https://codeforpoznan.pl/twitter-image.jpg](https://codeforpoznan.pl/twitter-image.jpg)'
    })
    ```

### 3. Pozycjonowanie Lokalne (Local SEO)
* [x] **Skonfigurować sygnały lokalne**
  * *Rozwiązanie:* Definicja `areaServed`, `addressLocality` i `addressRegion` w scentralizowanym JSON-LD.

### 4. Dane Strukturalne (Structured Data)
* [x] **Wdrożyć kontekst dla botów (Schema.org)**
  * *Rozwiązanie:* Implementacja głównego schematu "NGO" + "LocalBusiness".
  * [ ] *Do zrobienia:* Event markup dla meetupów i hackathonów.
  * [ ] *Do zrobienia:* Team/people schema na docelowej podstronie `/o-nas`.

### 5. Wydajność, Treść i Dostępność (CWV & A11y)
* [x] **Zarządzanie czasem ładowania (LCP & Lazy Load)**
  * *Rozwiązanie:* Wdrożenie modułu `@nuxt/image`, zastosowanie `fetchpriority="high"` dla Hero oraz `loading="lazy"` dla komponentów poniżej linii zgięcia.
* [x] **Dostosowanie Kotwic i Atrybutów do One-Pagera**
  * *Rozwiązanie:* Spolszczenie tagów nawigacyjnych (`#nasze-projekty`, `#o-nas`, `#dolacz-do-nas`) w celu pozyskania Sitelinków oraz dodanie kontekstowych `aria-label`.
* [ ] **Zbudować merytoryczne zaplecze strony**
  * [ ] *Do zrobienia:* Rozbudowa sekcji Blog / Case studies (dla long-tail SEO).

### 6. Tracking i Analityka
* [x] **Wdrożenie zgodnego z RODO śledzenia konwersji**
  * *Rozwiązanie:* Instalacja GA4 poprzez `nuxt-gtag` z `initialConsent: false`, komponent banera cookie z aktualizacją Consent Mode v2 oraz dedykowany `composables/useTracking.ts` do obsługi zdarzeń CTA i formularzy.

---

## 🛠️ Praktyczny Toolkit i Procedura Audytu (SEO, CWV & A11y)

Aby na bieżąco kontrolować poprawność pozycjonowania i dostępności serwisu, wykorzystujemy sprawdzony, darmowy zestaw narzędzi oraz 15-minutowy plan szybkiego audytu.

### 1️⃣ Narzędzia Audytowe (Tier 1 - Darmowe / Podstawowe)
* **Google Lighthouse (Free, Built-in w Chrome DevTools):** Sprawdza Performance (Core Web Vitals), Accessibility (a11y), Best Practices oraz ogólny wynik SEO (meta tagi, nagłówki, unikalność H1).
* **WAVE (WebAIM) / WAVE Extension:** Kontroluje dostępność strony (kontrast kolorów, obecność etykiet formularzy, poprawność hierarchii nagłówków i atrybutów ARIA).
* **WebAIM Contrast Checker:** Narzędzie do weryfikacji współczynnika kontrastu tekstów (wymóg min. `4.5:1` dla małego tekstu i `3:1` dla dużego w standardzie WCAG AA).
* **Coblis (Color Blindness Simulator):** Narzędzie symulujące odbiór kolorów strony przez osoby z różnymi wadami wzroku (np. Deuteranopia – daltonizm zielono-czerwony), co pozwala unikać polegania wyłącznie na kolorze przy oznaczeniach akcji.
* **Google Search Console (GSC):** Główny panel monitorowania indeksowania strony przez boty Google, monitorowania słów kluczowych (np. *"wolontariat IT Poznań"*, *"civic tech"*), zaprzęgnięcia sitemap.xml oraz kontroli Core Web Vitals w warunkach rzeczywistych.

---

### ⏱️ Szybka Procedura Audytu (15 minut Checklist)
Wykonuj tę procedurę okresowo lub przed każdym większym wdrożeniem na produkcję:

1. **Audyt Lighthouse (3 min):**
   * Otwórz stronę, naciśnij `F12` (DevTools) -> zakładka **Lighthouse** -> kliknij *Analyze page load*.
   * *Cel:* Wynik SEO i Accessibility na poziomie min. `90-95+`.
2. **W WAVE Accessibility (3 min):**
   * Wejdź na [wave.webaim.org](https://wave.webaim.org) lub użyj wtyczki do przeglądarki.
   * *Cel:* Liczba błędów (*Errors*) i naruszeń kontrastu równa `0`.
3. **Weryfikacja Kontrastu (2 min):**
   * Sprawdź kolory przycisków i napisów na stronie przez WebAIM Contrast Checker, aby upewnić się, że spełniają normy WCAG.
4. **Google Search Console (5 min):**
   * Zaloguj się do [Google Search Console](https://search.google.com/search-console), sprawdź zakładkę *Coverage* (brak błędów indeksowania) oraz *Performance* (monitorowanie pozycji i wyświetleń).
5. **Sprawdzenie Daltonizmu (2 min):**
   * Zrób zrzut ekranu strony głównej i wrzuć do symulatora Coblis (wariant *Deuteranopia*), upewniając się, że kluczowe przyciski konwersji ("Dołącz do nas") są wyraźnie widoczne i rozróżnialne.
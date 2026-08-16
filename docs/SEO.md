# 📝 Notatka SEO: Code for Poznań (Vue + Nuxt)

## ✅ Zastosowane reguły i wdrożenia
W trakcie optymalizacji komponentów zastosowaliśmy następujące, nowoczesne standardy SEO i optymalizacji wydajności:

* **Eliminacja czystego SPA (Server-Side Rendering):** 
  * Zalecono włączenie `ssr: true` w `nuxt.config.ts` oraz prerenderingu dla strony głównej (`routeRules: { '/': { prerender: true } }`), co zapewnia botom wyszukiwarek gotowy kod HTML.
* **Nowoczesne Structured Data (JSON-LD):** 
  * Całkowicie **zrezygnowaliśmy z przestarzałych atrybutów HTML** typu Microdata (`itemscope`, `itemprop`, `itemtype`).
  * Wdrożyliśmy komponent `<StructuredData :data="..." />`, który czysto wstrzykuje tagi `<script type="application/ld+json">`.
* **Implementacja schematu `NGO`:** 
  * Wskazaliśmy wyszukiwarkom dokładny typ organizacji (`@type: "NGO"`) oraz obszar działania (`areaServed: "Poznań"`).
* **Dynamiczne wiązanie danych (Data Binding dla SEO):** 
  * Połączyliśmy dane – użyliśmy tablicy z filarami działalności (`pillars`) do automatycznego wygenerowania pola `"knowsAbout"` w Schema.org, ucząc algorytmy ekspertyzy organizacji.
* **Optymalizacja Core Web Vitals (CWV) za pomocą `<NuxtImg>`:** 
  * Wdrożono moduł `@nuxt/image` do automatycznej konwersji zdjęć na format WebP/AVIF.
  * **Sekcja Hero (LCP):** Główny obrazek otrzymał atrybuty `fetchpriority="high"` oraz `preload`, co drastycznie skraca czas ładowania najważniejszego (największego) elementu na stronie.
  * **Sekcja Projektów (Below-the-fold):** Zdjęcia na osi czasu otrzymały atrybut `loading="lazy"`, dzięki czemu nie "kradną" transferu przy starcie strony.
* **Dostępność i Kontekst (A11y):** 
  * Wdrożono precyzyjne atrybuty `aria-label` (np. `"Zobacz szczegóły projektu X"` zamiast samego przycisku `"Szczegóły"` oraz dla interaktywnych kropek na osi czasu).
  * Dodano opisowe atrybuty `title` do głównych przycisków i linków.
  * Zmieniono nazwy hashy w URL (np. z `#projects` na `#nasze-projekty`), aby Google mogło wygenerować polskie *Sitelinks* (linki do sekcji pod głównym wynikiem wyszukiwania).
* **Infrastruktura Techniczna:**
  * Wdrożono moduły do automatycznego generowania `sitemap.xml` i `robots.txt` skrojone pod architekturę One-Pagera (z wykluczeniem ścieżek `/admin` i `/api`).

---

## 🚫 Odrzucone / Zmodyfikowane podejścia (Decyzje architektoniczne)
Podczas analizy pierwotnych propozycji wprowadziliśmy kluczowe korekty dostosowane do architektury One-Pagera:

1. **Odrzucenie "puchatego" `nuxt.config.ts`:**
   * *Dlaczego:* Zaproponowany początkowo config był przygotowany pod duży portal z wieloma podstronami. Deklarowanie w pre-renderze ścieżek, których fizycznie nie ma w folderze `pages`, doprowadziłoby do błędu budowania (Build Error).
   * *Rozwiązanie:* Skonfigurowano routing i sitemapę wyłącznie dla ścieżki głównej (`/`).
2. **Odrzucenie minifikacji `terser` w Vite:**
   * *Dlaczego:* Propozycja zmiany domyślnego minifikatora (esbuild) na `terser` wydłużyłaby czas budowania projektu. Przy stronie typu One-Pager zysk na wadze pliku (kilka KB) jest marginalny i nieadekwatny do kosztów optymalizacyjnych.
   * *Rozwiązanie:* Zrezygnowano z ingerencji w `vite.build.minify`.
3. **Zapobieganie kanibalizacji priorytetów obrazków (`fetchpriority="high"`):**
   * *Dlaczego:* Nadawanie priorytetu obrazkom na osi czasu zepsułoby czas ładowania (LCP) strony głównej, ponieważ przeglądarka próbowałaby pobrać wszystko naraz. Karta "VIP" może być przyznana tylko raz na stronę.
   * *Rozwiązanie:* Zastosowano priorytet tylko dla banera Hero, a reszcie wymuszono `loading="lazy"`.
4. **Centralizacja danych Schema.org (JSON-LD):**
   * *Dlaczego:* Rozbicie danych o organizacji na dwa osobne skrypty (adres vs filary) powoduje, że Google widzi dwie różne encje NGO na jednej stronie.
   * *Rozwiązanie:* Utworzono jeden, połączony obiekt `mergedOrganizationSchema` w głównym komponencie.
5. **Rozdzielenie kompetencji tagów Meta:**
   * *Dlaczego:* Umieszczanie `description` w `nuxt.config.ts` ORAZ w `pages/index.vue` prowadzi do duplikacji tagów.
   * *Rozwiązanie:* `nuxt.config.ts` trzyma tylko infrastrukturę. Cała treść SEO jest wstrzykiwana przez `useSeoMeta` w `pages/index.vue`.
6. **Brak `<meta name="keywords">`:**
   * *Dlaczego:* Jest to mechanizm przestarzały i zignorowany przez Google. Słowa kluczowe umieszczono w atrybucie `knowsAbout` w strukturze JSON-LD.
7. **Relatywne vs Absolutne ścieżki dla obrazków OG/Twitter:**
   * *Dlaczego:* Boty social mediów gubią się, gdy obrazek podany jest jako ścieżka relatywna (np. `/og-image.jpg`).
   * *Rozwiązanie:* Wymuszono stosowanie bezwzględnych adresów URL (z przedrostkiem `https://`).

---

## ⏳ Niezastosowane / Odłożone na później reguły
Elementy zaparkowane do wdrożenia w kolejnych fazach projektu:

* **Analityka i Śledzenie (GA4, Consent Mode, Zdarzenia CTA):**
  * Kod śledzący konwersję na stronie (Google Analytics 4, baner RODO, tracking kliknięć `@click`) został wstrzymany. Na ten moment priorytetem jest optymalizacja struktury i treści, analityka zostanie wpięta w następnym etapie.
* **Schemat ofert wolontariatu (`JobPosting`):** 
  * Odłożono wdrożenie JSON-LD z parametrem `"employmentType": "VOLUNTEER"` dla Google for Jobs.
* **Schemat Zespołu (`Person`):** 
  * Kod ze szczegółowymi profilami członków zespołu został odłożony na moment tworzenia pełnej podstrony `/o-nas`. 
* **Schemat Wydarzeń (`Event Markup`):**
  * Do wdrożenia, gdy organizacja będzie promować konkretne meetupy.

---

## 🗺️ Roadmapa SEO (Plan Naprawczy)

### 1. Architektura i Rendering
* [x] **Zlikwidować JAVASCRIPT-ONLY (SPA bez fallbacku)**
  * *Rozwiązanie:* Implementacja SSR w Nuxt (`ssr: true`).
* [x] **Skonfigurować Sitemapy i plik Robots.txt**
  * *Rozwiązanie:* Ustawienie globalnego adresu URL w obiekcie `site` oraz wykluczenie ścieżek `/api`, `/admin`.

### 2. Meta Dane i Social Media
* [x] **Uzupełnić brakujące Meta Tagi**
  * *Rozwiązanie:* Poprawne wdrożenie `useSeoMeta` w `pages/index.vue` z bezwzględnymi linkami do obrazków i zadeklarowanym formatem `twitterCard: 'summary_large_image'`.

```javascript
    useSeoMeta({
      title: 'Code for Poznań',
      description: 'Jesteśmy społecznością IT z Poznania. Tworzymy zaawansowane aplikacje i narzędzia wspierające organizacje pozarządowe. Dołącz do nas!',
      ogTitle: 'Code for Poznań',
      ogDescription: 'Budujemy otwarte narzędzia IT wspierające organizacje społeczne w ich codziennej pracy.',
      ogImage: '[https://codeforpoznan.pl/og-image.jpg](https://codeforpoznan.pl/og-image.jpg)', // Zastosowano bezwzględny URL
      ogUrl: '[https://codeforpoznan.pl](https://codeforpoznan.pl)',
      ogType: 'website',
      ogLocale: 'pl_PL',
      twitterCard: 'summary_large_image', 
      twitterImage: '[https://codeforpoznan.pl/twitter-image.jpg](https://codeforpoznan.pl/twitter-image.jpg)' // Zastosowano bezwzględny URL
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
  * *Rozwiązanie:* Wdrożenie modułu `@nuxt/image`, zastosowanie `fetchpriority="high"` dla Hero oraz `loading="lazy"` dla projektów poniżej linii zgięcia (below-the-fold).
* [x] **Dostosowanie Kotwic i Atrybutów do One-Pagera**
  * *Rozwiązanie:* Spolszczenie tagów nawigacyjnych (`#nasze-projekty`) w celu pozyskania Sitelinków oraz dodanie kontekstowych `aria-label` do przycisków interaktywnych.
* [ ] **Zbudować merytoryczne zaplecze strony**
  * [ ] *Do zrobienia:* Rozbudowa sekcji Blog / Case studies.

### 6. Tracking i Analityka (Nowość)
* [x] **Wdrożenie bezciasteczkowego śledzenia startowego**
  * *Rozwiązanie:* Instalacja GA4 poprzez `nuxt-gtag` ze statusem `initialConsent: false` – śledzenie czeka na wyraźną akcję użytkownika (zgoda w Cookie Bannerze).
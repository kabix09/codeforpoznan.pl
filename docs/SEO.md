# 📝 Notatka SEO: Code for Poznań (Vue + Nuxt)

## ✅ Zastosowane reguły i wdrożenia
W trakcie optymalizacji komponentów zastosowaliśmy następujące, nowoczesne standardy SEO:

* **Eliminacja czystego SPA (Server-Side Rendering):** 
  * Zalecono włączenie `ssr: true` w `nuxt.config.ts` oraz prerenderingu dla strony głównej (`routeRules: { '/': { prerender: true } }`), co zapewnia botom wyszukiwarek gotowy kod HTML.
* **Nowoczesne Structured Data (JSON-LD):** 
  * Całkowicie **zrezygnowaliśmy z przestarzałych atrybutów HTML** typu Microdata (`itemscope`, `itemprop`, `itemtype`).
  * Wdrożyliśmy komponent `<StructuredData :data="..." />`, który czysto wstrzykuje tagi `<script type="application/ld+json">`.
* **Implementacja schematu `NGO`:** 
  * Wskazaliśmy wyszukiwarkom dokładny typ organizacji (`@type: "NGO"`) oraz obszar działania (`areaServed: "Poznań"`).
* **Dynamiczne wiązanie danych (Data Binding dla SEO):** 
  * Połączyliśmy dane – użyliśmy tablicy z filarami działalności (`pillars`) do automatycznego wygenerowania pola `"knowsAbout"` w Schema.org, ucząc algorytmy ekspertyzy organizacji.
* **Optymalizacja Core Web Vitals i A11y:** 
  * Dodano atrybut `fetchpriority="high"` do kluczowego obrazka w sekcji Hero (poprawa wskaźnika LCP).
  * Dodano opisowe atrybuty `title` do przycisków i linków (lepsza dostępność i kontekst dla botów).
  * Zmieniono nazwy hashy w URL (np. z `#projects` na `#nasze-projekty`), aby Google mogło wygenerować polskie *Sitelinks* (linki do sekcji pod głównym wynikiem wyszukiwania).
* **Infrastruktura Techniczna i Analityka:**
  * Wdrożono moduły do automatycznego generowania `sitemap.xml` i `robots.txt` skrojone pod architekturę One-Pagera (z wykluczeniem ścieżek `/admin` i `/api`).
  * Podpięto Google Analytics 4 (moduł `nuxt-gtag`) z ustawieniem `initialConsent: false`, co zapewnia pełną zgodność z RODO i wymogami Consent Mode v2 w UE.

---

## 🚫 Odrzucone / Zmodyfikowane podejścia (Decyzje architektoniczne)
Podczas analizy pierwotnych propozycji wprowadziliśmy kluczowe korekty dostosowane do architektury One-Pagera:

1. **Odrzucenie "puchatego" `nuxt.config.ts`:**
   * *Dlaczego:* Zaproponowany początkowo config był przygotowany pod duży portal z wieloma podstronami. Deklarowanie w pre-renderze ścieżek takich jak `/blog` czy `/o-nas`, których fizycznie nie ma w folderze `pages`, doprowadziłoby do błędu budowania aplikacji (Build Error).
   * *Rozwiązanie:* Skonfigurowano routing i sitemapę wyłącznie dla ścieżki głównej (`/`).
2. **Centralizacja danych Schema.org (JSON-LD):**
   * *Dlaczego:* Rozbicie danych o organizacji na dwa osobne skrypty (jeden w `app.vue` z adresem, drugi w `SectionsAbout.vue` z filarami) powoduje, że Google widzi dwie różne encje NGO na jednej stronie, co tworzy konflikt.
   * *Rozwiązanie:* Utworzono jeden, połączony obiekt `mergedOrganizationSchema` w głównym komponencie, zawierający wszystkie dane.
3. **Rozdzielenie kompetencji tagów Meta:**
   * *Dlaczego:* Umieszczanie `description` i `og:image` w `nuxt.config.ts` ORAZ w `useSeoMeta` w pliku `index.vue` prowadzi do duplikacji tagów.
   * *Rozwiązanie:* `nuxt.config.ts` został wyczyszczony i zawiera tylko infrastrukturę (lang, charset, viewport, canonical, site config, ładowanie modułów). Cała treść SEO (Title, Description, OG) jest wstrzykiwana przez `useSeoMeta` bezpośrednio w `pages/index.vue`.
4. **Brak `<meta name="keywords">`:**
   * *Dlaczego:* Zrezygnowano z dodawania słów kluczowych do tagów meta, ponieważ jest to mechanizm przestarzały (zignorowany przez Google w 2009 r.). Słowa kluczowe zostały umieszczone w atrybucie `knowsAbout` w strukturze JSON-LD oraz w naturalnym tekście strony.
5. **Relatywne vs Absolutne ścieżki dla obrazków OG/Twitter:**
   * *Dlaczego:* Boty social mediów gubią się, gdy obrazek podany jest jako ścieżka relatywna (np. `/og-image.jpg`).
   * *Rozwiązanie:* Wymuszono stosowanie bezwzględnych adresów URL (z przedrostkiem `https://`) dla wszystkich grafik Open Graph i Twitter Cards.

---

## ⏳ Niezastosowane / Odłożone na później reguły
Elementy, o których rozmawialiśmy, ale zgodnie z decyzją zostały zaparkowane do wdrożenia w przyszłości:

* **Schemat ofert wolontariatu (`JobPosting`):** 
  * Odłożono wdrożenie JSON-LD z parametrem `"employmentType": "VOLUNTEER"`, który pozwala wyświetlać rekrutacje na wolontariuszy w specjalnym widżecie Google for Jobs.
* **Schemat Zespołu (`Person`):** 
  * Kod ze szczegółowymi profilami członków zespołu (linki do GitHub/LinkedIn, stanowiska) został odłożony na moment tworzenia docelowej, pełnej podstrony `/o-nas`. Na ten moment skupiono się na sekcji filarów na stronie głównej.
* **Schemat Wydarzeń (`Event Markup`):**
  * Zidentyfikowany w roadmapie, ale jeszcze nieprzygotowany w kodzie (do wdrożenia, gdy organizacja będzie promować konkretne meetupy/hackathony).

---

## 🗺️ Roadmapa SEO (Plan Naprawczy)
Poniższa lista bazuje na początkowym audycie stanu aplikacji i wyznacza kolejne kroki optymalizacyjne:

### 1. Architektura i Rendering
* [x] **Zlikwidować JAVASCRIPT-ONLY (SPA bez fallbacku)**
  * *Rozwiązanie:* Implementacja SSR w Nuxt (`ssr: true` w configu).
* [x] **Skonfigurować Sitemapy i plik Robots.txt**
  * *Rozwiązanie:* Ustawienie globalnego adresu w obiekcie `site` oraz precyzyjne reguły wykluczające obszary prywatne (`/api`, `/admin`).

### 2. Meta Dane i Social Media
* [x] **Uzupełnić brakujące Meta Tagi**
  * *Rozwiązanie:* Poprawne wdrożenie `useSeoMeta` w `pages/index.vue` z bezwzględnymi linkami do obrazków:
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
  * *Rozwiązanie:* Definicja `areaServed`, `addressLocality` i `addressRegion` w scentralizowanym JSON-LD. Wymagane jest spięcie strony z wizytówką GMB (Google My Business).

### 4. Dane Strukturalne (Structured Data)
* [x] **Wdrożyć kontekst dla botów (Schema.org)**
  * *Rozwiązanie:* Implementacja głównego schematu "NGO" + "LocalBusiness".
  * [ ] *Do zrobienia:* Event markup dla meetupów i hackathonów.
  * [ ] *Do zrobienia:* Team/people schema na docelowej podstronie `/o-nas`.

### 5. Architektura Treści (Content & Intent)
* [x] **Dostosowanie Kotwic (Anchors) do One-Pagera**
  * *Rozwiązanie:* Spolszczenie tagów nawigacyjnych (`#o-nas`, `#jak-dzialamy` itp.) w celu pozyskania Sitelinków.
* [ ] **Zbudować merytoryczne zaplecze strony**

### 6. Tracking i Analityka (Nowość)
* [x] **Wdrożenie bezciasteczkowego śledzenia startowego**
  * *Rozwiązanie:* Instalacja GA4 poprzez `nuxt-gtag` ze statusem `initialConsent: false` – śledzenie czeka na wyraźną akcję użytkownika (zgoda w Cookie Bannerze).
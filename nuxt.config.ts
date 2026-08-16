// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-08-15',
  ssr: true,
  routeRules: {
    '/': { prerender: true }
  },
  devtools: { enabled: true },
  colorMode: {
    classSuffix: '',
    preference: 'light', /* system */
    fallback: 'light'
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'canonical', href: 'https://codeforpoznan.pl' } 
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap', // Generuje sitemap.xml
    '@nuxtjs/robots',  // Generuje robots.txt
    'nuxt-gtag',       // Nowoczesny moduł GA4 dla Nuxt 3 (zamiast starego google-analytics)
    '@nuxt/image'      // Optymalizacja obrazków (konieczne jeśli masz obrazki)
  ],
  site: {
    url: 'https://codeforpoznan.pl',
    name: 'Code for Poznań' // Nuxt użyje tego jako fallbacku w wielu miejscach
  },
  // ==========================================
  // Konfiguracja GA4 (wymaga modułu 'nuxt-gtag')
  // ==========================================
  // gtag: {
  //   id: 'G-XXXXXXXXXX', // PODMIEŃ NA SWÓJ ID (zaczyna się od G-...)
  //   initialConsent: false // Bezpieczne RODO. Analytics czeka na zgodę z banera.
  // },
  sitemap: {
    // Dla One-Pagera domyślne ustawienia są świetne, moduł sam wygeneruje link do '/'
    // Dodajemy tylko wykluczenia, by boty nie indeksowały stref prywatnych
    exclude: [
      '/admin/**',
      '/api/**'
    ]
  },
  // ==========================================
  // Konfiguracja Robots.txt (wymaga modułu '@nuxtjs/robots')
  // ==========================================
  robots: {
    // Pozwalamy wszystkim (UserAgent: *) wchodzić na stronę główną, blokujemy resztę
    groups: [
      {
        userAgent: '*',
        disallow: ['/admin', '/api'],
        allow: '/'
      }
    ]
  },
  // ==========================================
  // Image Optimization (critical for CWV)
  // ==========================================
  image: {
    // Automatyczna konwersja do nowoczesnych formatów
    format: ['webp', 'avif', 'jpg'],
    // Konfiguracja dla zewnętrznych obrazków (jeśli ciągniecie np. zdjęcia z GitHuba lub Unsplash)
    domains: [
      'images.unsplash.com', // Skoro używasz unsplash w swoim sekcji Hero, to musi tu być!
      'avatars.githubusercontent.com' // Przydatne, gdy w sekcji 'O nas' dacie awatary z GitHuba
    ]
  },
})

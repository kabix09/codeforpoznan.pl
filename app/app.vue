<script setup>
import '@fontsource/plus-jakarta-sans/800.css'
import '@fontsource/plus-jakarta-sans/700.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/jetbrains-mono/400.css'

import { useHead, useSeoMeta } from '#imports'
import pillars from '~/constants/pilars'

const mergedOrganizationSchema = computed(() => JSON.stringify({
  "@context": "https://schema.org",
  "@type": ["NGO", "LocalBusiness"],
  "name": "Code for Poznań",
  "url": "https://codeforpoznan.pl",
  "logo": "https://codeforpoznan.pl/logo.png",
  "description": "Jesteśmy grupą wolontariuszy, która tworzy otwarte narzędzia dla organizacji społecznych. Działamy jako organizacja non-profit zrzeszająca specjalistów IT.",
  // "slogan": "Wolontariat IT - budujemy cyfrowe rozwiązania dla Poznania",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Poznań",
    "addressRegion": "Wielkopolskie",
    "addressCountry": "PL"
  },
  "areaServed": [
    { "@type": "City", "name": "Poznań" },
    { "@type": "Region", "name": "Wielkopolska" }
  ],
  "sameAs": [
    "https://github.com/CodeForPoznan/",
    "https://www.facebook.com/CodeForPL",
    "https://linkedin.com/company/codeforpoznan"
  ],
  "keywords": "wolontariat IT, civic tech, programowanie, projekty open source, pomoc NGO",
  // Łączymy ręczne słowa kluczowe z dynamicznymi filarami
  "knowsAbout": [
    "IT", "Wolontariat", "Civic Tech", "Open Source", 
    ...pillars.map(p => p.title)
  ]
}));

useHead({
  htmlAttrs: { lang: 'pl' },
  script: [
    {
      type: 'application/ld+json',
      children: mergedOrganizationSchema
    }
  ]
})


useSeoMeta({
  title: 'Code for Poznań',
  description: 'Jesteśmy grupą wolontariuszy, która tworzy otwarte narzędzia dla organizacji społecznych. Działamy jako organizacja non-profit zrzeszająca specjalistów IT.',

  // Open Graph (Facebooku, Slacku, Discordzie)
  ogTitle: 'Code for Poznań',
  ogDescription: 'Budujemy otwarte narzędzia IT wspierające organizacje społeczne w ich codziennej pracy.',
  ogImage: 'https://codeforpoznan.pl/og-image.jpg', // TODO Image 1200x630px
  ogUrl: 'https://codeforpoznan.pl',
  ogType: 'website',
  ogLocale: 'pl_PL',
  
  // Twitter / X
  twitterCard: 'summary_large_image',
  twitterImage: 'https://codeforpoznan.pl/twitter-image.jpg', // TODO Image 1200x600px
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
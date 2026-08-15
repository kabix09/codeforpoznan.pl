<script setup lang="ts">
import { computed } from "vue";

const statusConfig: Record<string, { dot: string; cls: string }> = {
  Aktywny:   { dot: "bg-[#1AA7F0]",    cls: "text-[#0D1B2A]" },
  Beta:      { dot: "bg-[#7A8A96]",    cls: "text-[#7A8A96]" },
  Planowany: { dot: "bg-[#E4E2DC]",    cls: "text-[#7A8A96]" },
};

// Define props
const projectImages = [
  "https://images.unsplash.com/photo-1513061379709-ef0cd1695189?w=400&h=220&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1644329770639-1a20809b82a3?w=400&h=220&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=220&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=220&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1712333423902-4c19b21ead6c?w=400&h=220&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1681949103006-70066fb25dfe?w=400&h=220&fit=crop&auto=format",
];

const projects = [
  {
    id: "01",
    name: "Radni Poznania",
    location: "Rada Miasta Poznania",
    date: "Mar 2021",
    desc: "Śledzenie aktywności radnych miejskich, głosowań i projektów uchwał. Przejrzyste dane o frekwencji i komisjach.",
    longDesc:
      "Przejrzysta baza danych o działalności Rady Miasta Poznania: lista radnych, historia głosowań, projekty uchwał, frekwencja, przynależność do komisji. Dane pobierane automatycznie i prezentowane w czytelny sposób.",
    tags: ["Vue.js", "Scraping", "Open Data"],
    status: "Beta",
    link: "https://github.com/CodeForPoznan",
  },
  {
    id: "02",
    name: "Dostępny Poznań",
    location: "Budynki użyteczności publicznej",
    date: "Sep 2022",
    desc: "Mapowanie dostępności obiektów publicznych dla osób z niepełnosprawnościami. Dane zbierane przez wolontariuszy.",
    longDesc:
      "Aplikacja mobilna i webowa umożliwiająca ocenę dostępności obiektów — wind, podjazdów, toalet, oznaczeń w Braille'u. Dane gromadzone przez wolontariuszy i weryfikowane przez organizacje pozarządowe.",
    tags: ["React Native", "Firebase", "Crowdsourcing"],
    status: "Aktywny",
    link: "https://github.com/CodeForPoznan",
  },
  {
    id: "03",
    name: "Jakość Powietrza",
    location: "Sieć czujników, Poznań",
    date: "Feb 2022",
    desc: "Monitoring danych o jakości powietrza z czujników w całym mieście — PM2.5, PM10, NO₂ w czasie rzeczywistym.",
    longDesc:
      "Integracja danych z czujników GIOŚ, WIOŚ i prywatnych stacji pomiarowych w jedno spójne API. Dashboard pokazuje aktualne poziomy PM2.5, PM10, NO₂ i alerty smogowe. Dane historyczne dostępne do pobrania.",
    tags: ["IoT", "Node.js", "Charts"],
    status: "Beta",
    link: "https://github.com/CodeForPoznan",
  },
  {
    id: "04",
    name: "Budżet Obywatelski",
    location: "Urząd Miasta Poznania",
    date: "Jun 2023",
    desc: "Wizualizacja danych z poznańskiego budżetu obywatelskiego. Sprawdź co i gdzie zostało zrealizowane.",
    longDesc:
      "Narzędzie do eksploracji danych budżetu obywatelskiego Poznania na przestrzeni lat. Interaktywna mapa i wykresy pozwalają zobaczyć, które projekty zdobyły największe wsparcie mieszkańców.",
    tags: ["React", "D3.js", "Open Data"],
    status: "Aktywny",
    link: "https://github.com/CodeForPoznan",
  },
  {
    id: "05",
    name: "Mapa Zieleni",
    location: "Parki i skwery, Poznań",
    date: "Nov 2023",
    desc: "Interaktywna mapa terenów zielonych — parków, skwerów i ogrodów. Zgłaszaj brakujące miejsca.",
    longDesc:
      "Projekt crowdsourcingowy pozwalający mieszkańcom zgłaszać brakujące tereny zielone, oceniać stan istniejących parków i wspomagać planowanie przestrzenne. Dane udostępniane otwarcie.",
    tags: ["Python", "Leaflet", "GIS"],
    status: "Aktywny",
    link: "https://github.com/CodeForPoznan",
  },
  {
    id: "06",
    name: "Otwarte Przetargi",
    location: "BIP Poznań",
    date: "Jan 2024",
    desc: "Parser i wyszukiwarka przetargów miejskich. Powiadomienia mailowe, API REST i pełnotekstowe przeszukiwanie.",
    longDesc:
      "Automatyczny scraper pobierający dane z BIP Poznania i portalu zamówień publicznych. Wyszukiwarka pełnotekstowa, powiadomienia mailowe na nowe przetargi z wybranych kategorii, API REST dla deweloperów.",
    tags: ["Scrapy", "PostgreSQL", "FastAPI"],
    status: "Planowany",
    link: "https://github.com/CodeForPoznan",
  },
];


type Project = (typeof projects)[0];

const props = defineProps<{
  project: Project;
  img: string;
}>();

// Define emits (equivalent to onOpen callback)
const emit = defineEmits<{
  (e: "open"): void;
}>();

const sc = computed(() => statusConfig[props.project.status]);
</script>

<template>
  <div
    @click="emit('open')"
    class="group bg-background border border-border overflow-hidden hover:shadow-md hover:shadow-[#0D1B2A]/6 hover:-translate-y-0.5 transition-all cursor-pointer w-full"
    :style="{ minHeight: '300px' }"
  >
    <!-- Image -->
    <div class="h-36 overflow-hidden bg-white">
      <img
        :src="img"
        :alt="project.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <!-- Content -->
    <div class="p-4">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-1.5">
          <span :class="['w-1.5 h-1.5 rounded-full', sc?.dot]" />
          <span :class="['font-body', 'text-xs', sc?.cls]">{{ project?.status }}</span>
        </div>
        <span class="font-mono text-muted-foreground text-[10px]">{{ project.id }}</span>
      </div>

      <h3
        class="font-display font-bold text-foreground text-base mb-1.5 group-hover:text-primary transition-colors leading-tight"
      >
        {{ project.name }}
      </h3>
      <p class="font-body text-muted-foreground text-xs mb-4 leading-relaxed line-clamp-2">
        {{ project.desc }}
      </p>

      <button
        :style="{ fontWeight: 600 }"
        class="font-display inline-flex items-center gap-1 text-xs text-foreground hover:text-primary transition-colors"
        @click.stop="emit('open')"
      >
        Szczegóły <ArrowUpRight :size="11" />
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useTracking } from '~/composables/useTracking'

const { trackJoin, trackProjectsScroll } = useTracking()

const stats = [
  { n: "8+", label: "Wolontariuszy" },
  { n: "5+", label: "Projektów" },
  { n: "10+", label: "Lat działania" },
];
</script>

<template>        
    <header role="banner" class="relative pt-20 pb-16 bg-surface-light overflow-hidden font-sans">
        
        <!-- Duży, asymetryczny blok w jasnoszarym kolorze (odrywa biały od bieli) -->
        <div class="absolute inset-y-0 right-0 w-full lg:w-[48%] bg-text-main rounded-tl-[80px] rounded-bl-[40px] hidden lg:block"></div>

        <div class="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[85vh]">
            
            <!-- Lewa kolumna: Treść wielokolorowa -->
            <div class="lg:col-span-6 flex flex-col justify-center py-10">            

                <div class="font-mono text-text-muted text-xs uppercase tracking-[0.2em]">
                    Civic Tech · Poznań · Open Source
                </div>
                <h1 class="text-text-main text-5xl lg:text-[4.5rem] font-extrabold leading-[1.05] mb-6 tracking-tight">
                    Code For <br />
                    <span class="text-primary">Poznan</span>
                </h1>

                <p class="text-text-muted text-lg lg:text-xl leading-relaxed mb-10 max-w-lg font-medium">
                    Jesteśmy społecznością programistów, designerów i testerów, którzy budują otwarte narzędzia wspierające organizacje społeczne w codziennej pracy.
                </p>

                <!-- Przyciski z mocnym rozróżnieniem (Niebieski vs Grafitowy) -->
                <div class="flex flex-wrap items-center gap-4 mb-14">
                    <a
                        href="#dolacz-do-nas"
                        @click="trackJoin('Hero_Button')"
                        class="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-hover transition-all duration-300 shadow-lg shadow-primary/30 hover:-translate-y-1"
                        :style="{ transform: 'scaleY(0.9)' }"
                    >
                        Dołącz do nas
                    </a>
                    <!-- Drugi przycisk w kolorze grafitu, nawiązujący do wagi wizualnej z Twojego zrzutu (przycisk "TuMatura") -->
                    <a
                        href="#nasze-projekty"
                        @click="trackProjectsScroll"
                        class="inline-flex items-center justify-center bg-surface-light border border-border-subtle text-text-main px-8 py-4 rounded-xl font-bold hover:bg-surface-mid transition-all duration-300 shadow-md hover:-translate-y-1"
                        :style="{ transform: 'scaleY(0.9)' }"
                    >
                        Nasze projekty
                    </a>
                </div>
            </div>
            
            <!-- Prawa kolumna: Złożona kompozycja wizualna -->
            <div class="lg:col-span-6 relative mt-10 lg:mt-0 hidden lg:block">
                
                <!-- Główny kontener zdjęcia z ciepłym, żółto-pomarańczowym akcentem pod spodem -->
                <div class="relative z-10 w-full h-[580px]">
                    <!-- Ciepły, przesunięty kształt w tle nadający charakteru -->
                    <div class="absolute -top-4 -right-4 w-full h-full border-2 border-accent rounded-3xl z-0"></div>
                    
                    <div class="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl z-10 bg-white">
                        <NuxtImg fetchpriority="high" preload="true"
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=900&fit=crop&auto=format"
                            alt="Zespół Code for Poznań podczas pracy"
                            class="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <!-- Pływająca karta oparta o wielokolorowość i hierarchię szarości -->
                <!-- stały kolor dla obramwoania  -->
                <div class="absolute -bottom-10 -left-16 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xl z-20 w-[90%] max-w-[400px]">
                    <div class="flex justify-between items-center divide-x divide-[#E2E8F0]">
                        <div v-for="s in stats" :key="s.label" class="px-4 w-full text-center">
                            <div class="text-3xl font-extrabold text-text-kpi mb-0.5">
                                {{ s.n }}
                            </div>  
                            <div class="text-[10px] uppercase tracking-wider text-text-light font-bold">
                                {{ s.label }}
                            </div>
                        </div>
                    </div>
                    <!-- Pasek postępu / ozdobnik na dole karty wykorzystujący akcent -->
                    <div class="h-1 w-full bg-surface-mid rounded-full mt-5 overflow-hidden">
                        <div class="h-full bg-accent w-1/3 rounded-full"></div>
                    </div>
                </div>

            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight, Link2 } from "@lucide/vue";
import TimelinePopup from '~/components/layout/TimelinePopup.vue'

// Importy Swiper Vue
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import projects from '~/constants/projects'
import type Project from '~/types/projects'
import { useTracking } from '~/composables/useTracking'

const { trackProjectsScroll, trackGithub, trackProjectOpen } = useTracking()

const active = ref<Project | null>(null);
const swiperInstance = ref<any>(null);

// Przechwycenie instancji Swipera, aby obsługiwać własne przyciski strzałek
const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper;
};

const handleOpenProject = (p: Project) => {
  active.value = p
  trackProjectOpen(p.name)
}
</script>

<style scoped>
/* Dodatkowy styl dla kropek paginacji (aby pasowały do Twojego designu) */
:deep(.swiper-pagination-bullet) {
  background-color: #bcbac3;
  opacity: 0.5;
}
:deep(.swiper-pagination-bullet-active) {
  background-color: var(--primary); /* Kolor primary z Twojego wzoru */
  opacity: 1;
}
</style>

<template>
  <section id="nasze-projekty" class="bg-surface-light py-12 lg:py-24 lg:pb-12 overflow-hidden">
    
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
      <div>
        <!-- <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft w-fit mb-6">
            <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span class="text-primary font-bold text-xs uppercase tracking-widest">Projekty</span>
        </div> -->
        <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-text-main tracking-tight leading-tight">
          Nasze portfolio
        </h2>
      </div>

      <div class="flex items-center gap-4 z-10 relative">
        <!-- Strzałki sterujące Swiperem -->
        <button
          @click="swiperInstance?.slidePrev()"
          aria-label="Przewiń projekty w lewo"
          class="w-12 h-12 rounded-xl border-2 border-border-subtle  bg-button-arrow flex items-center justify-center text-text-light hover:border-primary hover:text-primary transition-all shadow-sm"
        >
          <ChevronLeft :size="20" />
        </button>
        <button
          @click="swiperInstance?.slideNext()"
          aria-label="Przewiń projekty w prawo"
          class="w-12 h-12 rounded-xl border-2 border-border-subtle  bg-button-arrow flex items-center justify-center text-text-light hover:border-primary hover:text-primary transition-all shadow-sm"
        >
          <ChevronRight :size="20" />
        </button>
        
        <!-- Kontener: Napis + pasek postępu -->
        <div class="flex flex-col ml-2">
          <!-- Napis + Strzałka -->
          <a
            href="https://github.com/CodeForPoznan"
            target="_blank"
            rel="noopener noreferrer"
            @click="trackGithub('all_projects_link')"
            class="font-display font-bold flex items-center gap-2 text-text-main text-sm hover:text-primary transition-colors"
          >
            Wszystkie na GitHub <ArrowUpRight :size="16" />
          </a>
          
          <!-- Pasek postępu / ozdobnik -->
          <div class="h-1 w-full bg-surface-mid rounded-full mt-1.5 overflow-hidden">
            <div class="h-full bg-accent w-3/4 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Swiper 3D Coverflow -->
    <div class="w-full">
      <Swiper
        :modules="[EffectCoverflow, Pagination]"
        effect="coverflow"
        :grabCursor="true"
        :centeredSlides="true"
        :slidesPerView="'auto'"
        :initialSlide="Math.floor(projects.length / 2)"
        :coverflowEffect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }"
        :pagination="{ clickable: true }"
        @swiper="onSwiper"
        @slideChange="trackProjectsScroll"
        class="w-full pb-16 pt-4 px-4"
      >
        <!-- Karta Projektu -->
        <SwiperSlide 
          v-for="p in projects" 
          :key="p.id" 
          class="max-w-[350px] w-full mb-16"
        >
          <div class="bg-surface-light rounded-md h-[500px] p-5 text-center flex flex-col border border-border-subtle shadow-2xl">
            
            <!-- Obrazek z overlayem (efekt z ikonką na hover) -->
            <div class="relative inline-block mx-auto mb-4 group overflow-hidden rounded cursor-pointer" @click="handleOpenProject(p)">
              <img :src="p.image" :alt="p.name" class="w-full h-40 object-cover rounded transition-transform duration-500 group-hover:scale-110">
              <div class="absolute inset-0 bg-[#211b46]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link2 class="text-white w-12 h-12" />
              </div>
            </div>

            <!-- Tytuł -->
            <h4 class="text-text-main font-bold text-xl mb-1">
              {{ p.name }}
            </h4>
            
            <!-- Rok i Technologie (Dostosuj pola do swojego interfejsu Project) -->
            <h6 class="text-text-muted text-sm mb-4">
              {{ p.date }} | {{ p.tech || 'Technologie' }}
            </h6>
            
            <!-- Opis -->
            <p class="text-text-muted text-sm line-clamp-5 mb-auto">
              {{ p.description }}
            </p>

            <!-- Przycisk View -->
            <button 
              @click="handleOpenProject(p)"
              class="mt-4 mx-auto flex items-center justify-center gap-2 border border-border-subtle text-text-main hover:bg-surface-mid transition-colors py-2 px-6 rounded-md font-medium text-sm transition-all duration-300 shadow-md"
            >
              Wyświetl <Link2 class="w-4 h-4" />
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <TimelinePopup :project="active" @close="active = null" />
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { X, ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight } from "@lucide/vue";
import TimelineCard from '~/components/layout/TimelineCard.vue'
import TimelinePopup from '~/components/layout/TimelinePopup.vue'

import projects from '~/constants/projects'
import type Project from '~/types/projects'

import { useTracking } from '~/composables/useTracking'

const { trackProjectsScroll, trackGithub, trackProjectOpen } = useTracking()

// Definicje typów i danych (zakładając, że projects i projectImages są zaimportowane)
const active = ref<Project | null>(null);

const CARD_W = 300;
const CARD_GAP = 32;
const STEP = CARD_W + CARD_GAP;

const scrollRef = ref<HTMLElement | null>(null);

const scroll = (dir: "left" | "right") => {
  if (!scrollRef.value) return;
  scrollRef.value.scrollBy({
    left: dir === "right" ? STEP * 2 : -STEP * 2,
    behavior: "smooth",
  });

  trackProjectsScroll();
};

const handleOpenProject = (p: Project) => {
  active.value = p
  trackProjectOpen(p.name)
}
</script>

<style>
.hide-scroll::-webkit-scrollbar {
  display: none;
}
</style>

<!-- (Twój <script setup> z logiką suwaka zostaje) -->
<template>
  <section id="nasze-projekty" class="bg-base py-24 lg:py-32 border-t border-border-subtle">
    
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
      <div>
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft w-fit mb-6">
            <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span class="text-primary font-bold text-xs uppercase tracking-widest">Projekty</span>
        </div>
        <h2 class="font-display font-extrabold text-4xl lg:text-5xl text-text-main tracking-tight leading-tight">
          Co budujemy
        </h2>
      </div>

      <div class="flex items-center gap-4">
        <!-- Strzałki zaktualizowane na nową kolorystykę -->
        <button
          @click="scroll('left')"
          aria-label="Przewiń projekty w lewo"
          class="w-12 h-12 rounded-xl border-2 border-border-subtle bg-white flex items-center justify-center text-text-light hover:border-primary hover:text-primary transition-all shadow-sm"
        >
          <ChevronLeft :size="20" />
        </button>
        <button
          @click="scroll('right')"
          aria-label="Przewiń projekty w prawo"
          class="w-12 h-12 rounded-xl border-2 border-border-subtle bg-white flex items-center justify-center text-text-light hover:border-primary hover:text-primary transition-all shadow-sm"
        >
          <ChevronRight :size="20" />
        </button>
        <a
          href="https://github.com/CodeForPoznan"
          target="_blank"
          rel="noopener noreferrer"
          @click="trackGithub('all_projects_link')"
          class="font-display font-bold flex items-center gap-2 text-text-main text-sm hover:text-primary ml-2 transition-colors"
        >
          Wszystkie na GitHub <ArrowUpRight :size="16" />
        </a>
      </div>
    </div>

    <!-- Oś czasu -->
    <div ref="scrollRef" class="overflow-x-auto pb-10 hide-scroll" :style="{ scrollbarWidth: 'none', msOverflowStyle: 'none' }">
        <div class="relative inline-flex flex-col" :style="{ minWidth: `${projects.length * STEP + 96}px`, paddingLeft: '48px', paddingRight: '48px' }">
            
            <!-- Górne karty -->
            <div class="flex" :style="{ gap: `${CARD_GAP}px` }">
                <div v-for="(p, i) in projects" :key="p.id" :style="{ width: `${CARD_W}px`, flexShrink: 0 }" class="flex flex-col items-center">
                    <TimelineCard v-if="i % 2 === 0" :project="p" :img="p.image" @open="handleOpenProject(p)" />
                    <div v-else :style="{ height: '300px' }" />
                    <div :class="['w-[2px] mt-3 rounded-full', i % 2 === 0 ? 'bg-primary/30' : 'bg-transparent']" :style="{ height: '28px' }" />
                </div>
            </div>

            <!-- Oś pozioma -->
            <div class="relative flex items-center" :style="{ height: '28px' }">
                <div class="absolute inset-y-1/2 left-0 right-0 h-[2px] bg-border-subtle rounded-full" />
                <div class="relative flex w-full" :style="{ gap: `${CARD_GAP}px` }">
                    <div v-for="p in projects" :key="p.id" :style="{ width: `${CARD_W}px`, flexShrink: 0 }" class="flex flex-col items-center relative">
                        <button
                            @click="handleOpenProject(p)"
                            class="w-5 h-5 rounded-full border-[3px] border-primary bg-white hover:bg-primary hover:scale-125 transition-all relative z-10 flex-shrink-0 shadow-md shadow-primary/30"
                        />
                        <span class="font-mono absolute top-7 text-text-muted font-bold text-[11px] whitespace-nowrap left-1/2 -translate-x-1/2">
                            {{ p.date }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Dolne karty -->
            <div class="flex" :style="{ gap: `${CARD_GAP}px` }">
                <div v-for="(p, i) in projects" :key="p.id" :style="{ width: `${CARD_W}px`, flexShrink: 0 }" class="flex flex-col items-center">
                    <div :class="['w-[2px] mb-3 rounded-full', i % 2 !== 0 ? 'bg-primary/30' : 'bg-transparent']" :style="{ height: '28px' }" />
                    <TimelineCard v-if="i % 2 !== 0" :project="p" :img="p.image" @open="handleOpenProject(p)" />
                    <div v-else :style="{ height: '300px' }" />
                </div>
            </div>
            
        </div>
    </div>

    <TimelinePopup :project="active" @close="active = null" />
  </section>
</template>
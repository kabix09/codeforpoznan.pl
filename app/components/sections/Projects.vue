<script setup lang="ts">
import { ref } from 'vue'
import { X, ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight } from "@lucide/vue";
import TimelineCard from '~/components/layout/TimelineCard.vue'

import projects from '~/constants/projects'
import type Project from '~/types/projects'

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
};
</script>

<style>
.hide-scroll::-webkit-scrollbar {
  display: none;
}
</style>

<template>
  <section id="projects" class="bg-secondary py-24 lg:py-24 border-t border-border">
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
      <div>
        <p class="text-lg font-body font-semibold leading-8 text-primary">
            <!-- font-mono text-[#7A8A96] text-xs uppercase tracking-[0.2em] mb-4 -->
          Projekty
        </p>
        <h2
          style="font-weight: 800; line-height: 1.08; letter-spacing: -0.03em;"
          class="font-display text-4xl lg:text-5xl text-foreground"
        >
          Co budujemy
        </h2>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="scroll('left')"
          aria-label="Poprzedni"
          class="w-10 h-10 border border-[#E4E2DC] bg-white flex items-center justify-center text-[#7A8A96] hover:border-[#0D1B2A] hover:text-[#0D1B2A] transition-all"
        >
          <ChevronLeft :size="18" />
        </button>
        <button
          @click="scroll('right')"
          aria-label="Następny"
          class="w-10 h-10 border border-[#E4E2DC] bg-white flex items-center justify-center text-[#7A8A96] hover:border-[#0D1B2A] hover:text-[#0D1B2A] transition-all"
        >
          <ChevronRight :size="18" />
        </button>
        <a
          href="https://github.com/CodeForPoznan"
          target="_blank"
          rel="noopener noreferrer"
          style="font-weight: 600;"
          class="font-display flex items-center gap-1.5 text-foreground text-sm hover:text-primary transition-colors"
        >
          Wszystkie na GitHub <ArrowUpRight :size="14" />
        </a>
      </div>
    </div>

    <!-- ── Horizontal timeline ── -->
    <div
        ref="scrollRef"
        class="overflow-x-auto pb-10"
        :style="{ scrollbarWidth: 'none', msOverflowStyle: 'none' }"
    >
    <div
        class="relative inline-flex flex-col hide-scroll"
        :style="{
            minWidth: `${projects.length * STEP + 96}px`,
            paddingLeft: '48px',
            paddingRight: '48px',
        }"
    >
        <!-- Top cards (even) -->
        <div class="flex" :style="{ gap: `${CARD_GAP}px` }">
        <div
            v-for="(p, i) in projects"
            :key="p.id"
            :style="{ width: `${CARD_W}px`, flexShrink: 0 }"
            class="flex flex-col items-center"
        >
            <TimelineCard
                v-if="i % 2 === 0"
                :project="p"
                :img="p.image"
                @open="active = p"
            />
            <div v-else :style="{ height: '300px' }" />
            <div
                :class="['w-px mt-3', i % 2 === 0 ? 'bg-[#1AA7F0]/30' : 'bg-transparent']"
                :style="{ height: '28px' }"
            />
        </div>
        </div>

        <!-- Axis -->
        <div class="relative flex items-center" :style="{ height: '28px' }">
        <div class="absolute inset-y-1/2 left-0 right-0 h-px bg-[#E4E2DC]" />
        <div class="relative flex w-full" :style="{ gap: `${CARD_GAP}px` }">
            <div
                v-for="p in projects"
                :key="p.id"
                :style="{ width: `${CARD_W}px`, flexShrink: 0 }"
                class="flex flex-col items-center relative"
            >
            <button
                @click="active = p"
                class="w-4 h-4 rounded-full border-2 border-[#1AA7F0] bg-white hover:bg-[#F7F6F3] transition-colors relative z-10 flex-shrink-0 shadow-sm shadow-[#1AA7F0]/20"
                :aria-label="p.name"
            />
            <span
                class="font-mono absolute top-5 text-[#1AA7F0] text-[10px] whitespace-nowrap left-1/2 -translate-x-1/2"
            >
                {{ p.date }}
            </span>
            </div>
        </div>
        </div>

        <!-- Bottom cards (odd) -->
        <div class="flex" :style="{ gap: `${CARD_GAP}px` }">
        <div
            v-for="(p, i) in projects"
            :key="p.id"
            :style="{ width: `${CARD_W}px`, flexShrink: 0 }"
            class="flex flex-col items-center"
        >
            <div
                :class="['w-px mb-3', i % 2 !== 0 ? 'bg-[#1AA7F0]/30' : 'bg-transparent']"
                :style="{ height: '28px' }"
            />
            <TimelineCard
                v-if="i % 2 !== 0"
                :project="p"
                :img="p.image"
                @open="active = p"
            />
            <div v-else :style="{ height: '300px' }" />
        </div>
        </div>
    </div>
    </div>
  </section>
</template>
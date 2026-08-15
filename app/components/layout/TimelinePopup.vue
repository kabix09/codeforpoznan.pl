<script setup lang="ts">
import { X } from "lucide-vue-next";
import type Project from '~/types/projects';

defineProps<{
  project: Project | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="project" 
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
        @click="emit('close')"
      >
        <div 
          class="bg-secondary rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative border border-border"
          @click.stop
        >
          <button 
            @click="emit('close')"
            class="absolute top-4 right-4 p-2 bg-secondary rounded-full text-muted-foreground hover:text-[#0D1B2A] hover:bg-border transition-colors z-10 cursor-pointer"
          >
            <X :size="20" />
          </button>

          <div class="h-64 sm:h-72 w-full bg-white">
            <img :src="project.image" :alt="project.name" class="w-full h-full object-cover" />
          </div>

          <div class="p-6 sm:p-8">
            <h2 class="font-display text-3xl font-bold text-primary mb-4">{{ project.name }}</h2>
            <p class="font-body text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">{{ project.longDesc }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
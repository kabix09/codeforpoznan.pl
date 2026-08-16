<script setup lang="ts">
import { computed } from "vue";
import type Project from '~/types/projects'
import projects from '~/constants/projects'

const statusConfig: Record<string, { dot: string; cls: string }> = {
  Aktywny:   { dot: "bg-[#1AA7F0]",    cls: "text-[#0D1B2A]" },
  Beta:      { dot: "bg-[#7A8A96]",    cls: "text-[#7A8A96]" },
  Planowany: { dot: "bg-[#E4E2DC]",    cls: "text-[#7A8A96]" },
};

const props = defineProps<{
  project: Project;
  img: string;
}>();

// Define emits (equivalent to onOpen callback)
const emit = defineEmits<{
  (e: "open"): void;
}>();

const sc = computed(() => {
  const status = props.project.status
  return status ? statusConfig[status] : undefined
});
</script>

<template>
  <div
    @click="emit('open')"
    class="group bg-background border border-border overflow-hidden hover:shadow-md hover:shadow-[#0D1B2A]/6 hover:-translate-y-0.5 transition-all cursor-pointer w-full"
    :style="{ minHeight: '300px' }"
  >
    <!-- Image -->
    <div class="h-36 overflow-hidden bg-white">
      <NuxtImg
        loading="lazy"
        :src="img"
        :alt="`Projekt Code for Poznań: ${project.name}`"
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
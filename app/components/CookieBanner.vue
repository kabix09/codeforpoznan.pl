<template>
  <div v-if="!isAnswered" class="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50 shadow-2xl">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="text-sm text-muted-foreground">
        <strong class="text-foreground">Szanujemy Twoją prywatność.</strong> Używamy analityki tylko do mierzenia ruchu, bez śledzenia danych osobowych (RODO / Consent Mode).
      </div>
      <div class="flex gap-3 shrink-0">
        <button @click="reject" class="px-4 py-2 text-sm border border-border rounded-md hover:bg-secondary transition-colors">
          Tylko niezbędne
        </button>
        <button @click="accept" class="px-4 py-2 text-sm bg-primary text-white font-bold rounded-md hover:opacity-90 transition-opacity">
          Akceptuję
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const { gtag } = useGtag()

const isAnswered = ref(true)

onMounted(() => {
  if (!localStorage.getItem('cookie-consent')) {
    isAnswered.value = false
  }
})

const accept = () => {
  gtag('consent', 'update', {
    analytics_storage: 'granted',
  })
  localStorage.setItem('cookie-consent', 'accepted')
  isAnswered.value = true
}

const reject = () => {
  localStorage.setItem('cookie-consent', 'rejected')
  isAnswered.value = true
}
</script>
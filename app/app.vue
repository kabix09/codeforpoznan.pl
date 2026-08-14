<script setup>
import '@fontsource/plus-jakarta-sans/800.css'; // Waga 800 dla nagłówków
import '@fontsource/plus-jakarta-sans/700.css'; 
import '@fontsource/dm-sans/400.css';         // Waga 400 dla tekstu
import '@fontsource/dm-sans/500.css';
import '@fontsource/jetbrains-mono/400.css';  // Mono
</script>

<template >
  <div class="min-h-screen w-full bg-background overflow-x-hidden">
    <LayoutNavbar/>
    <SectionsHero/>
    <SectionsAbout/>
  </div>
</template>
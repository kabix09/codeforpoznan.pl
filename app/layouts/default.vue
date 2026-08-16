<script setup lang="ts">
import CookieBanner from '~/components/CookieBanner.vue';

</script>

<template>
  <div class="min-h-screen w-full bg-background overflow-x-hidden">
    <LayoutNavbar />
    <slot />
    <LayoutFooter />

    <CookieBanner />
  </div>
</template>
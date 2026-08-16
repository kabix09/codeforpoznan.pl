<script setup>
import { ref } from 'vue'
import { Menu, X,} from '@lucide/vue'
import { useTracking } from '~/composables/useTracking'

const { trackJoin } = useTracking()

const navLinks = [
  { label: 'Strona główna', href: '#' },
  { href: "#o-nas", label: "O nas" },
  { href: "#jak-dzialamy", label: "Jak działamy" },
  { href: "#nasze-projekty", label: "Projekty" },
  { href: '#wolontariat', label: 'Kontakt' },
]

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
}

const closeMenu = () => {
  isOpen.value = false
}

</script>

<template>
    <header class="bg-muted-foreground">
        <nav class="fixed top-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-md border-b border-border">
            <!-- Główny pasek nawigacji -->
            <div class="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
            
                <NuxtLink to="/" class="flex items-center gap-2.5">
                    <div class="w-7 h-7 bg-primary flex items-center justify-center">
                        <span :style="{ fontWeight: 800 }" class="font-display text-white text-[10px] tracking-tight">C4P</span>
                    </div>

                    <span :style="{ fontWeight: 700 }" class="font-display font-bold text-foreground text-sm hidden sm:block">
                        <span aria-hidden="true" class="font-mono font-bold text-foreground">
                            {{ '<CODE_for_POZNAN/>' }}
                        </span>
                        <span class="sr-only">Code for Poznan</span>
                    </span>
                </NuxtLink>

                <div class="hidden md:flex items-center gap-8">
                    <ul class="flex items-center gap-8 m-0 p-0 list-none">
                        <li
                        v-for="link in navLinks"
                        :key="link.href"
                        >
                        <a
                            :href="link.href"
                            class="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                            {{ link.label }}
                        </a>
                        </li>
                    </ul>
                </div>

                <div class="hidden md:flex items-center gap-5">
                    <div class="flex items-center gap-3 text-muted-foreground">
                        <a href="https://www.linkedin.com/company/codeforpoznan/" 
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn" 
                            @click="trackJoin('nav_linkedin')"
                            class="hover:text-primary transition-colors"
                        >
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>

                        <a href="https://www.facebook.com/CodeForPL" 
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook" 
                            @click="trackJoin('nav_facebook')"
                            class="hover:text-primary transition-colors"
                        >
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                    </div>
                    <a
                        href="#dolacz-do-nas"
                        @click="trackJoin('nav_support_desktop')"
                        :style="{ fontWeight: 700 }"
                        class="font-display font-bold bg-primary text-white px-5 py-2 text-sm hover:bg-primary-active transition-colors"
                    >
                        Wesprzyj nas
                    </a>
                </div>

                <button 
                    class="md:hidden text-muted-foreground hover:text-foreground" 
                    @click="isOpen = !isOpen" 
                    aria-label="Menu"
                >
                    <X v-if="isOpen" :size="20" />
                    <Menu v-else :size="20" />
                </button>
            </div>

            <div v-if="isOpen" class="md:hidden bg-background border-t border-border px-6 py-5 flex flex-col gap-3">
                <NuxtLink 
                    v-for="l in navLinks" 
                    :key="l.href" 
                    :to="l.href" 
                    @click="isOpen = false" 
                    class="text-muted-foreground hover:text-foreground transition-colors py-1.5 text-sm"
                >
                    {{ l.label }}
                </NuxtLink>

                <a 
                    href="#dolacz-do-nas" 
                    @click="() => { isOpen = false; trackJoin('nav_support_mobile'); }"
                    :style="{ fontWeight: 700 }" 
                    class="font-display font-bold bg-primary text-white px-5 py-2.5 text-sm text-center hover:bg-primary-active transition-colors mt-1 rounded"
                >
                    Wesprzyj nas
                </a>
            </div>
        </nav>
    </header>
</template>
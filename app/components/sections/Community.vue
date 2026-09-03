<script setup>
import { useTracking } from '~/composables/useTracking'

const { trackJoin } = useTracking();

const socials = [
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/company/codeforpoznan',
        icon: 'linkedin',
        pos: { left: '6.7%', top: '75%' } 
    },
    {
        label: 'Slack',
        href: 'https://codeforpoznan.slack.com/',
        icon: 'slack',
        pos: { left: '50%', top: '100%' } 
    },
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/CodeForPL',
        icon: 'facebook',
        pos: { left: '93.3%', top: '75%' }
    }
];
</script>

<template>
    <!-- Sekcja zachowuje pt-24 (start okręgu) i pb-16 (4rem odstępu na dole) -->
    <section id="spolecznosc" class="relative bg-background pt-24 lg:pt-24 pb-16 overflow-hidden border-t border-border flex flex-col items-center">
        
        <!-- Nagłówek pozycjonowany absolutnie - nachodzi na odciętą górę okręgu -->
        <div class="absolute top-16 sm:top-18 md:top-20 z-20 w-full flex justify-center px-6">
            <!-- bg-background i px-6 ukrywają linię okręgu za samym tekstem, dając niesamowity efekt przestrzenny -->
            <h2 class="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground bg-background px-4 sm:px-6">
                Connect With Our Community
            </h2>
        </div>

        <!-- Kontener okręgu. Dzięki absolute w nagłówku, ten div ląduje tuż pod <section> (od razu pod pt-24) -->
        <div class="relative w-full flex justify-center overflow-hidden h-[280px] sm:h-[360px] md:h-[360px]">
            
            <div class="absolute bottom-12 sm:bottom-14 md:bottom-16 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[400px] md:h-[400px] rounded-full border-2 border-primary/30 bg-gradient-to-t from-primary/5 to-transparent shadow-[inset_0_0_80px_rgba(59,130,246,0.05)] transition-all duration-700 hover:border-primary/50">
                
                <!-- Ozdobna, pulsująca poświata -->
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-48 h-48 bg-primary/20 blur-[60px] rounded-full pointer-events-none animate-pulse"></div>

                <!-- Ikony społecznościowe -->
                <template v-for="social in socials" :key="social.label">
                    <a
                        :href="social.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        :aria-label="social.label"
                        :title="`Dołącz do nas na ${social.label}`"
                        @click="trackJoin(`community_${social.label.toLowerCase()}`)"
                        class="absolute z-20 group flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                        :style="{ 
                            left: social.pos.left, 
                            top: social.pos.top, 
                            transform: 'translate(-50%, -50%)' 
                        }"
                    >
                        <!-- Ikona Slack -->
                        <svg v-if="social.icon === 'slack'"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 sm:w-8 sm:h-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <rect width="3" height="8" x="13" y="2" rx="1.5" />
                            <path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 20 8.5Z" />
                            <rect width="8" height="3" x="14" y="13" rx="1.5" />
                            <path d="M15.5 19H14v-1.5a1.5 1.5 0 1 0 1.5 1.5Z" />
                            <rect width="3" height="8" x="8" y="14" rx="1.5" />
                            <path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5Z" />
                            <rect width="8" height="3" x="2" y="8" rx="1.5" />
                            <path d="M8.5 5H10v1.5A1.5 1.5 0 1 0 8.5 5Z" />
                        </svg>

                        <!-- Ikona LinkedIn -->
                        <svg v-if="social.icon === 'linkedin'"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 sm:w-8 sm:h-8"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                        </svg>

                        <!-- Ikona Facebook -->
                        <svg v-if="social.icon === 'facebook'"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 sm:w-8 sm:h-8"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </a>
                </template>
            </div>
        </div>
    </section>
</template>
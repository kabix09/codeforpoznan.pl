<script setup>
import { useTracking } from '~/composables/useTracking'

const { trackJoin } = useTracking();

const circleConfig = {
    left: {
        containerWidth: '400px',
        circleSize: '400px',
    },
    right: {
        containerWidth: '330px',
        circleSize: '330px',
    },
    viewportHeight: {
        mobile: '280px',
        tabletDesktop: '360px' 
    }
};

const leftSocials = [
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/company/codeforpoznan',
        icon: 'linkedin',
        pos: { left: '0.2%', top: '46%' }
    },
    {
        label: 'Slack',
        href: 'https://codeforpoznan.slack.com/',
        icon: 'slack',
        pos: { left: '93.3%', top: '75%' }
    }
];

const rightSocials = [
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/CodeForPL',
        icon: 'facebook',
        pos: { left: '96.2%', top: '69.1%' }
    }
];
</script>

<template>
    <!-- Sekcja posiada overflow-hidden, więc przesunięte elementy nie stworzą paska przewijania (scrollbara) -->
    <section id="spolecznosc" class="relative bg-background pt-24 lg:pt-24 overflow-hidden border-t border-border flex flex-col items-center pb-16">
        
        <div class="absolute top-16 sm:top-18 md:top-20 z-30 w-full flex justify-center px-6">
            <h2 class="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground bg-background px-4 sm:px-6">
                Connect With Our Community
            </h2>
        </div>

        <div class="relative w-full flex flex-col md:flex-row justify-center items-center gap-10 md:gap-10 z-10 px-4 md:translate-x-10 lg:translate-x-18 transition-transform duration-500">
            
            <!-- ========================================== -->
            <!-- CIRCLE 1 (Left): Hanging, "U" shape -->
            <!-- ========================================== -->
            <div class="relative w-full h-[280px] sm:h-[360px]" 
                 :style="{ maxWidth: circleConfig.left.containerWidth }">
                
                <!-- LAYER 1: Circle with clipping -->
                <div class="absolute inset-0 overflow-hidden flex justify-center">
                    <div class="absolute bottom-12 sm:bottom-14 md:bottom-16 rounded-full border-2 border-primary/30 bg-gradient-to-t from-primary/5 to-transparent shadow-[inset_0_0_80px_rgba(59,130,246,0.05)] transition-all duration-700 hover:border-primary/50"
                         :style="{ width: circleConfig.left.circleSize, height: circleConfig.left.circleSize }">
                        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-48 h-48 bg-primary/20 blur-[60px] rounded-full pointer-events-none animate-pulse"></div>
                    </div>
                </div>

                <!-- LAYER 2: Icons without clipping -->
                <div class="absolute bottom-12 sm:bottom-14 md:bottom-16 w-full flex justify-center pointer-events-none">
                    <div class="relative" :style="{ width: circleConfig.left.circleSize, height: circleConfig.left.circleSize }">
                        <template v-for="social in leftSocials" :key="social.label">
                            <a
                                :href="social.href"
                                target="_blank"
                                rel="noopener noreferrer"
                                :aria-label="social.label"
                                :title="`Dołącz do nas na ${social.label}`"
                                @click="trackJoin(`community_${social.label.toLowerCase()}`)"
                                class="pointer-events-auto absolute z-20 group flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                                :style="{ 
                                    left: social.pos.left, 
                                    top: social.pos.top, 
                                    transform: 'translate(-50%, -50%)' 
                                }"
                            >
                                <!-- Slack Icon -->
                                <svg v-if="social.icon === 'slack'" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <rect width="3" height="8" x="13" y="2" rx="1.5" />
                                    <path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 20 8.5Z" />
                                    <rect width="8" height="3" x="14" y="13" rx="1.5" />
                                    <path d="M15.5 19H14v-1.5a1.5 1.5 0 1 0 1.5 1.5Z" />
                                    <rect width="3" height="8" x="8" y="14" rx="1.5" />
                                    <path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5Z" />
                                    <rect width="8" height="3" x="2" y="8" rx="1.5" />
                                    <path d="M8.5 5H10v1.5A1.5 1.5 0 1 0 8.5 5Z" />
                                </svg>
                                <!-- LinkedIn Icon -->
                                <svg v-if="social.icon === 'linkedin'" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                                </svg>
                            </a>
                        </template>
                    </div>
                </div>
            </div>

            <!-- ========================================== -->
            <!-- CIRCLE 2 (Right): Dome -->
            <!-- ========================================== -->
            <div class="relative w-full h-[280px] sm:h-[360px]"
                 :style="{ maxWidth: circleConfig.right.containerWidth }">
                
                <!-- LAYER 1: Circle with clipping -->
                <div class="absolute inset-0 overflow-hidden flex justify-center">
                    <div class="absolute top-12 sm:top-14 md:top-16 rounded-full border-2 border-primary/30 bg-gradient-to-b from-primary/5 to-transparent shadow-[inset_0_0_80px_rgba(59,130,246,0.05)] transition-all duration-700 hover:border-primary/50"
                         :style="{ width: circleConfig.right.circleSize, height: circleConfig.right.circleSize }">
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 blur-[60px] rounded-full pointer-events-none animate-pulse"></div>
                    </div>
                </div>

                <!-- LAYER 2: Icons without clipping -->
                <div class="absolute top-12 sm:top-14 md:top-16 w-full flex justify-center pointer-events-none">
                    <div class="relative" :style="{ width: circleConfig.right.circleSize, height: circleConfig.right.circleSize }">
                        <template v-for="social in rightSocials" :key="social.label">
                            <a
                                :href="social.href"
                                target="_blank"
                                rel="noopener noreferrer"
                                :aria-label="social.label"
                                :title="`Join us on ${social.label}`"
                                @click="trackJoin(`community_${social.label.toLowerCase()}`)"
                                class="pointer-events-auto absolute z-20 group flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                                :style="{ 
                                    left: social.pos.left, 
                                    top: social.pos.top, 
                                    transform: 'translate(-50%, -50%)' 
                                }"
                            >
                                <!-- Facebook Icon -->
                                <svg v-if="social.icon === 'facebook'" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        </template>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>
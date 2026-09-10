<script setup>
import pillars from '~/constants/pilars'
</script>

<template>
    <section id="o-nas" class="bg-surface-light py-24 pb-12 lg:py-32 lg:pb-24 border-border-subtle">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 class="absolute w-fit font-display font-extrabold text-4xl tracking-tight text-text-main sm:text-4.5xl leading-tight"
                :style="{ transform: 'translateY(-8rem)'}">
                Jesteśmy grupą wolontariuszy, <br class="hidden lg:block" />
                która tworzy otwarte narzędzia <br class="hidden lg:block" />dla organizacji społecznych.
                
            </h2>
        </div>
        <div class="mx-auto max-w-7xl px-6 lg:px-8 py-12">
                
                <!-- Dodano 'w-fit' -->
                <!-- before:absolute before:-top-24 before:bottom-8 before:-left-10 lg:before:-left-36 before:right-96 before:-z-10 before:border-2 before:border-accent before:rounded-3xl before:bg-text-main" -->
                
                <div class="sm:text-center flex flex-col items-center">
                    <!-- Reszta Twojego kodu -->
                    <p class="font-body text-text-muted mx-auto mt-6 max-w-3xl text-lg lg:text-xl leading-relaxed font-medium">
                        Naszą misją jest wspieranie organizacji pozarządowych i inicjatyw społecznych. <br />
                        Działamy jako organizacja non-profit zrzeszająca specjalistów IT, którzy poświęcają swój czas i umiejętności na rozwój innowacyjnych rozwiązań technologicznych, dostępnych dla każdego!
                    </p>
                </div>

            <div class="mt-20 max-w-lg sm:mx-auto md:max-w-none">
                <div class="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
                    <div v-for="(pillar, index) in pillars" :key="pillar.title" class="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row group">
                        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-border-subtle text-primary shadow-lg shadow-primary/10 sm:shrink-0 transition-transform group-hover:scale-110 group-hover:border-primary/30"
                            :class="index % 2 === 0 ? 'social-btn-blue' : 'social-btn-orange'"
                        >
                            <component :is="pillar.icon" class="h-7 w-7" />
                        </div>
                        <div class="sm:min-w-0 sm:flex-1">
                            <p class="font-display font-bold text-xl text-text-main mb-2">{{ pillar.title }}</p>
                            <p class="font-body text-base leading-relaxed text-text-muted">{{ pillar.desc }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style>

/* 
  GRADIENTOWE HOVERY PRZYCISKÓW
*/
.social-btn-blue:hover {
    /* Gradient: błękitny -> bursztynowy */
    box-shadow: 0 10px 25px rgba(26, 167, 240, 0.5);
    border-color: transparent;
}

.social-btn-orange:hover {
    /* Gradient: bursztynowy -> błękitny */
    box-shadow: 0 10px 25px rgba(245, 158, 11, 0.5);
    border-color: transparent;
}
</style>
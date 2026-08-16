<script setup>
import pillars from '~/constants/pilars'
</script>


<template>
    <section id="o-nas" class="bg-background py-24 lg:py-32 border-t border-border">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="sm:text-center">
                <h2 class="text-lg font-body font-semibold leading-8 text-primary">O nas</h2>
                <p class="mt-2 font-display font-extrabold text-2xl tracking-tight text-foreground sm:text-4xl">
                    Jesteśmy grupą wolontariuszy, która tworzy otwarte narzędzia dla organizacji społecznych.
                </p>
                <p class="font-body text-muted-foreground mx-auto mt-6 max-w-3xl text-lg leading-relaxed">
                    Naszą misją jest wspieranie organizacji pozarządowych i inicjatyw społecznych. <br />
                    Działamy jako organizacja non-profit zrzeszająca specjalistów IT, którzy poświęcają swój czas i umiejętności na rozwój innowacyjnych rozwiązań technologicznych, dostępnych dla każdego!
                </p>
            </div>

            <div class="mt-20 max-w-lg sm:mx-auto md:max-w-none">
                <div class="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
                    <div v-for="pillar in pillars" :key="pillar.title" class="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white sm:shrink-0">
                            <component :is="pillar.icon" class="h-8 w-8" />
                        </div>
                        <div class="sm:min-w-0 sm:flex-1">
                            <p class="font-display text-lg leading-8 text-foreground">{{ pillar.title }}</p>
                            <p class="mt-2 font-body text-base leading-relaxed text-muted-foreground">{{ pillar.desc }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>
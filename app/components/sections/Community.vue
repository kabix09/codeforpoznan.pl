<script setup>
import { Slack } from 'lucide-vue-next';

const socials = [
  {
    label: 'Slack',
    href: 'https://slack.com',
    icon: Slack
  }
];
</script>


<template>
    <section id="how" class="bg-background py-24 lg:py-24 border-t border-border">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="sm:text-center flex flex-col items-center">
                <p class="mt-2 font-display font-extrabold text-2xl tracking-tight text-foreground sm:text-4xl mb-8">
                    Connect With Our Community
                </p>
                
                <!-- Kontener grupujący wszystkie ikony społecznościowe -->
                <div class="flex items-center justify-center gap-3 text-muted-foreground">
                    <a
                        href="https://slack.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Slack"
                        class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white sm:shrink-0"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
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
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue'

const stats = [
  { n: "8+", label: "Wolontariuszy" },
  { n: "5+", label: "Projektów" },
  { n: "10+", label: "Lat działania" },
];
</script>

<template>        
    <section class="relative pt-16 bg-background overflow-hidden">
        <div class="absolute inset-y-0 right-0 w-1/2 bg-secondary hidden lg:block"></div>
            
        <div class="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[92vh]">
            <div class="py-16">
                <p class="font-mono text-muted-foreground text-xs uppercase tracking-[0.2em]">
                    Civic Tech · Poznań · Open Source
                </p>                    

                <h1 class="font-display font-extrabold leading-[1.04] tracking-[-0.035em] text-[clamp(2.8rem,5.5vw,5rem)] text-foreground mb-7">
                    Code For<br />
                    <span class="text-primary">Poznan</span>
                </h1>

                <p class="font-body text-muted-foreground text-lg leading-relaxed mb-10 w-full">
                    Jesteśmy społecznością programistów, designerów i testerów, którzy budują otwarte narzędzia wspierające organizacje społeczne w ich codziennej pracy.
                </p>

                 <div class="flex flex-wrap gap-3 mb-16">
                    <a
                        href="#doloacz-do-nas"
                        class="font-display font-bold bg-primary text-white px-7 py-3.5 text-sm hover:bg-primary-active transition-colors"
                    >
                        Dołącz do nas
                    </a>
                    <a
                        href="#nasze-projekty"
                        :style="{ fontWeight: 600 }"
                        class="font-display border border-border text-foreground px-7 py-3.5 text-sm hover:border-foreground transition-colors"
                    >
                        Nasze projekty
                    </a>
                </div>

                <div class="flex pt-8 border-t border-border">
                    <div v-for="s in stats" :key="s.label" class="flex-1 text-center">
                        <div 
                            class="font-display font-extrabold text-3xl text-foreground"
                            >
                        {{  s.n }}
                        </div>  
                        
                        <div 
                            class="font-body text-muted-foreground text-sm mt-0.5"
                        >
                            {{ s.label }}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="hidden lg:block py-12">
                <div class="overflow-hidden shadow-xl shadow-[#0D1B2A]/45">
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&h=560&fit=crop&auto=format"
                        alt="Zespół Code for Poznań podczas pracy"
                        class="w-full object-cover"
                        :style="{ aspectRatio: '5/4' }"
                    />
                </div>
            </div>
            
        </div>

        <div class="border-t border-border overflow-hidden bg-secondary">
            <div class="flex gap-12 py-3 px-6 whitespace-nowrap animate-[scroll_28s_linear_infinite]">
                <span 
                    v-for="i in 4" 
                    :key="i" 
                    class="font-mono text-[#7A8A96]/60 text-xs tracking-widest"
                    >
                    Open Source · Civic Tech · Poznań · Wolontariat · Code for All · 💙 &nbsp;
                </span>
            </div>
        </div>
    </section>
</template>
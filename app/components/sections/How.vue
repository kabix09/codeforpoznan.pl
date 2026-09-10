<script setup>
import { ref } from 'vue'
</script>

<template>
    <section id="jak-dzialamy" class="relative bg-text-main py-12 lg:py-24 border-t border-text-main overflow-hidden">
        
        <!-- Gradients effects -->
        <div class="glow-orb glow-blue"></div>
        <div class="glow-orb glow-orange"></div>

        <div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div class="sm:text-center flex flex-col items-center">

                <p class="font-body text-base mx-auto mt-6 max-w-4xl text-xl lg:text-2xl leading-relaxed font-medium">                
                  Gdy zaczynamy współpracę z organizacją, w pierwszej kolejności staramy się dokładnie zrozumieć jej wyzwania. 
                  Następnie wspólnie przekładamy je na praktyczne rozwiązania technologiczne.
                  <br /><br />
                  Szukamy ciekawych problemów, by tworzyć dedykowane aplikacje, platformy i systemy informatyczne. 
                  <span class="text-accent-soft font-bold">Nasze projekty pomagają organizacjom społecznym w codziennej pracy.</span> Ułatwiają tworzenie dobra i angażują użytkowników do działania na rzecz ważnych spraw.
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* 
  Lightning controller
  Change the values below to perfectly match the effect in the browser.
*/
#jak-dzialamy {
    /* Smaller blur (e.g., 100px) will make the light more "dense" and visible */
    --glow-blur: 110px; 
    
    /* Increase opacity (0.0 to 1.0) if you want the light to be stronger */
    --glow-opacity-blue: 0.45;
    --glow-opacity-orange: 0.35;
    
    /* Values to control the size of the light orbs */
    --glow-size-blue: 450px;
    --glow-size-orange: 550px;
}

/* Common features for both glow orbs */
.glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(var(--glow-blur));
    pointer-events: none; /* Prevents the orbs from blocking clicks */
}

/* Light blue orbs settings */
.glow-blue {
    top: -15%;
    left: -10%;
    width: var(--glow-size-blue);
    height: var(--glow-size-blue);
    background-color: var(--primary);
    opacity: var(--glow-opacity-blue);
}

/* Light amber orbs settings */
.glow-orange {
    bottom: -25%;
    right: -10%;
    width: var(--glow-size-orange);
    height: var(--glow-size-orange);
    background-color: var(--accent);
    opacity: var(--glow-opacity-orange);
}
</style>
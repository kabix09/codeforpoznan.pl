<script setup>
import { ref } from 'vue'
</script>

<template>
    <section id="jak-dzialamy" class="relative bg-text-main py-24 border-t border-text-main overflow-hidden">
        
        <!-- Świetliste gradienty sterowane przez zmienne CSS w bloku <style> -->
        <div class="glow-orb glow-blue"></div>
        <div class="glow-orb glow-orange"></div>

        <div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div class="sm:text-center flex flex-col items-center">
                <!-- <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-6">
                    <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    <span class="text-white font-bold text-xs uppercase tracking-widest">Jak działamy</span>
                </div> -->

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
  KONTROLER ŚWIATŁA (NEONÓW)
  Zmień poniższe wartości, aby idealnie dopasować efekt w przeglądarce.
*/
#jak-dzialamy {
    /* Mniejszy blur (np. 100px) sprawi, że światło będzie bardziej "gęste" i widoczne */
    --glow-blur: 110px; 
    
    /* Zwiększ krycie (0.0 do 1.0) jeśli światło ma być mocniejsze */
    --glow-opacity-blue: 0.45;
    --glow-opacity-orange: 0.35;
    
    /* Rozmiar plam światła */
    --glow-size-blue: 450px;
    --glow-size-orange: 550px;
}

/* Wspólne cechy obu plam */
.glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(var(--glow-blur));
    pointer-events: none; /* Żeby nie blokowały klikania myszką */
}

/* Ustawienia Błękitnej Poświaty */
.glow-blue {
    top: -15%;
    left: -10%;
    width: var(--glow-size-blue);
    height: var(--glow-size-blue);
    background-color: var(--primary);
    opacity: var(--glow-opacity-blue);
}

/* Ustawienia Bursztynowej Poświaty */
.glow-orange {
    bottom: -25%;
    right: -10%;
    width: var(--glow-size-orange);
    height: var(--glow-size-orange);
    background-color: var(--accent);
    opacity: var(--glow-opacity-orange);
}
</style>
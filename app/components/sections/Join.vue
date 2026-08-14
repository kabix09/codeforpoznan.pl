<script setup>
import { ref } from 'vue'
import { Check, Code, PaintbrushVertical, BarChart2, ClipboardPenLine } from '@lucide/vue';
import { useForm, Field } from 'vee-validate'
import * as yup from 'yup'

// Typ formularza: 'join' lub 'issue'
const formType = ref('join')

const roles = [
  { id: "dev",    label: "Developer",      icon: Code,     desc: "Frontend, backend, mobile" },
  { id: "design", label: "Designer",        icon: PaintbrushVertical,    desc: "UX/UI, grafika, badania" },
  { id: "test",   label: "Tester",          icon: BarChart2, desc: "Testowanie, debugowanie" },
  { id: "pm",     label: "Project Manager", icon: ClipboardPenLine,   desc: "Zarządzanie, koordynacja" },
];

const submited = ref(false)

// Dynamiczny schemat walidacji w zależności od wybranego trybu
const schema = yup.object({
    name: yup.string().required('Imię i nazwisko jest wymagane'),
    email: yup.string().email('Niepoprawny format adresu e-mail').required('E-mail jest wymagany'),
    phone: yup.string().optional(),
    message: yup.string().when('$formType', {
        is: 'issue',
        then: (schema) => schema.required('Wiadomość jest wymagana'),
        otherwise: (schema) => schema.optional(),
    }),
})

const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: schema,
})

const selected = ref([])

const toggle = (id) => {
    const index = selected.value.indexOf(id)
    if (index > -1) {
        selected.value.splice(index, 1)
    } else {
        selected.value.push(id)
    }
}

// Przełączanie między formularzami czyszczące stan błędów/formularza
const switchFormType = (type) => {
    formType.value = type
    submited.value = false
    resetForm()
    selected.value = []
}

const onSubmit = handleSubmit((values) => {
    const finalData = formType.value === 'join' 
        ? { type: 'join', ...values, roles: selected.value }
        : { type: 'issue', ...values }

    console.log('Dane formularza:', finalData)
    // TODO handle API request to send the form data
    submited.value = true
})
</script>

<template>
    <section id="join" class="py-24 bg-background border-t border-border">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 items-start">

                <div>
                    <h2 class="font-body text-lg font-bold text-primary leading-8">Napisz do nas!</h2>

                    <h2
                        class="mt-6 font-display font-extrabold text-4xl lg:text-5xl text-foreground leading-[1.08] tracking-[-0.03em] mb-6"
                    >
                        Zmień swoje<br />
                        <span class="text-primary">miasto</span>
                    </h2>

                    <p class="font-body text-muted-foreground text-lg leading-relaxed mb-10">
                        Szukamy osób z pasją! Nie musisz być ekspertem. Wystarczy chęć działania i odrobina wolnego czasu.
                        Spotykamy się co miesiąc, ale możesz angażować się we własnym tempie.
                    </p>
                    
                    <div class="overflow-hidden hidden lg:block">
                        <!-- source: https://www.getyourguide.com/pl-pl/poznan-town-hall-l167009/?visitor-id=8M9FHJVOK1ISNQ39TTHJ5LT1DZWZF03Z&locale_autoredirect_optout=true -->
                        <img
                            src="https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=400,height=265,dpr=2/tour_img/5ed0ef8ce1224.jpeg"
                            alt="Zespół podczas spotkania"
                            class="w-full object-cover hover:scale-[1.02] transition-transform duration-700"
                            :style="{ 'aspectRatio': '16/10' }"
                        />
                    </div>
                </div>

                <div class="flex flex-col mt-3">
                    <div class="flex justify-center gap-2">
                        <button
                            type="button"
                            @click="switchFormType('join')"
                            :class="[
                                'w-[calc(50%-5rem)] py-3 text-sm font-body font-bold transition-all rounded-t-lg border-t border-x text-center',
                                formType === 'join'
                                    ? 'bg-secondary border-border text-primary relative z-10 -mb-[1px]'
                                    : 'bg-background/60 border-border/40 text-muted-foreground hover:text-foreground'
                            ]"
                        >
                            Dołącz do zespołu
                        </button>
                        <button
                            type="button"
                            @click="switchFormType('issue')"
                            :class="[
                                'w-[calc(50%-5rem)] py-3 text-sm font-body font-bold transition-all rounded-t-lg border-t border-x text-center',
                                formType === 'issue'
                                    ? 'bg-secondary border-border text-primary relative z-10 -mb-[1px]'
                                    : 'bg-background/60 border-border/40 text-muted-foreground hover:text-foreground'
                            ]"
                        >
                            Zgłoś problem
                        </button>
                    </div>

                    <div class="bg-secondary border border-border p-8 pt-8 lg:p-10 lg:pt-6">
                        <div class="grid grid-cols-1 grid-rows-1 items-center h-full">
                            <div v-show="submited" class="col-start-1 row-start-1 flex flex-col items-center justify-center text-center">
                                <div class="w-14 h-14 bg-primary flex items-center justify-center mb-5">
                                    <Check size="24" class="text-white"/>
                                </div>
                                <h3 class="font-display font-bold text-foreground text-2xl mb-2">
                                    Gotowe!
                                </h3>
                                <p class="font-body text-muted-foreground text-sm leading-relaxed">
                                    Skontaktujemy się Tobą wkrótce. <br /> Witaj w zespole!
                                </p>
                            </div>
                            <div v-show="!submited" class="col-start-1 row-start-1">
                                <!-- https://formspree.io/f/mnqvydqv -->
                                <form @submit.prevent="onSubmit" class="flex flex-col gap-5">
                                    <h3 class="font-display font-bold text-foreground text-xl mb-1">
                                        {{ formType === 'join' ? 'Wypełnij formularz' : 'Zgłoś problem' }}
                                    </h3>

                                    <div class="flex flex-col gap-1.5">
                                        <label class="font-bold text-foreground text-sm font-medium">
                                            Imię i nazwisko *
                                        </label>
                                        <Field name="name" v-slot="{ field, errorMessage }">
                                            <input
                                                v-bind="field"
                                                type="text"
                                                class="font-body bg-background border text-foreground px-4 py-3 text-sm focus:outline-none transition-colors placeholder:text-[#B8B2A8]"
                                                :class="errorMessage ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'"
                                                placeholder="Jan Kowalski"
                                            />
                                        </Field>
                                        <span v-if="errors.name" class="text-red-500 text-xs mt-0.5">{{ errors.name }}</span>
                                    </div>

                                    <div class="flex flex-col gap-1.5">
                                        <label class="font-body text-foreground text-sm font-medium">
                                            E-mail *
                                        </label>
                                        <Field name="email" v-slot="{ field, errorMessage }">
                                            <input
                                                v-bind="field"
                                                type="email"
                                                class="bg-background border text-foreground px-4 py-3 text-sm focus:outline-none transition-colors placeholder:text-[#B8B2A8]"
                                                :class="errorMessage ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'"
                                                placeholder="jan@example.com"
                                            />
                                        </Field>
                                        <span v-if="errors.email" class="text-red-500 text-xs mt-0.5">{{ errors.email }}</span>
                                    </div>

                                    <div v-if="formType === 'issue'" class="flex flex-col gap-1.5">
                                        <label class="font-body text-foreground text-sm font-medium">
                                            Telefon (opcjonalnie)
                                        </label>
                                        <Field name="phone" v-slot="{ field, errorMessage }">
                                            <input
                                                v-bind="field"
                                                type="tel"
                                                class="bg-background border text-foreground px-4 py-3 text-sm focus:outline-none transition-colors placeholder:text-[#B8B2A8]"
                                                :class="errorMessage ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'"
                                                placeholder="+48 123 456 789"
                                            />
                                        </Field>
                                        <span v-if="errors.phone" class="text-red-500 text-xs mt-0.5">{{ errors.phone }}</span>
                                    </div>

                                    <div v-if="formType === 'join'" class="flex flex-col gap-2">
                                        <label class="font-body text-foreground text-sm font-medium">
                                            Twoja rola
                                        </label>
                                        <div class="grid grid-cols-2 gap-2">
                                            <button
                                                v-for="{ id, label, icon: Icon, desc } in roles"
                                                :key="id"
                                                type="button"
                                                @click="toggle(id)"
                                                :class="[
                                                    'text-left p-4 border transition-all',
                                                    selected.includes(id)
                                                    ? 'border-primary bg-background'
                                                    : 'border-border hover:border-primary bg-background'
                                                ]"
                                            >
                                            <component 
                                                :is="Icon" 
                                                :size="16" 
                                                :class="['mb-2', selected.includes(id) ? 'text-primary' : 'text-muted-foreground']" 
                                            />
                                            <div :style="{ fontFamily: DISPLAY, fontWeight: 600 }" class="text-foreground text-sm">
                                                {{ label }}
                                            </div>
                                            <div class="text-muted-foreground text-xs mt-0.5">
                                                {{ desc }}
                                            </div>
                                            </button>
                                        </div>
                                    </div>

                                    <div v-if="formType === 'issue'" class="flex flex-col gap-1.5">
                                        <label class="font-body text-foreground text-sm font-medium">
                                            Wiadomość *
                                        </label>
                                        <Field name="message" v-slot="{ field, errorMessage }">
                                            <textarea
                                                v-bind="field"
                                                rows="4"
                                                class="bg-background border text-foreground px-4 py-3 text-sm focus:outline-none transition-colors placeholder:text-[#B8B2A8] resize-none"
                                                :class="errorMessage ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'"
                                                placeholder="Opisz napotkany problem..."
                                            ></textarea>
                                        </Field>
                                        <span v-if="errors.message" class="text-red-500 text-xs mt-0.5">{{ errors.message }}</span>
                                    </div>

                                    <button
                                        type="submit"
                                        :style="{ fontFamily: DISPLAY, fontWeight: 700 }"
                                        class="mt-1 bg-primary text-white px-8 py-3.5 text-sm hover:bg-[#1AA7F0]/90 transition-colors"
                                    >
                                        {{ formType === 'join' ? 'Dołącz do zespołu' : 'Wyślij zgłoszenie' }}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
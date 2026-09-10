<script setup>
import { ref } from 'vue'
import { Check, Code, PaintbrushVertical, BarChart2, ClipboardPenLine } from 'lucide-vue-next'; // Zmieniono import na lucide-vue-next (spójność z Navbar)
import { useForm, Field } from 'vee-validate'
import * as yup from 'yup'
import { useTracking } from '~/composables/useTracking'

const { trackFormTabChange, trackFormSubmit } = useTracking()

const formType = ref('join')

const roles = [
  { id: "dev",    label: "Developer",       icon: Code,     desc: "Frontend, backend, mobile" },
  { id: "design", label: "Designer",        icon: PaintbrushVertical,    desc: "UX/UI, grafika, badania" },
  { id: "test",   label: "Tester",          icon: BarChart2, desc: "Testowanie, debugowanie" },
  { id: "pm",     label: "Project Manager", icon: ClipboardPenLine,   desc: "Zarządzanie, koordynacja" },
];

const submited = ref(false)

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

const switchFormType = (type) => {
    formType.value = type
    submited.value = false
    resetForm()
    selected.value = []

    trackFormTabChange(type)
}

const onSubmit = handleSubmit((values) => {
    const finalData = formType.value === 'join' 
        ? { type: 'join', ...values, roles: selected.value }
        : { type: 'issue', ...values }

    console.log('Dane formularza:', finalData)
    // TODO handle API request to send the form data
    
    submited.value = true

    trackFormSubmit(formType.value)
})
</script>

<template>
    <section id="dolacz-do-nas" class="py-12 lg:py-24 bg-surface-light relative">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-start">
                
                <!-- Lewa strona - Opis -->
                <div>
                    <h2 class="mt-2 font-display font-extrabold text-4xl lg:text-5xl text-text-main leading-[1.08] tracking-[-0.02em] mb-6">
                        Zapraszamy do<br />
                        <span class="text-primary">współpracy</span>
                    </h2>

                    <p class="font-body text-text-muted text-lg leading-relaxed mb-10 font-medium">
                        Szukamy osób z pasją! Nie musisz być ekspertem. Wystarczy chęć działania i odrobina wolnego czasu.
                        Spotykamy się co miesiąc, ale możesz angażować się we własnym tempie.
                    </p>
                    
                    <div class="overflow-hidden hidden lg:block relative rounded-2xl shadow-xl shadow-text-main/10 border-4 border-white">
                        <NuxtImg
                            loading="lazy"
                            src="https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=400,height=265,dpr=2/tour_img/5ed0ef8ce1224.jpeg"
                            alt="Zespół podczas spotkania"
                            class="w-full object-cover hover:scale-105 transition-transform duration-700"
                            :style="{ 'aspectRatio': '16/10' }"
                        />
                        <!-- Ciepły element nałożony na rogu dla głębi -->
                        <div class="absolute top-0 right-0 w-16 h-16 bg-accent opacity-20 blur-2xl"></div>
                    </div>
                </div>

                <!-- Prawa strona - Formularz -->
                <div class="flex flex-col mt-2">
                    <!-- Taby formularza -->
                    <div class="flex justify-center gap-2" role="tablist">
                        <button
                            type="button"
                            role="tab"
                            :aria-selected="formType === 'join'"
                            @click="switchFormType('join')"
                            :class="[
                                'w-[calc(50%-2rem)] py-3.5 text-sm font-display font-bold transition-all rounded-t-xl border-t border-x text-center',
                                formType === 'join'
                                    ? 'bg-form border-border-subtle text-primary relative z-10 -mb-[1px] shadow-[0_-4px_10px_rgba(0,0,0,0.02)]'
                                    : 'bg-form-tab-inactive border-transparent text-text-muted hover:text-text-main'
                            ]"
                        >
                            Dołącz do zespołu
                        </button>
                        <button
                            type="button"
                            role="tab"
                            :aria-selected="formType === 'issue'"
                            @click="switchFormType('issue')"
                            :class="[
                                'w-[calc(50%-2rem)] py-3.5 text-sm font-display font-bold transition-all rounded-t-xl border-t border-x text-center',
                                formType === 'issue'
                                    ? 'bg-form border-border-subtle text-primary relative z-10 -mb-[1px] shadow-[0_-4px_10px_rgba(0,0,0,0.02)]'
                                    : 'bg-form-tab-inactive border-transparent text-text-muted hover:text-text-main'
                            ]"
                        >
                            Zgłoś problem
                        </button>
                    </div>

                    <!-- Karta formularza -->
                    <div class="bg-form border border-border-subtle rounded-xl rounded-t-none p-8 pt-8 lg:p-10 shadow-xl shadow-text-main/5 relative z-20">
                        <div class="grid grid-cols-1 grid-rows-1 items-center h-full">
                            
                            <!-- Sukces -->
                            <div v-show="submited" class="col-start-1 row-start-1 flex flex-col items-center justify-center text-center py-10">
                                <div class="w-16 h-16 rounded-full bg-primary-soft border border-primary/20 flex items-center justify-center mb-5">
                                    <Check size="32" class="text-primary"/>
                                </div>
                                <h3 class="font-display font-extrabold text-text-main text-3xl mb-2">
                                    Gotowe!
                                </h3>
                                <p class="font-body text-text-muted text-base leading-relaxed">
                                    Skontaktujemy się z Tobą wkrótce. <br /> Witaj w zespole!
                                </p>
                            </div>
                            
                            <!-- Formularz -->
                            <div v-show="!submited" class="col-start-1 row-start-1">
                                <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
                                    
                                    <div class="flex flex-col gap-2">
                                        <label for="form_name" class="font-bold text-text-main text-sm">Imię i nazwisko *</label>
                                        <Field name="name" v-slot="{ field, errorMessage }">
                                            <input
                                                id="form_name"
                                                v-bind="field"
                                                type="text"
                                                class="font-body bg-surface-light border rounded-lg text-text-main px-4 py-3.5 text-sm 
                                                        focus:outline-none transition-colors placeholder:text-text-light"
                                                :class="errorMessage ? 'border-red-500' : 'border-border-subtle focus:border-primary'"
                                                placeholder="Jan Kowalski"
                                            />
                                        </Field>
                                        <span v-if="errors.name" class="text-red-500 text-xs font-semibold">{{ errors.name }}</span>
                                    </div>

                                    <div class="flex flex-col gap-2">
                                        <label for="form_email" class="font-bold text-text-main text-sm">E-mail *</label>
                                        <Field name="email" v-slot="{ field, errorMessage }">
                                            <input
                                                id="form_email"
                                                v-bind="field"
                                                type="email"
                                                class="font-body bg-surface-light border rounded-lg text-text-main px-4 py-3.5 text-sm 
                                                        focus:outline-none transition-colors placeholder:text-text-light"
                                                :class="errorMessage ? 'border-red-500' : 'border-border-subtle focus:border-primary'"
                                                placeholder="jan@example.com"
                                            />
                                        </Field>
                                        <span v-if="errors.email" class="text-red-500 text-xs font-semibold">{{ errors.email }}</span>
                                    </div>

                                    <div v-if="formType === 'issue'" class="flex flex-col gap-1.5">
                                        <label for="form_phone" class="font-bold text-text-main text-sm">
                                            Telefon (opcjonalnie)
                                        </label>
                                        <Field name="phone" v-slot="{ field, errorMessage }">
                                            <!-- text-[#B8B2A8] -->
                                            <input
                                                id="form_phone"
                                                v-bind="field"
                                                type="tel"
                                                class="font-body bg-surface-light border rounded-lg px-4 py-3 text-sm 
                                                        focus:outline-none transition-colors placeholder:text-text-light"
                                                :class="errorMessage ? 'border-red-500' : 'border-border-subtle focus:border-primary'"
                                                placeholder="+48 123 456 789"
                                            />
                                        </Field>
                                        <span v-if="errors.phone" class="text-red-500 text-xs mt-0.5">{{ errors.phone }}</span>
                                    </div>

                                    <div v-if="formType === 'join'" class="flex flex-col gap-2">
                                        <label class="font-bold text-text-main text-sm">Twoja rola</label>
                                        <div class="grid grid-cols-2 gap-3">
                                            <button
                                                v-for="{ id, label, icon: Icon, desc } in roles"
                                                :key="id"
                                                type="button"
                                                :aria-pressed="selected.includes(id)"
                                                @click="toggle(id)"
                                                :class="[
                                                    'text-left p-4 border rounded-xl transition-all',
                                                    selected.includes(id)
                                                    ? 'border-primary bg-primary-soft ring-1 ring-primary'
                                                    : 'border-border-subtle hover:border-primary/50 bg-surface-light'
                                                ]"
                                            >
                                                <component 
                                                    :is="Icon" 
                                                    :size="20" 
                                                    :class="['mb-2.5', selected.includes(id) ? 'text-primary' : 'text-text-light']" 
                                                />
                                                <div class="font-display font-bold text-text-main text-sm">{{ label }}</div>
                                                <div class="text-text-muted text-xs mt-1 font-medium">{{ desc }}</div>
                                            </button>
                                        </div>
                                    </div>

                                    <div v-if="formType === 'issue'" class="flex flex-col gap-1.5">
                                        <label for="form_message" class="font-body text-foreground text-sm font-medium">
                                            Wiadomość *
                                        </label>
                                        <Field name="message" v-slot="{ field, errorMessage }">
                                            <textarea
                                                id="form_message"
                                                v-bind="field"
                                                rows="4"
                                                class="font-body bg-surface-light border rounded-lg px-4 py-3 text-sm 
                                                        focus:outline-none transition-colors resize-none"
                                                :class="errorMessage ? 'border-red-500' : 'border-border-subtle focus:border-primary'"
                                                placeholder="Opisz napotkany problem..."
                                            ></textarea>
                                        </Field>
                                        <span v-if="errors.message" class="text-red-500 text-xs mt-0.5">{{ errors.message }}</span>
                                    </div>

                                    <button
                                        type="submit"
                                        class="mt-4 font-display font-extrabold bg-button-submit text-text-main hover:text-white rounded-xl px-8 py-4 text-sm hover:bg-primary transition-all duration-300 shadow-lg shadow-text-main/10 hover:-translate-y-1 hover:shadow-primary/30"
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
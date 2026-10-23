<template>
  <h2
    class="mb-4 border-l-4 border-hover pl-3 font-display text-2xl font-bold uppercase tracking-widest text-slate-900 dark:border-hover-dark dark:text-white"
  >
    Create a Character
  </h2>
  <BackButton />
  <form
    class="rounded-xl flex flex-col-reverse md:flex-row gap-4 border border-day-border bg-white p-6 shadow-sm dark:border-transparent dark:bg-night-surface dark:shadow-none"
    @submit="onSubmit"
    novalidate
  >
    <img
      :src="imageUrl ? imageUrl : 'https://rickandmortyapi.com/api/character/avatar/19.jpeg'"
      loading="lazy"
      class="aspect-square w-full object-cover object-top sm:w-64 sm:shrink-0 sm:self-start md:w-72"
    />
    <fieldset class="flex flex-col gap-5">
      <legend class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        Create character
      </legend>

      <div class="flex flex-col gap-1.5">
        <label for="name" class="font-medium"> Name </label>

        <input
          id="name"
          name="name"
          v-model="name"
          type="text"
          placeholder="Rick Sanchez"
          autocomplete="off"
          class="rounded-lg border border-day-border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
          :aria-invalid="!!nameError"
          :aria-describedby="nameError ? 'name-error' : undefined"
        />

        <p v-if="nameError" id="name-error" class="text-sm text-red-500" role="alert">
          {{ nameError }}
        </p>
      </div>

      <fieldset class="flex flex-col gap-2">
        <legend class="mb-1 font-medium">Gender</legend>

        <label class="flex items-center gap-2">
          <input v-model="gender" type="radio" value="Male" name="Male" />
          Male
        </label>

        <label class="flex items-center gap-2">
          <input v-model="gender" type="radio" value="Female" name="Female" />
          Female
        </label>

        <label class="flex items-center gap-2">
          <input v-model="gender" type="radio" value="Genderless" name="Genderless" />
          Genderless
        </label>

        <label class="flex items-center gap-2">
          <input v-model="gender" type="radio" value="unknown" name="unknown" />
          Unknown
        </label>

        <p v-if="genderError" class="text-sm text-red-500" role="alert">
          {{ genderError }}
        </p>
      </fieldset>

      <div class="flex flex-col gap-1.5">
        <label for="imageUrl" class="font-medium"> Image URL </label>

        <input
          id="imageUrl"
          name="url"
          v-model="imageUrl"
          type="url"
          placeholder="https://example.com/image.jpg"
          class="rounded-lg border border-day-border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
          :aria-invalid="!!imageUrlError"
          :aria-describedby="imageUrlError ? 'image-url-error' : undefined"
        />

        <p v-if="imageUrlError" id="image-url-error" class="text-sm text-red-500" role="alert">
          {{ imageUrlError }}
        </p>
      </div>

      <button
        type="submit"
        :disabled="!meta.valid || !meta.dirty"
        class="rounded-lg cursor-pointer bg-portal px-4 py-2 font-medium text-slate-900 transition hover:bg-portal-strong hover:shadow-portal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal disabled:pointer-events-none disabled:opacity-50"
      >
        Submit
      </button>

      <Transition
        enter-active-class="transition duration-200"
        leave-active-class="transition duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <p
          v-if="isCharacterCreated"
          role="status"
          class="font-medium text-hover dark:text-hover-dark"
          data-testid="confirmation-message"
        >
          Character has been created successfully
        </p>
      </Transition>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { useCreatedCharacterStore } from '@/app/providers/createdCharacterStore'
import type { CharacterGender, CreatedCharacter } from '@/entities/character/model/model'
import BackButton from '@/shared/ui/BackButton.vue'
import { ref } from 'vue'

const createdCharacterStore = useCreatedCharacterStore()
const isCharacterCreated = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

const { handleSubmit, meta, resetForm } = useForm({
  initialValues: {
    name: '',
    gender: '',
    imageUrl: '',
  },
})
const required = (value: string) => value.trim().length > 0 || 'This field is required'

const validateImageUrl = (value: string) => {
  if (!value.trim()) return 'Image URL is required'

  try {
    const url = new URL(value)

    return ['http:', 'https:'].includes(url.protocol) || 'URL must use HTTP or HTTPS'
  } catch {
    return 'Enter a valid URL'
  }
}

const { value: name, errorMessage: nameError } = useField<string>('name', required)

const { value: gender, errorMessage: genderError } = useField<string>('gender', required)

const { value: imageUrl, errorMessage: imageUrlError } = useField<string>(
  'imageUrl',
  validateImageUrl,
)

const onSubmit = handleSubmit((values) => {
  const character: CreatedCharacter = {
    id: crypto.randomUUID(),
    name: values.name.trim(),
    gender: values.gender as CharacterGender,
    image: values.imageUrl.trim(),
  }

  createdCharacterStore.createCharacter(character)
  resetForm()
  showSuccess()
})

function showSuccess() {
  isCharacterCreated.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (isCharacterCreated.value = false), 3500)
}
</script>

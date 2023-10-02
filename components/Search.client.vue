<script setup lang="ts">
import { Search as SearchIcon } from 'lucide-vue-next'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'

const isOpen = ref(false)

const modal = ref<typeof Dialog | null>(null)

const searchInput = ref<string>('')

const cities = ref()

watch(
  searchInput,
  useDebounce(() => {
    fetchCities()
  }, 300)
)

async function fetchCities() {
  const data = await useCity(searchInput.value)
  cities.value = data.value?.results
}
</script>

<template>
  <SearchIcon class="ml-auto" @click="isOpen = true" :size="22" />
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog @close="isOpen = false">
      <TransitionChild
        as="template"
        enter="duration-200 ease-in"
        enter-from="opacity-0"
        enter-to="opacity-10"
        leave="duration-200 ease-in"
        leave-from="opacity-10"
        leave-to="opacity-0"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      </TransitionChild>
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="translate-y-full"
        enter-to="translate-y-0"
        leave="duration-200 ease-in"
        leave-from="translate-y-0"
        leave-to="translate-y-full"
      >
        <div class="fixed bottom-0 left-0 rounded-t-3xl w-full bg-white">
          <DialogPanel class="flex flex-col pt-12 px-4 h-[600px]">
            <button
              class="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full"
              @click="isOpen = false"
            ></button>
            <DialogTitle class="text-3xl font-bold mb-8">Search a city</DialogTitle>
            <input type="text" v-model="searchInput" class="bg-gray-100 rounded-xl h-12 mb-6 px-4" tabindex="1" />
            <div class="flex-1 overflow-y-scroll">
              <ul class="flex flex-col space-y-2">
                <li v-for="city in cities" class="">
                  <NuxtLink
                    :href="city.name.toLowerCase()"
                    class="block px-4 py-4 border-gray-100 shadow-sm border rounded-xl"
                  >
                    <div>{{ city.name }}, {{ city.country }}</div>
                    <div v-if="city.postcodes" class="text-sm text-gray-400">{{ city.postcodes[0] }}</div>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </DialogPanel>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Wind, CloudRain, Clock } from 'lucide-vue-next'

const route = useRoute()

const city = await useCity(route.params.city as string)

const weather = await useWeather(city.value?.results[0].latitude, city.value?.results[0].longitude)
console.log(weather.value)

const rangeFunc = (start: number, end: number) => {
  const length = end - start
  return Array.from({ length }, (_, i) => start + i)
}

const currentH = new Date().getHours()

let range = rangeFunc(currentH + 1, 24)

function getIconPathByCode(code: number = 0) {
  switch (code) {
    case 1 | 2 | 3:
      return 'Cloud'
    case 45 | 48:
      return 'Cloud'
    case 51 | 53 | 55:
      return 'Droplets'
    case 61 | 63 | 65 | 81 | 80 | 82:
      return 'Raining'
    case 66 | 67 | 71 | 73 | 75 | 85 | 86:
      return 'Snow'
    case 95 | 96 | 99:
      return 'Thunder'
    default:
      return 'Cloud'
  }
}

const isOpen = ref(false)
</script>

<template>
  <main class="bg-primary-100 min-h-screen">
    <div class="bg-primary-400 p-4 space-y-3">
      <div class="flex justify-between items-center">
        <p class="text-xl">{{ city?.results[0].name }}, {{ city?.results[0].country }}</p>
        <Search />
      </div>
      <div class="flex justify-between">
        <div class="flex items-end">
          <p class="text-[58px] leading-tight">{{ weather?.current_weather.temperature }}°</p>
          <p class="mb-2">Feels like {{ weather?.hourly.apparent_temperature[currentH] }}°</p>
        </div>
        <img
          :src="`weather-icons/${getIconPathByCode(weather?.current_weather.weathercode)}.png`"
          alt=""
          srcset=""
          class="h-16"
        />
      </div>
      <div class="flex gap-4">
        <button class="py-2 rounded-xl flex-1 bg-primary-600">Today</button>
        <button class="py-2 rounded-xl flex-1 bg-white">Tomorrow</button>
        <button class="py-2 rounded-xl flex-1 bg-white">10 days</button>
      </div>
    </div>
    <div class="p-4 space-y-4">
      <div class="grid grid-cols-[1fr_1fr] auto-rows-1fr gap-3">
        <div class="flex items-center bg-primary-300 p-3 space-x-2 rounded-2xl">
          <div class="bg-white flex items-center justify-center w-7 h-7 rounded-full">
            <Wind :size="16" />
          </div>
          <div class="space-y-1 flex-1">
            <h3 class="text-sm">Wind speed</h3>
            <div class="flex justify-between">
              <p>{{ weather?.current_weather.windspeed }} km/h</p>
              <!--
              <p class="text-xs flex items-center italic font-bold">
                <span>
                  <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.99999 4L0.666656 0.666664H7.33332L3.99999 4Z" fill="#BA1A1A" />
                  </svg>
                </span>
                X km/h
              </p>-->
            </div>
          </div>
        </div>
        <div class="flex items-center bg-primary-300 p-3 space-x-2 rounded-2xl">
          <div class="bg-white flex items-center justify-center w-7 h-7 rounded-full">
            <CloudRain :size="16" />
          </div>
          <div class="space-y-1 flex-1">
            <h3 class="text-sm">Rain chance</h3>
            <div class="flex justify-between">
              <p>{{ weather?.hourly.precipitation_probability[currentH] }} %</p>
              <!--
              <p class="text-xs flex items-center italic font-bold">
                <span>
                  <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.99999 4L0.666656 0.666664H7.33332L3.99999 4Z" fill="#BA1A1A" />
                  </svg>
                </span>
                X km/h
              </p>
            --></div>
          </div>
        </div>
      </div>
      <div class="bg-primary-300 p-3 space-y-4 rounded-2xl">
        <header class="flex gap-2 items-center">
          <div class="bg-white flex items-center justify-center w-7 h-7 rounded-full">
            <Clock :size="16" />
          </div>
          <h2>Hourly Forecast</h2>
        </header>
        <ul class="grid grid-flow-col overflow-x-scroll gap-8">
          <li class="flex flex-col items-center w-max justify-between">
            <p>Now</p>
            <img
              :src="`weather-icons/${getIconPathByCode(weather?.current_weather.weathercode)}.png`"
              alt=""
              class="w-7"
              srcset=""
            />
            <p>{{ Math.round(weather?.current_weather.temperature as number) }}°</p>
          </li>
          <li v-for="n in range" key="n" class="flex flex-col items-center w-max justify-between">
            <p>{{ n % 24 }}h</p>
            <img
              :src="`weather-icons/${getIconPathByCode(weather?.hourly.weathercode[n])}.png`"
              alt=""
              srcset=""
              class="w-7"
            />
            <p>{{ Math.round(weather?.hourly.temperature_2m[n] as number) }}°</p>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

interface weatherType {
  current_weather: {
    is_day: boolean
    temperature: number
    time: string
    weathercode: number
    winddirection: number
    windspeed: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    precipitation_probability: number[]
    weathercode: number[]
    apparent_temperature: number[]
  }
}

export const useWeather = async (latitude: number, longitude: number) => {
  const { data } = await useFetch<weatherType>(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=precipitation_probability,apparent_temperature,temperature_2m,weathercode&current_weather=true&timezone=auto&forecast_days=1`
  )
  return data
}

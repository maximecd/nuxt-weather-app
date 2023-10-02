interface cityType {
  results: [
    {
      id: number
      name: string
      latitude: number
      longitude: number
      country: string
      postcodes: string[]
    },
  ]
}

export const useCity = async (city: string) => {
  const { data } = await useFetch<cityType>('https://geocoding-api.open-meteo.com/v1/search?name=' + city)
  return data
}

export const useDebounce = (callback: () => void, delay: number) => {
  let timeoutId: null | ReturnType<typeof setTimeout> = null
  return () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      callback()
    }, delay)
  }
}

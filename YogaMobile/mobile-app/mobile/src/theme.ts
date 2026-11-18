import { useColorScheme } from 'react-native'

const light = {
  bg: '#F3F2F8', surface: '#FFFFFF', text: '#1F1B33', muted: '#58546F', border: '#D3D0E3',
  brand: '#4A3F7A', onBrand: '#FFFFFF', accent: '#F2C14E', onAccent: '#1F1B33', danger: '#B3261E',
}
const dark: typeof light = {
  bg: '#15122A', surface: '#201C3A', text: '#EEEBFA', muted: '#A9A4C6', border: '#383359',
  brand: '#B8ACF0', onBrand: '#15122A', accent: '#F2C14E', onAccent: '#1F1B33', danger: '#FFB4AB',
}

export type Theme = typeof light
export const useTheme = (): Theme => (useColorScheme() === 'dark' ? dark : light)

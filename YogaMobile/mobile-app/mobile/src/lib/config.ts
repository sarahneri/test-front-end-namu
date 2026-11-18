import { Platform } from 'react-native'

// No emulador Android, "localhost" é o próprio emulador; 10.0.2.2 aponta para o seu computador.
const fallback = Platform.OS === 'android' ? 'http://10.0.2.2:3333' : 'http://localhost:3333'

export const API_URL: string = (process.env.EXPO_PUBLIC_API_URL || fallback).replace(/\/+$/, '')

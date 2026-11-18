import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import DetailScreen from './src/screens/DetailScreen'
import FavoritesScreen from './src/screens/FavoritesScreen'
import HomeScreen from './src/screens/HomeScreen'
import type { RootStackParamList } from './src/navigation'
import { useTheme } from './src/theme'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 2, refetchOnWindowFocus: false } },
})

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ tabBarIconStyle: { display: 'none' }, tabBarLabelStyle: { fontSize: 15, fontWeight: '600', paddingBottom: 12 }, tabBarStyle: { height: 60 } }}>
      <Tab.Screen name="Aulas" component={HomeScreen} options={{ title: 'Aulas de yoga' , tabBarLabel: 'Aulas' }} />
      <Tab.Screen name="Favoritas" component={FavoritesScreen} options={{ title: 'Minhas favoritas' }} />
    </Tab.Navigator>
  )
}

export default function App() {
  const t = useTheme()
  const navTheme = {
    ...DefaultTheme,
    dark: t.bg === '#15122A',
    colors: { ...DefaultTheme.colors, primary: t.brand, background: t.bg, card: t.surface, text: t.text, border: t.border },
  }
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator>
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Aula' }} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}

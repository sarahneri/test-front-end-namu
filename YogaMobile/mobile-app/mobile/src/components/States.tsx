import { useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../theme'

export function LoadingList({ count = 4 }: { count?: number }) {
  const t = useTheme()
  const opacity = useRef(new Animated.Value(0.5)).current
  useEffect(() => {
    if (process.env.JEST_WORKER_ID) return // sem animação infinita nos testes
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.5, duration: 700, useNativeDriver: true }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [opacity])
  return (
    <View accessibilityLabel="Carregando aulas" style={{ gap: 16 }}>
      {Array.from({ length: count }, (_, i) => (
        <Animated.View key={i} style={{ height: 230, borderRadius: 16, backgroundColor: t.border, opacity }} />
      ))}
    </View>
  )
}

interface BoxProps {
  title: string
  message: string
  action?: { label: string; onPress: () => void }
}

function Box({ title, message, action }: BoxProps) {
  const t = useTheme()
  return (
    <View style={[styles.box, { backgroundColor: t.surface, borderColor: t.border }]}>
      <Text style={[styles.title, { color: t.text }]}>{title}</Text>
      <Text style={{ color: t.muted }}>{message}</Text>
      {action && (
        <Pressable accessibilityRole="button" onPress={action.onPress} style={[styles.btn, { backgroundColor: t.brand }]}>
          <Text style={{ color: t.onBrand, fontWeight: '700' }}>{action.label}</Text>
        </Pressable>
      )}
    </View>
  )
}

export const ErrorState = ({ message, onRetry }: { message?: string; onRetry: () => void }) => (
  <Box title="Não foi possível carregar" message={message ?? 'Falha na comunicação com o servidor.'} action={{ label: 'Tentar novamente', onPress: onRetry }} />
)

export const EmptyState = ({ message, onClear }: { message: string; onClear?: () => void }) => (
  <Box title="Nada por aqui" message={message} action={onClear ? { label: 'Limpar busca e filtro', onPress: onClear } : undefined} />
)

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderRadius: 16, padding: 20, gap: 8 },
  title: { fontSize: 20, fontWeight: '700' },
  btn: { minHeight: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
})

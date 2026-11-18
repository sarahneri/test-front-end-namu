import { useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { useToggleFavorite } from '../hooks/queries'
import type { Content } from '../lib/types'
import { useTheme } from '../theme'

interface Props {
  content: Content
  isFavorite: boolean
}

export function FavoriteButton({ content, isFavorite }: Props) {
  const t = useTheme()
  const { mutate, isPending, isError, reset } = useToggleFavorite()
  const pulse = useRef(new Animated.Value(1)).current

  function toggle() {
    if (isPending) return
    reset()
    Animated.sequence([
      Animated.timing(pulse, { toValue: 1.12, duration: 110, useNativeDriver: true }),
      Animated.spring(pulse, { toValue: 1, useNativeDriver: true }),
    ]).start()
    mutate({ content, favorite: !isFavorite })
  }

  return (
    <View style={{ gap: 8 }}>
      <Animated.View style={{ transform: [{ scale: pulse }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Favoritar"
          accessibilityState={{ selected: isFavorite }}
          onPress={toggle}
          style={[styles.btn, { backgroundColor: isFavorite ? t.accent : t.brand }]}
        >
          <Text style={[styles.label, { color: isFavorite ? t.onAccent : t.onBrand }]}>
            {isFavorite ? '♥' : '♡'} Favoritar
          </Text>
        </Pressable>
      </Animated.View>
      {isError && (
        <Text accessibilityRole="alert" style={{ color: t.danger, fontWeight: '600' }}>
          Não foi possível atualizar seus favoritos. A alteração foi desfeita.
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  btn: { minHeight: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  label: { fontSize: 16, fontWeight: '700' },
})

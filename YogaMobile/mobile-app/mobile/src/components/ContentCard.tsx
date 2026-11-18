import { memo, useEffect, useRef } from 'react'
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { formatDuration, typeLabel } from '../lib/format'
import type { Content } from '../lib/types'
import { useTheme } from '../theme'

interface Props {
  content: Content
  categoryName: string
  isFavorite: boolean
  onPress: (id: number) => void
}

export const ContentCard = memo(function ContentCard({ content, categoryName, isFavorite, onPress }: Props) {
  const t = useTheme()
  const opacity = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }).start()
  }, [opacity])

  const press = (to: number) => Animated.spring(scale, { toValue: to, speed: 30, useNativeDriver: true }).start()
  const meta = `${categoryName} · ${typeLabel(content.type)} · ${formatDuration(content.durationSeconds)}`

  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${content.title}. ${meta}. Com ${content.instructor}.${isFavorite ? ' Favorita.' : ''}`}
        onPress={() => onPress(content.id)}
        onPressIn={() => press(0.98)}
        onPressOut={() => press(1)}
        style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}
      >
        <Image source={{ uri: content.thumbnailUrl }} style={[styles.image, { backgroundColor: t.border }]} accessibilityIgnoresInvertColors />
        <View style={styles.body}>
          <Text style={[styles.meta, { color: t.muted }]}>{meta}</Text>
          <Text style={[styles.title, { color: t.text }]}>{content.title}</Text>
          <Text style={{ color: t.muted }}>com {content.instructor}</Text>
          {isFavorite && <Text style={{ color: t.brand, fontWeight: '700' }}>♥ Nos favoritos</Text>}
        </View>
      </Pressable>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 16, overflow: 'hidden' },
  image: { width: '100%', aspectRatio: 16 / 9 },
  body: { padding: 14, gap: 4 },
  meta: { fontSize: 13 },
  title: { fontSize: 18, fontWeight: '700' },
})

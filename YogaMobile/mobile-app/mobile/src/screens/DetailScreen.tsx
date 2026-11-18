import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import type { RouteProp } from '@react-navigation/native'
import { FavoriteButton } from '../components/FavoriteButton'
import { ErrorState, LoadingList } from '../components/States'
import { useCategories, useContent } from '../hooks/queries'
import { ApiError } from '../lib/api'
import { categoryLabel, formatDate, formatDuration, typeLabel } from '../lib/format'
import type { RootStackParamList } from '../navigation'
import { useTheme } from '../theme'

export default function DetailScreen() {
  const t = useTheme()
  const { id } = useRoute<RouteProp<RootStackParamList, 'Detail'>>().params
  const { data, isPending, isError, error, refetch } = useContent(id)
  const categories = useCategories()

  if (isPending) return <View style={[styles.pad, { backgroundColor: t.bg, flex: 1 }]}><LoadingList count={1} /></View>
  if (isError) {
    const notFound = error instanceof ApiError && (error.status === 404 || error.status === 400)
    return (
      <View style={[styles.pad, { backgroundColor: t.bg, flex: 1 }]}>
        <ErrorState message={notFound ? 'Aula não encontrada.' : error.message} onRetry={() => refetch()} />
      </View>
    )
  }

  const rows: [string, string][] = [
    ['Categoria', categoryLabel(data.category, categories.data)],
    ['Tipo', typeLabel(data.type)],
    ['Duração', formatDuration(data.durationSeconds)],
    ['Instrutor(a)', data.instructor],
    ['Publicado em', formatDate(data.publishedAt)],
  ]

  return (
    <ScrollView style={{ backgroundColor: t.bg }} contentContainerStyle={{ paddingBottom: 32 }}>
      <Image source={{ uri: data.thumbnailUrl }} style={[styles.image, { backgroundColor: t.border }]} accessibilityIgnoresInvertColors />
      <View style={styles.pad}>
        <Text accessibilityRole="header" style={[styles.title, { color: t.text }]}>{data.title}</Text>
        <Text style={{ color: t.text, fontSize: 16, lineHeight: 24 }}>{data.description}</Text>
        <View style={[styles.info, { borderColor: t.border }]}>
          {rows.map(([k, v]) => (
            <View key={k} style={styles.row} accessible accessibilityLabel={`${k}: ${v}`}>
              <Text style={{ color: t.muted }}>{k}</Text>
              <Text style={{ color: t.text, fontWeight: '700', flexShrink: 1, textAlign: 'right' }}>{v}</Text>
            </View>
          ))}
        </View>
        <FavoriteButton content={data} isFavorite={!!data.isFavorite} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: { width: '100%', aspectRatio: 16 / 9 },
  pad: { padding: 16, gap: 16 },
  title: { fontSize: 26, fontWeight: '800' },
  info: { borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 16, paddingVertical: 6 },
})

import { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ContentCard } from '../components/ContentCard'
import { EmptyState, ErrorState, LoadingList } from '../components/States'
import { useCategories, useFavorites } from '../hooks/queries'
import { categoryLabel } from '../lib/format'
import type { Content } from '../lib/types'
import type { RootStackParamList } from '../navigation'
import { useTheme } from '../theme'

export default function FavoritesScreen() {
  const t = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { data, isPending, isError, error, refetch, isRefetching } = useFavorites()
  const categories = useCategories()
  const open = useCallback((id: number) => navigation.navigate('Detail', { id }), [navigation])
  const renderItem = useCallback(
    ({ item }: { item: Content }) => (
      <ContentCard content={item} categoryName={categoryLabel(item.category, categories.data)} isFavorite={false} onPress={open} />
    ),
    [categories.data, open],
  )

  return (
    <View style={[styles.flex, { backgroundColor: t.bg }]}>
      {isPending ? (
        <View style={styles.pad}><LoadingList count={2} /></View>
      ) : isError ? (
        <View style={styles.pad}><ErrorState message={error.message} onRetry={() => refetch()} /></View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(c) => String(c.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.pad}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          refreshing={isRefetching}
          onRefresh={() => refetch()}
          ListEmptyComponent={<EmptyState message="Abra uma aula e toque em Favoritar para encontrá-la aqui." />}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({ flex: { flex: 1 }, pad: { padding: 16 } })

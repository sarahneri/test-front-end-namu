import { Link } from 'react-router-dom'
import { ContentCard } from '../components/ContentCard'
import { ErrorState, LoadingGrid } from '../components/States'
import { btn, card, muted } from '../components/ui'
import { useCategories, useFavorites } from '../hooks/queries'
import { categoryLabel } from '../lib/format'

export default function FavoritesPage() {
  const { data, isPending, isError, error, refetch } = useFavorites()
  const categories = useCategories()

  return (
    <section aria-labelledby="titulo">
      <h1 id="titulo" className="mb-6 font-serif text-4xl font-bold">Minhas aulas favoritas</h1>
      {isPending && <LoadingGrid count={3} />}
      {isError && <ErrorState message={error.message} onRetry={() => refetch()} />}
      {data && data.length === 0 && (
        <div className={`max-w-xl p-6 ${card}`}>
          <h2 className="mb-1 text-xl font-semibold">Sem favoritas ainda</h2>
          <p className={`mb-4 ${muted}`}>Abra uma aula e use o botão Favoritar para encontrá-la aqui depois.</p>
          <Link to="/" className={btn}>Ver aulas</Link>
        </div>
      )}
      {data && data.length > 0 && (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((c) => (
            <ContentCard key={c.id} content={c} categoryName={categoryLabel(c.category, categories.data)} isFavorite={false} />
          ))}
        </ul>
      )}
    </section>
  )
}

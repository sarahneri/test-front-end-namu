import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ContentCard } from '../components/ContentCard'
import { EmptyState, ErrorState, LoadingGrid } from '../components/States'
import { Pagination } from '../components/Pagination'
import { muted } from '../components/ui'
import { useDebounce } from '../hooks/useDebounce'
import { useCategories, useContents, useFavorites } from '../hooks/queries'
import { categoryLabel } from '../lib/format'

const LIMIT = 9

export default function CatalogPage() {
  const [params, setParams] = useSearchParams()
  const search = params.get('q') ?? ''
  const category = params.get('category') ?? ''
  const page = Math.max(1, Number(params.get('page')) || 1)

  const [text, setText] = useState(search)
  const debounced = useDebounce(text, 300)
  const status = useRef<HTMLParagraphElement>(null)

  const categories = useCategories()
  const favorites = useFavorites()
  const contents = useContents({ search, category, page, limit: LIMIT })
  const favoriteIds = useMemo(() => new Set((favorites.data ?? []).map((c) => c.id)), [favorites.data])

  function update(changes: Record<string, string>) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        Object.entries(changes).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)))
        return next
      },
      { replace: true },
    )
  }

  // Aplica a busca na URL depois do debounce (a busca sempre volta para a página 1)
  useEffect(() => {
    setParams(
      (prev) => {
        if ((prev.get('q') ?? '') === debounced) return prev
        const next = new URLSearchParams(prev)
        if (debounced) next.set('q', debounced)
        else next.delete('q')
        next.delete('page')
        return next
      },
      { replace: true },
    )
  }, [debounced, setParams])

  function goToPage(p: number) {
    update({ page: p > 1 ? String(p) : '' })
    status.current?.focus({ preventScroll: true })
    status.current?.scrollIntoView({ block: 'start' })
  }

  function clear() {
    setText('')
    setParams({}, { replace: true })
  }

  const { data, isPending, isError, error, refetch, isPlaceholderData } = contents
  const message = isPending
    ? 'Carregando aulas…'
    : isError
      ? ''
      : data.total === 0
        ? 'Nenhuma aula encontrada.'
        : `Mostrando ${(data.page - 1) * data.limit + 1}–${(data.page - 1) * data.limit + data.data.length} de ${data.total} aulas`

  return (
    <section aria-labelledby="titulo">
      <h1 id="titulo" className="font-serif text-4xl font-bold">Aulas de yoga</h1>
      <p className={`mb-6 mt-2 max-w-2xl ${muted}`}>
        Escolha uma categoria, busque pelo título e salve as aulas que quer repetir.
      </p>

      <div className="mb-6 grid gap-4">
        <div>
          <label htmlFor="busca" className="mb-1 block font-semibold">Buscar por título</label>
          <input
            id="busca"
            type="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoComplete="off"
            className="min-h-11 w-full max-w-lg rounded-lg border-2 border-slate-300 bg-white px-3 focus-visible:outline-2 focus-visible:outline-amber-500 dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <fieldset className="flex flex-wrap gap-2">
          <legend className="mb-1 font-semibold">Categoria</legend>
          {[{ slug: '', name: 'Todas' }, ...(categories.data ?? [])].map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={category === c.slug}
              onClick={() => update({ category: c.slug, page: '' })}
              className="min-h-11 rounded-full border-2 border-slate-300 bg-white px-4 aria-pressed:border-indigo-700 aria-pressed:bg-indigo-700 aria-pressed:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:aria-pressed:border-indigo-300 dark:aria-pressed:bg-indigo-300 dark:aria-pressed:text-indigo-950"
            >
              {c.name}
            </button>
          ))}
        </fieldset>
      </div>

      <p ref={status} tabIndex={-1} role="status" aria-live="polite" className={`mb-4 min-h-6 outline-none ${muted}`}>
        {message}
      </p>

      {isPending && <LoadingGrid count={LIMIT} />}
      {isError && <ErrorState message={error.message} onRetry={() => refetch()} />}
      {data && data.total === 0 && <EmptyState onClear={clear} />}
      {data && data.total > 0 && (
        <>
          <ul
            aria-busy={isPlaceholderData}
            className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${isPlaceholderData ? 'opacity-60' : ''}`}
          >
            {data.data.map((c) => (
              <ContentCard
                key={c.id}
                content={c}
                categoryName={categoryLabel(c.category, categories.data)}
                isFavorite={favoriteIds.has(c.id)}
              />
            ))}
          </ul>
          <Pagination page={data.page} totalPages={data.totalPages} onChange={goToPage} />
        </>
      )}
    </section>
  )
}

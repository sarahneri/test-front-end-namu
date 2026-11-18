import { Link, useParams } from 'react-router-dom'
import { FavoriteButton } from '../components/FavoriteButton'
import { ErrorState } from '../components/States'
import { btn, muted } from '../components/ui'
import { useCategories, useContent } from '../hooks/queries'
import { ApiError } from '../lib/api'
import { categoryLabel, formatDate, formatDuration, typeLabel } from '../lib/format'

export default function DetailPage() {
  const id = Number(useParams().id)
  const { data, isPending, isError, error, refetch } = useContent(id)
  const categories = useCategories()

  if (isPending) return <p role="status">Carregando aula…</p>

  if (isError) {
    const notFound = error instanceof ApiError && (error.status === 404 || error.status === 400)
    return notFound ? (
      <section>
        <h1 className="font-serif text-3xl font-bold">Aula não encontrada</h1>
        <p className={`mb-4 mt-2 ${muted}`}>O link pode estar incorreto ou a aula foi removida.</p>
        <Link to="/" className={btn}>Voltar às aulas</Link>
      </section>
    ) : (
      <ErrorState message={error.message} onRetry={() => refetch()} />
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
    <article>
      <Link to="/" className="mb-5 inline-block font-semibold underline">← Voltar às aulas</Link>
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <img
          src={data.thumbnailUrl}
          alt=""
          width={640}
          height={360}
          className="aspect-video w-full rounded-2xl bg-slate-200 object-cover dark:bg-slate-800"
        />
        <div>
          <h1 className="mb-4 font-serif text-4xl font-bold leading-tight">{data.title}</h1>
          <p className="mb-6 max-w-prose">{data.description}</p>
          <dl className="mb-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-y border-slate-200 py-4 dark:border-slate-800">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className={muted}>{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <FavoriteButton content={data} isFavorite={!!data.isFavorite} />
        </div>
      </div>
    </article>
  )
}

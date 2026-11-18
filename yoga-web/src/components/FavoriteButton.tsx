import { useToggleFavorite } from '../hooks/queries'
import type { Content } from '../lib/types'
import { btn } from './ui'

interface Props {
  content: Content
  isFavorite: boolean
}

export function FavoriteButton({ content, isFavorite }: Props) {
  const { mutate, isPending, isError, reset } = useToggleFavorite()

  function toggle() {
    if (isPending) return
    reset()
    mutate({ content, favorite: !isFavorite })
  }

  return (
    <div className="grid gap-2">
      <button
        type="button"
        aria-pressed={isFavorite}
        aria-disabled={isPending}
        onClick={toggle}
        className={`${btn} ${isFavorite ? '!border-amber-400 !bg-amber-400 !text-slate-900' : ''}`}
      >
        <span aria-hidden="true">{isFavorite ? '♥' : '♡'}</span> Favoritar
      </button>
      {isError && (
        <p role="alert" className="text-sm font-semibold text-rose-700 dark:text-rose-300">
          Não foi possível atualizar seus favoritos. A alteração foi desfeita.
        </p>
      )}
    </div>
  )
}

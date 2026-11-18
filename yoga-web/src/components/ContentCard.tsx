import { memo } from 'react'
import { Link } from 'react-router-dom'
import { formatDuration, typeLabel } from '../lib/format'
import type { Content } from '../lib/types'
import { card, muted } from './ui'

interface Props {
  content: Content
  categoryName: string
  isFavorite: boolean
}

export const ContentCard = memo(function ContentCard({ content, categoryName, isFavorite }: Props) {
  return (
    <li className={`relative flex flex-col overflow-hidden focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-amber-500 ${card}`}>
      <img
        src={content.thumbnailUrl}
        alt=""
        width={640}
        height={360}
        loading="lazy"
        className="aspect-video w-full bg-slate-200 object-cover dark:bg-slate-800"
      />
      <div className="grid gap-2 p-4">
        <p className={`flex flex-wrap gap-x-3 text-sm ${muted}`}>
          <span className="font-semibold text-slate-900 dark:text-slate-100">{categoryName}</span>
          <span>{typeLabel(content.type)}</span>
          <span>{formatDuration(content.durationSeconds)}</span>
        </p>
        <h2 className="text-lg font-semibold leading-snug">
          <Link
            to={`/conteudos/${content.id}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {content.title}
          </Link>
        </h2>
        <p className={`text-sm ${muted}`}>com {content.instructor}</p>
        {isFavorite && (
          <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">♥ Nos favoritos</p>
        )}
      </div>
    </li>
  )
})

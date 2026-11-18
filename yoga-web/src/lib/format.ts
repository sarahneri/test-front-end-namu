import type { Category } from './types'

export function formatDuration(seconds: number): string {
  const minutes = Math.max(1, Math.round(seconds / 60))
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h} h ${String(m).padStart(2, '0')} min` : `${h} h`
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(iso))
}

const TYPE_LABELS: Record<string, string> = {
  audio: 'Áudio',
  video: 'Vídeo',
  article: 'Artigo',
}

export function typeLabel(type: string): string {
  return TYPE_LABELS[type] ?? type.charAt(0).toUpperCase() + type.slice(1)
}

export function categoryLabel(slug: string, categories?: Category[]): string {
  return categories?.find((c) => c.slug === slug)?.name ?? slug
}

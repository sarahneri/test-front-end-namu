import { API_URL } from './config'
import type { Category, Content, ContentsParams, Paginated } from './types'

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response
  try {
    res = await fetch(API_URL + path, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    })
  } catch {
    throw new ApiError(0, 'Sem conexão com o servidor.')
  }
  const text = await res.text()
  const body = text ? JSON.parse(text) : undefined
  if (!res.ok) throw new ApiError(res.status, body?.error ?? 'Erro inesperado.')
  return body as T
}

const unwrap = <T,>(r: T[] | { data: T[] }): T[] => (Array.isArray(r) ? r : r.data)

// A API devolve thumbnails com "localhost", que no celular/emulador não alcança o computador.
const fixHost = (c: Content): Content => ({
  ...c,
  thumbnailUrl: c.thumbnailUrl.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, API_URL),
})

export const api = {
  categories: () => request<Category[] | { data: Category[] }>('/categories').then(unwrap),

  contents: async (params: ContentsParams) => {
    const qs = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') qs.set(k, String(v))
    })
    const r = await request<Paginated<Content>>(`/contents?${qs}`)
    return { ...r, data: r.data.map(fixHost) }
  },

  content: (id: number) => request<Content>(`/contents/${id}`).then(fixHost),

  favorites: () => request<Content[] | { data: Content[] }>('/favorites').then((r) => unwrap(r).map(fixHost)),

  addFavorite: (contentId: number) =>
    request<void>('/favorites', { method: 'POST', body: JSON.stringify({ contentId }) }),

  removeFavorite: (contentId: number) =>
    request<void>(`/favorites/${contentId}`, { method: 'DELETE' }),
}

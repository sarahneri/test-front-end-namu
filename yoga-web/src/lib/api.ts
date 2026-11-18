import type { Category, Content, ContentsParams, Paginated } from './types'

const BASE_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'

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
    res = await fetch(BASE_URL + path, {
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

// Aceita tanto um array direto quanto { data: [...] }
const unwrap = <T,>(r: T[] | { data: T[] }): T[] => (Array.isArray(r) ? r : r.data)

export const api = {
  categories: () => request<Category[] | { data: Category[] }>('/categories').then(unwrap),

  contents: (params: ContentsParams) => {
    const qs = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') qs.set(k, String(v))
    })
    return request<Paginated<Content>>(`/contents?${qs}`)
  },

  content: (id: number) => request<Content>(`/contents/${id}`),

  favorites: () => request<Content[] | { data: Content[] }>('/favorites').then(unwrap),

  addFavorite: (contentId: number) =>
    request<void>('/favorites', { method: 'POST', body: JSON.stringify({ contentId }) }),

  removeFavorite: (contentId: number) =>
    request<void>(`/favorites/${contentId}`, { method: 'DELETE' }),
}

export interface Category {
  slug: string
  name: string
}

export interface Content {
  id: number
  title: string
  description: string
  category: string
  type: string
  durationSeconds: number
  instructor: string
  thumbnailUrl: string
  publishedAt: string
  isFavorite?: boolean
}

export interface Paginated<T> {
  data: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ContentsParams {
  search?: string
  category?: string
  page?: number
  limit?: number
}

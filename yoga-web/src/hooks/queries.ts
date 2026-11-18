import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { api } from '../lib/api'
import type { Content, ContentsParams } from '../lib/types'

export const useCategories = () =>
  useQuery({ queryKey: ['categories'], queryFn: api.categories, staleTime: Infinity })

export const useContents = (params: ContentsParams) =>
  useQuery({
    queryKey: ['contents', params],
    queryFn: () => api.contents(params),
    placeholderData: keepPreviousData,
  })

export const useContent = (id: number) =>
  useQuery({
    queryKey: ['content', id],
    queryFn: () => api.content(id),
    enabled: Number.isFinite(id),
  })

export const useFavorites = () => useQuery({ queryKey: ['favorites'], queryFn: api.favorites })

interface ToggleVars {
  content: Content
  favorite: boolean
}

/** Favoritar/desfavoritar com atualização otimista e reversão em caso de erro. */
export function useToggleFavorite() {
  const qc = useQueryClient()
  return useMutation({
    retry: 0,
    mutationFn: ({ content, favorite }: ToggleVars) =>
      favorite ? api.addFavorite(content.id) : api.removeFavorite(content.id),

    onMutate: async ({ content, favorite }) => {
      await qc.cancelQueries({ queryKey: ['favorites'] })
      await qc.cancelQueries({ queryKey: ['content', content.id] })
      const prevFavorites = qc.getQueryData<Content[]>(['favorites'])
      const prevContent = qc.getQueryData<Content>(['content', content.id])

      qc.setQueryData<Content[]>(['favorites'], (old = []) =>
        favorite ? [...old.filter((c) => c.id !== content.id), content] : old.filter((c) => c.id !== content.id),
      )
      qc.setQueryData<Content | undefined>(['content', content.id], (old) =>
        old ? { ...old, isFavorite: favorite } : old,
      )
      return { prevFavorites, prevContent }
    },

    onError: (_err, { content }, ctx) => {
      if (ctx?.prevFavorites) qc.setQueryData(['favorites'], ctx.prevFavorites)
      if (ctx?.prevContent) qc.setQueryData(['content', content.id], ctx.prevContent)
    },

    onSettled: (_d, _e, { content }) => {
      qc.invalidateQueries({ queryKey: ['favorites'] })
      qc.invalidateQueries({ queryKey: ['content', content.id] })
    },
  })
}

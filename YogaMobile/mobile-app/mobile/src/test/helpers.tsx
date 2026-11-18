import type { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react-native'

export const makeClient = () => new QueryClient({ defaultOptions: { queries: { retry: false } } })

export function renderWithClient(ui: ReactElement, client = makeClient()) {
  return { client, ...render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>) }
}

// Resposta mínima compatível com o que src/lib/api.ts usa
export const reply = (body: unknown, status = 200) =>
  Promise.resolve({ ok: status < 400, status, text: () => Promise.resolve(JSON.stringify(body)) })

export const sample = {
  id: 1,
  title: 'Respiração para começar o dia',
  description: 'Prática curta',
  category: 'respiracao',
  type: 'audio',
  durationSeconds: 420,
  instructor: 'Marina Duarte',
  thumbnailUrl: 'http://localhost:3333/images/namu-1.jpg',
  publishedAt: '2026-08-02T09:00:00Z',
}

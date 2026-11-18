import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import CatalogPage from './CatalogPage'

const content = {
  id: 1,
  title: 'Respiração para começar o dia',
  description: 'Prática curta',
  category: 'meditacao',
  type: 'audio',
  durationSeconds: 420,
  instructor: 'Marina Duarte',
  thumbnailUrl: 'http://localhost/x.jpg',
  publishedAt: '2026-08-02T09:00:00Z',
}

const json = (body: unknown, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(body), { status }))

function setup() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

afterEach(() => vi.unstubAllGlobals())

describe('CatalogPage', () => {
  it('lista os conteúdos retornados pela API', async () => {
    vi.stubGlobal('fetch', (url: string) => {
      if (url.includes('/categories')) return json([{ slug: 'meditacao', name: 'Meditação' }])
      if (url.includes('/favorites')) return json([])
      return json({ data: [content], page: 1, limit: 9, total: 1, totalPages: 1 })
    })
    setup()
    expect(await screen.findByRole('link', { name: content.title })).toBeInTheDocument()
    expect(screen.getByText('Mostrando 1–1 de 1 aulas')).toBeInTheDocument()
  })

  it('mostra erro e permite tentar de novo', async () => {
    vi.stubGlobal('fetch', (url: string) => {
      if (url.includes('/contents')) return json({ error: 'Falha temporária' }, 500)
      return json([])
    })
    setup()
    expect(await screen.findByRole('alert')).toHaveTextContent('Falha temporária')
    expect(screen.getByRole('button', { name: 'Tentar novamente' })).toBeInTheDocument()
  })

  it('mostra estado vazio', async () => {
    vi.stubGlobal('fetch', (url: string) =>
      url.includes('/contents') ? json({ data: [], page: 1, limit: 9, total: 0, totalPages: 0 }) : json([]),
    )
    setup()
    expect(await screen.findByText('Nada por aqui')).toBeInTheDocument()
    await userEvent.setup().click(screen.getByRole('button', { name: 'Limpar busca e filtro' }))
  })
})

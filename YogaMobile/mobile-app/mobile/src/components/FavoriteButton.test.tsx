import { fireEvent, screen, waitFor } from '@testing-library/react-native'
import { FavoriteButton } from './FavoriteButton'
import { makeClient, renderWithClient, reply, sample } from '../test/helpers'

afterEach(() => jest.restoreAllMocks())

describe('FavoriteButton', () => {
  it('atualiza de forma otimista e reverte se a API falhar', async () => {
    const client = makeClient()
    client.setQueryData(['content', 1], { ...sample, isFavorite: false })
    client.setQueryData(['favorites'], [])

    let release!: () => void
    global.fetch = jest.fn((_url: string, init?: RequestInit) =>
      init?.method === 'POST'
        ? new Promise((resolve) => { release = () => resolve(reply({ error: 'Erro interno' }, 500)) })
        : reply([]),
    ) as unknown as typeof fetch

    renderWithClient(<FavoriteButton content={sample} isFavorite={false} />, client)
    fireEvent.press(screen.getByLabelText('Favoritar'))

    // enquanto a API não responde, o cache já está atualizado
    await waitFor(() => expect(client.getQueryData<{ isFavorite: boolean }>(['content', 1])?.isFavorite).toBe(true))
    expect(client.getQueryData<unknown[]>(['favorites'])).toHaveLength(1)

    release()
    expect(await screen.findByText(/alteração foi desfeita/)).toBeTruthy()
    await waitFor(() => expect(client.getQueryData<unknown[]>(['favorites'])).toHaveLength(0))
  })
})

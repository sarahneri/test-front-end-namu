import { fireEvent, screen } from '@testing-library/react-native'
import HomeScreen from './HomeScreen'
import { renderWithClient, reply, sample } from '../test/helpers'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() }),
}))

const page = (data: unknown[], total = data.length) => ({ data, page: 1, limit: 10, total, totalPages: 1 })

afterEach(() => jest.restoreAllMocks())

describe('HomeScreen', () => {
  it('lista os conteúdos da API', async () => {
    global.fetch = jest.fn((url: string) =>
      url.includes('/categories') ? reply([{ slug: 'respiracao', name: 'Respiração' }])
      : url.includes('/favorites') ? reply([])
      : reply(page([sample])),
    ) as unknown as typeof fetch
    renderWithClient(<HomeScreen />)
    expect(await screen.findByText('Respiração para começar o dia')).toBeTruthy()
    expect(screen.getByText('1 de 1 aulas')).toBeTruthy()
  })

  it('mostra erro e permite tentar de novo', async () => {
    global.fetch = jest.fn((url: string) =>
      url.includes('/contents') ? reply({ error: 'Falha temporária' }, 500) : reply([]),
    ) as unknown as typeof fetch
    renderWithClient(<HomeScreen />)
    expect(await screen.findByText('Falha temporária')).toBeTruthy()
    expect(screen.getByText('Tentar novamente')).toBeTruthy()
  })

  it('mostra estado vazio e limpa a busca', async () => {
    global.fetch = jest.fn((url: string) =>
      url.includes('/contents') ? reply(page([], 0)) : reply([]),
    ) as unknown as typeof fetch
    renderWithClient(<HomeScreen />)
    fireEvent.changeText(screen.getByLabelText('Buscar por título'), 'xyz')
    expect(await screen.findByText('Nada por aqui')).toBeTruthy()
    fireEvent.press(screen.getByText('Limpar busca e filtro'))
    expect(screen.getByLabelText('Buscar por título').props.value).toBe('')
  })
})

import { categoryLabel, formatDuration, typeLabel } from './format'

describe('format', () => {
  it('formata duração em minutos e horas', () => {
    expect(formatDuration(420)).toBe('7 min')
    expect(formatDuration(20)).toBe('1 min')
    expect(formatDuration(3900)).toBe('1 h 05 min')
    expect(formatDuration(7200)).toBe('2 h')
  })

  it('traduz o tipo, com fallback', () => {
    expect(typeLabel('audio')).toBe('Áudio')
    expect(typeLabel('podcast')).toBe('Podcast')
  })

  it('resolve o nome da categoria pelo slug', () => {
    expect(categoryLabel('yoga', [{ slug: 'yoga', name: 'Yoga' }])).toBe('Yoga')
    expect(categoryLabel('xyz')).toBe('xyz')
  })
})

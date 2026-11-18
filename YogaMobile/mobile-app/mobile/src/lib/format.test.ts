import { categoryLabel, formatDuration, typeLabel } from './format'

describe('format', () => {
  it('formata duração', () => {
    expect(formatDuration(420)).toBe('7 min')
    expect(formatDuration(3900)).toBe('1 h 05 min')
    expect(formatDuration(7200)).toBe('2 h')
  })
  it('traduz tipo e categoria', () => {
    expect(typeLabel('audio')).toBe('Áudio')
    expect(typeLabel('podcast')).toBe('Podcast')
    expect(categoryLabel('yoga', [{ slug: 'yoga', name: 'Yoga' }])).toBe('Yoga')
  })
})

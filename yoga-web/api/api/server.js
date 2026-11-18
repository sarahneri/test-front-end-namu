// API de teste (mock) que segue o contrato do desafio. Sem dependências, Node 18+.
// Uso: node server.js   ->  http://localhost:3333
const http = require('node:http')

const PORT = Number(process.env.PORT) || 3333
const FAIL_RATE = Number(process.env.FAIL_RATE ?? 0.1) // chance de erro 500 nas rotas de dados
const MIN_DELAY = 300
const MAX_DELAY = 800

const categories = [
  { slug: 'meditacao', name: 'Meditação' },
  { slug: 'yoga', name: 'Yoga' },
  { slug: 'nutricao', name: 'Nutrição' },
  { slug: 'respiracao', name: 'Respiração' },
]

// [título, categoria, tipo, minutos, instrutor, descrição]
const RAW = [
  ['Respiração para começar o dia', 'respiracao', 'audio', 7, 'Marina Duarte', 'Uma prática curta de respiração consciente para acordar com calma e foco.'],
  ['Saudação ao sol em fluxo', 'yoga', 'video', 35, 'Rafael Nogueira', 'Sequência dinâmica que conecta respiração e movimento.'],
  ['Meditação guiada para ansiedade', 'meditacao', 'audio', 12, 'Helena Prado', 'Um passo a passo para acolher pensamentos acelerados sem lutar contra eles.'],
  ['Alimentação equilibrada sem dogmas', 'nutricao', 'article', 10, 'Carla Rocha', 'Princípios simples para montar refeições variadas e saborosas.'],
  ['Yin yoga para os quadris', 'yoga', 'video', 50, 'Camila Torres', 'Posturas passivas mantidas por vários minutos para soltar a região dos quadris.'],
  ['Respiração 4-7-8 para dormir', 'respiracao', 'audio', 6, 'Alice Moraes', 'Técnica de respiração ritmada para desacelerar antes de deitar.'],
  ['Meditação do corpo inteiro', 'meditacao', 'audio', 20, 'Paulo Reis', 'Varredura corporal para perceber e soltar tensões acumuladas.'],
  ['Hatha clássico: alinhamento', 'yoga', 'video', 45, 'Júlia Andrade', 'Posturas sustentadas com atenção ao alinhamento e à estabilidade.'],
  ['Lanches saudáveis para o trabalho', 'nutricao', 'article', 8, 'Bruno Teixeira', 'Ideias práticas de lanches para manter a energia ao longo do dia.'],
  ['Pranayama: respiração alternada', 'respiracao', 'video', 15, 'Tiago Barros', 'Aprenda a respiração pelas narinas alternadas, passo a passo.'],
  ['Meditação da gratidão', 'meditacao', 'audio', 10, 'Larissa Campos', 'Prática breve para cultivar atenção ao que está bem no seu dia.'],
  ['Yoga na cadeira', 'yoga', 'video', 15, 'Diego Matos', 'Alongamentos e respiração para fazer no trabalho, sem tapete.'],
  ['Hidratação: o que a ciência diz', 'nutricao', 'article', 9, 'Dra. Simone Alves', 'Quanto beber de água de verdade e como perceber os sinais do corpo.'],
  ['Respiração para momentos de estresse', 'respiracao', 'audio', 5, 'Fernando Cunha', 'Três minutos de respiração para recuperar o equilíbrio em situações tensas.'],
  ['Yoga Nidra: relaxamento profundo', 'meditacao', 'audio', 30, 'Dra. Simone Alves', 'Meditação guiada deitada, que leva a um estado de descanso consciente.'],
  ['Vinyasa para força e equilíbrio', 'yoga', 'video', 50, 'Rafael Nogueira', 'Posturas em pé e apoios de braço para fortalecer core e pernas.'],
  ['Introdução à alimentação consciente', 'nutricao', 'article', 11, 'Patrícia Gomes', 'Como comer com atenção, reconhecer fome e saciedade e aproveitar mais as refeições.'],
  ['Meditação para foco no trabalho', 'meditacao', 'audio', 8, 'Otávio Brandão', 'Um reset rápido de atenção entre uma tarefa e outra.'],
  ['Alongamento para pescoço e ombros', 'yoga', 'video', 12, 'Fernando Cunha', 'Movimentos simples para aliviar a tensão de quem passa o dia no computador.'],
  ['Respiração diafragmática', 'respiracao', 'article', 7, 'Marina Duarte', 'Entenda como funciona e como praticar a respiração profunda no diafragma.'],
  ['Café da manhã que sustenta', 'nutricao', 'article', 9, 'Carla Rocha', 'Combinações de alimentos para manter a energia estável até o almoço.'],
  ['Meditação caminhando', 'meditacao', 'audio', 15, 'Elisa Duarte', 'Transforme uma caminhada curta em prática de atenção plena.'],
  ['Yoga restaurativo para o fim do dia', 'yoga', 'video', 45, 'Bruno Teixeira', 'Posturas apoiadas para soltar as tensões acumuladas ao longo do dia.'],
]

const contents = RAW.map(([title, category, type, min, instructor, description], i) => ({
  id: i + 1,
  title,
  description,
  category,
  type,
  durationSeconds: min * 60,
  instructor,
  thumbnailUrl: `http://localhost:${PORT}/images/namu-${i + 1}.jpg`,
  publishedAt: new Date(Date.UTC(2026, 7, 2 + i, 9, 0, 0)).toISOString().replace('.000Z', 'Z'),
}))

const favorites = new Set() // em memória: reiniciar o servidor zera

const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const COLORS = ['#4A3F7A', '#2F7DA6', '#3E8F66', '#C2456F', '#B07D1A']

function send(res, status, body, type = 'application/json') {
  res.writeHead(status, {
    'Content-Type': type + '; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(status === 204 ? undefined : typeof body === 'string' ? body : JSON.stringify(body))
}
const fail = (res, status, error) => send(res, status, { error })

function readJson(req) {
  return new Promise((resolve) => {
    let raw = ''
    req.on('data', (c) => (raw += c))
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}) } catch { resolve(null) }
    })
  })
}

function image(res, name) {
  const n = Number(/(\d+)/.exec(name)?.[1] ?? 0)
  const c = COLORS[n % COLORS.length]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><rect width="640" height="360" fill="${c}"/><circle cx="${120 + ((n * 67) % 400)}" cy="110" r="42" fill="#fff" fill-opacity=".85"/><circle cx="320" cy="400" r="150" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="4"/><circle cx="320" cy="400" r="230" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="4"/></svg>`
  send(res, 200, svg, 'image/svg+xml')
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  const path = url.pathname.replace(/\/+$/, '') || '/'

  if (req.method === 'OPTIONS') return send(res, 204)
  if (path.startsWith('/images/')) return image(res, path)

  await sleep(MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY))
  if (Math.random() < FAIL_RATE) return fail(res, 500, 'Erro interno simulado. Tente novamente.')

  const favList = () => contents.filter((c) => favorites.has(c.id))

  if (req.method === 'GET' && path === '/categories') return send(res, 200, categories)

  if (req.method === 'GET' && path === '/contents') {
    const q = url.searchParams
    const page = Number(q.get('page') ?? 1)
    const limit = Number(q.get('limit') ?? 10)
    if (!Number.isInteger(page) || page < 1) return fail(res, 400, 'Parâmetro page inválido.')
    if (!Number.isInteger(limit) || limit < 1) return fail(res, 400, 'Parâmetro limit inválido.')
    const size = Math.min(limit, 50)
    const search = norm(q.get('search') ?? '')
    const category = q.get('category') ?? ''
    const filtered = contents.filter(
      (c) => (!category || c.category === category) && norm(c.title).includes(search),
    )
    return send(res, 200, {
      data: filtered.slice((page - 1) * size, page * size),
      page,
      limit: size,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
    })
  }

  const one = /^\/contents\/([^/]+)$/.exec(path)
  if (req.method === 'GET' && one) {
    const id = Number(one[1])
    if (!Number.isInteger(id)) return fail(res, 400, 'Id inválido.')
    const c = contents.find((x) => x.id === id)
    return c ? send(res, 200, { ...c, isFavorite: favorites.has(id) }) : fail(res, 404, 'Conteúdo não encontrado.')
  }

  if (req.method === 'GET' && path === '/favorites') return send(res, 200, favList())

  if (req.method === 'POST' && path === '/favorites') {
    const body = await readJson(req)
    const id = Number(body?.contentId)
    if (!body || !Number.isInteger(id)) return fail(res, 400, 'contentId é obrigatório.')
    if (!contents.some((c) => c.id === id)) return fail(res, 404, 'Conteúdo não encontrado.')
    favorites.add(id)
    return send(res, 201, { contentId: id })
  }

  const del = /^\/favorites\/([^/]+)$/.exec(path)
  if (req.method === 'DELETE' && del) {
    const id = Number(del[1])
    if (!Number.isInteger(id)) return fail(res, 400, 'Id inválido.')
    favorites.delete(id)
    return send(res, 204)
  }

  return fail(res, 404, 'Rota não encontrada.')
})

server.listen(PORT, () => console.log(`API de teste em http://localhost:${PORT} (falhas simuladas: ${FAIL_RATE * 100}%)`))
# Prana · Aulas de yoga (Web)

Aplicação React para navegar por uma biblioteca de aulas, ver detalhes e salvar favoritas.
Stack: Vite, React 18, TypeScript, Tailwind CSS 4, React Router, TanStack Query, Vitest + Testing Library.

## Como rodar

Pré-requisitos: Node 18.18+ e a API rodando em `http://localhost:3333`
(`cp .env.example .env && docker compose up -d`, ou `cd api && node server.js`).

```bash
npm install
cp .env.example .env     # ajuste VITE_API_URL se a API estiver em outro endereço
npm run dev              # http://localhost:5173
```

Outros comandos: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

## Funcionalidades

- Catálogo paginado (9 por página) com imagem, título, categoria, tipo, duração e instrutor.
- Busca por título (com debounce) e filtro por categoria. Busca, categoria e página ficam na URL, então o link é compartilhável.
- Estados de carregamento (skeleton), lista vazia, e erro com "Tentar novamente".
- Detalhe em `/conteudos/:id`, acessível por link direto, com tela de "não encontrada".
- Favoritar/desfavoritar com **atualização otimista** e reversão se a API falhar. Página `/favoritos`.
- Layout responsivo, navegação por teclado, foco visível, link "Pular para o conteúdo", foco movido ao trocar de rota e região `aria-live` com o resultado da busca. Tema claro/escuro automático.

## Decisões

- **Cache e performance:** TanStack Query (`staleTime` de 30 s, `keepPreviousData` na paginação, categorias em cache permanente), `memo` nos cards e imagens com `loading="lazy"`.
- **Atualização otimista:** `useToggleFavorite` em `src/hooks/queries.ts` (`onMutate` guarda o estado anterior, `onError` restaura, `onSettled` revalida).
- **Código compartilhável:** `src/lib` (`types`, `api`, `format`) não depende de React nem do DOM, só de `fetch`. Em um monorepo, pode virar um pacote usado também pelo app React Native (troque `import.meta.env` pela configuração da URL).
- **Formato das respostas:** `/categories` e `/favorites` são aceitos como array direto ou `{ data: [...] }`. Ajuste `src/lib/api.ts` se o formato real for outro.

## Estrutura

```
src/
  lib/         tipos, cliente da API e regras de formatação (+ testes)
  hooks/       queries, mutação otimista, debounce
  components/  Layout, ContentCard, Pagination, FavoriteButton, estados
  pages/       CatalogPage, DetailPage, FavoritesPage
.github/workflows/ci.yml   lint, typecheck, testes e build
```

## Deploy (opcional)

Vercel ou Netlify: defina `VITE_API_URL` apontando para uma API acessível publicamente.
O `vercel.json` já faz o redirecionamento de rotas para o `index.html`.

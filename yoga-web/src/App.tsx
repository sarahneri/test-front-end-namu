
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { btn } from './components/ui'
import CatalogPage from './pages/CatalogPage'
import DetailPage from './pages/DetailPage'
import FavoritesPage from './pages/FavoritesPage'

function NotFound() {
  return (
    <section>
      <h1 className="mb-4 font-serif text-3xl font-bold">
        Página não encontrada
      </h1>
      <Link to="/" className={btn}>
        Voltar às aulas
      </Link>
    </section>
  )
}

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<CatalogPage />} />
          <Route path="conteudos/:id" element={<DetailPage />} />
          <Route path="favoritos" element={<FavoritesPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

import { useEffect, useRef } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useFavorites } from '../hooks/queries'

const navLink = ({ isActive }: { isActive: boolean }) =>
  `inline-flex min-h-11 items-center rounded-lg px-3 font-semibold focus-visible:outline-2 focus-visible:outline-amber-400 ${
    isActive ? 'bg-white text-indigo-800' : 'hover:bg-white/15'
  }`

export function Layout() {
  const { pathname } = useLocation()
  const main = useRef<HTMLElement>(null)
  const first = useRef(true)
  const favorites = useFavorites()

  // Ao trocar de rota, leva o foco ao conteúdo (leitores de tela e teclado)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    window.scrollTo(0, 0)
    main.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <a
        href="#principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-10 focus:rounded-lg focus:bg-indigo-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <header className="bg-indigo-800 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <Link to="/" className="font-serif text-2xl font-bold focus-visible:outline-2 focus-visible:outline-amber-400">
            Prana
          </Link>
          <nav aria-label="Principal" className="flex gap-1">
            <NavLink to="/" end className={navLink}>
              Aulas
            </NavLink>
            <NavLink to="/favoritos" className={navLink}>
              Favoritas{favorites.data ? ` (${favorites.data.length})` : ''}
            </NavLink>
          </nav>
        </div>
      </header>
      <main id="principal" ref={main} tabIndex={-1} className="mx-auto max-w-6xl px-4 py-8 outline-none">
        <Outlet />
      </main>
    </div>
  )
}

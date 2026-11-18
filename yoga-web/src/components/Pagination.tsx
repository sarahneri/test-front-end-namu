import { btnGhost } from './ui'

interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null
  return (
    <nav aria-label="Paginação" className="mt-8 flex items-center justify-center gap-3">
      <button type="button" className={btnGhost} disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Anterior
      </button>
      <span aria-current="page">
        Página {page} de {totalPages}
      </span>
      <button type="button" className={btnGhost} disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Próxima
      </button>
    </nav>
  )
}

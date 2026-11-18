import type { ReactNode } from 'react'
import { btn, card, muted } from './ui'

export function LoadingGrid({ count = 9 }: { count?: number }) {
  return (
    <ul aria-hidden="true" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="h-72 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      ))}
    </ul>
  )
}

interface BoxProps {
  title: string
  children: ReactNode
  action?: { label: string; onClick: () => void }
  role?: 'alert'
}

function Box({ title, children, action, role }: BoxProps) {
  return (
    <div role={role} className={`max-w-xl p-6 ${card}`}>
      <h2 className="mb-1 text-xl font-semibold">{title}</h2>
      <p className={`mb-4 ${muted}`}>{children}</p>
      {action && (
        <button type="button" className={btn} onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  )
}

export const ErrorState = ({ message, onRetry }: { message?: string; onRetry: () => void }) => (
  <Box role="alert" title="Não foi possível carregar" action={{ label: 'Tentar novamente', onClick: onRetry }}>
    {message ?? 'Houve uma falha na comunicação com o servidor.'}
  </Box>
)

export const EmptyState = ({ onClear }: { onClear: () => void }) => (
  <Box title="Nada por aqui" action={{ label: 'Limpar busca e filtro', onClick: onClear }}>
    Nenhum conteúdo corresponde à busca e ao filtro atuais.
  </Box>
)

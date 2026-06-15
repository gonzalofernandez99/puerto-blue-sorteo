import { rangosConNumeros } from '../lib/numbers.js'

export default function RaffleMachine({ estado, display, total, onSortear, onReiniciar }) {
  const girando = estado === 'spinning'
  const listo = estado === 'done'
  const rangos = rangosConNumeros()

  return (
    <section className="machine">
      <div className="machine__rangos">
        {rangos.map((r, i) => (
          <span className="chip" key={i} style={{ '--c': r.color }}>
            {r.etiqueta}: {r.cantidad} números
          </span>
        ))}
        <span className="chip chip--total">{total} números en la bolilla</span>
      </div>

      <div
        className={`reel ${girando ? 'reel--spin' : ''} ${listo ? 'reel--win' : ''}`}
        aria-live="polite"
      >
        <div className="reel__label">
          {listo ? '🎉 Número ganador' : girando ? 'Sorteando…' : 'Número ganador'}
        </div>
        <div className="reel__num">{display ?? '—'}</div>
      </div>

      <div className="machine__acciones">
        {!listo ? (
          <button
            type="button"
            className="btn btn--primary"
            onClick={onSortear}
            disabled={girando}
          >
            {girando ? 'Girando…' : '🎲 Sortear ganador'}
          </button>
        ) : (
          <button type="button" className="btn btn--ghost" onClick={onReiniciar}>
            ↺ Reiniciar sorteo
          </button>
        )}
      </div>
    </section>
  )
}

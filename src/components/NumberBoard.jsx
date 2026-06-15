import { useEffect } from 'react'
import { rangosConNumeros, totalNumeros } from '../lib/numbers.js'

export default function NumberBoard({ ganador }) {
  const rangos = rangosConNumeros()
  const total = totalNumeros()

  // Cuando hay ganador, lo resalta en la planilla (el video puede mostrarlo).
  useEffect(() => {
    if (ganador == null) return
    const el = document.getElementById(`celda-${ganador}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [ganador])

  return (
    <section className="board" id="planilla">
      <div className="board__head">
        <h2>Planilla de números participantes</h2>
        <p>
          Los dos rangos se mezclan en una sola bolilla:{' '}
          <strong>{total} números</strong> en total. Sale un solo número ganador.
        </p>
      </div>

      {rangos.map((r, i) => (
        <div className="board__group" key={i}>
          <div className="board__groupHead">
            <span className="dot" style={{ background: r.color }} />
            <h3>{r.etiqueta}</h3>
            <span className="board__count">
              {r.cantidad} números · {r.resumen}
            </span>
          </div>
          <div className="grid">
            {r.numeros.map((n) => (
              <span
                key={n}
                id={`celda-${n}`}
                className={`cell ${ganador === n ? 'cell--win' : ''}`}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

import { config } from '../config.js'
import SafeImage from './SafeImage.jsx'

export default function WinnerOverlay({ ganador, onReiniciar, onCerrar }) {
  if (ganador == null) return null

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Ganador del sorteo">
      <div className="overlay__card">
        <button type="button" className="overlay__close" onClick={onCerrar} aria-label="Cerrar">
          ✕
        </button>

        <p className="overlay__kicker">¡Tenemos ganador!</p>
        <div className="overlay__num">{ganador}</div>
        <p className="overlay__msg">
          El número <strong>{ganador}</strong> se lleva:
        </p>

        <div className="overlay__premios">
          {config.premios.map((p, i) => (
            <div className="overlay__premio" key={i}>
              <span className="overlay__premioImg">
                <SafeImage
                  src={p.imagen}
                  alt={p.titulo}
                  fallback={<span aria-hidden="true">{p.emoji}</span>}
                />
              </span>
              <strong>{p.titulo}</strong>
            </div>
          ))}
        </div>

        <div className="overlay__acciones">
          <button type="button" className="btn btn--ghost" onClick={onCerrar}>
            Ver planilla
          </button>
          <button type="button" className="btn btn--primary" onClick={onReiniciar}>
            ↺ Reiniciar sorteo
          </button>
        </div>
      </div>
    </div>
  )
}

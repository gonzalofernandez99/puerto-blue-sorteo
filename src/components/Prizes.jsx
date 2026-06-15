import { config } from '../config.js'
import SafeImage from './SafeImage.jsx'

export default function Prizes() {
  return (
    <div className="premios">
      <p className="premios__label">El ganador se lleva</p>
      <div className="premios__lista">
        {config.premios.map((p, i) => (
          <div className="premio" key={i}>
            <div className="premio__img">
              <SafeImage
                src={p.imagen}
                alt={p.titulo}
                fallback={<span className="premio__emoji" aria-hidden="true">{p.emoji}</span>}
              />
            </div>
            <div className="premio__txt">
              <strong>{p.titulo}</strong>
              {p.detalle && <span>{p.detalle}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

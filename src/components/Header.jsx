import { config } from '../config.js'
import SafeImage from './SafeImage.jsx'

export default function Header({ sonido, onToggleSonido }) {
  return (
    <header className="header">
      <div className="header__brand">
        <SafeImage
          src={config.logo}
          alt={config.empresa}
          className="header__logo"
          fallback={
            <div className="header__logoText" aria-label={config.empresa}>
              <span className="header__pb">PB</span>
              <span className="header__name">{config.empresa}</span>
            </div>
          }
        />
      </div>

      <button
        type="button"
        className="iconBtn"
        onClick={onToggleSonido}
        aria-pressed={sonido}
        title={sonido ? 'Sonido activado' : 'Sonido silenciado'}
      >
        <span aria-hidden="true">{sonido ? '🔊' : '🔇'}</span>
        <span className="iconBtn__txt">{sonido ? 'Sonido' : 'Silencio'}</span>
      </button>
    </header>
  )
}

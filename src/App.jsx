import { useEffect, useState } from 'react'
import { config } from './config.js'
import { useRaffle } from './lib/useRaffle.js'
import { setSonido } from './lib/sound.js'
import Header from './components/Header.jsx'
import Prizes from './components/Prizes.jsx'
import RaffleMachine from './components/RaffleMachine.jsx'
import NumberBoard from './components/NumberBoard.jsx'
import WinnerOverlay from './components/WinnerOverlay.jsx'
import SafeImage from './components/SafeImage.jsx'

export default function App() {
  const { estado, display, ganador, sortear, reiniciar, total } = useRaffle()
  const [sonido, setSon] = useState(config.sonido)
  const [overlay, setOverlay] = useState(false)

  // Sincroniza el estado del sonido con el modulo de audio.
  useEffect(() => {
    setSonido(sonido)
  }, [sonido])

  // Cuando termina el sorteo, muestra el cartel del ganador.
  useEffect(() => {
    if (estado === 'done') setOverlay(true)
  }, [estado])

  const handleReiniciar = () => {
    setOverlay(false)
    reiniciar()
  }

  return (
    <div className="app">
      <Header sonido={sonido} onToggleSonido={() => setSon((v) => !v)} />

      <main className="contenido">
        <section className="hero">
          <p className="hero__kicker">{config.empresa} · {config.subtitulo}</p>
          <h1 className="hero__titulo">{config.titulo}</h1>
          <p className="hero__bajada">{config.bajada}</p>

          <SafeImage
            src={config.showcase}
            alt="Premio del sorteo"
            className="hero__showcase"
          />

          <Prizes />
        </section>

        <RaffleMachine
          estado={estado}
          display={display}
          total={total}
          onSortear={() => sortear(config.duracionSorteoMs)}
          onReiniciar={handleReiniciar}
        />

        <NumberBoard ganador={ganador} />
      </main>

      <footer className="footer">
        <span>{config.empresa}</span>
        <a href={config.urlWeb} target="_blank" rel="noopener noreferrer">
          {config.web}
        </a>
      </footer>

      {overlay && (
        <WinnerOverlay
          ganador={ganador}
          onReiniciar={handleReiniciar}
          onCerrar={() => setOverlay(false)}
        />
      )}
    </div>
  )
}

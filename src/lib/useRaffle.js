import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { construirBolilla } from './numbers.js'
import { elegirAlAzar } from './random.js'
import { lanzarConfetti } from './celebrate.js'
import { prepararAudio, tick, redoble, fanfarria } from './sound.js'

// Curva de aceleracion: arranca lento el "freno" y al final cada cambio de
// numero tarda mas (efecto ruleta que desacelera).
const easeInCubic = (t) => t * t * t

// estados posibles:  'idle' (listo) | 'spinning' (girando) | 'done' (ganador)
export function useRaffle() {
  const bolilla = useMemo(() => construirBolilla(), [])
  const [estado, setEstado] = useState('idle')
  const [display, setDisplay] = useState(null) // numero grande que se ve girar
  const [ganador, setGanador] = useState(null)
  const rafRef = useRef(0)

  const sortear = useCallback(
    (duracionMs) => {
      if (estado === 'spinning') return
      prepararAudio()

      const elegido = elegirAlAzar(bolilla)
      setGanador(null)
      setEstado('spinning')

      const inicio = performance.now()
      let ultimoCambio = 0

      const animar = (ahora) => {
        const transcurrido = ahora - inicio
        const t = Math.min(transcurrido / duracionMs, 1)
        // intervalo entre cambios: de ~30ms (rapido) a ~340ms (lento)
        const intervalo = 30 + 320 * easeInCubic(t)

        if (ahora - ultimoCambio >= intervalo) {
          setDisplay(elegirAlAzar(bolilla))
          // tick normal casi todo el giro; redoble tenso en el tramo final
          if (t > 0.8) redoble()
          else tick()
          ultimoCambio = ahora
        }

        if (t < 1) {
          rafRef.current = requestAnimationFrame(animar)
        } else {
          // Aterriza en el ganador real y festeja.
          setDisplay(elegido)
          setGanador(elegido)
          setEstado('done')
          lanzarConfetti()
          fanfarria()
        }
      }

      rafRef.current = requestAnimationFrame(animar)
    },
    [bolilla, estado],
  )

  const reiniciar = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    setEstado('idle')
    setGanador(null)
    setDisplay(null)
  }, [])

  // Limpieza si el componente se desmonta en medio de una animacion.
  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return { estado, display, ganador, sortear, reiniciar, total: bolilla.length }
}

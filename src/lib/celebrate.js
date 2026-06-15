import confetti from 'canvas-confetti'

// Azul y blanco (los colores de Puerto Blue) + un dorado para el brillo.
const COLORES = ['#1e74d4', '#ffffff', '#0b2a52', '#9ec9ff', '#f5c451']

// Explosion grande al revelar al ganador, con varias rafagas seguidas.
export function lanzarConfetti() {
  const fin = Date.now() + 2500

  // Dos canones desde los costados.
  ;(function rafaga() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 70,
      startVelocity: 55,
      origin: { x: 0, y: 0.7 },
      colors: COLORES,
    })
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 70,
      startVelocity: 55,
      origin: { x: 1, y: 0.7 },
      colors: COLORES,
    })
    if (Date.now() < fin) requestAnimationFrame(rafaga)
  })()

  // Estallido central inicial.
  confetti({
    particleCount: 160,
    spread: 100,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.5 },
    colors: COLORES,
  })

  // Lluvia desde arriba un toque despues.
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 120,
      startVelocity: 35,
      gravity: 0.8,
      origin: { x: 0.5, y: 0 },
      colors: COLORES,
    })
  }, 350)
}

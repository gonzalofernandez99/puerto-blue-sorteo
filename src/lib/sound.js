// ============================================================================
//  SONIDO  -  Todo se genera con Web Audio API (sin archivos externos), asi
//  que funciona siempre y no depende de descargar ningun mp3.
// ============================================================================

let ctx = null
let activado = true

// El AudioContext debe crearse/reanudarse a partir de un gesto del usuario
// (un click). Llamamos a esto dentro del boton "Sortear".
export function prepararAudio() {
  if (typeof window === 'undefined') return
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (AC) ctx = new AC()
  }
  if (ctx && ctx.state === 'suspended') ctx.resume()
}

export function setSonido(on) {
  activado = on
}
export function getSonido() {
  return activado
}

function puedeSonar() {
  return activado && ctx
}

// Tono basico con envolvente suave para que no "clickee" feo.
function tono({ freq, inicio, duracion, tipo = 'sine', volumen = 0.2 }) {
  if (!ctx) return
  const t0 = ctx.currentTime + inicio
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = tipo
  osc.frequency.setValueAtTime(freq, t0)
  gain.gain.setValueAtTime(0, t0)
  gain.gain.linearRampToValueAtTime(volumen, t0 + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duracion)
  osc.connect(gain).connect(ctx.destination)
  osc.start(t0)
  osc.stop(t0 + duracion + 0.02)
}

// "Tick" corto mientras giran los numeros (como una ruleta).
export function tick() {
  if (!puedeSonar()) return
  tono({ freq: 1200, inicio: 0, duracion: 0.05, tipo: 'square', volumen: 0.08 })
}

// Pequeno "redoble" tenso en los ultimos segundos antes de revelar.
export function redoble() {
  if (!puedeSonar()) return
  tono({ freq: 180, inicio: 0, duracion: 0.08, tipo: 'sawtooth', volumen: 0.06 })
}

// Ruido blanco corto = el "pop" del confetti.
function pop(inicio = 0, volumen = 0.25) {
  if (!ctx) return
  const dur = 0.18
  const muestras = Math.floor(ctx.sampleRate * dur)
  const buffer = ctx.createBuffer(1, muestras, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < muestras; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / muestras) // decae
  }
  const src = ctx.createBufferSource()
  src.buffer = buffer
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(volumen, ctx.currentTime + inicio)
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + inicio + dur)
  const filtro = ctx.createBiquadFilter()
  filtro.type = 'highpass'
  filtro.frequency.value = 800
  src.connect(filtro).connect(gain).connect(ctx.destination)
  src.start(ctx.currentTime + inicio)
}

// Fanfarria de victoria + pops de confetti, todo junto al revelar al ganador.
export function fanfarria() {
  if (!puedeSonar()) return
  // Acorde ascendente alegre (Do - Mi - Sol - Do agudo)
  const notas = [523.25, 659.25, 783.99, 1046.5]
  notas.forEach((f, i) => {
    tono({ freq: f, inicio: i * 0.12, duracion: 0.5, tipo: 'triangle', volumen: 0.22 })
  })
  // Brillo agudo final
  tono({ freq: 1567.98, inicio: 0.5, duracion: 0.7, tipo: 'sine', volumen: 0.18 })
  // Pops de confetti
  pop(0.0, 0.3)
  pop(0.18, 0.22)
  pop(0.4, 0.2)
}

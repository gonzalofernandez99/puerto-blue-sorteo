import { config } from '../config.js'

// Genera la lista de numeros de un rango [desde, hasta] (ambos incluidos).
function expandirRango({ desde, hasta }) {
  const lista = []
  const min = Math.min(desde, hasta)
  const max = Math.max(desde, hasta)
  for (let n = min; n <= max; n++) lista.push(n)
  return lista
}

// Devuelve cada rango con sus numeros ya expandidos (para la planilla).
export function rangosConNumeros() {
  return config.rangos.map((r) => ({
    ...r,
    numeros: expandirRango(r),
  }))
}

// La "bolilla": TODOS los numeros de TODOS los rangos mezclados en una sola
// lista. De aca se saca el unico ganador.
export function construirBolilla() {
  return config.rangos.flatMap(expandirRango)
}

// Cantidad total de numeros participantes.
export function totalNumeros() {
  return construirBolilla().length
}

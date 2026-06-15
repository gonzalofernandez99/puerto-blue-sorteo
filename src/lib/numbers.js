import { config } from '../config.js'

// Expande un "grupo" de numeros. Soporta dos formas:
//   1) rango corrido:   { desde, hasta }            -> 1,2,3,...,N
//   2) lista explicita: { numeros: [1, 5, 8, ...] } -> esos numeros tal cual
// Siempre devuelve la lista ordenada y sin duplicados.
function expandirRango(r) {
  let lista
  if (Array.isArray(r.numeros)) {
    lista = r.numeros
  } else {
    lista = []
    const min = Math.min(r.desde, r.hasta)
    const max = Math.max(r.desde, r.hasta)
    for (let n = min; n <= max; n++) lista.push(n)
  }
  return [...new Set(lista)].sort((a, b) => a - b)
}

// Resume una lista ordenada a texto, juntando tramos seguidos.
// Ej: [1..56, 64, 73, 77, 78] -> "1–56, 64, 73, 77–78"
function resumirNumeros(numeros) {
  if (numeros.length === 0) return ''
  const partes = []
  let inicio = numeros[0]
  let prev = numeros[0]
  for (let i = 1; i <= numeros.length; i++) {
    const n = numeros[i]
    if (n === prev + 1) {
      prev = n
      continue
    }
    partes.push(inicio === prev ? `${inicio}` : `${inicio}–${prev}`)
    inicio = n
    prev = n
  }
  return partes.join(', ')
}

// Devuelve cada grupo con sus numeros expandidos + datos para mostrar.
export function rangosConNumeros() {
  return config.rangos.map((r) => {
    const numeros = expandirRango(r)
    return { ...r, numeros, cantidad: numeros.length, resumen: resumirNumeros(numeros) }
  })
}

// La "bolilla": TODOS los numeros de TODOS los grupos mezclados en una sola
// lista. De aca se saca el unico ganador.
export function construirBolilla() {
  return config.rangos.flatMap(expandirRango)
}

// Cantidad total de numeros participantes.
export function totalNumeros() {
  return construirBolilla().length
}

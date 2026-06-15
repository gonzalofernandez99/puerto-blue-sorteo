// Numero entero aleatorio en [0, max) SIN sesgo, usando el generador
// criptografico del navegador (mas justo y transparente que Math.random()).
function enteroSeguro(max) {
  if (max <= 0) return 0
  const rango = 2 ** 32
  const limite = rango - (rango % max) // descarta el resto para evitar sesgo
  const buf = new Uint32Array(1)
  let x
  do {
    crypto.getRandomValues(buf)
    x = buf[0]
  } while (x >= limite)
  return x % max
}

// Elige un elemento al azar de una lista (todos con la misma probabilidad).
export function elegirAlAzar(lista) {
  return lista[enteroSeguro(lista.length)]
}

import { useState } from 'react'

// Muestra una imagen, pero si no existe (o falla la carga) muestra el
// "fallback" (por ej. un emoji). Asi la app nunca queda con imagenes rotas
// aunque todavia no hayas subido las fotos a public/imagenes/.
export default function SafeImage({ src, alt = '', className, fallback = null }) {
  const [error, setError] = useState(false)
  if (!src || error) return fallback
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />
}

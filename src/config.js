// ============================================================================
//  CONFIGURACION DEL SORTEO  -  Puerto Blue
//  Edita SOLO este archivo para personalizar el sorteo. No hace falta tocar
//  el resto del codigo.
// ============================================================================

// Helper interno: arma la ruta correcta a las imagenes de la carpeta /public.
// Pone las imagenes en la carpeta  public/imagenes/  y aca solo el nombre.
// (Si la imagen todavia no esta subida, la app la oculta sola, no se rompe.)
const img = (nombre) => (nombre ? import.meta.env.BASE_URL + 'imagenes/' + nombre : null)

// Helper: lista de numeros del A al B (inclusive). Sirve para escribir
// rangos corridos comodos. Ej:  ...delAl(1, 56)  ->  1, 2, 3, ..., 56
const delAl = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i)

export const config = {
  // --- Marca ---------------------------------------------------------------
  empresa: 'PUERTO BLUE',
  subtitulo: 'Sorteo Día del Padre',
  // Si tenes un logo, copialo en  public/imagenes/  y poné el nombre aca,
  // por ej: logo: img('logo.png'). Si lo dejas en null, se muestra el texto.
  logo: img(null),
  // Web del cliente (aparece en el pie de pagina)
  web: 'www.puertoblue.com.ar',
  urlWeb: 'https://www.puertoblue.com.ar/',

  // --- Titulo / textos del show -------------------------------------------
  titulo: 'Gran Sorteo',
  // Texto opcional debajo del titulo. Si lo dejas vacio (''), no se muestra.
  bajada: '',

  // --- Foto del premio (showcase) -----------------------------------------
  // Imagen grande del premio (la camiseta + las zapatillas).
  // Copia la foto en  public/imagenes/  con el nombre  premio.png
  showcase: img('premio.png'),

  // --- Premios -------------------------------------------------------------
  // El unico ganador se lleva TODO esto. "imagen" es opcional.
  premios: [
    { titulo: 'Camiseta de la Selección', detalle: 'Argentina', emoji: '👕', imagen: img(null) },
    { titulo: 'Zapatillas a elección', detalle: 'El par que quieras', emoji: '👟', imagen: img(null) },
  ],

  // --- Numeros que participan ---------------------------------------------
  // Los grupos se MEZCLAN en una sola bolilla. Sale UN solo numero ganador.
  // Cada grupo se puede definir de dos formas:
  //   a) rango corrido:  { desde: 9790, hasta: 9990 }
  //   b) lista de cupones sueltos:  { numeros: [...delAl(1, 56), 64, 73, ...] }
  // "etiqueta" es solo para mostrar en la planilla / explicar en el video.
  rangos: [
    { desde: 9790, hasta: 9990, etiqueta: 'Ventas Web', color: '#1e74d4' },
    {
      etiqueta: 'Talonario Local (Recoleta)',
      color: '#0e9f6e',
      // Cupones del talonario: del 1 al 56, mas estos sueltos.
      numeros: [...delAl(1, 56), 64, 73, 77, 78, 86, 98, 111, 150],
    },
  ],

  // --- Show ---------------------------------------------------------------
  // Duracion de la animacion del sorteo en milisegundos (5500 = 5,5 segundos).
  duracionSorteoMs: 5500,
  // Sonido encendido por defecto (igual se puede silenciar con el boton).
  sonido: true,
}

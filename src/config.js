// ============================================================================
//  CONFIGURACION DEL SORTEO  -  Puerto Blue
//  Edita SOLO este archivo para personalizar el sorteo. No hace falta tocar
//  el resto del codigo.
// ============================================================================

// Helper interno: arma la ruta correcta a las imagenes de la carpeta /public.
// Pone las imagenes en la carpeta  public/imagenes/  y aca solo el nombre.
// (Si la imagen todavia no esta subida, la app la oculta sola, no se rompe.)
const img = (nombre) => (nombre ? import.meta.env.BASE_URL + 'imagenes/' + nombre : null)

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
  bajada:
    'Un solo número gana. Todos los números participantes están a la vista en la planilla para que el sorteo sea 100% transparente.',

  // --- Foto del premio (showcase) -----------------------------------------
  // Imagen grande del premio (la camiseta + las zapatillas).
  // Copia la foto en  public/imagenes/  con el nombre  premio.jpg
  showcase: img('premio.jpg'),

  // --- Premios -------------------------------------------------------------
  // El unico ganador se lleva TODO esto. "imagen" es opcional.
  premios: [
    { titulo: 'Camiseta de la Selección', detalle: 'Argentina', emoji: '👕', imagen: img(null) },
    { titulo: 'Zapatillas a elección', detalle: 'El par que quieras', emoji: '👟', imagen: img(null) },
  ],

  // --- Numeros que participan ---------------------------------------------
  // Los dos rangos se MEZCLAN en una sola bolilla. Sale UN solo numero ganador.
  // "etiqueta" es solo para mostrar en la planilla / explicar en el video.
  rangos: [
    { desde: 9790, hasta: 9990, etiqueta: 'Ventas Web', color: '#1e74d4' },
    { desde: 1, hasta: 300, etiqueta: 'Talonario Local (Recoleta)', color: '#0e9f6e' },
  ],

  // --- Show ---------------------------------------------------------------
  // Duracion de la animacion del sorteo en milisegundos (5500 = 5,5 segundos).
  duracionSorteoMs: 5500,
  // Sonido encendido por defecto (igual se puede silenciar con el boton).
  sonido: true,
}

# 🎲 Sorteo Puerto Blue

Web del sorteo oficial de **Puerto Blue** (Día del Padre). Un solo ganador entre
todos los números participantes, con animación, confetti y sonido para hacerlo
en vivo. Pensada para mostrar en pantalla / grabar el video.

- ✅ **501 números** precargados y mezclados en una sola bolilla
  (rango **9790–9990** + rango **1–300**).
- ✅ **Planilla** con todos los números a la vista (transparencia para el video).
- ✅ **Animación** de números girando que desacelera antes de revelar al ganador.
- ✅ **Confetti + sonido** al revelar.
- ✅ **Botón de reiniciar** para volver a sortear.
- ✅ Sorteo **justo**: el ganador se elige con el generador criptográfico del
  navegador (cada número tiene exactamente la misma probabilidad).

---

## 🌐 La página queda en

```
https://gonzalofernandez99.github.io/puerto-blue-sorteo/
```

(Se activa una sola vez siguiendo el paso de abajo.)

## 🚀 Cómo publicarla en internet (una sola vez)

La web se construye y se publica **sola** cada vez que se sube código, usando
GitHub Pages. Solo hay que activarlo una vez:

1. En GitHub, andá a este repositorio → **Settings** (Configuración).
2. En el menú de la izquierda → **Pages**.
3. En **Build and deployment → Source**, elegí **GitHub Actions**.
4. ¡Listo! Esperá 1–2 minutos y entrá a la URL de arriba.

> Cada vez que cambies algo (o subas las fotos), GitHub vuelve a publicar la web
> automáticamente. Lo podés ver en la pestaña **Actions**.

## 🖼️ Agregar las fotos del premio

Poné las imágenes en la carpeta **`public/imagenes/`** (mirá el archivo
`LEEME.txt` que está ahí). El nombre principal es:

- **`premio.jpg`** → la foto de la camiseta + las zapatillas (aparece en la portada).

La forma más fácil: en GitHub, entrá a `public/imagenes`, botón **Add file →
Upload files**, arrastrá la foto y confirmá. Si todavía no hay foto, la web
funciona igual (no se rompe).

## ⚙️ Personalizar (textos, premios, números)

Todo se edita en un solo archivo: **`src/config.js`**

- Nombre, subtítulo y logo de la empresa.
- Título y bajada de la portada.
- Los premios (texto y/o imágenes).
- **Los rangos de números** del sorteo y sus etiquetas.
- Duración de la animación y sonido on/off.

## 💻 Probar en tu computadora (opcional, para programadores)

```bash
npm install      # instala todo (solo la primera vez)
npm run dev      # abre la web en modo desarrollo
npm run build    # genera la versión final en la carpeta dist/
npm run preview  # prueba esa versión final
```

## 🧱 Tecnología

Hecho con **React + Vite**. El confetti usa `canvas-confetti` y el sonido se
genera con la Web Audio API (sin archivos de audio externos).

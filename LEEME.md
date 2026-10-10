# Biblioteca El Saber

## Estructura

- `index.html`: página principal.
- `css/estilos.css`: estilos de la página.
- `js/script.js`: funciones de la biblioteca y guardado de libros.
- `imagenes/`: coloca aquí las tres imágenes.
- `videos/`: coloca aquí el video MP4.
- `audio/`: coloca aquí el audiolibro MP3.
- `libros/`: coloca aquí los archivos PDF que quieras enlazar desde el formulario.
- `.vscode/`: carpeta opcional de configuración de Visual Studio Code.

## Archivos que debes colocar

Copia tus recursos a estas ubicaciones y conserva sus nombres:

- `imagenes/images.jpg`
- `imagenes/images (1).jpg`
- `imagenes/images (2).jpg`
- `videos/videoplayback.mp4`
- `audio/Un día de estos, de Gabriel García Márquez (cuento corto) AUDIOLIBRO  Lectura  Voz humana.mp3`
- `libros/Babylonia.pdf`
- `libros/HABITOS.pdf`

Si el nombre real de tu MP3 contiene espacios o caracteres diferentes, actualiza el `src` correspondiente en `index.html`.

## Cómo abrir el proyecto

1. Extrae esta carpeta ZIP.
2. Abre la carpeta `Biblioteca_El_Saber` en Visual Studio Code.
3. Copia tus imágenes, video, audio y PDF a las carpetas indicadas.
4. Abre `index.html` con Live Server (recomendado) o en el navegador.

## Guardado de libros

Los libros que agregues se guardan en `localStorage` del navegador y seguirán apareciendo al recargar la página en el mismo navegador y en el mismo origen. Esto no sube los libros a GitHub ni los comparte automáticamente con otros visitantes. Si borras los datos del navegador, los libros guardados localmente podrían eliminarse.

Para enlazar un PDF local, usa en el formulario una dirección como `libros/Babylonia.pdf`. El archivo debe existir dentro de la carpeta del proyecto.

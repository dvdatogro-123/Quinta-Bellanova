# Quinta Bellanova

Sitio estático con Tailwind CSS v4. El archivo `index.html` carga `dist/output.css` y `src/main.js`.

## Desarrollo

```bash
npm install
npm run watch
```

`npm run watch` recompila el CSS cuando cambian `index.html` o los estilos. Para generar una versión final del CSS:

```bash
npm run build
```

Para publicar el sitio, conserva `index.html`, `dist/output.css`, `src/main.js` y la carpeta `imagenes/`. El archivo `style.css` contiene los estilos propios del sitio y se incorpora al CSS generado desde `src/input.css`.

## Identidad y vista previa al compartir

- `imagenes/qb-marca.png`: símbolo de la marca enviado por el usuario, usado en navegación y pie de página.
- `imagenes/qb-favicon.png`: favicon de 32 × 32 px.
- `imagenes/qb-apple-touch-icon.png`: icono de 180 × 180 px.
- `imagenes/quinta-bellanova-social.jpg`: portada para compartir el enlace.

Cuando se conozca el dominio de publicación, convertir las rutas `og:image` y `twitter:image` de `index.html` en URL absolutas HTTPS y añadir `og:url` y el enlace `canonical`. Comprobar entonces la vista previa desde el enlace público.

La ubicación pública se limita a la zona. No añadir la dirección exacta ni coordenadas a mapas, metadatos o imágenes.

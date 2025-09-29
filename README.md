# MiTienda — Sitio de práctica (HTML, CSS, JS)

Proyecto educativo con 6 páginas: Inicio, Registro, Quiénes somos, Catálogo, Carrito y Búsqueda.

## Publicación en GitHub Pages
1. Crea un repositorio nuevo en GitHub, por ejemplo: `mitienda-ecommerce`.
2. Sube todos los archivos de la carpeta (incluyendo `index.html`, `styles.css` y `script.js`).
3. En **Settings → Pages**, en **Build and deployment**, selecciona **Deploy from a branch**.
4. Elige la rama `main` y la carpeta `/root` (si aplica). Guarda.
5. Espera a que se genere la página. La URL será algo como: `https://tuusuario.github.io/mitienda-ecommerce/`

## Estructura
```
.
├─ index.html
├─ registro.html
├─ quienes.html
├─ catalogo.html
├─ carrito.html
├─ busqueda.html
├─ styles.css
└─ script.js
```

## Notas
- Navegación en `<nav>` con `<ul><li>`.
- Enlaces relativos entre páginas internas y un ejemplo de enlace absoluto externo.
- **Sin** CSS ni JS en línea; todo va en archivos externos obligatorios.
- Contador de carrito ficticio usando `sessionStorage`.
- Validaciones HTML5 + lógicas en JavaScript para el formulario de registro.
- Cálculo de total en el carrito al cambiar cantidades.
- Búsqueda que muestra el texto ingresado y resultados de demostración.

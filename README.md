# TecnoStock - Examen Práctico de JavaScript Vanilla

Proyecto frontend desarrollado con JavaScript Vanilla (ES Modules), HTML5 y CSS3 para la gestión de un catálogo de productos de tecnología y un carrito de compras interactivo con persistencia local.

---

## 🚀 Cómo ejecutar la aplicación

Dado que la aplicación está construida utilizando **módulos de JavaScript (`type="module"`)** y realiza peticiones asíncronas con **`fetch()`** para leer el archivo local `data/products.json`, los navegadores modernos bloquean estas peticiones por políticas de seguridad (CORS) si se abre el archivo directamente con doble clic (`file:///`). 

Por lo tanto, es necesario ejecutar el proyecto mediante un servidor local:

### Opción 1: Live Server en Visual Studio Code (Recomendada)
1. Instala la extensión **Live Server** (de Ritwick Dey) en VS Code.
2. Abre la carpeta del proyecto en VS Code.
3. Haz clic derecho sobre el archivo `index.html` y selecciona **"Open with Live Server"** (o presiona el botón **"Go Live"** en la barra de estado inferior).
4. El proyecto se abrirá automáticamente en tu navegador en la dirección `http://127.0.0.1:5500`.

### Opción 2: Usando Node.js con `serve`
Si tienes Node.js instalado, puedes abrir una terminal en la raíz del proyecto y ejecutar:
```bash
npx serve .
```
Luego abre en el navegador el enlace que te indique la terminal (por ejemplo: `http://localhost:3000`).

### Opción 3: Usando Python
Si tienes Python instalado, ejecuta en la terminal dentro de la carpeta:
```bash
python -m http.server 8000
```
Y abre en tu navegador `http://localhost:8000`.

---

## 📁 Estructura del Proyecto

```text
Examen_javaScript/
├── index.html                  # Estructura principal y contenedor de los componentes
├── README.md                   # Documentación y guía del proyecto
├── css/
│   └── styles.css              # Estilos visuales de la interfaz (diseño responsivo y amigable)
├── data/
│   └── products.json           # Base de datos simulada con 12 productos en 3 categorías
└── js/
    ├── api.js                  # Petición fetch asíncrona para obtener el catálogo
    ├── app.js                  # Controlador principal: eventos, filtrado y renderizado general
    ├── cart.js                 # Lógica de cálculo de totales, descuentos y formato de moneda
    ├── storage.js              # Manejo del almacenamiento y lectura en localStorage
    └── components/
        ├── product-card.js     # Web Component (<product-card>) para mostrar cada producto
        ├── product-list.js     # Web Component (<product-list>) contenedor en rejilla (grid)
        └── shopping-cart.js    # Web Component (<shopping-cart>) con la vista y botones del carrito
```

---

## 📋 Cumplimiento de Requisitos

### 1. Catálogo de Productos
- **Datos iniciales (`data/products.json`)**: Contiene 12 productos distribuidos equilibradamente en las 3 categorías requeridas:
  - **Perifericos**: Teclado mecánico, Mouse inalámbrico, Audífonos, Cámara web Full HD.
  - **Accesorios**: Base para portátil, Cable HDMI, Mouse pad gamer XL, Hub USB-C multipuerto.
  - **Suministros**: Tóner negro, Resma de papel carta, Cartucho de tinta color, Kit de limpieza para pantallas.
- **Validaciones de estado**:
  - El producto con `id: 8` ("Mouse pad gamer XL") tiene `stock: 0`, mostrando el botón deshabilitado con el texto **"Agotado"**.
  - El producto con `id: 11` ("Cartucho de tinta color") tiene `active: false`, mostrando el botón deshabilitado con el texto **"Inactivo"**.
- **Web Components**: El catálogo se genera a través de los componentes personalizados `<product-list>` y `<product-card>`.

### 2. Búsqueda y Filtros
- **Búsqueda por texto**: Filtra en tiempo real por coincidencia en el nombre o en la descripción del producto, sin importar mayúsculas o minúsculas.
- **Categorías**: Menú desplegable para ver "Todas" o filtrar específicamente por "Perifericos", "Accesorios" o "Suministros".
- **Ordenamiento**: Permite ordenar el catálogo por precio de menor a mayor o de mayor a menor.
- **Solo disponibles**: Casilla de verificación para mostrar únicamente artículos activos que tengan stock disponible (`stock > 0`).
- **Botón Limpiar**: Restablece los filtros y el orden a sus valores originales.

### 3. Carrito de Compras
- **Agregar productos**: Solo permite agregar productos activos y con stock disponible. No permite añadir más unidades de las disponibles en inventario.
- **Operaciones dentro del carrito**: Botones interactivos para aumentar (`+`), disminuir (`-`) o remover un producto (`x`).
- **Cálculo de valores**:
  - Subtotal calculado a partir de la cantidad por el precio de cada producto (`price * qty`).
  - Descuento automático del **10%** si el subtotal de la compra es igual o superior a `$300.000 COP`.
  - Formato de moneda en pesos colombianos (`cop(valor)`).
  - Contador total de unidades en el encabezado de la página.
- **Acciones finales**:
  - Botón **"Vaciar"** para limpiar todos los elementos del carrito.
  - Botón **"Confirmar"** que genera una orden con código único (`ORD-XXXX`), notifica el total pagado y vacía el carrito.

### 4. Persistencia en `localStorage`
- Cada cambio en el carrito (agregar, modificar unidades, vaciar o comprar) se guarda automáticamente en el almacenamiento local bajo la clave `cart_data`.
- Al volver a cargar o refrescar la página, el carrito se recupera y se valida contra el catálogo actual (`catalog`), asegurando que las cantidades no superen el inventario real y descartando productos que hayan sido desactivados o agotados.


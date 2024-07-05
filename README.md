# Trabajo práctico del Módulo 2 (OBLIGATORIO)

Link: https://jkadministrator.github.io/TPModulo2/

# Bugs conocidos
  - El acceso a la pagina de gihub es por la ruta _https://jkadministrator.github.io/TPModulo2/_ que lleva al _index.html_. Si se accede directamente a una ruta de forma directa (ej: colocando _https://jkadministrator.github.io/TPModulo2/home_ en la url del navegador y dandole _enter_ ), por la forma en la que se configura _github pages_ no se va a acceder al componente ya que interpreta que estamos tratando de ingresar a otra pagina. Para solucionar esto habria que configurar el servidor para que siempre redireccione al _index.html_ del root donde esta el proyecto o hacer un _404.html_ que redireccione a index.html automaticamente.

# Consigna

Desarrollar un pequeño ecommerce con las siguientes paginas

- Registro
Solo realizar maquetado, no se debe guardar el usuario en ninguna base de datos

- Login
Solo realizar maquetado, no se debe guardar el usuario en ninguna base de datos

- Home
Se debera visualizar al menos un listado de 4 productos obtenidos de una fuente externa (api resto o archivo json)
Pagina de detalle de producto
Mostrar el detalle de un producto, obteniendo los datos de una api resto o archivo json. Algunos campos a visualizar son: Nombre, Descripción, Precio, Botón "Comprar"

- Formato de entrega:

Enviar un archivo .rar o .zip con el siguiente formato: apellido_modulo2.rar

Dentro del .rar o .zip se debe enviar el/los archivos generados por react (excepto node_modules)

Fechas de entrega:

Se prodra entregar esta unidad:

1 Entrega: 26/4/2022 23:55 hs
Ultima Entrega: 2/5/2022 23:55 hs
* El tamaño máximo del archivo permitido es de 10 MB. No se permite mas de un archivo.

# Configuracion para poder hacer el deploy

- configurar la github action para que haga el deploy automatico con cada commit en el branch main
```
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3

      - name: Install dependencies
        uses: bahmutov/npm-install@v1

      - name: Build project
        run: npm run build

      - name: Upload production-ready build files
        uses: actions/upload-artifact@v3
        with:
          name: production-files
          path: ./dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Download artifact
        uses: actions/download-artifact@v3
        with:
          name: production-files
          path: ./dist

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

- modificar el vite.config.js para que tenga el atributo base con el nombre del repo
```
export default defineConfig({
  plugins: [react()],
  base: "/TPModulo2/"
})
```   

- las rutas de react-router deben partir del nombre del repo
```
<BrowserRouter basename="/TPModulo2">
  <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/product/:id" element={<Product />}></Route>
      <Route path="/*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

- los navigate deben ser links relativos. ej: si quiero ir a /TPModulo2/login seria:
```
navigate('/login')
```

- el path para la carga de archivos json en Home es
```
  fetch('data/productos.json');
```

- el path para la carga en la pagina de un producto particular es
```
  fetch('../data/productos.json')
```
  

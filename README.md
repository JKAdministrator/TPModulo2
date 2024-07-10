# Trabajo práctico del Módulo 2 (OBLIGATORIO)

Link: https://jkadministrator.github.io/TPModulo2/

# Bugs conocidos
  - El acceso a la pagina de gihub es por la ruta _https://jkadministrator.github.io/TPModulo2/_ que lleva al _index.html_. Si se accede directamente a una ruta de forma directa (ej: colocando _https://jkadministrator.github.io/TPModulo2/home_ en la url del navegador y dandole _enter_ ), por la forma en la que se configura _github pages_ no se va a acceder al componente ya que interpreta que estamos tratando de ingresar a otra pagina. Para solucionar esto habria que configurar el servidor para que siempre redireccione al _index.html_ del root donde esta el proyecto o hacer un _404.html_ que redireccione a index.html automaticamente.
  - La validacion de password se está haciendo del lado del cliente, deberia validarse en el servidor encriptando el mismo en la base de datos.

# Consigna

Desarrollar en  un ecommerce con las siguientes paginas:

- Home: Listado de 4 productos. Mostrar nombre, precio, sku, descripcion
- Detalle de producto: Nombre del producto, descripción, precio, sku
- Registro. Campos Nombre, Apellido, Email, Contraseña
- Login. Por Email y Contraseña

Tenga en cuenta que la consigna es meramente orientativa, Ud. puede adaptarla a su propio proyecto si esto no conlleva una ostensible disminución en la complejidad de la tarea.

Todas los datos deben persistir en base de datos. Es opcional la utilizacion de firebase, se puede realizar desarrollo de api rest propias.

- Formato de entrega:

Link al repositorio de github o bien de la app desplegada en servidor. Si se adjunta repositorio, debe ser de acceso público y contener un archivo readme.md detallando las instrucciones de instalación y uso.

Fechas de entrega:

Se prodrá entregar esta unidad hasta el 16 de julio a las 23.59

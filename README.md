# App Agenda/To-Do
***

## Presentación
***
La aplicación permite crearnos tarjetas con las que podremos planificar nuestro día a día

## Technologies
***
El proyecto esta realizado en:
* [Ionic](https://ionic.io/)
* [React](https://es.reactjs.org/)
* [Node.js](https://nodejs.org/es/)
* [express.js](https://expressjs.com/es/)
* [Sequelize](https://sequelize.org/)
* [Mysql](https://www.mysql.com/)

## Programas necesarios

Para poder utilizar el proyecto en localhost en necesario clonarlo y tener algunos programas necesarios:

- [Nodejs](https://nodejs.org/es/download/) v16.16.0 o superior.
- IDE de desarrollo de tu comodidad Ej. [VS Code](https://code.visualstudio.com/download)
- [PostMan](https://www.postman.com/downloads/) para puebas de APIS. (Opcional)
- [Git](https://git-scm.com/downloads) para poder gestionar las versiones.

## Como Clonar

Comando para clonar:

```bash
cd existing_folder
git clone [LINK DEL REPOSITORIO]

```
## Instalar node_module del backend

En la carpeta del backend escribimos por terminal

```bash
npm install

```
## Instalar node_module del frontent

En la carpeta del frontend escribimos por terminal

```bash
ionic serve

```
y cuando nos pregunte si queremos instalar los scripts le escribimos 'y' y enter.

## Ejecución

Ejecutar el xampp y crear la base de datos. Sequelizer añadira una tabla al conectarse.

En la parte backend

```bash
node server.js

```
En la parte frontend
```bash
ionic serve

```

## Postman

Enlace a postman -> [documentación](https://www.postman.com/restless-firefly-229974/workspace/oasrcode/documentation/20512831-53234c34-ccfa-4941-8ee1-0ce41650c803)

## Manual de uso

 *La aplicación arranca en el menu principal donde carga el contenido de la agenda.
 *Dicha pantalla llama a la api al iniciarse y rellana la pantalal de tarjetas con el contenido de la ajenda.
 *Las tarjetas tienen 2 botones el de editar, a la derecha, y eliminar a la izquierda.
 *Al eliminar una tarjeta hay que refrescar la pantalla, deslizandola hacia abajo.
 *Por último, en la esquina inferier derecha tenemos el botón para añadir contenido a nuestra ajenda.Nos llevará 
 a una nueva pagía donde debemos rellenar todo los campos, luego solo debemos hacer clic en volver.

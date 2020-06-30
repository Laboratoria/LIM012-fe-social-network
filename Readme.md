
# :iphone: BUNKER Red Social

Bienvenid@ a nuestra plataforma BUNKER, una red social enfocada en el sector de Educación.
En ésta Red Social estarás más conectad@ que nunca! Publica, edita y comenta!
**!BUNKER, tu espacio personalizado!**

<p align="center">
  <img src="https://user-images.githubusercontent.com/60928490/86087392-b6d58380-ba69-11ea-9d0a-f18a7e2b61dc.png" width="700" height="350">
</p>


***

## :mag: INVESTIGACIÓN UX

## Historias de Usuario

* Como usuario nuevo debo poder crear una cuenta con email y password válidos para poder iniciar sesion e ingresar a la red social.

* Como usuario nuevo debo poder tener la opción de iniciar sesión con mi cuenta de Google o Facebook para ingresar a la red social sin necesidad de crear una cuenta de email válido.

* Como usuario loggeado debo poder crear, guardar, modificar en el mismo lugar (in place) y eliminar una publicación (post) privada o pública, que puede ser una frase o una imagen.

* Como usuario loggeado debo poder ver todos los posts públicos y privados que he creado hasta ese momento, desde el más reciente hasta el más antiguo, así como la opción de poder cambiar la configuración de privacidad de mis post.

* Yo como usuario loggeado, puedo dar like y llevar un conteo de likes en mi publicación así como poder escribir, guardar, editar o eliminar un comentario en mi publicación.

* Al final debo poder ingresar a la red social y poder visualizar los datos de mi perfil creado o editarlos.

### Prototipo Alta Fidelidad - Mobile :iphone:

<p align="center">
  <img src="https://user-images.githubusercontent.com/60928490/85427034-d9830c00-b540-11ea-8b28-494dcd132a78.JPG">
</p>

### Prototipo Alta Fidelidad - Desktop :computer:

<p align="center">
  <img src="https://user-images.githubusercontent.com/60928490/85427189-09caaa80-b541-11ea-83be-f6b65d16513c.JPG">
</p>


### :raising_hand: Test de Usabilidad :raising_hand:

Resultados de los tests de usabilidad:

Luego de los tests con usuarios realizamos mejoras según el feedback recibido 

Inicio de sesión y registro
- Dar jerarquía y manejar el contraste en los títulos.
- Agregamos modales para orientar al usuario y pueda registrarse con mayor facilidad.
- Agregamos la opción de **¿Olvidó contraseña?** para que el usuario tenga la facilidad de poder recuperar contraseña.

Home y perfil
- Agregar la hora en la que se realizan los posts y comentarios.
- Agregar un popUp, con opciones para cambiar foto de perfil, portada y a la vez editar información del perfil.
- Para usuarios sensibles a la luz, creamos el modo nocturno.


<p align="center">
  <img src="https://user-images.githubusercontent.com/60928490/86087703-67dc1e00-ba6a-11ea-914e-0e8f0893515d.png" width="700" height="350"></br>
  <img src="https://user-images.githubusercontent.com/60928490/86087707-6ad70e80-ba6a-11ea-9c9a-7d66983ae204.png" width="700" height="350"></br>
  <img src="https://user-images.githubusercontent.com/60928490/86087717-71fe1c80-ba6a-11ea-9b51-dcd242943167.png" width="700" height="350"></br>
   <img src="https://user-images.githubusercontent.com/60928490/86087726-775b6700-ba6a-11ea-9e4f-7cefd8ff7e96.png" width="700" height="350"></br>
</p>

***

## :loop: DISEÑO DE LA INTERFAZ DE USUARIO

Las **caraterísticas técnicas** de nuestra aplicación son las siguientes:
- Es una Single-Page Application
- Diseñada con un enfoque [mobile first](https://darwindigital.com/mobile-first-versus-responsive-web-design/) ([versión traducida](https://translate.google.com/translate?hl=&sl=auto&tl=es&u=https%3A%2F%2Fdarwindigital.com%2Fmobile-first-versus-responsive-web-design))
- Debe permitir la persintencia de datos
- Red Social responsiva en la que podemos escribir, leer, actualizar y eliminar datos.
  
Para implementar la aplicación usarmos *HTML5*, *CCS3* o *SASS*, *Vanilla JavaScript(ES6+)*, *Firebase* 


***

## DESARROLLO FRONTEND

#### Arquitectura de la aplicación

- Diseñar la arquitectura de tu aplicación, modularizando tu código a través de *es modules* ([`import`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import) y [`export`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export))

- Familiarizarte con el patrón  modelo - vista - controlador ([MVC](https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador)).

#### Tecnologías HTML5 y CSS3/SASS

* Aplicar HTML5 semántico en tu proyecto.
* Aplicar y reforzar los conceptos fundamentales de CSS3.
* Implementar selectores de clase evitando la redundancia de estilos en CCS3.
* Utilizar `flexbox` para lograr un diseño `mobile first`, implementando un layout que te permita crear un diseño adaptativo para **mobile y desktop**

#### JavaScript (ES6+)

* Utilizar modulos de ES6 para poder modularizar tu código JavaScript.
* Reforzar tu conocimiento sobre el uso de Template literals (Template strings).
* Reforzar tu conocimiento de la manipulacion de los elementos del DOM a traves JavaScript.
* Implementar un sistema de rutas para cambiar de una vista a otra de manera dinámica (SPA).
* Testear la lógica de tu aplicación, con Jest cuidando que el coverage pase el 90% de statements (sentencias), functions (funciones), lines (líneas), y branches (ramas).

### Persistencia de datos

En los proyectos anteriores solo has consumido (leído) datos, por ejemplo, a través de un archivo `json` o utilizando `fetch`.

En este proyecto diseñarás la estructura de esos datos, la forma de consultarlos, actualizarlos, modificarlos y eliminarlos según los requerimiento del usuario. Para llevarlo a cabo utilizaras `Firestore` de `Firebase` o `LocalStogarge` una `Web Storage API`

#### Firebase

El objetivo de usar Firestore en este proyecto, es que aprendes a manejar y persistir datos a traves de una base de datos no relacional, en tiempo real y puedas implementar operaciones CRUD (Creación, Lectura, Actualización y eliminación) de datos.


***

### Objetivos de aprendizajes pendientes

### HTML y CSS

* [ ] [HTML semántico](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#Semantics_in_HTML)
* [ ] [CSS `flexbox`](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [ ] Construir tu aplicación respetando el diseño realizado (maquetación).

### DOM y Web APIs

* [ ] [Manipulación dinámica del DOM](https://developer.mozilla.org/es/docs/Referencia_DOM_de_Gecko/Introducci%C3%B3n)
* [ ] [History API](https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador)
* [ ] [`localStorage`]

### Javascript

* [ ] [Uso de callbacks](https://developer.mozilla.org/es/docs/Glossary/Callback_function)
* [ ] [Consumo de Promesas](https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises)
* [ ] Uso ES modules
([`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
| [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export))

### Firebase

* [ ] [Firestore](https://firebase.google.com/docs/firestore)
* [ ] [Firebase Auth](https://firebase.google.com/docs/auth/web/start)
* [ ] [Firebase security rules](https://firebase.google.com/docs/rules)
* [ ] [Uso de onSnapshot](https://firebase.google.com/docs/firestore/query-data/listen)
| [onAuthStateChanged](https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data)

### Testing

* [ ] [Testeo de tus funciones](https://jestjs.io/docs/es-ES/getting-started)
* [ ] [Testeo asíncrono](https://jestjs.io/docs/es-ES/asynchronous)
* [ ] [Mocking](https://jestjs.io/docs/es-ES/manual-mocks)

### Colaboración en Github

* [ ] Branches
* [ ] Pull Requests
* [ ] Tags

### Organización en Github

* [ ] Projects
* [ ] Issues
* [ ] Labels
* [ ] Milestones

### Buenas prácticas de desarrollo

* [ ] Modularización
* [ ] Nomenclatura / Semántica
* [ ] Linting

***

## Recursos

### Mobile first

El concepto de [_mobile first_](https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/)
hace referencia a un proceso de diseño y desarrollo donde partimos de cómo se ve
y cómo funciona la aplicación en un dispositivo móvil primero, y más adelante se
ve como adaptar la aplicación a pantallas progresivamente grandes y
características específicas del entorno desktop. Esto es en contraposición al
modelo tradicional, donde primero se diseñaban los websites (o webapps) para
desktop y después se trataba de _arrugar_ el diseño para que entre en pantallas
más chicas. La clave acá es asegurarse de que desde el principio diseñan usando
la vista _responsive_ de las herramientas de desarrollador (developer tools) del
navegador. De esa forma, partimos de cómo se ve y comporta la aplicación en una
pantalla y entorno móvil.

### Múltiples vistas

En proyectos anteriores nuestras aplicaciones habían estado compuestas de una
sola _vista_ principal (una sóla _página_). En este proyecto se introduce la
necesidad de tener que dividir nuestra interfaz en varias _vistas_ o _páginas_
y ofrecer una manera de navegar entre ellas.

### Escritura de datos

En los proyectos anteriores hemos consumido (leído) datos, pero todavía no
habíamos escrito datos (salvar cambios, crear datos, borrar, ...). En este
proyecto tendrás que crear (salvar) nuevos datos, así como leer, actualizar y
modificar datos existentes. Estos datos se podrán guardar de forma remota
usando [Firestore](https://firebase.google.com/docs/firestore) o de forma
local utilizando`localStorage`.

### Autenticación y autorización

Hasta el momento, los proyectos han sido pensados como recursos públicos, donde todos
los usuarios compartían un mismo rol y la misma información.

En este proyecto tendrás que diferenciar la información a mostrar y modificar,
dependiendo de la identidad del usuario.
De la misma manera deberás crear reglar de autorización para el acceso a los
datos.

Para esto utilizaras respectivamente
[`Firebase authentication`](https://firebase.google.com/docs/auth/) y
[`Firestore security rules`](https://firebase.google.com/docs/firestore/security/get-started)

### CSS

En este proyecto queremos que ganes confianza y experiencia con CSS profesional,
por eso usarás [`flexbox`](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
para posicionar tus elementos.

Recuerda que no puedes usar frameworks CSS, sólo *vanilla css* o [*sass*](https://sass-lang.com/).

### Otras:

* [Pildora SPA](https://www.loom.com/share/fa63a8ad0e9a43428222c15b6f6613d3)
* [Repositorio de pildora de SPA](https://github.com/betsyvies/bootcamp-spa)
* [Pildora de mock Firebase](https://www.youtube.com/watch?v=06myVn41OTY&t=1s)
* [Repositorio de pildora de mock Firebase](https://github.com/Danielalab/2018-2-Testing)
* [Pildora MVC](https://github.com/merunga/todomvc-vanillajs)
* [Modulos: Export](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export)
* [Modulos: Import](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import)
* [Diseño web, responsive design y la importancia del mobile first - Media Click](https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/)
* [Mobile First: el enfoque actual del diseño web móvil - 1and1](https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/)
* [Mobile First - desarrolloweb.com](https://desarrolloweb.com/articulos/mobile-first-responsive.html)
* [Mobile First - ZURB](https://zurb.com/word/mobile-first)
* [Mobile First Is NOT Mobile Only - Nielsen Norman Group](https://www.nngroup.com/articles/mobile-first-not-mobile-only/)

***

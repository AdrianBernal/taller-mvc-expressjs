# taller-mvc-express

# express
Express es una infraestructura de aplicaciones web Node.js mínima y flexible que proporciona un conjunto sólido de características para las aplicaciones web y móviles.

Installar el generados de aplicaciones de forma global:
`$ npm install express-generator -g`

Más información sobre su uso [aquí](https://expressjs.com/es/starter/generator.html).

## Motor de plantillas (Template engine)
Un procesador de plantillas es un software diseñado para combinar plantillas con un modelo de datos para producir documentos como resultado.
Su principal utilidad es que nos permite separar completamente la maquetación y el diseño de nuestra página web
de la lógica que obtiene los datos del modelo. Será el motor de plantillas el
que sustituya las etiquetas que marcan una posición por los valores que obtenemos del modelo.

Generamos la estrucutra de nuestra aplicación con el motor de plantillas Twig.

`express --view=twig taller-mvc-express`

Este comando nos genera la siguiente estructura:

```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.twig
    ├── index.twig
    └── layout.twig

7 directories, 9 files
```

Esta estructura es orientativa y puedes cambiarla.

Al haber indicado que el motor de plantillas será Twig se ha añadido automáticamente
la dependencia al fichero `package.json`. Para instalar estas dependencias se debe ejecutar el
comando `npm install` dentro de la carpeta del proyecto. Se nos generará una carpeta `node_modules` con los módulos necesarios.

Más información sobre los motores de plantillas [aquí](https://expressjs.com/en/resources/template-engines.html)

Ejecutar la aplicación con:
`DEBUG=taller-mvc-express:* npm start` en Linux
o
`set DEBUG=taller-mvc-express:* & npm start` en Windows.

# Inspector

Ejecuta el siguiente comando desde la carpeta de la aplicación `node --inspect bin/www`.
En la barra de navegación de chrome introducimos `chrome://inspect`. En la sección 'Remote Target' aparecerá nuestra
aplicación. Hacemos click en 'inspect' y en la ventana que se abre añadimos el directorio de nuestro proyecto
haciendo click en 'Add folder to workspace'.

Más información [aquí](https://nodejs.org/en/docs/guides/debugging-getting-started/).

# Debug
Es el módulo para node.js

https://www.npmjs.com/package/debug

# Logging
El generador de aplicaicones de express nos configura automáticamente el logger morgan en modo desarrollo. Morgan es un logger
para peticiones HTTP para node.js. Más información de morgan [aquí](https://github.com/expressjs/morgan).
```javascript
var logger = require('morgan');
app.use(logger('dev'));
```

Simplifica el proceso de logeo de las peticiones. Podrías pensar en Morgan como un helper que genera registros (logs) de
peticiones. Ahorra tiempo a los desarrolladores porque no tienen que crear manualmente estos registros.

Morgan puede usarse de forma independiente, pero normalmente se usa en combinación con Winston. Winston puede transportar
los registros a una ubicación externa o consultarlos al analizar un problema.

Por ello, para tener un sistema de logs más avanzado utilizaremos el módulo `winston`.
Instalamos con el comando `npm install winston --save`.

Niveles:
* Emerg – the application is in an emergency state.
* Alert – the application owners need to be alerted.
* Crit – the application is in a critical state.
* Error – a serious problem occurred while processing the current operation. Such a message usually requires the user to interact with the application or research the problem in order to find the cause and resolve it.
    (Tip: exceptions are usually reported as errors because they usually have a similar meaning.)
* Warning – such messages are reported when something unusual happened that isn’t critical to process the current operation (and the application in general), but would be useful to review to decide if it should be resolved. (Tip: this level is usually selected as active for applications in production.)
* Info – informative messages are usually used for reporting significant application progress and stages. Informative messages should not be reported too frequently because they can quickly become “noise.”
* Notice – Notice messages are usually used for developers to notice application state.
* Debug – used for debugging messages with extended information about application processing. Such messages usually report calls of important functions along with results they return and values of specific variables, or parameters.
* Trace – this level is most informative (and usually even excessive). Trace messages report most application actions or events and are mostly used to follow application logic in full detail.

Más informacion de winston [aquí](https://github.com/winstonjs/winston).

Más sobre el uso de winston [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications).

# Middlewares
Express es una infraestructura web de direccionamiento y middleware que tiene una funcionalidad mínima propia: una aplicación Express es fundamentalmente una serie de llamadas a funciones de middleware.

Las funciones de middleware son funciones que tienen acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación. La siguiente función de middleware se denota normalmente con una variable denominada next.

Más información [aquí](https://expressjs.com/es/guide/using-middleware.html).




#Mongoose
Mongoose es un Object Document Mapper (ODM). Esto significa que Mongoose le permite definir objetos con un esquema fuertemente 
tipado que se asigna a un documento MongoDB.

Mongoose actualmente contiene ocho SchemaTypes que una propiedad se guarda como cuando se conserva a MongoDB. Son:

* String (Cadena)
* Number (Número)
* Date (Fecha)
* Buffer //Datos binarios
* Boolean (Booleano)
* Mixed (Mixto) //Cualquier dato
* ObjectId
* Array (Matriz)

Cada tipo de datos le permite especificar:

* un valor predeterminado
* una función de validación personalizada
* indica que se requiere un campo
* una función get que le permite manipular los datos antes de que se devuelva como un objeto
* una función de conjunto que le permite manipular los datos antes de guardarlos en la base de datos
* crear índices para permitir que los datos se obtengan más rápido

Más información [aquí](https://code.tutsplus.com/es/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527).



##Instalar
Con el comando `npm install mongoose --save`.

Antes de poner en producción debe habilitarse la autoentificación en MongoDB. Más información [aquí](https://medium.com/mongoaudit/how-to-enable-authentication-on-mongodb-b9e8a924efac).

#Registro y Login (Autentifiación, cookies)

Módulos

* [boody-parser](https://www.npmjs.com/package/body-parser).

    body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.
    
    bodyParser.json - parsea el body a json
    bodyParser.urlencoded({extended: false}) - Para parsear peticiones get con parámetros

* [cookie-parser](https://www.npmjs.com/package/express-session)

    Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.

* [express-session](https://www.npmjs.com/package/express-session).

    Expone las variables `req.session` y `req.sessionID`.
    
* [passport](https://www.npmjs.com/package/passport).

    [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose). nos facilita el uso de passport con mongoose. Passport-Local Mongoose is a Mongoose plugin
    that simplifies building username and password login with Passport

[Proyecto completo](https://www.djamware.com/post/58bd823080aca7585c808ebf/nodejs-expressjs-mongoosejs-and-passportjs-authentication).

# Localización (Multilenguaje)
## i18n-node
Módulo de traducción simple con almacenamiento dinámico de json. 

# Para proyectos grandes
## 'use strict'
El modo estricto cambia la sintaxis y el comportamiento en tiempo de ejecución. Los cambios generalmente caen dentro de estas categorías: cambios que convierten erratas en errores (como errores de sintaxis o en tiempo de ejecución), cambios que simplifican como una variable particular es calculada, cambios que simplifian el uso de eval y arguments, cambios que hacen más fácil escribir JavaScript "seguro", y cambios que anticipan la evolución futura de EMACScript.

Más información [aquí](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Modo_estricto) y [aquí](https://www.w3schools.com/js/js_strict.asp).

## TypeScript
Añade tipos a javascript. Hay que compilarlo.

```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

Más información de TypeScript [aquí](https://www.typescriptlang.org/docs/index.html).

[Express.js Frameworks](https://expressjs.com/en/resources/frameworks.html).



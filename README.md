# BOT chequeador de entradas para el show de Bianca

Pequeño comprobador de cambios en la página de Ticketek. Me cansé de apretar F5 así que hice un bot que lo haga por mí.

## Prerequisitos

Necesitás:

- Una URL pública con https para que telegram te avise cuando alguien interactúa con tu BOT (ngrok es tu amigo si querés correr local).
- Un token de telegram (Se lo pedís a @Botfather)
- Node

## Ejecución

- Seteá una variable de ambiente con tu URL

`export URL=https://....`

- Seteá una variable de ambiente con tu token

`export TOKEN=15454878:AA...`

- Seteá una variable de ambiente con el puerto local que vas a usar (por defecto corre en el 3000)

`export PORT=3000`

- Descargá las dependencias

`npm install`

- Ejecutá el bot

`npm start`

## Cosas a tener en cuenta

- La gente que se suscribe al bot se guarda en suscriptores.json, si lo corrés en algún lugar en el que se pierde el FS vas a perder la lista de suscriptores
- No se guarda registro de si se notificó o no a las personas, puede llegar a mandar notificaciones repetidas cuando se reinicia
- La "API" de Ticketek es medio nefasta así que está todo atado con alambre

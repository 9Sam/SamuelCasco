# Prueba Técnica Devsu

## Como levantar el proyecto

Hay dos métodos para levantar el proyecto:

### 1) Usando los comandos configurados en el package.lock

Para iniciar el proyecto con los comandos por defecto habría que ejecutar lo siguiente:

> NOTA: Para ejecutar este proyecto de forma local es necesario tener instalado **pnpm.**

Acceder a la ruta correspondiente.

Instalar las dependencias requeridas para cada proyecto ejecutando:

```powershell
pnpm install
```

Inicializar la app frontend

```powershell
pnpm start
```

Inicializar la app backend

```powershell
pnpm start:dev
```

El proyecto estará disponible en la dirección http://localhost:80

### 2) Usando docker (Recomendado)

Para incializar el proyecto con docker basta con ejecutar el siguiente comando.

```pwsh
docker-compose up -d --build
```

Este comando se encargará de inicializar tanto la api y la aplicación frontend de forma que se puedan comunicar entre ambos sin ninguna configuración adicional.

La app de angular estará disponible en la dirección [http://localhost:80](http://localhost:80)
La api de express.js estará disponible en la dirección [http://localhost:3002](http://localhost:3002)

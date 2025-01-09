# Guía de instalación del proyecto

## Instalaciones necesarias

- [Visual Studio Code](https://code.visualstudio.com/)
- [NodeJS v20 o mayor](https://nodejs.org/)
- [Nx](https://nx.dev)

## Antes de comenzar

Antes de comenzar a instalar las dependencias del proyecto es necesario verificar que tienes las dependencias necesarias instaladas.
Abre la terminal de comandos de tu sistema y sigue los siguientes pasos para asegurarte de que todo está correcto antes de comenzar.

### Verificar instalación de NodeJS

```
node -v
```

- Verifica que tu versión de node sea una versión 20 o mayor, si no ve [al sitio oficial y descarga la última versión LTS](https://nodejs.org/)

### Verificar la política de ejecución de scripts

- Estaremos trabajando con Nx, una herramienta que nos permite construir aplicaciones de una forma sencilla a través de Monorepo por lo que vas a estar ejecutando comandos desde el CLI de la herramienta. En el caso del sistema operativo Windows esto puede dar problemas debido a que la configuración para ejecutar comandos de herramientas externas está desactivado. Para activarlo sigue los siguientes pasos:

- Abre una terminal de Windows Powershell como administrador
- Ejecuta el siguiente comando:

```
Get-ExecutionPolicy -List
```

- Deberías ver algo como esto:

```
     Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser       Restricted
 LocalMachine       Restricted
```

- La configuración que nos interesa es la de CurrentUser, debemos cambiarla a RemoteSigned, para ello, ejecuta el siguiente comando:

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

- Confirma la ejecución del comando
- Vuelve a comprobar la política de ejecución:

```
Get-ExecutionPolicy -List
```

- Deberías ver esto:

```
    Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser       RemoteSigned
 LocalMachine       Restricted
```

### Instalar el CLI de Nx

- Ejecuta el siguiente comando para instalar Nx:

```
npm i -g nx
```

- Verifica que nx se haya instalado:

```
npm list -g
```

- Deberías ver la dependencia instalada:

```
+-- nx@20.3.1
```

## Instalar las dependencias

Una vez clonado el repositorio debemos instalar las dependencias del proyecto con npm, ejecuta el siguiente comando:

```
npm install
```

## Levantar el frontend de la aplicación

La aplicación está construida usando un frontend en Angular, para ejecutar el servidor de desarrollo frontend debes ejecutar el siguiente comando:

```
nx serve frontend
```

Donde frontend representa la carpeta del proyecto.

## Levantar el backend de la aplicación

La aplicación está construida usando un backend en NestJS, para ejecutar el servidor de desarrollo backend debes ejecutar el siguiente comando:

```
nx serve backend
```

Donde backend representa la carpeta del proyecto.

## ¿Quieres crear un proyecto desde CERO?

Agrego esto por aquí para aquellos quienes quieran comprender como crear el proyecto desde cero con Nx, sigue los siguientes pasos:

### Crea un espacio de trabajo

```
npx create-nx-workspace
```

Esto te hará algunas preguntas sobre que framework quieres utilizar, sigue las instrucciones en la terminal para crear el proyecto y asegúrate de que elijes la opción que dice `Integrated Monorepo` o algo relacionado a más de un proyecto para que puedas tener más de uno en el mismo espacio de trabajo independientemente del framework o lenguaje de elección.

- `Nota`: asegúrate de estar en la carpeta del proyecto antes de ejecutar los siguientes comandos, para ello ejecuta el siguiente comando:

```
cd /path/to/your/project
```

Esto te creará una app con el framework o lenguaje seleccionado que podrás probar corriendo el siguiente comando:

```
nx serve myApp
```

Donde myApp representa el nombre de la carpeta que designaste para tu aplicación.

### Agregar Angular al proyecto

Si elegiste Angular al momento de crear el proyecto puedes saltarte este paso, si no sigue los siguientes pasos:

```
nx add @nx/angular
nx g @nx/angular:app apps/angularApp
```

Donde angularApp representa el nombre de la carpeta de tu proyecto Angular.

### Agregar NestJS al proyecto

Si elegiste NestJS al momento de crear el proyecto puedes saltarte este paso, si no sigue los siguientes pasos:

```
nx add @nx/nest
nx g @nx/nest:app apps/nestApp
```

Donde nestApp representa el nombre de la carpeta de tu proyecto NestJS.

### Sirve tus proyectos

La clave para servir un proyecto es el siguiente comando:

```
nx serve myProject
```

Donde myProject es el nombre de la carpeta de tu proyecto

<h3 align="center">¡Listo! Has terminado de configurar el proyecto 🥳</h3>

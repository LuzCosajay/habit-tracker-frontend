# Habit Tracker - Frontend (Semana 2)

Aplicación web desarrollada en Next.js con integración de Redux Toolkit, como parte del curso de Programación Avanzada.

Este proyecto corresponde a la entrega de la Semana 2 e incluye la configuración inicial de Next.js, la integración de Redux para manejo de estado global y la conexión mediante request GET al backend desarrollado en Express.js.

------------------------------------------------------------

TECNOLOGÍAS UTILIZADAS

- Next.js
- React
- Redux Toolkit
- React Redux
- JavaScript
- CSS

------------------------------------------------------------

REQUISITOS PREVIOS

Antes de ejecutar este proyecto es necesario:

- Tener Node.js instalado.
- Tener el backend ejecutándose en:
  http://localhost:3001

El frontend consume el endpoint:
http://localhost:3001/habits

------------------------------------------------------------

INSTALACIÓN

1. Clonar el repositorio:

git clone https://github.com/LuzCosajay/habit-tracker-frontend.git

2. Entrar a la carpeta del proyecto:

cd habit-tracker-frontend

3. Instalar dependencias:

npm install

------------------------------------------------------------

EJECUCIÓN

Para iniciar el servidor de desarrollo:

npm run dev

Abrir en el navegador:

http://localhost:3000

------------------------------------------------------------

FUNCIONALIDAD IMPLEMENTADA EN SEMANA 2

- Configuración inicial del proyecto en Next.js.
- Integración de Redux Toolkit.
- Creación de store global.
- Implementación de createAsyncThunk para obtener hábitos.
- Integración de request GET al backend.
- Renderizado de datos desde el estado global (Redux).

------------------------------------------------------------

ESTRUCTURA PRINCIPAL

src/
  app/
    layout.js
    page.js
  store/
    store.js
    habitsSlice.js
    Providers.js

------------------------------------------------------------

NOTAS IMPORTANTES

- El backend debe estar ejecutándose en el puerto 3001.
- La base de datos utilizada es MongoDB Atlas.
- Este branch corresponde a la entrega de la Semana 2.

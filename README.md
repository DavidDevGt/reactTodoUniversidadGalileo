
# Task & Goal Manager – React + Redux Toolkit

¡Hola! Este es un proyecto que desarrollé como parte de mis estudios en **Universidad Galileo**. Se trata de una aplicación moderna para gestionar tareas y objetivos, creada con **React 19**, **TypeScript** y **Redux Toolkit**.

El objetivo fue combinar buenas prácticas de desarrollo frontend con una experiencia de usuario fluida y adaptable a cualquier dispositivo.

---

## 🚀 Tecnologías que usé

Estas son las herramientas que forman la base de la app:

* **React 19 + TypeScript** – Para construir una interfaz moderna y robusta.
* **Redux Toolkit + React Redux** – Para manejar el estado global de forma eficiente.
* **Vite** – Para desarrollo rápido y bundling ultra veloz.
* **Bootstrap 5 + React-Bootstrap** – Componentes visuales listos para usar.
* **Sass/SCSS** – Para mantener estilos organizados y reutilizables.
* **Biome** – Para mantener el código limpio y bien formateado.

---

## ✨ ¿Qué puedes hacer con esta app?

### 📋 Administra tanto tareas como objetivos

* **Tareas**: Cosas que hay que hacer a corto plazo.
* **Objetivos**: Metas más grandes que se logran en el tiempo.
* Puedes alternar entre ambas vistas desde el encabezado.

### 🔄 Funcionalidades completas y listas para usar

* ✅ Crear nuevas tareas y objetivos con validación.
* 📝 Ver una lista detallada de todos tus ítems.
* ✏️ Marcar como completado o pendiente.
* 🗑️ Eliminar elementos con un clic.
* ⚡ Indicadores visuales de carga y manejo de errores en tiempo real.

### 📱 Pensado para cualquier pantalla

* **En escritorio**: Los formularios están integrados en la misma vista.
* **En móvil**: Todo funciona mediante modales responsivos.
* **Diseño adaptativo**: Las tarjetas y botones se ven bien en cualquier tamaño.
* **Navegación fluida**: Barra de navegación con menú hamburguesa incluido.

### 🏗️ Arquitectura sólida y escalable

* Estructura por módulos usando **Redux slices**.
* Manejo asíncrono con **thunks**.
* **Tipado estricto** en todo el proyecto gracias a TypeScript.
* Servicios desacoplados para comunicarte con cualquier API.
* Componentes organizados y reutilizables.

---

## 🛠️ ¿Cómo ponerlo en marcha?

### Requisitos

* Node.js 18 o superior (recomiendo usar la version LTS de tu preferencia)
* npm o yarn

### Instalación paso a paso

1. **Clona este repo**:

   ```bash
   git clone https://github.com/DavidDevGt/reactTodoUniversidadGalileo.git
   cd reactTodoUniversidadGalileo
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Arranca el servidor de desarrollo**:

   ```bash
   npm run dev
   # o si prefieres
   npm run start
   ```

   > La app debería abrirse automáticamente en `http://localhost:5173`

4. **Otros comandos útiles**:

   ```bash
   npm run build     # Generar build para producción
   npm run preview   # Ver cómo se ve la build final
   npm run lint      # Analizar el código
   npm run fix       # Arreglar automáticamente el formato del código
   ```

---

## 📁 Cómo está organizada la app

```bash
src/
├── components/          # Componentes reutilizables
├── models/             # Tipos e interfaces de datos
├── store/              # Configuración de Redux Toolkit
├── services/           # Comunicación con APIs
├── styles/             # Estilos modulares en SCSS
├── validators/         # Reglas de validación
├── App.tsx             # Componente raíz
└── main.tsx            # Punto de entrada
```

---

## 🔧 ¿Cómo funciona por dentro?

### 🧠 Redux Toolkit

Hay tres "slices" principales que controlan el estado:

* `taskSlice`: Lista de tareas y operaciones relacionadas.
* `goalSlice`: Lo mismo, pero para objetivos.
* `navigationSlice`: Permite cambiar entre vistas (tareas / objetivos).

### 🌐 Servicios API

* Todo pasa por un cliente HTTP configurado (`api.ts`) con headers, errores y variables de entorno bien manejados.
* `taskService` y `goalService` encapsulan la lógica para crear, actualizar y eliminar ítems.

### 🎨 UI y componentes

* Todo el diseño es **responsive**.
* Formularios con validación integrada.
* Animaciones suaves con CSS.
* Modales para una experiencia móvil fluida.
* Estados de carga y alertas de error amigables.

---

## 🔧 Configuración rápida

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_API_KEY=tu_api_key_aqui
```

---

## 🏗️ Cómo fluye la información

```
Componentes UI → Acciones Redux → Thunks → Servicios API → Backend
        ↑                                            ↓
    Actualización de estado ← Reducers ← Respuesta HTTP
```

---

## 📝 Algunas funcionalidades clave

### ✅ Tareas

* Crear tareas con título, descripción y fecha límite.
* Cambiar el estado (completa o pendiente).
* Eliminar tareas fácilmente.
* Validación de fechas (no puedes crear tareas con fecha pasada).
* Orden automático por fecha de vencimiento.

### 🎯 Objetivos

* Crear metas a largo plazo.
* Marcar progreso.
* Eliminar o completar objetivos.
* Validación de fecha objetivo.

### 🔄 Sincronización

* Estado persistente gracias al backend.
* Actualizaciones optimistas en la UI.
* Rollback automático en caso de error.
* Reintentos en segundo plano.

---

## 🧪 Testing y herramientas de desarrollo

### Scripts disponibles:

```bash
npm run dev      # Desarrollo
npm run build    # Producción
npm run preview  # Visualizar build
npm run lint     # Linter
npm run fix      # Auto-fix del código
```

### Herramientas que ayudan:

* **Vite DevTools**
* **Redux DevTools**
* **TypeScript estricto**
* **Biome** para mantener el código limpio

---

## 🚀 ¿Cómo desplegarla?

```bash
npm run build
npm run preview
```

Eso te genera la carpeta `dist/` lista para subir a cualquier servidor estático.

---

## 👨‍💻 Autor

**David Vargas**
Proyecto académico para Universidad Galileo
Materia: Desarrollo Web Moderno

---

## 📄 Licencia

Este proyecto fue creado con fines educativos y está destinado al uso académico dentro de la Universidad Galileo.

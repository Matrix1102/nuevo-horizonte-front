# 🏫 Sistema de Gestión Escolar - Colegio Nuevo Horizonte

Sistema de gestión escolar moderno desarrollado con React, TypeScript y Tailwind CSS para el Colegio Nuevo Horizonte. Incluye tres tipos de usuarios: Alumnos, Profesores y Administrativos.

---

## 📋 Tabla de Contenidos

- [Características](#-características-principales)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías](#-tecnologías-utilizadas)
- [Funcionalidades por Usuario](#-funcionalidades-por-tipo-de-usuario)
- [Paleta de Colores](#-paleta-de-colores-institucional)

---

## ✨ Características Principales

- ✅ **Sistema de autenticación** con auto-detección de tipo de usuario
- ✅ **Interfaz moderna** con componentes Headless UI
- ✅ **Filtros avanzados** con dropdown personalizados
- ✅ **Vista de asistencias** por días con paginación semanal (lunes-viernes)
- ✅ **Gestión de calificaciones** con modo edición
- ✅ **Impresión optimizada** de libretas de notas
- ✅ **Sidebar colapsable** con iconos Material Design
- ✅ **Diseño responsive** con Tailwind CSS
- ✅ **Sin backend** - Datos simulados en frontend
- ✅ **TypeScript** para mayor seguridad de tipos

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- **pnpm** (gestor de paquetes) - [Instalar aquí](https://pnpm.io/installation)

### Verificar instalación:

```bash
node --version  # Debe mostrar v18.x.x o superior
pnpm --version  # Debe mostrar 8.x.x o superior
```

Si no tienes pnpm instalado:

```bash
npm install -g pnpm
```

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Matrix1102/nuevo-horizonte-front.git
cd nuevo-horizonte-front/nuevo-horizonte-front
```

### 2. Instalar dependencias

```bash
pnpm install
```

Este comando instalará todas las dependencias necesarias:
- React 19.1.1
- TypeScript 5.9.3
- Tailwind CSS 3.4.18
- Headless UI 2.2.9
- React Icons
- React Router DOM
- Vite (bundler)

### 3. Iniciar el servidor de desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en: **http://localhost:5173**

---

## 🎯 Uso

### Acceso al Sistema

1. Abre tu navegador y ve a `http://localhost:5173`
2. Verás la pantalla de login
3. Usa uno de los siguientes usuarios de prueba:

#### 👨‍🎓 Alumno
```
Email: alumno@colegio.com
Contraseña: 123456
```

#### 👨‍🏫 Profesor
```
Email: profesor@colegio.com
Contraseña: 123456
```

#### 👔 Administrativo
```
Email: admin@colegio.com
Contraseña: 123456
```

### Navegación

- **Sidebar**: Click en el ícono ☰ para expandir/contraer el menú lateral
- **Menú principal**: Accede a las diferentes secciones según tu rol
- **Cerrar sesión**: Click en "Cerrar Sesión" en el sidebar

---

## 📁 Estructura del Proyecto

```
nuevo-horizonte-front/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Layout.tsx      # Layout principal con sidebar
│   │   ├── ProtectedRoute.tsx
│   │   └── Sidebar.tsx     # Menú lateral
│   ├── context/            # Context API
│   │   └── AuthContext.tsx # Contexto de autenticación
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Login.tsx       # Página de inicio de sesión
│   │   ├── Dashboard.tsx   # Dashboard principal
│   │   ├── Asistencia.tsx  # Vista alumno - Asistencias
│   │   ├── AsistenciaProfesor.tsx  # Vista profesor - Gestión de asistencias
│   │   ├── Calificaciones.tsx      # Vista alumno - Calificaciones
│   │   ├── CalificacionesProfesor.tsx  # Vista profesor - Gestión de notas
│   │   └── ...             # Otras páginas
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Punto de entrada
│   └── index.css           # Estilos globales + Tailwind
├── public/                 # Recursos estáticos
├── package.json            # Dependencias del proyecto
├── tsconfig.json           # Configuración TypeScript
├── tailwind.config.js      # Configuración Tailwind CSS
└── vite.config.ts          # Configuración Vite

```

---

## 🛠 Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| React | 19.1.1 | Biblioteca UI |
| TypeScript | 5.9.3 | Tipado estático |
| Vite | 6.1.4 | Build tool & dev server |
| Tailwind CSS | 3.4.18 | Framework CSS |
| Headless UI | 2.2.9 | Componentes accesibles |
| React Router | 7.1.1 | Enrutamiento SPA |
| React Icons | 5.4.0 | Iconos Material Design |

---

## 👥 Funcionalidades por Tipo de Usuario

### 👨‍🎓 Alumno

- **Dashboard**: Vista general con accesos rápidos
- **Calificaciones**: 
  - Filtro por período (Bimestre 1-4)
  - Tabla de notas por curso
  - Impresión de libreta (solo tabla)
- **Asistencia**: 
  - Vista por días (lunes-viernes)
  - Filtro por mes (Marzo-Diciembre)
  - Paginación semanal
  - Estados: Presente, Ausente, Falta justificada, Tardanza
- **Horario**: Horario semanal de clases
- **Mis Cursos**: Lista de cursos matriculados

### 👨‍🏫 Profesor

- **Dashboard**: Vista general con accesos rápidos
- **Asistencia**:
  - Gestión por curso y fecha
  - Registro de asistencia diaria
  - Vista histórica semanal con estadísticas
  - Modal de detalle por día
  - Filtros modernos con Headless UI
- **Calificaciones**:
  - Gestión por curso
  - Modo edición con botones "Editar Notas", "Guardar", "Cancelar"
  - Cálculo automático de promedios
  - Filtros modernizados
- **Mis Cursos**: Cursos asignados
- **Horario**: Horario de clases

### 👔 Administrativo

- **Dashboard**: Vista general administrativa
- **Usuarios**: Gestión de usuarios del sistema
- **Cursos**: Administración de cursos
- **Reportes**: Generación de reportes
- **Configuración**: Ajustes del sistema

---

## 🎨 Paleta de Colores Institucional

```javascript
{
  primary: '#0a2342',   // Azul Institucional (Confianza, profesionalismo)
  secondary: '#b8860b', // Dorado Ocre (Excelencia, prestigio)
  accent: '#3b82f6',    // Azul Amigable (Accesibilidad, modernidad)
  warm: '#f59e0b',      // Naranja Cálido (Energía, creatividad)
  soft: '#f8f8fa'       // Blanco Suave (Claridad, espacio)
}
```

### Estados de Asistencia:
- � **Verde** (`green-500`): Presente
- 🔴 **Rojo** (`red-500`): Ausente  
- 🟠 **Naranja** (`orange-500`): Falta justificada
- 🟡 **Amarillo** (`yellow-500`): Tardanza

---

## 📝 Scripts Disponibles

```bash
pnpm dev          # Inicia servidor de desarrollo
pnpm build        # Compila para producción
pnpm preview      # Preview de build de producción
pnpm lint         # Ejecuta ESLint
```

---

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Limpia caché y reinstala dependencias
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
pnpm dev
```

### Errores de TypeScript
```bash
# Verifica la configuración
pnpm tsc --noEmit
```

### Problemas de estilos
```bash
# Reconstruye Tailwind CSS
pnpm build
```

---

## � Licencia

Proyecto educativo para el Colegio Nuevo Horizonte.

---

**¡Gracias por usar el Sistema de Gestión Escolar Nuevo Horizonte!** 🎓


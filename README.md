# 🏫 Sistema de Gestión Escolar - Colegio Nuevo Horizonte

Sistema de gestión escolar frontend moderno para el Colegio Nuevo Horizonte, con tres tipos de usuarios: Alumnos, Profesores y Administrativos.

## ✨ Características Principales

- ✅ **Sistema de autenticación** con auto-detección de tipo de usuario
- ✅ **Sidebar colapsable** con iconos Material Design
- ✅ **Rutas protegidas** según rol de usuario
- ✅ **Diseño moderno** con glassmorphism y gradientes
- ✅ **Responsive design** con Tailwind CSS
- ✅ **Iconos profesionales** de Material Design Icons
- ✅ **Sin backend** - Datos simulados en frontend
- ✅ **Context API** para manejo de estado global
- ✅ **Transiciones suaves** y animaciones

## 🎨 Diseño

### Login Screen
- Split-screen con imagen de fondo personalizada
- Efecto glassmorphism en el formulario
- Degradado de overlay con color institucional
- Logo en contenedor con backdrop blur

### Dashboard
- Interfaz personalizada según tipo de usuario
- Tarjetas de acceso rápido con iconos MD
- Color coding por funcionalidad
- Efectos hover y transiciones

### Navegación
- Sidebar colapsable (240px ↔ 64px)
- Iconos Material Design consistentes
- Menús dinámicos según rol
- Header con navegación rápida

### Paleta de Colores Institucional

```js
{
  primary: '#0a2342',   // Azul Institucional (Confianza, profesionalismo)
  secondary: '#b8860b', // Dorado Ocre (Excelencia, prestigio)
  accent: '#3b82f6',    // Azul Amigable (Accesibilidad, modernidad)
  warm: '#f59e0b',      // Naranja Cálido (Energía, creatividad)
  soft: '#f8f8fa'       // Blanco Suave (Claridad, espacio)
}
```

## 👥 Tipos de Usuarios

### 👨‍🎓 Alumno
- 📢 Publicaciones
- ✉️ Mensajería
- 📝 Calificaciones
- 💰 Pagos
- ✅ Asistencia
- 📋 Matrícula Web
- 📅 Horario Escolar

### 👨‍🏫 Profesor
- 📢 Publicaciones
- 📚 Mis Cursos
- 📝 Calificaciones
- ✅ Asistencia
- 📅 Horario
- ✉️ Mensajería

### 👨‍💼 Administrativo
- 📢 Publicaciones
- 👥 Usuarios
- 📚 Cursos
- 💰 Pagos
- 📊 Reportes
- ✉️ Mensajería

## 🔐 Credenciales de Prueba

| Tipo | Email | Password |
|------|-------|----------|
| **Alumno** | `alumno@colegio.com` | `123456` |
| **Profesor** | `profesor@colegio.com` | `123456` |
| **Administrativo** | `admin@colegio.com` | `123456` |

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/nuevo-horizonte-front.git
cd nuevo-horizonte-front

# Instalar dependencias (requiere pnpm)
pnpm install

# Ejecutar en modo desarrollo
pnpm dev

# Compilar para producción
pnpm build

# Vista previa de producción
pnpm preview
```

## 🛠️ Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **React** | 19.1.1 | Framework UI |
| **TypeScript** | 5.9.3 | Tipado estático |
| **Vite** | 7.1.12 | Build tool y dev server |
| **React Router** | 7.9.5 | Navegación y rutas |
| **Tailwind CSS** | 3.4.18 | Framework de estilos |
| **React Icons** | latest | Material Design Icons |
| **PostCSS** | latest | Procesador CSS |

## 📁 Estructura del Proyecto

```
src/
├── assets/                 # Recursos estáticos
│   ├── colegio-logo.png   # Logo institucional
│   ├── bg-login.jpg       # Background del login
│   └── login-bg-logo.png  # Logo para login
│
├── components/            # Componentes reutilizables
│   ├── Header.tsx        # Barra superior con navegación
│   ├── Sidebar.tsx       # Menú lateral colapsable
│   ├── Layout.tsx        # Layout principal con sidebar
│   └── ProtectedRoute.tsx # HOC para rutas protegidas
│
├── context/              # Context API
│   ├── AuthContext.tsx   # Autenticación y usuario
│   └── SidebarContext.tsx # Estado del sidebar
│
├── pages/                # Páginas de la aplicación
│   ├── Login.tsx         # Página de inicio de sesión
│   ├── Dashboard.tsx     # Dashboard principal
│   ├── Publicaciones.tsx
│   ├── Mensajeria.tsx
│   ├── Calificaciones.tsx
│   ├── Pagos.tsx
│   ├── Asistencia.tsx
│   ├── MatriculaWeb.tsx
│   ├── HorarioEscolar.tsx
│   ├── MisCursos.tsx
│   ├── Horario.tsx
│   ├── Usuarios.tsx
│   ├── Cursos.tsx
│   ├── Reportes.tsx
│   └── Unauthorized.tsx
│
├── App.tsx               # Componente principal con rutas
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales y Tailwind
```

## � Características Técnicas

### Context API
- **AuthContext**: Maneja autenticación, login, logout y datos del usuario
- **SidebarContext**: Controla el estado colapsado/expandido del sidebar

### Routing
- Rutas públicas: `/login`
- Rutas protegidas: Requieren autenticación
- Redirección automática según estado de autenticación
- Página de no autorizado para accesos inválidos

### Persistencia
- `localStorage` para mantener sesión activa
- Auto-login al recargar página si hay sesión válida

### Responsividad
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Sidebar oculto en mobile (<1024px)
- Layout adaptable según tamaño de pantalla

## 📝 Notas de Desarrollo

- Los datos de usuarios están simulados en `AuthContext.tsx`
- La autenticación NO requiere backend
- Puedes agregar más usuarios en el array `mockUsers`
- Todas las páginas usan el componente `Layout` para consistencia
- Los estilos usan clases de Tailwind (sin CSS separado excepto `index.css`)

## 🚀 Scripts Disponibles

```bash
pnpm dev          # Inicia servidor de desarrollo
pnpm build        # Compila para producción
pnpm preview      # Vista previa de build de producción
pnpm lint         # Ejecuta ESLint
```

## 📄 Licencia

Proyecto educativo para el Colegio Nuevo Horizonte (Ficticio).

## 🌟 Créditos

Proyecto académico 2025 – Facultad de Ingeniería de Sistemas e Informática
Universidad Nacional Mayor de San Marcos 🇵🇪


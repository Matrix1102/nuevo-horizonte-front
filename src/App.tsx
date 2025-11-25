// src/App.tsx - ACTUALIZADO

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CoursesProvider } from './context/CoursesContext';
import { PublicationsProvider } from './context/PublicationsContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Publicaciones } from './pages/Publicaciones';
import { Mensajeria } from './pages/Mensajeria';
import { Calificaciones } from './pages/Calificaciones';
import { CalificacionesProfesor } from './pages/CalificacionesProfesor';
import { Pagos } from './pages/Pagos';
import { Asistencia } from './pages/Asistencia';
import { AsistenciaProfesor } from './pages/AsistenciaProfesor';
import { MatriculaWeb } from './pages/MatriculaWeb';
import { HorarioEscolar } from './pages/HorarioEscolar';
import { MisCursos } from './pages/MisCursos';
import { Horario } from './pages/Horario';
import { Usuarios } from './pages/Usuarios';
import { Cursos } from './pages/Cursos';
import { AlumnosMatriculados } from './pages/AlumnosMatriculados';
import { ProfesoresContratados } from './pages/ProfesoresContratados';
import { Unauthorized } from './pages/Unauthorized';
import MiPerfil from './pages/MiPerfil';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CoursesProvider>
          <PublicationsProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/mi-perfil"
              element={
                <ProtectedRoute>
                  <MiPerfil />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/publicaciones"
              element={
                <ProtectedRoute>
                  <Publicaciones />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/mensajeria"
              element={
                <ProtectedRoute>
                  <Mensajeria />
                </ProtectedRoute>
              }
            />
            
            {/* Rutas de Calificaciones */}
            <Route
              path="/calificaciones"
              element={
                <ProtectedRoute allowedTypes={['alumno']}>
                  <Calificaciones />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/calificaciones-profesor"
              element={
                <ProtectedRoute allowedTypes={['profesor']}>
                  <CalificacionesProfesor />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/pagos"
              element={
                <ProtectedRoute>
                  <Pagos />
                </ProtectedRoute>
              }
            />
            
            {/* Rutas de Asistencia */}
            <Route
              path="/asistencia"
              element={
                <ProtectedRoute allowedTypes={['alumno']}>
                  <Asistencia />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/asistencia-profesor"
              element={
                <ProtectedRoute allowedTypes={['profesor']}>
                  <AsistenciaProfesor />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/matricula-web"
              element={
                <ProtectedRoute>
                  <MatriculaWeb />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/horario-escolar"
              element={
                <ProtectedRoute>
                  <HorarioEscolar />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/mis-cursos"
              element={
                <ProtectedRoute allowedTypes={['alumno', 'profesor']}>
                  <MisCursos />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/horario"
              element={
                <ProtectedRoute>
                  <Horario />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute>
                  <Usuarios />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/cursos"
              element={
                <ProtectedRoute>
                  <Cursos />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/alumnos-matriculados"
              element={
                <ProtectedRoute>
                  <AlumnosMatriculados />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profesores-contratados"
              element={
                <ProtectedRoute>
                  <ProfesoresContratados />
                </ProtectedRoute>
              }
            />
            
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          </PublicationsProvider>
        </CoursesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
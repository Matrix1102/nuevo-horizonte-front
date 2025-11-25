// Colores preestablecidos para cada curso
export const cursosColores: Record<string, string> = {
  'Matemáticas': 'blue',
  'Comunicación': 'green',
  'Ciencias': 'purple',
  'Historia': 'orange',
  'Inglés': 'pink',
  'Arte': 'yellow',
  'Educación Física': 'red',
  'Tutoría': 'indigo',
};

export type Curso = {
  id: number;
  nombre: string;
  profesor: string;
  horario: string;
  color: string;
};

// Lista de cursos del alumno
export const cursosAlumno: Curso[] = [
  { id: 1, nombre: 'Matemáticas', profesor: 'Profesora Rivera', horario: 'Lunes y Miércoles 8:00 AM - 10:00 AM', color: cursosColores['Matemáticas'] },
  { id: 2, nombre: 'Comunicación', profesor: 'Profesora Torres', horario: 'Martes y Jueves 8:00 AM - 10:00 AM', color: cursosColores['Comunicación'] },
  { id: 3, nombre: 'Ciencias', profesor: 'Profesor Gómez', horario: 'Lunes y Miércoles 10:30 AM - 12:30 PM', color: cursosColores['Ciencias'] },
  { id: 4, nombre: 'Historia', profesor: 'Profesora Ruiz', horario: 'Martes y Jueves 10:30 AM - 12:30 PM', color: cursosColores['Historia'] },
  { id: 5, nombre: 'Inglés', profesor: 'Profesora Lee', horario: 'Viernes 8:00 AM - 11:00 AM', color: cursosColores['Inglés'] },
  { id: 6, nombre: 'Arte', profesor: 'Profesora Díaz', horario: 'Lunes y Jueves 1:00 PM - 3:00 PM', color: cursosColores['Arte'] },
  { id: 7, nombre: 'Educación Física', profesor: 'Profesor Soto', horario: 'Viernes 2:00 PM - 4:00 PM', color: cursosColores['Educación Física'] },
];

// Función para obtener el color de un curso
export const getCursoColor = (nombreCurso: string): string => {
  return cursosColores[nombreCurso] || 'gray';
};

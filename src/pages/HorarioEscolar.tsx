import { useMemo } from 'react';
import { Layout } from '../components/Layout';
import { MdSchedule } from 'react-icons/md';
import { useCourses } from '../context/CoursesContext';
import { useAuth } from '../context/AuthContext';

type Slot = {
  subject: string;
  teacher?: string;
  room?: string;
};

type Timetable = Record<string, (Slot | null)[]>; // day -> 8 slots

// Mapeo de colores distintivos para cada curso
const courseColors: Record<string, { bg: string; border: string; text: string }> = {
  'Matemáticas': { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-900' },
  'Comunicación': { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-900' },
  'Ciencias': { bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-900' },
  'Historia': { bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-900' },
  'Inglés': { bg: 'bg-pink-100', border: 'border-pink-500', text: 'text-pink-900' },
  'Arte': { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-900' },
  'Educación Física': { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-900' },
  'Tutoría': { bg: 'bg-indigo-100', border: 'border-indigo-500', text: 'text-indigo-900' },
};

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

// Horario semanal fijo para 5to Primaria Sección A
const weeklySchedule: Timetable = {
  Lunes: [
    { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
    { subject: 'Comunicación', teacher: 'Profesora Torres' },
    { subject: 'Ciencias', teacher: 'Profesor Gómez' },
    { subject: 'Historia', teacher: 'Profesora Ruiz' },
    { subject: 'Inglés', teacher: 'Profesora Lee' },
    { subject: 'Arte', teacher: 'Profesora Díaz' },
    { subject: 'Educación Física', teacher: 'Profesor Soto' },
    { subject: 'Tutoría', teacher: 'Profesora Rivera' },
  ],
  Martes: [
    { subject: 'Ciencias', teacher: 'Profesor Gómez' },
    { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
    { subject: 'Inglés', teacher: 'Profesora Lee' },
    { subject: 'Comunicación', teacher: 'Profesora Torres' },
    { subject: 'Historia', teacher: 'Profesora Ruiz' },
    { subject: 'Arte', teacher: 'Profesora Díaz' },
    { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
    { subject: 'Ciencias', teacher: 'Profesor Gómez' },
  ],
  Miércoles: [
    { subject: 'Historia', teacher: 'Profesora Ruiz' },
    { subject: 'Comunicación', teacher: 'Profesora Torres' },
    { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
    { subject: 'Inglés', teacher: 'Profesora Lee' },
    { subject: 'Ciencias', teacher: 'Profesor Gómez' },
    { subject: 'Educación Física', teacher: 'Profesor Soto' },
    { subject: 'Arte', teacher: 'Profesora Díaz' },
    { subject: 'Tutoría', teacher: 'Profesora Rivera' },
  ],
  Jueves: [
    { subject: 'Inglés', teacher: 'Profesora Lee' },
    { subject: 'Historia', teacher: 'Profesora Ruiz' },
    { subject: 'Comunicación', teacher: 'Profesora Torres' },
    { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
    { subject: 'Arte', teacher: 'Profesora Díaz' },
    { subject: 'Ciencias', teacher: 'Profesor Gómez' },
    { subject: 'Educación Física', teacher: 'Profesor Soto' },
    { subject: 'Comunicación', teacher: 'Profesora Torres' },
  ],
  Viernes: [
    { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
    { subject: 'Ciencias', teacher: 'Profesor Gómez' },
    { subject: 'Comunicación', teacher: 'Profesora Torres' },
    { subject: 'Historia', teacher: 'Profesora Ruiz' },
    { subject: 'Inglés', teacher: 'Profesora Lee' },
    { subject: 'Arte', teacher: 'Profesora Díaz' },
    { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
    { subject: 'Educación Física', teacher: 'Profesor Soto' },
  ],
};

export function HorarioEscolar() {
  const { courses } = useCourses();
  const { user } = useAuth();

  // Obtener cursos del estudiante para validar consistencia
  const studentCourses = useMemo(() => {
    if (!user || user.type !== 'alumno') return [];
    return courses.filter(course =>
      course.students.some(student => student.id === `s${user.id}`)
    );
  }, [user, courses]);

  // Validar que las materias del horario coincidan con los cursos del estudiante
  const validatedSchedule = useMemo(() => {
    const courseNames = new Set(studentCourses.map(c => c.name));
    const schedule: Timetable = {};
    
    days.forEach(day => {
      schedule[day] = weeklySchedule[day].map(slot => {
        if (!slot) return null;
        // Si la materia está en los cursos del estudiante, mostrarla
        if (courseNames.has(slot.subject) || slot.subject === 'Tutoría') {
          return slot;
        }
        return null;
      });
    });
    
    return schedule;
  }, [studentCourses]);

  const getCourseStyle = (subject: string) => {
    return courseColors[subject] || { bg: 'bg-gray-100', border: 'border-gray-500', text: 'text-gray-900' };
  };

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdSchedule /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Horario Escolar</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">
        <div className="flex items-center justify-between mb-6">
          <div className="w-full text-center">
            <h3 className="text-xl font-semibold bg-gray-100 inline-block px-6 py-2 rounded">
              5to Primaria - Sección A
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr>
                <th className="w-36 border p-3 text-left">Hora</th>
                {days.map((d) => (
                  <th key={d} className="border p-3 text-center">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                  <td className="border p-3 font-medium">Hora {idx + 1}</td>
                  {days.map((d) => {
                    const slot = validatedSchedule[d][idx];
                    const style = slot ? getCourseStyle(slot.subject) : null;
                    return (
                      <td key={d} className="border p-3 align-top">
                        {slot && style ? (
                          <div className={`p-3 rounded-lg ${style.bg} border-l-4 ${style.border}`}>
                            <div className={`font-semibold ${style.text}`}>{slot.subject}</div>
                            <div className="text-sm text-gray-600">{slot.teacher}</div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">-</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  );
}

export default HorarioEscolar;

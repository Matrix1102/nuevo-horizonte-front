// src/pages/MisCursos.tsx - ACTUALIZADO

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { MdClass, MdPeople, MdGrade, MdCheckCircle } from 'react-icons/md';
import { useCourses } from '../context/CoursesContext';
import { useAuth } from '../context/AuthContext';

export function MisCursos() {
  const { courses } = useCourses();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Filtrar cursos según el tipo de usuario
  const myCourses = useMemo(() => {
    if (!user) return [];
    
    // Si es profesor, mostrar cursos que enseña
    if (user.type === 'profesor') {
      return courses.filter(course => course.teacherId === user.id);
    }
    
    // Si es alumno, mostrar cursos donde está inscrito
    if (user.type === 'alumno') {
      return courses.filter(course =>
        course.students.some(student => student.id === `s${user.id}`)
      );
    }
    
    return [];
  }, [courses, user]);

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl text-accent-500"><MdClass /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Mis Cursos</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">
        <h3 className="text-lg font-semibold mb-6 text-primary-500">
          Cursos Asignados ({myCourses.length})
        </h3>

        {myCourses.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <MdClass className="text-6xl mx-auto mb-4 text-gray-300" />
            <p>No tienes cursos asignados</p>
            <p className="text-sm">Contacta con administración para que te asignen cursos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map(course => (
              <div
                key={course.id}
                className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-accent-500 hover:shadow-lg transition-all"
              >
                <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-4 text-white">
                  <div className="flex items-start justify-between mb-2">
                    <MdClass className="text-3xl" />
                    <span className="bg-white/20 px-2 py-1 rounded-lg text-xs font-medium">
                      {course.level}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold mb-1">{course.name}</h4>
                  <p className="text-sm opacity-90">Sección {course.section}</p>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                    <MdPeople className="text-xl text-accent-500" />
                    <span className="font-semibold text-gray-700">
                      {user?.type === 'profesor' ? `${course.students.length} Alumnos` : course.teacherName}
                    </span>
                  </div>

                  {user?.type === 'profesor' && (
                    <div className="space-y-2">
                      <button
                        onClick={() => navigate('/calificaciones-profesor', { state: { courseId: course.id } })}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition-colors"
                      >
                        <MdGrade className="text-xl" />
                        <span>Ver Calificaciones</span>
                      </button>

                      <button
                        onClick={() => navigate('/asistencia-profesor', { state: { courseId: course.id } })}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 font-medium transition-colors"
                      >
                        <MdCheckCircle className="text-xl" />
                        <span>Tomar Asistencia</span>
                      </button>
                    </div>
                  )}

                  {user?.type === 'profesor' && course.students.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-gray-500 mb-2 font-semibold">Alumnos inscritos:</p>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {course.students.slice(0, 5).map(student => (
                          <div key={student.id} className="text-xs text-gray-600 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-accent-100 flex items-center justify-center text-accent-600 font-semibold text-xs">
                              {student.name.charAt(0)}
                            </div>
                            {student.name}
                          </div>
                        ))}
                        {course.students.length > 5 && (
                          <div className="text-xs text-gray-400 italic">
                            +{course.students.length - 5} más...
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
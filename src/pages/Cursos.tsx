import { Layout } from '../components/Layout';
import { MdClass } from 'react-icons/md';
import { MdBook } from 'react-icons/md';

export function Cursos() {
  // Datos simulados
  const courses = [
    { id: 1, name: 'Matemáticas', level: '5to Primaria', students: 30 },
    { id: 2, name: 'Comunicación', level: '5to Primaria', students: 30 },
    { id: 3, name: 'Ciencias', level: '5to Primaria', students: 30 },
    { id: 4, name: 'Historia', level: '5to Primaria', students: 30 },
  ];

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-warm-500"><MdClass /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Gestión de Cursos</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-warm-500">
        <h3 className="text-lg font-semibold mb-4 text-primary-500">Listado de Cursos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map(course => (
            <div key={course.id} className="p-4 border rounded-lg bg-soft-100 flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold text-primary-500 flex items-center gap-2">
                  <MdBook /> {course.name}
                </div>
                <div className="text-sm text-gray-600">{course.level}</div>
              </div>
              <div className="text-md font-medium text-accent-500">
                {course.students} Alumnos
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

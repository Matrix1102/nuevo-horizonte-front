import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { MdPeople, MdSearch, MdEmail, MdPhone, MdSchool } from 'react-icons/md';
import { useCourses } from '../context/CoursesContext';

type EnrolledStudent = {
  id: string;
  name: string;
  dni: string;
  email: string;
  level: string;
  section: string;
  coursesCount: number;
  phone?: string;
};

export function AlumnosMatriculados() {
  const { courses } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Obtener todos los estudiantes únicos con su información
  const enrolledStudents: EnrolledStudent[] = useMemo(() => {
    const studentMap = new Map<string, EnrolledStudent>();
    
    courses.forEach(course => {
      course.students.forEach(student => {
        if (!studentMap.has(student.id)) {
          studentMap.set(student.id, {
            id: student.id,
            name: student.name,
            dni: student.dni,
            email: student.email,
            level: course.level,
            section: course.section,
            coursesCount: 1,
            phone: student.id === 's1' ? '+51 987654321' : 
                   student.id === 's2' ? '+51 987654322' : 
                   student.id === 's3' ? '+51 987654323' : '+51 987654300',
          });
        } else {
          const existing = studentMap.get(student.id)!;
          studentMap.set(student.id, {
            ...existing,
            coursesCount: existing.coursesCount + 1,
          });
        }
      });
    });
    
    return Array.from(studentMap.values());
  }, [courses]);

  // Obtener niveles únicos
  const levels = useMemo(() => {
    const uniqueLevels = new Set(enrolledStudents.map(s => s.level));
    return Array.from(uniqueLevels);
  }, [enrolledStudents]);

  // Filtrar estudiantes
  const filteredStudents = useMemo(() => {
    return enrolledStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.dni.includes(searchTerm) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = selectedLevel === 'all' || student.level === selectedLevel;
      return matchesSearch && matchesLevel;
    });
  }, [enrolledStudents, searchTerm, selectedLevel]);

  // Estadísticas
  const stats = useMemo(() => {
    return {
      total: enrolledStudents.length,
      byLevel: levels.reduce((acc, level) => {
        acc[level] = enrolledStudents.filter(s => s.level === level).length;
        return acc;
      }, {} as Record<string, number>),
    };
  }, [enrolledStudents, levels]);

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdPeople /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Alumnos Matriculados</h2>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-accent-500">
          <div className="text-sm text-gray-600 mb-1">Total Matriculados</div>
          <div className="text-3xl font-bold text-accent-500">{stats.total}</div>
        </div>
        {levels.map(level => (
          <div key={level} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-secondary-500">
            <div className="text-sm text-gray-600 mb-1">{level}</div>
            <div className="text-3xl font-bold text-secondary-500">{stats.byLevel[level]}</div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              <MdSearch className="inline mr-1" />
              Buscar estudiante:
            </label>
            <input
              type="text"
              placeholder="Nombre, DNI o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Filtrar por nivel:</label>
            <select 
              value={selectedLevel} 
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="all">Todos los niveles</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Mostrando {filteredStudents.length} de {stats.total} estudiantes
        </div>
      </div>

      {/* Lista de estudiantes */}
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">
        <h3 className="text-lg font-semibold mb-4 text-primary-500">Lista de Estudiantes</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border">Nombre Completo</th>
                <th className="text-center px-4 py-3 border">DNI</th>
                <th className="text-left px-4 py-3 border">Email</th>
                <th className="text-center px-4 py-3 border">Teléfono</th>
                <th className="text-center px-4 py-3 border">Nivel/Sección</th>
                <th className="text-center px-4 py-3 border">Cursos</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50">
                    <td className="px-4 py-3 border">
                      <div className="flex items-center gap-2">
                        <span className="text-accent-500"><MdSchool /></span>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </td>
                    <td className="text-center px-4 py-3 border">{student.dni}</td>
                    <td className="px-4 py-3 border">
                      <div className="flex items-center gap-2 text-sm">
                        <MdEmail className="text-gray-500" />
                        {student.email}
                      </div>
                    </td>
                    <td className="text-center px-4 py-3 border">
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <MdPhone className="text-gray-500" />
                        {student.phone}
                      </div>
                    </td>
                    <td className="text-center px-4 py-3 border">
                      <span className="inline-block bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                        {student.level} {student.section}
                      </span>
                    </td>
                    <td className="text-center px-4 py-3 border">
                      <span className="inline-block bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {student.coursesCount}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No se encontraron estudiantes con los criterios de búsqueda
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default AlumnosMatriculados;

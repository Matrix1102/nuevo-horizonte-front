import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { MdPersonAdd, MdSearch, MdEmail, MdSchool, MdEdit, MdDelete } from 'react-icons/md';

type Teacher = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  assignedGrade?: string;
  assignedSection?: string;
};

// Datos iniciales de profesores
const initialTeachers: Teacher[] = [
  {
    id: 't1',
    name: 'María García',
    email: 'maria.garcia@colegio.com',
    phone: '+51 987654321',
    specialty: 'Matemáticas',
    assignedGrade: '5to Primaria',
    assignedSection: 'A',
  },
  {
    id: 't2',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@colegio.com',
    phone: '+51 987654322',
    specialty: 'Comunicación',
    assignedGrade: '4to Primaria',
    assignedSection: 'B',
  },
  {
    id: 't3',
    name: 'Ana Torres',
    email: 'ana.torres@colegio.com',
    phone: '+51 987654323',
    specialty: 'Ciencias Naturales',
  },
  {
    id: 't4',
    name: 'Roberto Sánchez',
    email: 'roberto.sanchez@colegio.com',
    phone: '+51 987654324',
    specialty: 'Educación Física',
  },
  {
    id: 't5',
    name: 'Patricia Mendoza',
    email: 'patricia.mendoza@colegio.com',
    phone: '+51 987654325',
    specialty: 'Inglés',
    assignedGrade: '3ro Primaria',
    assignedSection: 'A',
  },
];

const grades = ['1ro Primaria', '2do Primaria', '3ro Primaria', '4to Primaria', '5to Primaria', '6to Primaria'];
const sections = ['A', 'B', 'C'];

export function ProfesoresContratados() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAssignment, setFilterAssignment] = useState<'all' | 'assigned' | 'unassigned'>('all');
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filtrar profesores
  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           teacher.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const hasAssignment = teacher.assignedGrade && teacher.assignedSection;
      const matchesFilter = filterAssignment === 'all' || 
                           (filterAssignment === 'assigned' && hasAssignment) ||
                           (filterAssignment === 'unassigned' && !hasAssignment);
      
      return matchesSearch && matchesFilter;
    });
  }, [teachers, searchTerm, filterAssignment]);

  // Estadísticas
  const stats = useMemo(() => {
    const assigned = teachers.filter(t => t.assignedGrade && t.assignedSection).length;
    return {
      total: teachers.length,
      assigned,
      unassigned: teachers.length - assigned,
    };
  }, [teachers]);

  function openAssignModal(teacher: Teacher) {
    setEditingTeacher({ ...teacher });
    setModalOpen(true);
  }

  function handleAssign() {
    if (!editingTeacher) return;
    setTeachers(prev => prev.map(t => t.id === editingTeacher.id ? editingTeacher : t));
    setModalOpen(false);
    setEditingTeacher(null);
  }

  function handleUnassign(teacherId: string) {
    setTeachers(prev => prev.map(t => 
      t.id === teacherId ? { ...t, assignedGrade: undefined, assignedSection: undefined } : t
    ));
  }

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdPersonAdd /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Profesores Contratados</h2>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-accent-500">
          <div className="text-sm text-gray-600 mb-1">Total Profesores</div>
          <div className="text-3xl font-bold text-accent-500">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="text-sm text-gray-600 mb-1">Asignados</div>
          <div className="text-3xl font-bold text-green-600">{stats.assigned}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-orange-500">
          <div className="text-sm text-gray-600 mb-1">Sin Asignar</div>
          <div className="text-3xl font-bold text-orange-600">{stats.unassigned}</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              <MdSearch className="inline mr-1" />
              Buscar profesor:
            </label>
            <input
              type="text"
              placeholder="Nombre, email o especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Filtrar por asignación:</label>
            <select 
              value={filterAssignment} 
              onChange={(e) => setFilterAssignment(e.target.value as 'all' | 'assigned' | 'unassigned')}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="all">Todos</option>
              <option value="assigned">Asignados</option>
              <option value="unassigned">Sin asignar</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Mostrando {filteredTeachers.length} de {stats.total} profesores
        </div>
      </div>

      {/* Lista de profesores */}
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">
        <h3 className="text-lg font-semibold mb-4 text-primary-500">Lista de Profesores</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border">Nombre</th>
                <th className="text-left px-4 py-3 border">Email</th>
                <th className="text-center px-4 py-3 border">Teléfono</th>
                <th className="text-left px-4 py-3 border">Especialidad</th>
                <th className="text-center px-4 py-3 border">Salón Asignado</th>
                <th className="text-center px-4 py-3 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50">
                    <td className="px-4 py-3 border">
                      <div className="font-medium">{teacher.name}</div>
                    </td>
                    <td className="px-4 py-3 border">
                      <div className="flex items-center gap-2 text-sm">
                        <MdEmail className="text-gray-500" />
                        {teacher.email}
                      </div>
                    </td>
                    <td className="text-center px-4 py-3 border text-sm">{teacher.phone}</td>
                    <td className="px-4 py-3 border">
                      <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                        {teacher.specialty}
                      </span>
                    </td>
                    <td className="text-center px-4 py-3 border">
                      {teacher.assignedGrade && teacher.assignedSection ? (
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          <MdSchool className="inline mr-1" />
                          {teacher.assignedGrade} {teacher.assignedSection}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">Sin asignar</span>
                      )}
                    </td>
                    <td className="text-center px-4 py-3 border">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openAssignModal(teacher)}
                          className="flex items-center gap-1 px-3 py-1 rounded bg-accent-500 text-white text-sm hover:bg-accent-600"
                        >
                          <MdEdit /> {teacher.assignedGrade ? 'Reasignar' : 'Asignar'}
                        </button>
                        {teacher.assignedGrade && (
                          <button
                            onClick={() => handleUnassign(teacher.id)}
                            className="flex items-center gap-1 px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
                          >
                            <MdDelete /> Quitar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No se encontraron profesores con los criterios de búsqueda
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de asignación */}
      {modalOpen && editingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-primary-500">Asignar Salón</h3>
            
            <div className="mb-4">
              <div className="text-sm text-gray-700 mb-2">
                <strong>Profesor:</strong> {editingTeacher.name}
              </div>
              <div className="text-sm text-gray-700 mb-4">
                <strong>Especialidad:</strong> {editingTeacher.specialty}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-1">Grado:</label>
              <select
                value={editingTeacher.assignedGrade || ''}
                onChange={(e) => setEditingTeacher({ ...editingTeacher, assignedGrade: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">Seleccionar grado</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-1">Sección:</label>
              <select
                value={editingTeacher.assignedSection || ''}
                onChange={(e) => setEditingTeacher({ ...editingTeacher, assignedSection: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">Seleccionar sección</option>
                {sections.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setModalOpen(false)} 
                className="px-4 py-2 rounded border text-sm"
              >
                Cancelar
              </button>
              <button 
                onClick={handleAssign}
                disabled={!editingTeacher.assignedGrade || !editingTeacher.assignedSection}
                className="px-4 py-2 rounded bg-accent-500 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Asignar
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default ProfesoresContratados;

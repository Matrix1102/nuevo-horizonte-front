import { useState } from 'react';
import { MdClose, MdSave } from 'react-icons/md';
import { useCourses } from '../context/CoursesContext';
import { useSidebar } from '../context/SidebarContext';
import type { Publication } from '../types/Publication';

interface PublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (publication: Omit<Publication, 'id'>) => void;
  authorId: string;
  authorName: string;
  authorType: 'administrativo' | 'profesor';
}

export function PublicationModal({
  isOpen,
  onClose,
  onSave,
  authorId,
  authorName,
  authorType,
}: PublicationModalProps) {
  const { courses } = useCourses();
  const { isCollapsed } = useSidebar();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState<'all' | 'students'>('all');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  // Filtrar cursos del profesor si es profesor
  const availableCourses = authorType === 'profesor'
    ? courses.filter(c => c.teacherId === authorId)
    : courses;

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('Por favor complete todos los campos');
      return;
    }

    if (targetAudience === 'students' && selectedCourses.length === 0) {
      alert('Por favor seleccione al menos un curso');
      return;
    }

    const newPublication: Omit<Publication, 'id'> = {
      title: title.trim(),
      content: content.trim(),
      date: new Date().toISOString().split('T')[0],
      authorId,
      authorName,
      authorType,
      targetAudience,
      targetCourses: targetAudience === 'students' ? selectedCourses : undefined,
    };

    onSave(newPublication);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    setTargetAudience('all');
    setSelectedCourses([]);
    onClose();
  };

  const toggleCourse = (courseId: string) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      style={{
        paddingLeft: isCollapsed ? '64px' : '256px',
        transition: 'padding-left 0.3s ease-in-out',
      }}
    >
      <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 w-full max-w-md md:max-w-2xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto m-auto">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-primary-500">Nueva Publicación</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MdClose size={24} className="md:w-7 md:h-7" />
          </button>
        </div>

        <div className="space-y-3 md:space-y-4">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              placeholder="Título de la publicación"
            />
          </div>

          {/* Contenido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenido
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none md:rows-6"
              placeholder="Escribe el contenido de la publicación..."
            />
          </div>

          {/* Audiencia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirigido a
            </label>
            <select
              value={targetAudience}
              onChange={(e) => {
                setTargetAudience(e.target.value as 'all' | 'students');
                setSelectedCourses([]);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            >
              <option value="all">Todos los usuarios</option>
              {authorType === 'profesor' && (
                <option value="students">Alumnos de mis cursos</option>
              )}
            </select>
          </div>

          {/* Selección de cursos (solo si targetAudience === 'students') */}
          {targetAudience === 'students' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccionar Cursos
              </label>
              <div className="border border-gray-300 rounded-lg p-4 max-h-40 md:max-h-48 overflow-y-auto">
                {availableCourses.length === 0 ? (
                  <p className="text-gray-500 text-sm">No tienes cursos asignados</p>
                ) : (
                  <div className="space-y-2">
                    {availableCourses.map((course) => (
                      <label
                        key={course.id}
                        className="flex items-center gap-2 cursor-pointer hover:bg-soft-100 p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCourses.includes(course.id)}
                          onChange={() => toggleCourse(course.id)}
                          className="w-4 h-4 text-accent-500 border-gray-300 rounded focus:ring-accent-500"
                        />
                        <span className="text-gray-700">
                          {course.name} - {course.level} {course.section}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-4 md:mt-6">
          <button
            onClick={handleClose}
            className="px-3 md:px-4 py-2 text-sm md:text-base text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-3 md:px-4 py-2 text-sm md:text-base bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors flex items-center gap-2"
          >
            <MdSave className="w-4 h-4 md:w-5 md:h-5" />
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}

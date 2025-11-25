// src/pages/Cursos.tsx - ACTUALIZADO

import { useState } from 'react';
import { Layout } from '../components/Layout';
import { MdClass, MdAdd, MdEdit, MdDelete, MdPeople, MdPersonAdd } from 'react-icons/md';
import { useCourses } from '../context/CoursesContext';
import { useAuth } from '../context/AuthContext';
import { CourseModal } from '../components/CourseModal';
import { StudentModal } from '../components/StudentModal';
import type { Course } from '../types/Course';

export function Cursos() {
  const { courses, addCourse, updateCourse, deleteCourse, addStudentToCourse, removeStudentFromCourse } = useCourses();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>();
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  
  // Obtener lista de profesores (filtramos usuarios de tipo profesor)
  const teachers = [
    { id: '2', name: 'María García' },
    { id: 'p2', name: 'Carlos López' },
    { id: 'p3', name: 'Ana Martínez' },
    { id: 'p4', name: 'José Torres' },
  ];

  const handleAddCourse = () => {
    setSelectedCourse(undefined);
    setIsModalOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleSaveCourse = (courseData: Omit<Course, 'id' | 'students'>) => {
    if (selectedCourse) {
      updateCourse(selectedCourse.id, courseData);
    } else {
      addCourse(courseData);
    }
  };

  const handleDeleteCourse = (id: string, name: string) => {
    if (window.confirm(`¿Está seguro de eliminar el curso "${name}"?`)) {
      deleteCourse(id);
    }
  };

  const handleAddStudent = (course: Course) => {
    setSelectedCourse(course);
    setIsStudentModalOpen(true);
  };

  const handleSaveStudent = (student: Omit<Student, 'id'>) => {
    if (selectedCourse) {
      addStudentToCourse(selectedCourse.id, student);
    }
  };

  const handleRemoveStudent = (courseId: string, studentId: string, studentName: string) => {
    if (window.confirm(`¿Está seguro de eliminar a "${studentName}" del curso?`)) {
      removeStudentFromCourse(courseId, studentId);
    }
  };

  const toggleCourseExpanded = (courseId: string) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCourses(newExpanded);
  };

  const handleCourseClick = (courseId: string, e: React.MouseEvent) => {
    // No expandir si se hizo clic en un botón
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    toggleCourseExpanded(courseId);
  };

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-warm-500"><MdClass /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Gestión de Cursos</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-warm-500">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-primary-500">Listado de Cursos</h3>
          <button
            onClick={handleAddCourse}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent-500 text-white font-medium hover:bg-accent-600 transition-colors shadow-sm hover:shadow-md"
          >
            <MdAdd className="text-xl" /> Agregar Curso
          </button>
        </div>
        
        {courses.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <MdClass className="text-6xl mx-auto mb-4 text-gray-300" />
            <p>No hay cursos registrados</p>
            <p className="text-sm">Haz clic en "Agregar Curso" para comenzar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map(course => {
              const isExpanded = expandedCourses.has(course.id);
              return (
                <div key={course.id} className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-accent-300 transition-colors">
                  <div 
                    className="p-4 bg-soft-100 flex justify-between items-center cursor-pointer"
                    onClick={(e) => handleCourseClick(course.id, e)}
                  >
                    <div className="flex-1">
                      <div className="text-lg font-semibold text-primary-500 flex items-center gap-2">
                        <MdClass className="text-warm-500" /> {course.name}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {course.level} - Sección {course.section}
                      </div>
                      {course.teacherName && (
                        <div className="text-sm text-gray-500 mt-1">
                          Profesor: {course.teacherName}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-accent-500 bg-accent-50 px-3 py-1.5 rounded-lg border border-accent-200">
                        <MdPeople className="inline mr-1" />
                        {course.students.length} Alumnos
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCourse(course);
                        }}
                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                        title="Editar curso"
                      >
                        <MdEdit className="text-xl" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCourse(course.id, course.name);
                        }}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                        title="Eliminar curso"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-4 border-t-2 border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-700">Alumnos Inscritos</h4>
                        <button
                          onClick={() => handleAddStudent(course)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors shadow-sm"
                        >
                          <MdPersonAdd /> Agregar Alumno
                        </button>
                      </div>

                      {course.students.length === 0 ? (
                        <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
                          <MdPeople className="text-4xl mx-auto mb-2" />
                          <p className="text-sm">No hay alumnos inscritos</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {course.students.map(student => (
                            <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                              <div>
                                <div className="font-medium text-gray-800">{student.name}</div>
                                <div className="text-xs text-gray-500">DNI: {student.dni}</div>
                                <div className="text-xs text-gray-500">{student.email}</div>
                              </div>
                              <button
                                onClick={() => handleRemoveStudent(course.id, student.id, student.name)}
                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                title="Eliminar alumno"
                              >
                                <MdDelete className="text-lg" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCourse}
        course={selectedCourse}
        teachers={teachers}
      />

      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSave={handleSaveStudent}
        courseName={selectedCourse?.name || ''}
      />
    </Layout>
  );
}
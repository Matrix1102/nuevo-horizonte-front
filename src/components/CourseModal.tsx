// src/components/CourseModal.tsx

import { useState, useEffect } from 'react';
import { MdClose, MdSave } from 'react-icons/md';
import type { Course } from '../types/Course';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Omit<Course, 'id' | 'students'>) => void;
  course?: Course;
  teachers: { id: string; name: string }[];
}

const LEVELS = [
  '1ro de Primaria',
  '2do de Primaria',
  '3ro de Primaria',
  '4to de Primaria',
  '5to de Primaria',
  '6to de Primaria',
  '1ro de Secundaria',
  '2do de Secundaria',
  '3ro de Secundaria',
  '4to de Secundaria',
  '5to de Secundaria',
];

const SECTIONS = ['A', 'B', 'C', 'D'];

export function CourseModal({ isOpen, onClose, onSave, course, teachers }: CourseModalProps) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [section, setSection] = useState('');
  const [teacherId, setTeacherId] = useState('');

  useEffect(() => {
    if (course) {
      setName(course.name);
      setLevel(course.level);
      setSection(course.section);
      setTeacherId(course.teacherId || '');
    } else {
      setName('');
      setLevel('');
      setSection('');
      setTeacherId('');
    }
  }, [course, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !level || !section) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }
    
    const selectedTeacher = teachers.find(t => t.id === teacherId);
    
    onSave({
      name: name.trim(),
      level,
      section,
      teacherId: teacherId || undefined,
      teacherName: selectedTeacher?.name || undefined,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-primary-500">
            {course ? 'Editar Curso' : 'Agregar Curso'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MdClose className="text-xl text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Curso <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent-500 transition-colors"
              placeholder="Ej: Matemáticas"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nivel <span className="text-red-500">*</span>
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent-500 transition-colors"
              required
            >
              <option value="">Seleccione un nivel</option>
              {LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sección <span className="text-red-500">*</span>
            </label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent-500 transition-colors"
              required
            >
              <option value="">Seleccione una sección</option>
              {SECTIONS.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profesor Asignado
            </label>
            <select
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent-500 transition-colors"
            >
              <option value="">Sin asignar</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-accent-500 text-white font-medium hover:bg-accent-600 transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <MdSave /> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
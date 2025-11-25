// src/components/StudentModal.tsx

import { useState } from 'react';
import { MdClose, MdPersonAdd } from 'react-icons/md';
import type { Student } from '../types/Course';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Omit<Student, 'id'>) => void;
  courseName: string;
}

export function StudentModal({ isOpen, onClose, onSave, courseName }: StudentModalProps) {
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dni.trim() || !email.trim()) {
      alert('Por favor complete todos los campos');
      return;
    }
    onSave({
      name: name.trim(),
      dni: dni.trim(),
      email: email.trim(),
    });
    setName('');
    setDni('');
    setEmail('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setDni('');
    setEmail('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-primary-500">Agregar Alumno</h3>
            <p className="text-sm text-gray-500 mt-1">Curso: {courseName}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MdClose className="text-xl text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent-500 transition-colors"
              placeholder="Ej: Pablo Jiménez"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              DNI <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent-500 transition-colors"
              placeholder="Ej: 12345678"
              required
              maxLength={8}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent-500 transition-colors"
              placeholder="Ej: pablo@ejemplo.com"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-accent-500 text-white font-medium hover:bg-accent-600 transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <MdPersonAdd /> Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
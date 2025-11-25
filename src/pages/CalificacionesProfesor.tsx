// src/pages/CalificacionesProfesor.tsx - ACTUALIZADO CON DATOS REALES

import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { MdGrade, MdEdit, MdSave, MdClose, MdExpandMore, MdCheck } from 'react-icons/md';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useCourses } from '../context/CoursesContext';
import { useAuth } from '../context/AuthContext';

type GradeRecord = {
  studentId: string;
  studentName: string;
  grades: (number | null)[]; // 4 periods
};

function computeAverage(grades: (number | null)[]) {
  const nums = grades.filter((g): g is number => typeof g === 'number');
  if (nums.length === 0) return null;
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  return Math.round(avg * 10) / 10;
}

export function CalificacionesProfesor() {
  const { courses, courseGrades, saveCourseGrades } = useCourses();
  const { user } = useAuth();
  const location = useLocation();
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [editMode, setEditMode] = useState(false);
  const [editedGrades, setEditedGrades] = useState<Map<string, (number | null)[]>>(new Map());

  // Filtrar cursos del profesor actual
  const myCourses = useMemo(() => {
    return courses.filter(course => course.teacherId === user?.id);
  }, [courses, user]);

  // Seleccionar curso inicial (desde navegación o primer curso)
  useEffect(() => {
    const courseIdFromNav = (location.state as any)?.courseId;
    if (courseIdFromNav && myCourses.find(c => c.id === courseIdFromNav)) {
      setSelectedCourse(courseIdFromNav);
    } else if (myCourses.length > 0 && !selectedCourse) {
      setSelectedCourse(myCourses[0].id);
    }
  }, [myCourses, location.state, selectedCourse]);

  const currentCourse = useMemo(
    () => myCourses.find((c) => c.id === selectedCourse),
    [myCourses, selectedCourse]
  );

  // Obtener calificaciones del curso actual
  const currentGrades = useMemo(() => {
    if (!currentCourse) return [];
    
    const savedGrades = courseGrades.find(g => g.courseId === selectedCourse);
    
    return currentCourse.students.map(student => {
      const existingGrade = savedGrades?.grades.find(g => g.studentId === student.id);
      return {
        studentId: student.id,
        studentName: student.name,
        grades: existingGrade?.grades || [null, null, null, null],
      };
    });
  }, [currentCourse, courseGrades, selectedCourse]);

  const periods = ['1° Bimestre', '2° Bimestre', '3° Bimestre', '4° Bimestre'];

  function startEdit() {
    if (!currentCourse) return;
    const gradeMap = new Map<string, (number | null)[]>();
    currentGrades.forEach((g) => {
      gradeMap.set(g.studentId, [...g.grades]);
    });
    setEditedGrades(gradeMap);
    setEditMode(true);
  }

  function cancelEdit() {
    setEditedGrades(new Map());
    setEditMode(false);
  }

  function saveGrades() {
    if (!currentCourse) return;
    
    const gradesData = currentGrades.map(g => ({
      studentId: g.studentId,
      grades: editedGrades.get(g.studentId) || g.grades,
    }));

    saveCourseGrades({
      courseId: selectedCourse,
      grades: gradesData,
    });

    setEditMode(false);
    setEditedGrades(new Map());
    alert('Calificaciones guardadas correctamente');
  }

  function updateGrade(studentId: string, periodIdx: number, value: string) {
    const numValue = value === '' ? null : parseFloat(value);
    if (numValue !== null && (numValue < 0 || numValue > 20)) {
      alert('La nota debe estar entre 0 y 20');
      return;
    }
    setEditedGrades((prev) => {
      const newMap = new Map(prev);
      const current = newMap.get(studentId) || [null, null, null, null];
      const updated = [...current];
      updated[periodIdx] = numValue;
      newMap.set(studentId, updated);
      return newMap;
    });
  }

  if (myCourses.length === 0) {
    return (
      <Layout>
        <div className="flex items-center gap-3 mb-5">
          <span className="text-3xl text-accent-500">
            <MdGrade />
          </span>
          <h2 className="text-primary-500 text-2xl font-bold">Calificaciones - Profesor</h2>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-accent-500 text-center">
          <MdGrade className="text-6xl mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No tienes cursos asignados</p>
          <p className="text-sm text-gray-400">Contacta con administración para que te asignen cursos</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500">
          <MdGrade />
        </span>
        <h2 className="text-primary-500 text-2xl font-bold">Calificaciones - Profesor</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Curso:</label>
            <Listbox
              value={selectedCourse}
              onChange={(val) => {
                setSelectedCourse(val);
                setEditMode(false);
                setEditedGrades(new Map());
              }}
              disabled={editMode}
            >
              <div className="relative">
                <Listbox.Button className="relative w-64 cursor-pointer rounded-lg bg-white py-2.5 pl-3 pr-10 text-left text-sm border-2 border-gray-300 hover:border-accent-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="block truncate">
                    {currentCourse ? `${currentCourse.name} - ${currentCourse.level} ${currentCourse.section}` : 'Seleccionar'}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <MdExpandMore className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-64 overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {myCourses.map((course) => (
                      <Listbox.Option
                        key={course.id}
                        value={course.id}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-accent-100 text-accent-900' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {course.name} - {course.level} {course.section}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent-600">
                                <MdCheck className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <div className="flex items-center gap-3">
            {!editMode ? (
              <button
                onClick={startEdit}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors shadow-sm hover:shadow-md"
              >
                <MdEdit /> Editar Notas
              </button>
            ) : (
              <>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <MdClose /> Cancelar
                </button>
                <button
                  onClick={saveGrades}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors shadow-sm hover:shadow-md"
                >
                  <MdSave /> Guardar
                </button>
              </>
            )}
          </div>
        </div>

        {currentCourse && currentGrades.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 border">Alumno</th>
                    {periods.map((p, idx) => (
                      <th key={idx} className="text-center px-4 py-3 border">
                        {p}
                      </th>
                    ))}
                    <th className="text-center px-4 py-3 border">Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  {currentGrades.map((student) => {
                    const displayGrades = editMode
                      ? editedGrades.get(student.studentId) || student.grades
                      : student.grades;
                    const avg = computeAverage(displayGrades);

                    return (
                      <tr key={student.studentId} className="odd:bg-white even:bg-gray-50">
                        <td className="px-4 py-3 border font-medium">{student.studentName}</td>
                        {displayGrades.map((grade, idx) => (
                          <td key={idx} className="text-center px-4 py-3 border">
                            {editMode ? (
                              <input
                                type="number"
                                step="0.5"
                                min="0"
                                max="20"
                                value={grade === null ? '' : grade}
                                onChange={(e) => updateGrade(student.studentId, idx, e.target.value)}
                                className="w-20 px-2 py-1.5 border-2 rounded-lg text-center focus:outline-none focus:border-accent-500"
                              />
                            ) : (
                              <span>{grade === null ? '-' : grade}</span>
                            )}
                          </td>
                        ))}
                        <td className="text-center px-4 py-3 border font-semibold text-blue-600">
                          {avg ?? '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-sm text-gray-500 bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold mb-2">📌 Instrucciones:</p>
              <p>• Haga clic en "Editar Notas" para modificar las calificaciones de los alumnos.</p>
              <p>• Las notas deben estar entre 0 y 20. El promedio se calcula automáticamente.</p>
              <p>• Los cambios se guardan en el navegador (localStorage).</p>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <MdGrade className="text-6xl mx-auto mb-4 text-gray-300" />
            <p>No hay alumnos inscritos en este curso</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default CalificacionesProfesor;
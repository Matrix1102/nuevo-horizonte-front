import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { MdGrade, MdEdit, MdSave, MdClose, MdExpandMore, MdCheck } from 'react-icons/md';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type StudentGrade = {
  studentId: string;
  studentName: string;
  grades: (number | null)[]; // 4 periods
};

type CourseData = {
  courseId: string;
  courseName: string;
  students: StudentGrade[];
};

const simulatedCourses: CourseData[] = [
  {
    courseId: 'c1',
    courseName: 'Matemáticas - 3° A',
    students: [
      { studentId: 's1', studentName: 'Ana García', grades: [15, 14.5, 16, 15.5] },
      { studentId: 's2', studentName: 'Carlos Pérez', grades: [13, 14, 13.5, 14] },
      { studentId: 's3', studentName: 'María López', grades: [17, 16.5, 17, 16] },
      { studentId: 's4', studentName: 'José Bayona', grades: [15, 14.5, 16, 15.5] },
      { studentId: 's5', studentName: 'Laura Díaz', grades: [12, 13, 14, null] },
    ],
  },
  {
    courseId: 'c2',
    courseName: 'Comunicación - 3° B',
    students: [
      { studentId: 's6', studentName: 'Pedro Silva', grades: [14, 15, 14.5, 15] },
      { studentId: 's7', studentName: 'Sofia Rojas', grades: [16, 15.5, 16, 16.5] },
      { studentId: 's8', studentName: 'Diego Castro', grades: [13.5, 14, 13, 14] },
    ],
  },
];

function computeAverage(grades: (number | null)[]) {
  const nums = grades.filter((g): g is number => typeof g === 'number');
  if (nums.length === 0) return null;
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  return Math.round(avg * 10) / 10;
}

export function CalificacionesProfesor() {
  const [courses, setCourses] = useState<CourseData[]>(simulatedCourses);
  const [selectedCourse, setSelectedCourse] = useState<string>(simulatedCourses[0].courseId);
  const [editMode, setEditMode] = useState(false);
  const [editedGrades, setEditedGrades] = useState<Map<string, (number | null)[]>>(new Map());

  const currentCourse = useMemo(
    () => courses.find((c) => c.courseId === selectedCourse),
    [courses, selectedCourse]
  );

  const periods = ['1° Bimestre', '2° Bimestre', '3° Bimestre', '4° Bimestre'];

  function startEdit() {
    if (!currentCourse) return;
    const gradeMap = new Map<string, (number | null)[]>();
    currentCourse.students.forEach((s) => {
      gradeMap.set(s.studentId, [...s.grades]);
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
    setCourses((prev) =>
      prev.map((course) => {
        if (course.courseId !== selectedCourse) return course;
        return {
          ...course,
          students: course.students.map((s) => ({
            ...s,
            grades: editedGrades.get(s.studentId) || s.grades,
          })),
        };
      })
    );
    setEditMode(false);
    setEditedGrades(new Map());
  }

  function updateGrade(studentId: string, periodIdx: number, value: string) {
    const numValue = value === '' ? null : parseFloat(value);
    setEditedGrades((prev) => {
      const newMap = new Map(prev);
      const current = newMap.get(studentId) || [null, null, null, null];
      const updated = [...current];
      updated[periodIdx] = numValue;
      newMap.set(studentId, updated);
      return newMap;
    });
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
                <Listbox.Button className="relative w-48 cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left text-sm border border-gray-300 hover:border-accent-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="block truncate">
                    {courses.find((c) => c.courseId === selectedCourse)?.courseName || 'Seleccionar'}
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
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-48 overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {courses.map((course) => (
                      <Listbox.Option
                        key={course.courseId}
                        value={course.courseId}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-accent-100 text-accent-900' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {course.courseName}
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
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors shadow-sm hover:shadow-md"
              >
                <MdEdit /> Editar Notas
              </button>
            ) : (
              <>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <MdClose /> Cancelar
                </button>
                <button
                  onClick={saveGrades}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors shadow-sm hover:shadow-md"
                >
                  <MdSave /> Guardar
                </button>
              </>
            )}
          </div>
        </div>

        {currentCourse && (
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
                {currentCourse.students.map((student) => {
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
                              className="w-20 px-2 py-1 border rounded text-center"
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
        )}

        <div className="mt-6 text-sm text-gray-500">
          <p>• Haga clic en "Editar Notas" para modificar las calificaciones de los alumnos.</p>
          <p>• Las notas deben estar entre 0 y 20. El promedio se calcula automáticamente.</p>
        </div>
      </div>
    </Layout>
  );
}

export default CalificacionesProfesor;
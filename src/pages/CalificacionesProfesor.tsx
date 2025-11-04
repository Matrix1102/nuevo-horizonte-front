import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { MdGrade, MdEdit, MdSave, MdClose } from 'react-icons/md';

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
            <select
              className="form-select px-3 py-2 rounded border bg-white text-sm"
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setEditMode(false);
                setEditedGrades(new Map());
              }}
              disabled={editMode}
            >
              {courses.map((c) => (
                <option key={c.courseId} value={c.courseId}>
                  {c.courseName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            {!editMode ? (
              <button
                onClick={startEdit}
                className="flex items-center gap-2 px-4 py-2 rounded bg-accent-500 text-white hover:opacity-95"
              >
                <MdEdit /> Editar Notas
              </button>
            ) : (
              <>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
                >
                  <MdClose /> Cancelar
                </button>
                <button
                  onClick={saveGrades}
                  className="flex items-center gap-2 px-4 py-2 rounded bg-green-500 text-white hover:opacity-95"
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
import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { MdGrade, MdPictureAsPdf, MdExpandMore, MdCheck } from 'react-icons/md';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useCourses } from '../context/CoursesContext';
import { useAuth } from '../context/AuthContext';

type CourseGrade = {
  id: string;
  course: string;
  periods: (number | null)[]; // 4 periods
};

function computeFinal(periods: (number | null)[]) {
  const nums = periods.filter((p): p is number => typeof p === 'number');
  if (nums.length === 0) return null;
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  return Math.round(avg * 10) / 10;
}

export function Calificaciones() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Todos');
  const { courseGrades, courses } = useCourses();
  const { user } = useAuth();

  // Obtener los cursos del estudiante actual y sus calificaciones
  const studentGrades = useMemo(() => {
    if (!user) return [];

    // Encontrar cursos donde está inscrito el estudiante
    const studentCourses = courses.filter(course =>
      course.students.some(student => student.id === `s${user.id}`)
    );

    // Obtener las calificaciones de esos cursos
    return studentCourses.map(course => {
      const gradeData = courseGrades.find(g => g.courseId === course.id);
      const studentGradeRecord = gradeData?.grades.find(
        g => g.studentId === `s${user.id}`
      );

      return {
        id: course.id,
        course: course.name,
        periods: studentGradeRecord?.grades || [null, null, null, null]
      };
    });
  }, [user, courses, courseGrades]);

  const periods = useMemo(
    () => ['Todos', '1er Bimestre', '2do Bimestre', '3er Bimestre', '4to Bimestre'],
    []
  );

  const rows = useMemo(() => studentGrades.map((g) => ({ ...g, final: computeFinal(g.periods) })), [studentGrades]);

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5 no-print">
        <span className="text-3xl text-accent-500"><MdGrade /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Calificaciones</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 no-print">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-primary-500">Periodo:</label>
            
            <Listbox value={selectedPeriod} onChange={setSelectedPeriod}>
              <div className="relative">
                <Listbox.Button className="relative w-48 cursor-pointer rounded-lg bg-white py-2.5 pl-4 pr-10 text-left shadow-sm border-2 border-gray-200 hover:border-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-500 transition-all">
                  <span className="block truncate text-sm font-medium text-gray-700">{selectedPeriod}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <MdExpandMore className="h-5 w-5 text-accent-500" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {periods.map((period) => (
                      <Listbox.Option
                        key={period}
                        value={period}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                            active ? 'bg-accent-50 text-accent-900' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                              {period}
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
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent-500 text-white font-medium hover:bg-accent-600 transition-colors shadow-sm hover:shadow-md"
            >
              <MdPictureAsPdf className="text-lg" /> PDF Libreta
            </button>
          </div>
        </div>

        <div className="overflow-x-auto print-content">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border w-2/5">Cursos</th>
                <th className={`text-center px-4 py-3 border w-1/12 ${selectedPeriod === '1er Bimestre' ? 'bg-blue-50' : ''}`}>1°</th>
                <th className={`text-center px-4 py-3 border w-1/12 ${selectedPeriod === '2do Bimestre' ? 'bg-blue-50' : ''}`}>2°</th>
                <th className={`text-center px-4 py-3 border w-1/12 ${selectedPeriod === '3er Bimestre' ? 'bg-blue-50' : ''}`}>3°</th>
                <th className={`text-center px-4 py-3 border w-1/12 ${selectedPeriod === '4to Bimestre' ? 'bg-blue-50' : ''}`}>4°</th>
                <th className="text-center px-4 py-3 border w-1/6">N. Final</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-3 border font-medium">{r.course}</td>
                  {r.periods.map((p, idx) => (
                    <td
                      key={idx}
                      className={`text-center px-4 py-3 border ${
                        (selectedPeriod === 'Todos' || selectedPeriod === `${idx + 1}er Bimestre` || selectedPeriod === `${idx + 1}do Bimestre`) && selectedPeriod !== 'Todos' ? 'bg-blue-50' : ''
                      }`}
                    >
                      {p === null ? '-' : p}
                    </td>
                  ))}
                  <td className="text-center px-4 py-3 border font-semibold">{r.final ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  );
}

export default Calificaciones;

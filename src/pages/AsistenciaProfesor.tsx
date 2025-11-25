// src/pages/AsistenciaProfesor.tsx - CORREGIDO CON DATOS REALES

import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { MdCheckCircle, MdSave, MdCalendarToday, MdClose, MdExpandMore, MdCheck, MdCancel, MdEventNote, MdOutlineAccessTime, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useCourses } from '../context/CoursesContext';
import { useAuth } from '../context/AuthContext';

type AttendanceStatus = 'Presente' | 'Ausente' | 'Falta justificada' | 'Tardanza';

type StudentAttendance = {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
};

type DayAttendance = {
  date: string; // ISO format (YYYY-MM-DD)
  courseId: string;
  courseName: string;
  attendance: StudentAttendance[];
};

export function AsistenciaProfesor() {
  const { courses, attendance, saveAttendance } = useCourses();
  const { user } = useAuth();
  const location = useLocation();
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<number>(10); // Noviembre (mes actual)
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState<StudentAttendance[]>([]);
  const [selectedDayData, setSelectedDayData] = useState<DayAttendance | null>(null);

  const months = [
    { value: 2, label: 'Marzo' },
    { value: 3, label: 'Abril' },
    { value: 4, label: 'Mayo' },
    { value: 5, label: 'Junio' },
    { value: 6, label: 'Julio' },
    { value: 7, label: 'Agosto' },
    { value: 8, label: 'Septiembre' },
    { value: 9, label: 'Octubre' },
    { value: 10, label: 'Noviembre' },
    { value: 11, label: 'Diciembre' },
  ];

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

  // Obtener asistencias del curso actual desde el contexto
  const courseAttendance = useMemo(() => {
    if (!currentCourse) return [];
    
    // Filtrar asistencias del curso seleccionado
    const courseAttendanceData = attendance.filter(a => a.courseId === selectedCourse);
    
    // Convertir al formato esperado
    return courseAttendanceData.map(a => ({
      date: a.date,
      courseId: a.courseId,
      courseName: currentCourse.name,
      attendance: a.attendance.map(record => {
        const student = currentCourse.students.find(s => s.id === record.studentId);
        return {
          studentId: record.studentId,
          studentName: student?.name || 'Desconocido',
          status: record.status,
        };
      }),
    }));
  }, [attendance, selectedCourse, currentCourse]);

  // Filter by selected month
  const monthFilteredData = useMemo(() => {
    return courseAttendance.filter((day) => {
      const date = new Date(day.date + 'T00:00:00');
      const dayOfWeek = date.getDay();
      // Excluir fines de semana (0 = Domingo, 6 = Sábado)
      if (dayOfWeek === 0 || dayOfWeek === 6) return false;
      return date.getMonth() === selectedMonth;
    });
  }, [courseAttendance, selectedMonth]);

  // Group into weeks (Mon-Fri)
  const weeks = useMemo(() => {
    const grouped: DayAttendance[][] = [];
    let currentWeek: DayAttendance[] = [];

    monthFilteredData.forEach((day) => {
      const date = new Date(day.date + 'T00:00:00');
      const dayOfWeek = date.getDay(); // 0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie

      // Si es lunes y ya tenemos días de la semana anterior, cerramos esa semana
      if (dayOfWeek === 1 && currentWeek.length > 0) {
        grouped.push([...currentWeek]);
        currentWeek = [];
      }

      // Agregamos el día actual
      currentWeek.push(day);

      // Si es viernes, cerramos la semana
      if (dayOfWeek === 5 && currentWeek.length > 0) {
        grouped.push([...currentWeek]);
        currentWeek = [];
      }
    });

    // Si queda una semana incompleta al final, la agregamos
    if (currentWeek.length > 0) {
      grouped.push(currentWeek);
    }

    return grouped;
  }, [monthFilteredData]);

  const currentWeek = weeks[currentWeekIndex] || [];

  function startRecording() {
    if (!currentCourse) return;
    
    const existing = courseAttendance.find(
      (d) => d.courseId === selectedCourse && d.date === selectedDate
    );

    if (existing) {
      setCurrentAttendance([...existing.attendance]);
    } else {
      setCurrentAttendance(
        currentCourse.students.map((s) => ({
          studentId: s.id,
          studentName: s.name,
          status: 'Presente' as AttendanceStatus,
        }))
      );
    }
    setIsRecording(true);
  }

  function updateStatus(studentId: string, status: AttendanceStatus) {
    setCurrentAttendance((prev) =>
      prev.map((a) => (a.studentId === studentId ? { ...a, status } : a))
    );
  }

  function saveAttendanceData() {
    if (!currentCourse) return;
    
    const attendanceRecords = currentAttendance.map(a => ({
      studentId: a.studentId,
      status: a.status,
    }));

    saveAttendance({
      date: selectedDate,
      courseId: selectedCourse,
      attendance: attendanceRecords,
    });

    setIsRecording(false);
    setCurrentAttendance([]);
    alert('Asistencia guardada correctamente');
  }

  function cancelRecording() {
    setIsRecording(false);
    setCurrentAttendance([]);
  }

  const statusBorders: Record<AttendanceStatus, string> = {
    Presente: 'border-green-500',
    Ausente: 'border-red-500',
    'Falta justificada': 'border-orange-500',
    Tardanza: 'border-yellow-500',
  };

  if (myCourses.length === 0) {
    return (
      <Layout>
        <div className="flex items-center gap-3 mb-5">
          <span className="text-3xl text-accent-500">
            <MdCheckCircle />
          </span>
          <h2 className="text-primary-500 text-2xl font-bold">Asistencia - Profesor</h2>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-accent-500 text-center">
          <MdCheckCircle className="text-6xl mx-auto mb-4 text-gray-300" />
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
          <MdCheckCircle />
        </span>
        <h2 className="text-primary-500 text-2xl font-bold">Asistencia - Profesor</h2>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-primary-500">Curso:</label>
            <Listbox
              value={selectedCourse}
              onChange={(val) => {
                setSelectedCourse(val);
                setCurrentWeekIndex(0);
              }}
              disabled={isRecording}
            >
              <div className="relative">
                <Listbox.Button className="relative w-64 cursor-pointer rounded-lg bg-white py-2.5 pl-4 pr-10 text-left shadow-sm border-2 border-gray-200 hover:border-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="block truncate text-sm font-medium text-gray-700">
                    {currentCourse ? `${currentCourse.name} - ${currentCourse.level} ${currentCourse.section}` : 'Seleccionar'}
                  </span>
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
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-64 overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {myCourses.map((course) => (
                      <Listbox.Option
                        key={course.id}
                        value={course.id}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                            active ? 'bg-accent-50 text-accent-900' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
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
            <label className="text-sm font-medium text-primary-500">Mes:</label>
            <Listbox
              value={selectedMonth}
              onChange={(val) => {
                setSelectedMonth(val);
                setCurrentWeekIndex(0);
              }}
            >
              <div className="relative">
                <Listbox.Button className="relative w-40 cursor-pointer rounded-lg bg-white py-2.5 pl-4 pr-10 text-left shadow-sm border-2 border-gray-200 hover:border-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-500 transition-all">
                  <span className="block truncate text-sm font-medium text-gray-700">
                    {months.find((m) => m.value === selectedMonth)?.label || 'Seleccionar'}
                  </span>
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
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-40 overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {months.map((month) => (
                      <Listbox.Option
                        key={month.value}
                        value={month.value}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                            active ? 'bg-accent-50 text-accent-900' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                              {month.label}
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

          {!isRecording && (
            <div className="flex items-center gap-3 md:ml-auto">
              <label className="text-sm font-medium text-primary-500">Fecha:</label>
              <input
                type="date"
                className="px-4 py-2.5 rounded-lg border-2 border-gray-200 hover:border-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-500 transition-all text-sm font-medium text-gray-700"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <button
                onClick={startRecording}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent-500 text-white font-medium hover:bg-accent-600 transition-colors shadow-sm hover:shadow-md"
              >
                <MdCalendarToday /> Tomar Asistencia
              </button>
            </div>
          )}
        </div>

        {isRecording && (
          <div className="border-t mt-6 pt-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-3 text-primary-500">Lista de Alumnos</h3>
              <div className="space-y-3">
                {currentAttendance.map((student) => (
                  <div
                    key={student.studentId}
                    className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800">{student.studentName}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(student.studentId, 'Presente')}
                        className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
                          student.status === 'Presente'
                            ? 'bg-green-500 shadow-md scale-105'
                            : 'bg-gray-300 hover:bg-green-400'
                        }`}
                      >
                        Presente
                      </button>
                      <button
                        onClick={() => updateStatus(student.studentId, 'Ausente')}
                        className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
                          student.status === 'Ausente'
                            ? 'bg-red-500 shadow-md scale-105'
                            : 'bg-gray-300 hover:bg-red-400'
                        }`}
                      >
                        Ausente
                      </button>
                      <button
                        onClick={() => updateStatus(student.studentId, 'Falta justificada')}
                        className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
                          student.status === 'Falta justificada'
                            ? 'bg-orange-500 shadow-md scale-105'
                            : 'bg-gray-300 hover:bg-orange-400'
                        }`}
                      >
                        Justificado
                      </button>
                      <button
                        onClick={() => updateStatus(student.studentId, 'Tardanza')}
                        className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
                          student.status === 'Tardanza'
                            ? 'bg-yellow-500 shadow-md scale-105'
                            : 'bg-gray-300 hover:bg-yellow-400'
                        }`}
                      >
                        Tardanza
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelRecording}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                <MdClose /> Cancelar
              </button>
              <button
                onClick={saveAttendanceData}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors shadow-sm hover:shadow-md"
              >
                <MdSave /> Guardar Asistencia
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      {!isRecording && (
        <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-accent-500 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <MdCheckCircle className="text-green-600 text-xl" />
              <span className="text-sm font-medium text-gray-700">Presente</span>
            </div>
            <div className="flex items-center gap-2">
              <MdCancel className="text-red-600 text-xl" />
              <span className="text-sm font-medium text-gray-700">Ausente</span>
            </div>
            <div className="flex items-center gap-2">
              <MdEventNote className="text-orange-600 text-xl" />
              <span className="text-sm font-medium text-gray-700">Falta justificada</span>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineAccessTime className="text-yellow-600 text-xl" />
              <span className="text-sm font-medium text-gray-700">Tardanza</span>
            </div>
          </div>
        </div>
      )}

      {/* Attendance by Days */}
      {!isRecording && (
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">
          <h3 className="text-lg font-semibold mb-4 text-primary-500">Historial de Asistencia</h3>

          {currentWeek.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No hay registros de asistencia para este período
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h4 className="text-base font-semibold text-gray-700 mb-3">
                  Semana {currentWeekIndex + 1}
                </h4>
                <div className="text-sm text-gray-500 mb-4">
                  {currentWeek.length > 0 && (
                    <>
                      {new Date(currentWeek[0].date + 'T00:00:00').toLocaleDateString('es-PE', {
                        day: '2-digit',
                        month: 'long',
                      })}{' '}
                      -{' '}
                      {new Date(currentWeek[currentWeek.length - 1].date + 'T00:00:00').toLocaleDateString('es-PE', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                {currentWeek.map((day) => {
                  const date = new Date(day.date + 'T00:00:00');
                  const presentCount = day.attendance.filter((a) => a.status === 'Presente').length;
                  const absentCount = day.attendance.filter((a) => a.status === 'Ausente').length;
                  const justifiedCount = day.attendance.filter((a) => a.status === 'Falta justificada').length;
                  const lateCount = day.attendance.filter((a) => a.status === 'Tardanza').length;
                  const totalCount = day.attendance.length;

                  return (
                    <div
                      key={day.date}
                      onClick={() => setSelectedDayData(day)}
                      className={`border-2 rounded-lg p-3 space-y-2 h-[280px] flex flex-col cursor-pointer hover:shadow-lg transition-shadow ${
                        statusBorders[
                          presentCount === totalCount
                            ? 'Presente'
                            : presentCount === 0
                            ? 'Ausente'
                            : 'Tardanza'
                        ]
                      }`}
                    >
                      <div className="text-center border-b pb-2 flex-shrink-0">
                        <div className="text-xs text-gray-500 capitalize">
                          {date.toLocaleDateString('es-PE', { weekday: 'long' })}
                        </div>
                        <div className="text-2xl font-bold">
                          {date.toLocaleDateString('es-PE', { day: '2-digit' })}
                        </div>
                      </div>

                      <div className="space-y-1 text-xs flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <MdCheckCircle className="text-green-600" />
                            <span>Presente</span>
                          </div>
                          <span className="font-semibold">{presentCount}</span>
                        </div>
                        
                        {absentCount > 0 && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <MdCancel className="text-red-600" />
                              <span>Ausente</span>
                            </div>
                            <span className="font-semibold">{absentCount}</span>
                          </div>
                        )}
                        
                        {justifiedCount > 0 && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <MdEventNote className="text-orange-600" />
                              <span>Justificado</span>
                            </div>
                            <span className="font-semibold">{justifiedCount}</span>
                          </div>
                        )}
                        
                        {lateCount > 0 && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <MdOutlineAccessTime className="text-yellow-600" />
                              <span>Tardanza</span>
                            </div>
                            <span className="font-semibold">{lateCount}</span>
                          </div>
                        )}
                      </div>
                        
                      <div className="flex items-center justify-between pt-1 border-t font-semibold text-xs flex-shrink-0">
                        <span>Total</span>
                        <span>{totalCount}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t">
                <button
                  onClick={() => setCurrentWeekIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentWeekIndex === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-accent-500 transition-colors shadow-sm"
                >
                  <MdNavigateBefore className="text-xl" />
                  Anterior
                </button>
                <span className="text-sm text-gray-600 font-medium">
                  Semana {currentWeekIndex + 1} de {weeks.length}
                </span>
                <button
                  onClick={() => setCurrentWeekIndex((prev) => Math.min(weeks.length - 1, prev + 1))}
                  disabled={currentWeekIndex >= weeks.length - 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-accent-500 transition-colors shadow-sm"
                >
                  Siguiente
                  <MdNavigateNext className="text-xl" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Modal de detalle de asistencia */}
      {selectedDayData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-accent-500 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">
                  Asistencia del día{' '}
                  {new Date(selectedDayData.date + 'T00:00:00').toLocaleDateString('es-PE', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </h3>
                <p className="text-sm opacity-90">{selectedDayData.courseName}</p>
              </div>
              <button
                onClick={() => setSelectedDayData(null)}
                className="text-white hover:bg-accent-600 rounded-full p-2 transition-colors"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <div className="space-y-3">
                {selectedDayData.attendance.map((student) => (
                  <div
                    key={student.studentId}
                    className="flex items-center justify-between p-4 border-2 rounded-lg hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-800">{student.studentName}</span>
                    <div className="flex items-center gap-2">
                      {student.status === 'Presente' && (
                        <>
                          <MdCheckCircle className="text-green-600 text-xl" />
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            Presente
                          </span>
                        </>
                      )}
                      {student.status === 'Ausente' && (
                        <>
                          <MdCancel className="text-red-600 text-xl" />
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
Ausente
</span>
</>
)}
{student.status === 'Falta justificada' && (
<>
<MdEventNote className="text-orange-600 text-xl" />
<span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
Falta justificada
</span>
</>
)}
{student.status === 'Tardanza' && (
<>
<MdOutlineAccessTime className="text-yellow-600 text-xl" />
<span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
Tardanza
</span>
</>
)}
</div>
</div>
))}
</div>
<div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {selectedDayData.attendance.filter((a) => a.status === 'Presente').length}
                </div>
                <div className="text-xs text-gray-600">Presentes</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {selectedDayData.attendance.filter((a) => a.status === 'Ausente').length}
                </div>
                <div className="text-xs text-gray-600">Ausentes</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {selectedDayData.attendance.filter((a) => a.status === 'Falta justificada').length}
                </div>
                <div className="text-xs text-gray-600">Justificadas</div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {selectedDayData.attendance.filter((a) => a.status === 'Tardanza').length}
                </div>
                <div className="text-xs text-gray-600">Tardanzas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</Layout>);
}
export default AsistenciaProfesor;
import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { MdCheckCircle, MdSave, MdCalendarToday, MdClose } from 'react-icons/md';

type AttendanceStatus = 'Presente' | 'Falta injustificada' | 'Falta justificada';

type StudentAttendance = {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
};

type ClassSession = {
  date: string; // ISO format (YYYY-MM-DD)
  courseId: string;
  courseName: string;
  topic: string;
  attendance: StudentAttendance[];
};

// Datos simulados
const simulatedStudents = [
  { studentId: 's1', studentName: 'Ana García' },
  { studentId: 's2', studentName: 'Carlos Pérez' },
  { studentId: 's3', studentName: 'María López' },
  { studentId: 's4', studentName: 'José Bayona' },
  { studentId: 's5', studentName: 'Laura Díaz' },
  { studentId: 's6', studentName: 'Pedro Silva' },
  { studentId: 's7', studentName: 'Sofia Rojas' },
  { studentId: 's8', studentName: 'Diego Castro' },
];

const initialSessions: ClassSession[] = [
  {
    date: '2025-11-03',
    courseId: 'c1',
    courseName: 'Matemáticas - 3° A',
    topic: 'Ecuaciones lineales',
    attendance: simulatedStudents.slice(0, 5).map((s) => ({
      studentId: s.studentId,
      studentName: s.studentName,
      status: 'Presente' as AttendanceStatus,
    })),
  },
  {
    date: '2025-11-02',
    courseId: 'c1',
    courseName: 'Matemáticas - 3° A',
    topic: 'Geometría básica',
    attendance: simulatedStudents.slice(0, 5).map((s, idx) => ({
      studentId: s.studentId,
      studentName: s.studentName,
      status: (idx === 2 ? 'Falta justificada' : 'Presente') as AttendanceStatus,
    })),
  },
  {
    date: '2025-11-01',
    courseId: 'c2',
    courseName: 'Comunicación - 3° B',
    topic: 'Análisis literario',
    attendance: simulatedStudents.slice(5, 8).map((s) => ({
      studentId: s.studentId,
      studentName: s.studentName,
      status: 'Presente' as AttendanceStatus,
    })),
  },
];

const courses = [
  {
    courseId: 'c1',
    courseName: 'Matemáticas - 3° A',
    students: simulatedStudents.slice(0, 5),
  },
  {
    courseId: 'c2',
    courseName: 'Comunicación - 3° B',
    students: simulatedStudents.slice(5, 8),
  },
];

export function AsistenciaProfesor() {
  const [sessions, setSessions] = useState<ClassSession[]>(initialSessions);
  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0].courseId);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [topic, setTopic] = useState<string>('');
  const [currentAttendance, setCurrentAttendance] = useState<StudentAttendance[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const filteredSessions = useMemo(
    () => sessions.filter((s) => s.courseId === selectedCourse).sort((a, b) => b.date.localeCompare(a.date)),
    [sessions, selectedCourse]
  );

  const currentCourse = useMemo(
    () => courses.find((c) => c.courseId === selectedCourse),
    [selectedCourse]
  );

  function startRecording() {
    if (!currentCourse) return;
    
    // Check if attendance already exists for this date
    const existing = sessions.find(
      (s) => s.courseId === selectedCourse && s.date === selectedDate
    );

    if (existing) {
      setTopic(existing.topic);
      setCurrentAttendance([...existing.attendance]);
    } else {
      setTopic('');
      setCurrentAttendance(
        currentCourse.students.map((s) => ({
          studentId: s.studentId,
          studentName: s.studentName,
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

  function saveAttendance() {
    if (!currentCourse || !topic.trim()) {
      alert('Por favor ingrese el tema de la clase');
      return;
    }

    const newSession: ClassSession = {
      date: selectedDate,
      courseId: selectedCourse,
      courseName: currentCourse.courseName,
      topic: topic.trim(),
      attendance: currentAttendance,
    };

    setSessions((prev) => {
      const filtered = prev.filter(
        (s) => !(s.courseId === selectedCourse && s.date === selectedDate)
      );
      return [newSession, ...filtered];
    });

    setIsRecording(false);
    setTopic('');
    setCurrentAttendance([]);
  }

  function cancelRecording() {
    setIsRecording(false);
    setTopic('');
    setCurrentAttendance([]);
  }

  const statusColors: Record<AttendanceStatus, string> = {
    Presente: 'bg-green-500 hover:bg-green-600',
    'Falta injustificada': 'bg-red-500 hover:bg-red-600',
    'Falta justificada': 'bg-yellow-500 hover:bg-yellow-600',
  };

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500">
          <MdCheckCircle />
        </span>
        <h2 className="text-primary-500 text-2xl font-bold">Asistencia - Profesor</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Curso:</label>
            <select
              className="form-select px-3 py-2 rounded border bg-white text-sm"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              disabled={isRecording}
            >
              {courses.map((c) => (
                <option key={c.courseId} value={c.courseId}>
                  {c.courseName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Fecha:</label>
            <input
              type="date"
              className="form-input px-3 py-2 rounded border text-sm"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              disabled={isRecording}
            />
          </div>

          {!isRecording && (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 px-4 py-2 rounded bg-accent-500 text-white hover:opacity-95"
            >
              <MdCalendarToday /> Tomar Asistencia
            </button>
          )}
        </div>

        {isRecording && (
          <div className="border-t pt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Tema de la clase:</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ej: Ecuaciones de primer grado"
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-3">Lista de Alumnos</h3>
              <div className="space-y-3">
                {currentAttendance.map((student) => (
                  <div
                    key={student.studentId}
                    className="flex items-center justify-between p-4 border rounded hover:bg-gray-50"
                  >
                    <span className="font-medium">{student.studentName}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(student.studentId, 'Presente')}
                        className={`px-4 py-2 rounded text-white text-sm font-medium transition-colors ${
                          student.status === 'Presente'
                            ? statusColors['Presente']
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      >
                        Presente
                      </button>
                      <button
                        onClick={() => updateStatus(student.studentId, 'Falta injustificada')}
                        className={`px-4 py-2 rounded text-white text-sm font-medium transition-colors ${
                          student.status === 'Falta injustificada'
                            ? statusColors['Falta injustificada']
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      >
                        Falta
                      </button>
                      <button
                        onClick={() => updateStatus(student.studentId, 'Falta justificada')}
                        className={`px-4 py-2 rounded text-white text-sm font-medium transition-colors ${
                          student.status === 'Falta justificada'
                            ? statusColors['Falta justificada']
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      >
                        Justificado
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelRecording}
                className="flex items-center gap-2 px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
              >
                <MdClose /> Cancelar
              </button>
              <button
                onClick={saveAttendance}
                className="flex items-center gap-2 px-4 py-2 rounded bg-green-500 text-white hover:opacity-95"
              >
                <MdSave /> Guardar Asistencia
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Historial de Asistencia */}
      {!isRecording && (
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">
          <h3 className="text-lg font-semibold mb-4">Historial de Asistencia</h3>
          
          {filteredSessions.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No hay registros de asistencia para este curso
            </div>
          ) : (
            <div className="divide-y">
              {filteredSessions.map((session) => (
                <div key={`${session.date}-${session.courseId}`} className="py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold text-gray-800">{session.topic}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(session.date + 'T00:00:00').toLocaleDateString('es-PE', {
                          weekday: 'long',
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {session.attendance.filter((a) => a.status === 'Presente').length} /{' '}
                      {session.attendance.length} presentes
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {session.attendance.map((a) => (
                      <div
                        key={a.studentId}
                        className={`px-3 py-2 rounded text-sm ${
                          a.status === 'Presente'
                            ? 'bg-green-100 text-green-800'
                            : a.status === 'Falta injustificada'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        <span className="font-medium">{a.studentName}</span>
                        <span className="ml-2 text-xs">({a.status})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export default AsistenciaProfesor;
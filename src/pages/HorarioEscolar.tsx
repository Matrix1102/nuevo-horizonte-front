import { useMemo } from 'react';
import { Layout } from '../components/Layout';
import { MdSchedule } from 'react-icons/md';
import { getCursoColor } from '../data/cursos';

type Slot = {
  subject: string;
  teacher?: string;
  room?: string;
};

type Timetable = Record<string, (Slot | null)[]>; // day -> 8 slots

const simulatedTimetable: Record<string, Timetable> = {
  'Salón A': {
    Lunes: [
      { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
      { subject: 'Comunicación', teacher: 'Profesora Torres' },
      { subject: 'Ciencias', teacher: 'Profesor Gómez' },
      { subject: 'Historia', teacher: 'Profesora Ruiz' },
      { subject: 'Inglés', teacher: 'Profesora Lee' },
      { subject: 'Arte', teacher: 'Profesora Díaz' },
      { subject: 'Educ. Física', teacher: 'Profesor Soto' },
      { subject: 'Tutoría', teacher: 'Profesora Rivera' },
    ],
    Martes: [
      { subject: 'Ciencias', teacher: 'Profesor Gómez' },
      { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
      { subject: 'Inglés', teacher: 'Profesora Lee' },
      { subject: 'Comunicación', teacher: 'Profesora Torres' },
      { subject: 'Historia', teacher: 'Profesora Ruiz' },
      { subject: 'Arte', teacher: 'Profesora Díaz' },
      { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
      { subject: 'Ciencias', teacher: 'Profesor Gómez' },
    ],
    Miércoles: [
      { subject: 'Historia', teacher: 'Profesora Ruiz' },
      { subject: 'Comunicación', teacher: 'Profesora Torres' },
      { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
      { subject: 'Inglés', teacher: 'Profesora Lee' },
      { subject: 'Ciencias', teacher: 'Profesor Gómez' },
      { subject: 'Educ. Física', teacher: 'Profesor Soto' },
      { subject: 'Arte', teacher: 'Profesora Díaz' },
      { subject: 'Tutoría', teacher: 'Profesora Rivera' },
    ],
    Jueves: [
      { subject: 'Inglés', teacher: 'Profesora Lee' },
      { subject: 'Historia', teacher: 'Profesora Ruiz' },
      { subject: 'Comunicación', teacher: 'Profesora Torres' },
      { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
      { subject: 'Arte', teacher: 'Profesora Díaz' },
      { subject: 'Ciencias', teacher: 'Profesor Gómez' },
      { subject: 'Educ. Física', teacher: 'Profesor Soto' },
      { subject: 'Proyecto', teacher: 'Profesora Lee' },
    ],
    Viernes: [
      { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
      { subject: 'Ciencias', teacher: 'Profesor Gómez' },
      { subject: 'Comunicación', teacher: 'Profesora Torres' },
      { subject: 'Historia', teacher: 'Profesora Ruiz' },
      { subject: 'Inglés', teacher: 'Profesora Lee' },
      { subject: 'Arte', teacher: 'Profesora Díaz' },
      { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
      { subject: 'Cierre de semana', teacher: 'Coordinador' },
    ],
  },
  'Salón B': {
    Lunes: [
      { subject: 'Comunicación', teacher: 'Profesora Torres' },
      { subject: 'Matemáticas', teacher: 'Profesora Rivera' },
      { subject: 'Inglés', teacher: 'Profesora Lee' },
      { subject: 'Ciencias', teacher: 'Profesor Gómez' },
      { subject: 'Historia', teacher: 'Profesora Ruiz' },
      { subject: 'Arte', teacher: 'Profesora Díaz' },
      { subject: 'Educ. Física', teacher: 'Profesor Soto' },
      { subject: 'Proyecto', teacher: 'Profesora Lee' },
    ],
    Martes: [null, null, null, null, null, null, null, null],
    Miércoles: [null, null, null, null, null, null, null, null],
    Jueves: [null, null, null, null, null, null, null, null],
    Viernes: [null, null, null, null, null, null, null, null],
  },
};

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export function HorarioEscolar() {
  // alumno solo en un salón; mostrar salón fijo como título
  const room = 'Salón A';
  const timetable = useMemo(() => simulatedTimetable[room], [room]);

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdSchedule /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Horario Escolar</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">
        <div className="flex items-center justify-between mb-6">
          <div className="w-full text-center">
            <h3 className="text-xl font-semibold bg-gray-100 inline-block px-6 py-2 rounded">{room}</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr>
                <th className="w-36 border p-3 text-left">Hora</th>
                {days.map((d) => (
                  <th key={d} className="border p-3 text-center">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                  <td className="border p-3 font-medium">Hora {idx + 1}</td>
                  {days.map((d) => {
                    const slot = timetable[d][idx];
                    const cursoColor = slot ? getCursoColor(slot.subject) : 'gray';
                    return (
                      <td key={d} className="border p-3 align-top">
                        {slot ? (
                          <div className={`p-3 rounded-lg bg-${cursoColor}-50 border-l-4 border-${cursoColor}-500`}>
                            <div className="font-semibold text-gray-800">{slot.subject}</div>
                            <div className="text-sm text-gray-600">{slot.teacher}</div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">-</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  );
}

export default HorarioEscolar;

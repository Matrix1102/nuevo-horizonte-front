import { useMemo } from 'react';
import { Layout } from '../components/Layout';
import { MdSchedule } from 'react-icons/md';

type Slot = {
  subject: string;
  teacher?: string;
  room?: string;
};

type Timetable = Record<string, (Slot | null)[]>; // day -> 8 slots

const simulatedTimetable: Record<string, Timetable> = {
  'Salón A': {
    Lunes: [
      { subject: 'Matemáticas', teacher: 'Profa. Rivera' },
      { subject: 'Comunicación', teacher: 'Profa. Torres' },
      { subject: 'Ciencias', teacher: 'Profe. Gómez' },
      { subject: 'Historia', teacher: 'Profa. Ruiz' },
      { subject: 'Inglés', teacher: 'Profa. Lee' },
      { subject: 'Arte', teacher: 'Profa. Díaz' },
      { subject: 'Educ. Física', teacher: 'Profe. Soto' },
      { subject: 'Tutoría', teacher: 'Profa. Rivera' },
    ],
    Martes: [
      { subject: 'Ciencias', teacher: 'Profe. Gómez' },
      { subject: 'Matemáticas', teacher: 'Profa. Rivera' },
      { subject: 'Inglés', teacher: 'Profa. Lee' },
      { subject: 'Comunicación', teacher: 'Profa. Torres' },
      { subject: 'Historia', teacher: 'Profa. Ruiz' },
      { subject: 'Arte', teacher: 'Profa. Díaz' },
      { subject: 'Matemáticas', teacher: 'Profa. Rivera' },
      { subject: 'Ciencias', teacher: 'Profe. Gómez' },
    ],
    Miércoles: [
      { subject: 'Historia', teacher: 'Profa. Ruiz' },
      { subject: 'Comunicación', teacher: 'Profa. Torres' },
      { subject: 'Matemáticas', teacher: 'Profa. Rivera' },
      { subject: 'Inglés', teacher: 'Profa. Lee' },
      { subject: 'Ciencias', teacher: 'Profe. Gómez' },
      { subject: 'Educ. Física', teacher: 'Profe. Soto' },
      { subject: 'Arte', teacher: 'Profa. Díaz' },
      { subject: 'Tutoría', teacher: 'Profa. Rivera' },
    ],
    Jueves: [
      { subject: 'Inglés', teacher: 'Profa. Lee' },
      { subject: 'Historia', teacher: 'Profa. Ruiz' },
      { subject: 'Comunicación', teacher: 'Profa. Torres' },
      { subject: 'Matemáticas', teacher: 'Profa. Rivera' },
      { subject: 'Arte', teacher: 'Profa. Díaz' },
      { subject: 'Ciencias', teacher: 'Profe. Gómez' },
      { subject: 'Educ. Física', teacher: 'Profe. Soto' },
      { subject: 'Proyecto', teacher: 'Profa. Lee' },
    ],
    Viernes: [
      { subject: 'Matemáticas', teacher: 'Profa. Rivera' },
      { subject: 'Ciencias', teacher: 'Profe. Gómez' },
      { subject: 'Comunicación', teacher: 'Profa. Torres' },
      { subject: 'Historia', teacher: 'Profa. Ruiz' },
      { subject: 'Inglés', teacher: 'Profa. Lee' },
      { subject: 'Arte', teacher: 'Profa. Díaz' },
      { subject: 'Matemáticas', teacher: 'Profa. Rivera' },
      { subject: 'Cierre de semana', teacher: 'Coordinador' },
    ],
  },
  'Salón B': {
    Lunes: [
      { subject: 'Comunicación', teacher: 'Profa. Torres' },
      { subject: 'Matemáticas', teacher: 'Profa. Rivera' },
      { subject: 'Inglés', teacher: 'Profa. Lee' },
      { subject: 'Ciencias', teacher: 'Profe. Gómez' },
      { subject: 'Historia', teacher: 'Profa. Ruiz' },
      { subject: 'Arte', teacher: 'Profa. Díaz' },
      { subject: 'Educ. Física', teacher: 'Profe. Soto' },
      { subject: 'Proyecto', teacher: 'Profa. Lee' },
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
                    return (
                      <td key={d} className="border p-3 align-top">
                        {slot ? (
                          <div className="p-3 rounded-lg bg-blue-50">
                            <div className="font-semibold">{slot.subject}</div>
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

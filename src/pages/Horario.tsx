import { useState } from 'react';
import { Layout } from '../components/Layout';
import { MdSchedule, MdCalendarToday, MdAccessTime, MdRoom, MdClass } from 'react-icons/md';

type ClassSlot = {
  subject: string;
  grade: string;
  room: string;
  startTime: string;
  endTime: string;
};

type WeekSchedule = Record<string, ClassSlot[]>;

// Datos simulados del horario del profesor
const professorSchedule: WeekSchedule = {
  Lunes: [
    {
      subject: 'Matemáticas',
      grade: '3° A',
      room: 'Aula 201',
      startTime: '08:00',
      endTime: '09:30'
    },
    {
      subject: 'Matemáticas',
      grade: '4° B',
      room: 'Aula 305',
      startTime: '09:45',
      endTime: '11:15'
    },
    {
      subject: 'Álgebra',
      grade: '5° A',
      room: 'Aula 402',
      startTime: '12:30',
      endTime: '14:00'
    },
    {
      subject: 'Geometría',
      grade: '3° C',
      room: 'Aula 203',
      startTime: '14:15',
      endTime: '15:45'
    }
  ],
  Martes: [
    {
      subject: 'Matemáticas',
      grade: '3° A',
      room: 'Aula 201',
      startTime: '08:00',
      endTime: '09:30'
    },
    {
      subject: 'Álgebra',
      grade: '5° A',
      room: 'Aula 402',
      startTime: '10:00',
      endTime: '11:30'
    },
    {
      subject: 'Geometría',
      grade: '4° A',
      room: 'Aula 304',
      startTime: '12:30',
      endTime: '14:00'
    }
  ],
  Miércoles: [
    {
      subject: 'Matemáticas',
      grade: '4° B',
      room: 'Aula 305',
      startTime: '08:00',
      endTime: '09:30'
    },
    {
      subject: 'Álgebra',
      grade: '5° A',
      room: 'Aula 402',
      startTime: '09:45',
      endTime: '11:15'
    },
    {
      subject: 'Matemáticas',
      grade: '3° A',
      room: 'Aula 201',
      startTime: '12:30',
      endTime: '14:00'
    },
    {
      subject: 'Geometría',
      grade: '3° C',
      room: 'Aula 203',
      startTime: '14:15',
      endTime: '15:45'
    }
  ],
  Jueves: [
    {
      subject: 'Geometría',
      grade: '4° A',
      room: 'Aula 304',
      startTime: '08:00',
      endTime: '09:30'
    },
    {
      subject: 'Matemáticas',
      grade: '4° B',
      room: 'Aula 305',
      startTime: '09:45',
      endTime: '11:15'
    },
    {
      subject: 'Álgebra',
      grade: '5° A',
      room: 'Aula 402',
      startTime: '12:30',
      endTime: '14:00'
    }
  ],
  Viernes: [
    {
      subject: 'Matemáticas',
      grade: '3° A',
      room: 'Aula 201',
      startTime: '08:00',
      endTime: '09:30'
    },
    {
      subject: 'Geometría',
      grade: '3° C',
      room: 'Aula 203',
      startTime: '09:45',
      endTime: '11:15'
    },
    {
      subject: 'Matemáticas',
      grade: '4° B',
      room: 'Aula 305',
      startTime: '12:30',
      endTime: '14:00'
    },
    {
      subject: 'Tutoría',
      grade: '3° A',
      room: 'Aula 201',
      startTime: '14:15',
      endTime: '15:45'
    }
  ]
};

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const timeSlots = [
  { start: '08:00', end: '09:30' },
  { start: '09:45', end: '11:15' },
  { start: '12:30', end: '14:00' },
  { start: '14:15', end: '15:45' }
];

export function Horario() {
  const [selectedDay, setSelectedDay] = useState<string>('Lunes');

  // Calcular estadísticas
  const totalClasses = Object.values(professorSchedule).reduce((acc, day) => acc + day.length, 0);
  const uniqueSubjects = new Set(
    Object.values(professorSchedule).flatMap(day => day.map(slot => slot.subject))
  ).size;
  const uniqueGrades = new Set(
    Object.values(professorSchedule).flatMap(day => day.map(slot => slot.grade))
  ).size;

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-warm-500"><MdSchedule /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Mi Horario</h2>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total de Clases</p>
              <p className="text-3xl font-bold">{totalClasses}</p>
            </div>
            <MdClass className="text-5xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Materias</p>
              <p className="text-3xl font-bold">{uniqueSubjects}</p>
            </div>
            <MdCalendarToday className="text-5xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm mb-1">Grados</p>
              <p className="text-3xl font-bold">{uniqueGrades}</p>
            </div>
            <MdRoom className="text-5xl opacity-30" />
          </div>
        </div>
      </div>

      {/* Vista de Horario Semanal */}
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-warm-500 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Horario Semanal</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700 min-w-[100px]">
                  Horario
                </th>
                {days.map(day => (
                  <th key={day} className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700 min-w-[150px]">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3 bg-gray-50 font-medium text-xs text-gray-600">
                    {slot.start} - {slot.end}
                  </td>
                  {days.map(day => {
                    const classInSlot = professorSchedule[day]?.find(
                      c => c.startTime === slot.start
                    );
                    return (
                      <td key={day} className="border border-gray-300 p-2">
                        {classInSlot ? (
                          <div className="bg-gradient-to-br from-warm-500 to-warm-600 text-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <p className="font-semibold text-sm mb-1">{classInSlot.subject}</p>
                            <p className="text-xs opacity-90 flex items-center gap-1">
                              <MdClass className="text-sm" />
                              {classInSlot.grade}
                            </p>
                            <p className="text-xs opacity-90 flex items-center gap-1 mt-1">
                              <MdRoom className="text-sm" />
                              {classInSlot.room}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center text-gray-400 text-xs py-4">-</div>
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

      {/* Vista por Día */}
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-warm-500">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Detalle por Día</h3>
        
        {/* Selector de día */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedDay === day
                  ? 'bg-warm-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Lista de clases del día seleccionado */}
        <div className="space-y-3">
          {professorSchedule[selectedDay]?.map((classSlot, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gray-50"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-lg mb-1">{classSlot.subject}</h4>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MdClass className="text-warm-500" />
                      {classSlot.grade}
                    </span>
                    <span className="flex items-center gap-1">
                      <MdRoom className="text-warm-500" />
                      {classSlot.room}
                    </span>
                    <span className="flex items-center gap-1">
                      <MdAccessTime className="text-warm-500" />
                      {classSlot.startTime} - {classSlot.endTime}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Programada
                  </span>
                </div>
              </div>
            </div>
          ))}
          {(!professorSchedule[selectedDay] || professorSchedule[selectedDay].length === 0) && (
            <div className="text-center py-8 text-gray-400">
              <MdSchedule className="text-5xl mx-auto mb-2 opacity-30" />
              <p>No hay clases programadas para este día</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
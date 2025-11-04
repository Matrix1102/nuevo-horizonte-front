import { useMemo, useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { MdCheckCircle, MdOutlineAccessTime, MdCancel, MdExpandMore, MdCheck, MdEventNote, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';

// Vista de Asistencia por días (lunes a viernes)
// - Muestra días laborables con estado de asistencia
// - Paginación por semanas
// - Filtrado por mes

type AttendanceStatus = 'Presente' | 'Ausente' | 'Falta justificada' | 'Tardanza';

type AttendanceRecord = {
  date: string; // ISO (YYYY-MM-DD)
  status: AttendanceStatus;
};

// Generar datos simulados para marzo-junio 2025 (solo días laborables)
function generateAttendanceData(): AttendanceRecord[] {
  const data: AttendanceRecord[] = [];
  
  // Marzo a Junio 2025
  const months = [
    { year: 2025, month: 2, days: 31 }, // Marzo (mes 2 en JS)
    { year: 2025, month: 3, days: 30 }, // Abril
    { year: 2025, month: 4, days: 31 }, // Mayo
    { year: 2025, month: 5, days: 30 }, // Junio
  ];

  months.forEach(({ year, month, days }) => {
    for (let day = 1; day <= days; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      
      // Solo días laborables (lunes=1 a viernes=5)
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        const isoDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        // Generar estado aleatorio pero con mayoría de "Presente"
        const rand = Math.random();
        let status: AttendanceStatus;
        if (rand < 0.75) status = 'Presente';
        else if (rand < 0.85) status = 'Tardanza';
        else if (rand < 0.92) status = 'Falta justificada';
        else status = 'Ausente';
        
        data.push({ date: isoDate, status });
      }
    }
  });

  return data;
}

const simulatedData = generateAttendanceData();

const statusColor = (s: AttendanceStatus) => {
  switch (s) {
    case 'Presente':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'Ausente':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'Falta justificada':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'Tardanza':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  }
};

export function Asistencia() {
  const [monthFilter, setMonthFilter] = useState<string>('Todos');
  const [currentWeek, setCurrentWeek] = useState<number>(0);

  // Meses del año escolar: marzo a diciembre
  const monthOptions = useMemo(() => [
    { key: 'Todos', label: 'Todos' },
    { key: '2', label: 'Marzo' },
    { key: '3', label: 'Abril' },
    { key: '4', label: 'Mayo' },
    { key: '5', label: 'Junio' },
    { key: '6', label: 'Julio' },
    { key: '7', label: 'Agosto' },
    { key: '8', label: 'Septiembre' },
    { key: '9', label: 'Octubre' },
    { key: '10', label: 'Noviembre' },
    { key: '11', label: 'Diciembre' },
  ], []);

  // Filtrar por mes
  const filtered = useMemo(() => {
    if (monthFilter === 'Todos') return simulatedData;
    const month = Number(monthFilter);
    return simulatedData.filter((r) => {
      const d = new Date(r.date + 'T00:00:00');
      return d.getMonth() === month;
    });
  }, [monthFilter]);

  // Agrupar por semanas (lunes a viernes)
  const weeks = useMemo(() => {
    const weeksMap = new Map<number, AttendanceRecord[]>();
    let weekCounter = 0;
    let currentWeekData: AttendanceRecord[] = [];
    let lastDate: Date | null = null;

    filtered.forEach((record) => {
      const date = new Date(record.date + 'T00:00:00');
      const dayOfWeek = date.getDay();

      // Si es lunes (1) o es el primer día, comenzar nueva semana
      if (dayOfWeek === 1 || lastDate === null) {
        if (currentWeekData.length > 0) {
          weeksMap.set(weekCounter, currentWeekData);
          weekCounter++;
          currentWeekData = [];
        }
      }

      currentWeekData.push(record);
      lastDate = date;
    });

    // Agregar la última semana
    if (currentWeekData.length > 0) {
      weeksMap.set(weekCounter, currentWeekData);
    }

    return Array.from(weeksMap.entries());
  }, [filtered]);

  // Resetear semana actual cuando cambia el filtro
  useEffect(() => {
    setCurrentWeek(0);
  }, [monthFilter]);

  const currentWeekData = weeks[currentWeek]?.[1] || [];
  const totalWeeks = weeks.length;

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdCheckCircle /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Asistencia</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-primary-500">Filtrar por mes:</label>
            
            <Listbox value={monthFilter} onChange={setMonthFilter}>
              <div className="relative">
                <Listbox.Button className="relative w-48 cursor-pointer rounded-lg bg-white py-2.5 pl-4 pr-10 text-left shadow-sm border-2 border-gray-200 hover:border-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-500 transition-all">
                  <span className="block truncate text-sm font-medium text-gray-700">
                    {monthOptions.find(m => m.key === monthFilter)?.label || 'Todas'}
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
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {monthOptions.map((month) => (
                      <Listbox.Option
                        key={month.key}
                        value={month.key}
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

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                <MdCheckCircle className="text-green-500" /> Presente
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200">
                <MdCancel className="text-red-500" /> Ausente
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-orange-50 text-orange-700 border border-orange-200">
                <MdEventNote className="text-orange-500" /> Falta justificada
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                <MdOutlineAccessTime className="text-yellow-500" /> Tardanza
              </span>
            </div>
          </div>
        </div>

        {/* Lista de días de la semana actual */}
        <div className="space-y-2 mb-6">
          {currentWeekData.length === 0 ? (
            <div className="py-10 text-center text-gray-500">No hay registros de asistencia para esta semana.</div>
          ) : (
            currentWeekData.map((r) => {
              const date = new Date(r.date + 'T00:00:00');
              const dayName = date.toLocaleDateString('es-PE', { weekday: 'long' });
              const dayNumber = date.getDate();
              const monthName = date.toLocaleDateString('es-PE', { month: 'long' });
              
              return (
                <div 
                  key={r.date} 
                  className="flex items-center justify-between p-3 rounded-lg border-2 hover:shadow-md transition-shadow"
                  style={{ borderColor: r.status === 'Presente' ? '#86efac' : r.status === 'Ausente' ? '#fca5a5' : r.status === 'Falta justificada' ? '#fdba74' : '#fde047' }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-2 rounded-lg font-bold text-center min-w-[70px] border-2 ${statusColor(r.status)}`}>
                      <div className="text-xl">{dayNumber}</div>
                      <div className="text-xs uppercase">{date.toLocaleDateString('es-PE', { month: 'short' })}</div>
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-800 capitalize">{dayName}</div>
                      <div className="text-xs text-gray-500">{dayNumber} de {monthName} de 2025</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 rounded-lg font-semibold text-xs border-2 ${statusColor(r.status)}`}>
                      {r.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Paginación por semanas */}
        {totalWeeks > 0 && (
          <div className="flex items-center justify-between pt-4 border-t">
            <button
              onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
              disabled={currentWeek === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <MdNavigateBefore className="text-xl" /> Semana anterior
            </button>
            
            <span className="text-sm font-medium text-gray-600">
              Semana {currentWeek + 1} de {totalWeeks}
            </span>
            
            <button
              onClick={() => setCurrentWeek(Math.min(totalWeeks - 1, currentWeek + 1))}
              disabled={currentWeek === totalWeeks - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Semana siguiente <MdNavigateNext className="text-xl" />
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Asistencia;

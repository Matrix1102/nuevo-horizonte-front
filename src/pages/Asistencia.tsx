import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { MdCheckCircle, MdOutlineAccessTime, MdCancel } from 'react-icons/md';

// Vista de Asistencia (front-only, datos simulados concordes con 2025)
// - Muestra fechas de clases con estado: Presente, Ausente, Tardanza
// - Filtrado por mes y leyenda explicativa

type AttendanceStatus = 'Presente' | 'Falta injustificada' | 'Falta justificada';

type AttendanceRecord = {
  date: string; // ISO (YYYY-MM-DD)
  topic?: string;
  status: AttendanceStatus;
};

const simulatedData: AttendanceRecord[] = [
  { date: '2025-03-03', topic: 'Introducción al curso', status: 'Presente' },
  { date: '2025-03-10', topic: 'Tema 1: Fundamentos', status: 'Falta justificada' },
  { date: '2025-03-17', topic: 'Tema 2: Práctica', status: 'Presente' },
  { date: '2025-03-24', topic: 'Evaluación corta', status: 'Falta injustificada' },
  { date: '2025-04-07', topic: 'Tema 3: Avanzado', status: 'Presente' },
  { date: '2025-04-14', topic: 'Laboratorio', status: 'Presente' },
  { date: '2025-04-21', topic: 'Revisión', status: 'Falta justificada' },
  { date: '2025-04-28', topic: 'Exposición', status: 'Presente' },
  { date: '2025-05-05', topic: 'Semana de proyectos', status: 'Presente' },
  { date: '2025-05-12', topic: 'Entrega parcial', status: 'Falta injustificada' },
  { date: '2025-05-19', topic: 'Retroalimentación', status: 'Presente' },
  { date: '2025-05-26', topic: 'Simulacro', status: 'Falta justificada' },
  { date: '2025-06-02', topic: 'Cierre de ciclo', status: 'Presente' },
];

const statusColor = (s: AttendanceStatus) => {
  switch (s) {
    case 'Presente':
      return 'bg-green-100 text-green-800';
    case 'Falta injustificada':
      return 'bg-red-100 text-red-800';
    case 'Falta justificada':
      return 'bg-yellow-100 text-yellow-800';
  }
};

function formatDateLabel(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('es-PE', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function Asistencia() {
  const [monthFilter, setMonthFilter] = useState<string>('Todas');

  // construir lista de meses disponibles basados en datos (ej: "mar 2025")
  const months = useMemo(() => {
    const set = new Map<string, string>();
    simulatedData.forEach((r) => {
      const d = new Date(r.date + 'T00:00:00');
      const key = `${d.getMonth()}-${d.getFullYear()}`; // llave única
      const label = d.toLocaleDateString('es-PE', { month: 'short', year: 'numeric' });
      set.set(key, label);
    });
    return Array.from(set.entries()).map(([key, label]) => ({ key, label }));
  }, []);

  const filtered = useMemo(() => {
    if (monthFilter === 'Todas') return simulatedData;
    const [monthStr, yearStr] = monthFilter.split('|');
    const month = Number(monthStr);
    const year = Number(yearStr);
    return simulatedData.filter((r) => {
      const d = new Date(r.date + 'T00:00:00');
      return d.getMonth() === month && d.getFullYear() === year;
    });
  }, [monthFilter]);

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdCheckCircle /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Asistencia</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Filtrar por mes:</label>
            <select
              className="form-select px-3 py-2 rounded border bg-white text-sm"
              value={monthFilter}
              onChange={(e) => {
                const v = e.target.value;
                if (v === 'Todas') setMonthFilter('Todas');
                else setMonthFilter(v);
              }}
            >
              <option value="Todas">Todas</option>
              {months.map((m) => {
                // m.key = 'month-year'
                const [mo, yr] = m.key.split('-');
                return (
                  <option key={m.key} value={`${mo}|${yr}`}>
                    {m.label}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-2 py-1 rounded text-sm font-medium bg-gray-50 text-gray-700">
                <MdCheckCircle className="text-green-500" /> Presente
              </span>
              <span className="inline-flex items-center gap-2 px-2 py-1 rounded text-sm font-medium bg-gray-50 text-gray-700">
                <MdCancel className="text-red-500" /> Ausente
              </span>
              <span className="inline-flex items-center gap-2 px-2 py-1 rounded text-sm font-medium bg-gray-50 text-gray-700">
                <MdOutlineAccessTime className="text-yellow-500" /> Tardanza
              </span>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-gray-500">No hay clases registradas para este mes.</div>
          ) : (
            filtered.map((r) => (
              <div key={r.date} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded-md font-semibold ${statusColor(r.status)}`}>
                    {new Date(r.date + 'T00:00:00').toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-gray-800">{r.topic}</div>
                    <div className="text-sm text-gray-500">{formatDateLabel(r.date)}</div>
                  </div>
                </div>

                <div className="mt-3 md:mt-0 flex items-center gap-4">
                  <span className="text-sm font-semibold uppercase text-gray-700">{r.status}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 text-xs text-gray-500">
          Leyenda: <span className="font-medium">Presente</span> — alumno asistió; <span className="font-medium">Ausente</span> — no asistió; <span className="font-medium">Tardanza</span> — llegó tarde.
        </div>
      </div>
    </Layout>
  );
}

export default Asistencia;

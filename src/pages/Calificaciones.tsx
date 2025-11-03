import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { MdGrade, MdPictureAsPdf } from 'react-icons/md';

type CourseGrade = {
  id: string;
  course: string;
  periods: (number | null)[]; // 4 periods
};

const simulatedGrades: CourseGrade[] = [
  { id: 'c1', course: 'Matemáticas', periods: [15, 14.5, 16, 15.5] },
  { id: 'c2', course: 'Comunicación', periods: [13.5, 14, 14.5, 15] },
  { id: 'c3', course: 'Ciencias', periods: [12, 13, 13.5, 14] },
  { id: 'c4', course: 'Historia', periods: [16, 15.5, 16, 16] },
  { id: 'c5', course: 'Inglés', periods: [14, 14.5, 15, null] },
  { id: 'c6', course: 'Arte', periods: [17, 16.5, 17, 17] },
];

function computeFinal(periods: (number | null)[]) {
  const nums = periods.filter((p): p is number => typeof p === 'number');
  if (nums.length === 0) return null;
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  return Math.round(avg * 10) / 10;
}

export function Calificaciones() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Todos');
  const [pdfOpen, setPdfOpen] = useState(false);

  const periods = useMemo(
    () => ['Todos', '1er Bimestre', '2do Bimestre', '3er Bimestre', '4to Bimestre'],
    []
  );

  const rows = useMemo(() => simulatedGrades.map((g) => ({ ...g, final: computeFinal(g.periods) })), []);

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdGrade /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Calificaciones</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Periodo:</label>
            <select
              className="form-select px-3 py-2 rounded border bg-white text-sm"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              {periods.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPdfOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded bg-accent-500 text-white"
            >
              <MdPictureAsPdf /> PDF Libreta
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border">Cursos</th>
                <th className={`text-center px-4 py-3 border ${selectedPeriod === '1er Bimestre' ? 'bg-blue-50' : ''}`}>1°</th>
                <th className={`text-center px-4 py-3 border ${selectedPeriod === '2do Bimestre' ? 'bg-blue-50' : ''}`}>2°</th>
                <th className={`text-center px-4 py-3 border ${selectedPeriod === '3er Bimestre' ? 'bg-blue-50' : ''}`}>3°</th>
                <th className={`text-center px-4 py-3 border ${selectedPeriod === '4to Bimestre' ? 'bg-blue-50' : ''}`}>4°</th>
                <th className="text-center px-4 py-3 border">N. Final</th>
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

      {pdfOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setPdfOpen(false)} />
          <div className="relative bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-3"><MdPictureAsPdf /> PDF Libreta (simulado)</h3>
            <p className="text-sm text-gray-700 mb-4">Se ha generado un PDF simulado de la libreta. En una integración real aquí se descargaría el archivo.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setPdfOpen(false)} className="px-4 py-2 rounded border">Cerrar</button>
              <button
                onClick={() => {
                  // simulación: abrir impresión del navegador (opcional)
                  window.print();
                }}
                className="px-4 py-2 rounded bg-accent-500 text-white"
              >
                Imprimir
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Calificaciones;

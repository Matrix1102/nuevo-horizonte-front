import { Layout } from '../components/Layout';
import { MdAssessment } from 'react-icons/md';
import { MdBarChart } from 'react-icons/md';
import { MdPieChart } from 'react-icons/md';
import { MdPeople } from 'react-icons/md';  

export function Reportes() {
  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-secondary-500"><MdAssessment /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Reportes y Estadísticas</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-secondary-500">
        <h3 className="text-lg font-semibold mb-4 text-primary-500">Dashboard de Reportes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg bg-soft-100 flex flex-col items-center justify-center text-center">
            <span className="text-4xl text-accent-500 mb-2"><MdBarChart /></span>
            <div className="text-xl font-bold text-primary-500">120</div>
            <div className="text-sm text-gray-600">Matrículas Activas</div>
          </div>
          <div className="p-4 border rounded-lg bg-soft-100 flex flex-col items-center justify-center text-center">
            <span className="text-4xl text-secondary-500 mb-2"><MdPieChart /></span>
            <div className="text-xl font-bold text-primary-500">92%</div>
            <div className="text-sm text-gray-600">Tasa de Pago (Mensual)</div>
          </div>
          <div className="p-4 border rounded-lg bg-soft-100 flex flex-col items-center justify-center text-center">
            <span className="text-4xl text-warm-500 mb-2"><MdPeople /></span>
            <div className="text-xl font-bold text-primary-500">24</div>
            <div className="text-sm text-gray-600">Profesores Activos</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Usa los filtros superiores para generar reportes detallados de pagos, asistencia y rendimiento académico.</p>
        </div>
      </div>
    </Layout>
  );
}
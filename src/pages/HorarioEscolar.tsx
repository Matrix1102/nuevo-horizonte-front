import { Layout } from '../components/Layout';
import { MdSchedule } from 'react-icons/md';

export function HorarioEscolar() {
  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-warm-500"><MdSchedule /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Horario Escolar</h2>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-warm-500">
        <p className="text-gray-600">Visualización de horarios de clases.</p>
      </div>
    </Layout>
  );
}

import { Layout } from '../components/Layout';
import { MdGrade } from 'react-icons/md';

export function Calificaciones() {
  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-warm-500"><MdGrade /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Calificaciones</h2>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-warm-500">
        <p className="text-gray-600">Consulta y gestión de calificaciones.</p>
      </div>
    </Layout>
  );
}

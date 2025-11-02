import { Layout } from '../components/Layout';
import { MdAssessment } from 'react-icons/md';

export function Reportes() {
  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-secondary-500"><MdAssessment /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Reportes</h2>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-secondary-500">
        <p className="text-gray-600">Generación y consulta de reportes.</p>
      </div>
    </Layout>
  );
}

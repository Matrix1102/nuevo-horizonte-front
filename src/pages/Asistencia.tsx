import { Layout } from '../components/Layout';
import { MdCheckCircle } from 'react-icons/md';

export function Asistencia() {
  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdCheckCircle /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Asistencia</h2>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-accent-500">
        <p className="text-gray-600">Registro y control de asistencia.</p>
      </div>
    </Layout>
  );
}

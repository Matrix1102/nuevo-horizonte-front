import { Layout } from '../components/Layout';
import { MdClass } from 'react-icons/md';

export function Cursos() {
  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-warm-500"><MdClass /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Gestión de Cursos</h2>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-warm-500">
        <p className="text-gray-600">Administración de cursos y secciones.</p>
      </div>
    </Layout>
  );
}

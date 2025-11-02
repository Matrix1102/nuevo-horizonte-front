import { Layout } from '../components/Layout';
import { MdClass } from 'react-icons/md';

export function MisCursos() {
  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdClass /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Mis Cursos</h2>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-accent-500">
        <p className="text-gray-600">Gestión de cursos asignados.</p>
      </div>
    </Layout>
  );
}

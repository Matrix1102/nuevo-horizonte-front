import { Layout } from '../components/Layout';
import { MdPeople } from 'react-icons/md';

export function Usuarios() {
  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdPeople /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Gestión de Usuarios</h2>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-accent-500">
        <p className="text-gray-600">Administración de usuarios del sistema.</p>
      </div>
    </Layout>
  );
}

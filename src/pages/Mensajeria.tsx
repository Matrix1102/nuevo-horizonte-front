import { Layout } from '../components/Layout';
import { MdMessage } from 'react-icons/md';

export function Mensajeria() {
  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdMessage /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Mensajería</h2>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-accent-500">
        <p className="text-gray-600">Sistema de mensajería interna del colegio.</p>
      </div>
    </Layout>
  );
}

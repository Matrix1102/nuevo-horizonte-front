import { Layout } from '../components/Layout';
import { MdCampaign } from 'react-icons/md';

export function Publicaciones() {
  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdCampaign /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Publicaciones</h2>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md">
        <div className="flex flex-col gap-5">
          <div className="bg-soft-100 p-5 rounded-lg border-l-4 border-accent-500">
            <h3 className="text-primary-500 text-xl mb-2 font-semibold">Inicio del Año Escolar 2025</h3>
            <p className="text-gray-500 text-sm mb-3 italic">25 de Octubre, 2025</p>
            <p className="text-gray-600 leading-relaxed">
              Les recordamos que el inicio de clases será el 15 de enero del 2025. 
              Por favor, estar atentos a las próximas comunicaciones.
            </p>
          </div>
          <div className="bg-soft-100 p-5 rounded-lg border-l-4 border-warm-500">
            <h3 className="text-primary-500 text-xl mb-2 font-semibold">Inscripciones Abiertas</h3>
            <p className="text-gray-500 text-sm mb-3 italic">1 de Noviembre, 2025</p>
            <p className="text-gray-600 leading-relaxed">
              Las inscripciones para el nuevo año escolar están abiertas. 
              Pueden realizarlas a través del módulo de Matrícula Web.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

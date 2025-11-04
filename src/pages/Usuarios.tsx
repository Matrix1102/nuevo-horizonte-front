import { Layout } from '../components/Layout';
import { MdPeople } from 'react-icons/md';

export function Usuarios() {
  // Datos simulados (se basa en la lista de prueba de AuthContext.tsx)
  const users = [
    { id: 1, name: 'Jose Bayona', type: 'Alumno', email: 'alumno@colegio.com' },
    { id: 2, name: 'María García', type: 'Profesor', email: 'profesor@colegio.com' },
    { id: 3, name: 'Carlos Pérez', type: 'Administrativo', email: 'admin@colegio.com' },
  ];

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdPeople /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Gestión de Usuarios</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">
        <h3 className="text-lg font-semibold mb-4 text-primary-500">Listado de Usuarios (Simulado)</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-3 font-semibold text-gray-700">Nombre</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Rol</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 font-medium">{user.name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        user.type === 'Alumno' ? 'bg-blue-100 text-accent-700' :
                        user.type === 'Profesor' ? 'bg-warm-100 text-warm-700' :
                        'bg-green-100 text-green-800'
                    }`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

// Nota: El App.tsx ya tiene un import/export.
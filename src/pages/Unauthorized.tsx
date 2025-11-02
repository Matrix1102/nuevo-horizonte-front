import { Link } from 'react-router-dom';

export function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 text-center bg-soft-100">
      <div className="text-7xl text-warm-500 mb-5">⚠</div>
      <h1 className="text-5xl text-primary-500 mb-5 font-bold">Acceso No Autorizado</h1>
      <p className="text-lg text-gray-500 mb-8">
        No tienes permisos para acceder a esta página.
      </p>
      <Link 
        to="/dashboard" 
        className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-lg no-underline font-semibold transition-transform hover:-translate-y-0.5 shadow-lg"
      >
        ← Volver al Inicio
      </Link>
    </div>
  );
}

import { useAuth } from '../context/AuthContext';
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';
import { MdClass, MdGrade, MdSchedule, MdPeople, MdPayment, MdCalendarToday, MdLibraryBooks, MdSchool } from 'react-icons/md';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="bg-white p-8 rounded-xl shadow-md mb-8 border-l-4 border-secondary-500">
        <h2 className="text-primary-500 text-3xl mb-2.5 font-bold">
          Bienvenido, {user?.name}
        </h2>
        <p className="inline-block bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
          {user?.type === 'alumno' && 'Estudiante'}
          {user?.type === 'profesor' && 'Profesor'}
          {user?.type === 'administrativo' && 'Personal Administrativo'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {user?.type === 'alumno' && (
          <>
            <Link to="/mis-cursos" className="no-underline block h-full">
              <div className="bg-white p-6 rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg border-t-4 border-accent-500 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl text-accent-500"><MdClass /></span>
                  <h3 className="text-primary-500 text-xl font-semibold">Mis Cursos</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Accede a tus cursos y materiales de estudio
                </p>
              </div>
            </Link>

            <Link to="/calificaciones" className="no-underline block h-full">
              <div className="bg-white p-6 rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg border-t-4 border-accent-500 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl text-accent-500"><MdGrade /></span>
                  <h3 className="text-primary-500 text-xl font-semibold">Calificaciones</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Consulta tus notas y rendimiento académico
                </p>
              </div>
            </Link>

            <Link to="/horario-escolar" className="no-underline block h-full">
              <div className="bg-white p-6 rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg border-t-4 border-accent-500 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl text-accent-500"><MdSchedule /></span>
                  <h3 className="text-primary-500 text-xl font-semibold">Horario</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Revisa tu horario de clases
                </p>
              </div>
            </Link>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg border-t-4 border-accent-500 h-full">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl text-accent-500"><MdCalendarToday /></span>
                <h3 className="text-primary-500 text-xl font-semibold">Asistencias</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Consulta tu registro de asistencias
              </p>
            </div>
          </>
        )}

        {user?.type === 'profesor' && (
          <>
            <div className="bg-white p-6 rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg border-t-4 border-accent-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl text-accent-500"><MdClass /></span>
                <h3 className="text-primary-500 text-xl font-semibold">Mis Cursos</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Gestiona tus clases y estudiantes
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg border-t-4 border-accent-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl text-accent-500"><MdGrade /></span>
                <h3 className="text-primary-500 text-xl font-semibold">Calificaciones</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Registra y actualiza calificaciones
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg border-t-4 border-accent-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl text-accent-500"><MdLibraryBooks /></span>
                <h3 className="text-primary-500 text-xl font-semibold">Materiales</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sube y organiza material didáctico
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg border-t-4 border-accent-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl text-accent-500"><MdSchedule /></span>
                <h3 className="text-primary-500 text-xl font-semibold">Horario</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tu horario de clases
              </p>
            </div>
          </>
        )}

        {user?.type === 'administrativo' && (
          <>
            <Link to="/alumnos-matriculados" className="no-underline block h-full">
              <div className="bg-white p-6 rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg border-t-4 border-accent-500 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl text-accent-500"><MdSchool /></span>
                  <h3 className="text-primary-500 text-xl font-semibold">Alumnos Matriculados</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Gestión de alumnos matriculados
                </p>
              </div>
            </Link>

            <div className="bg-white p-6 rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg border-t-4 border-accent-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl text-accent-500"><MdPeople /></span>
                <h3 className="text-primary-500 text-xl font-semibold">Usuarios</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Gestión de usuarios del sistema
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg border-t-4 border-accent-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl text-accent-500"><MdPayment /></span>
                <h3 className="text-primary-500 text-xl font-semibold">Pagos</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Control de pagos y pensiones
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg border-t-4 border-accent-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl text-accent-500"><MdCalendarToday /></span>
                <h3 className="text-primary-500 text-xl font-semibold">Calendario</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Gestión del calendario escolar
              </p>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

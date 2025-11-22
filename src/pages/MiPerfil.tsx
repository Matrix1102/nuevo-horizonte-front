import { useAuth } from '../context/AuthContext';
import { Layout } from '../components/Layout';
import { MdPerson, MdEmail, MdSchool, MdWork, MdPhone, MdLocationOn, MdCalendarToday, MdBadge } from 'react-icons/md';

// Tipos de perfil
type PerfilAlumno = {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: string;
  grado: string;
  seccion: string;
  codigo: string;
  tutor: string;
  añoIngreso: string;
};

type PerfilProfesor = {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: string;
  especialidad: string;
  codigo: string;
  añosServicio: string;
  titulo: string;
  horario: string;
};

type PerfilAdministrativo = {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: string;
  cargo: string;
  codigo: string;
  area: string;
  añosServicio: string;
  horario: string;
};

// Datos de perfil según tipo de usuario
const perfilData: {
  alumno: PerfilAlumno;
  profesor: PerfilProfesor;
  administrativo: PerfilAdministrativo;
} = {
  alumno: {
    nombre: 'Jose Bayona',
    email: 'alumno@colegio.com',
    telefono: '+51 987 654 321',
    direccion: 'Av. Principal 123, Lima',
    fechaNacimiento: '15/03/2010',
    grado: '5to de Secundaria',
    seccion: 'A',
    codigo: 'A2025001',
    tutor: 'María García',
    añoIngreso: '2018',
  },
  profesor: {
    nombre: 'María García',
    email: 'profesor@colegio.com',
    telefono: '+51 998 765 432',
    direccion: 'Jr. Los Olivos 456, Lima',
    fechaNacimiento: '22/08/1985',
    especialidad: 'Matemática y Física',
    codigo: 'P2020045',
    añosServicio: '5 años',
    titulo: 'Licenciada en Educación',
    horario: 'Lunes a Viernes, 8:00 AM - 2:00 PM',
  },
  administrativo: {
    nombre: 'Carlos Pérez',
    email: 'admin@colegio.com',
    telefono: '+51 999 888 777',
    direccion: 'Calle Central 789, Lima',
    fechaNacimiento: '10/05/1980',
    cargo: 'Administrador General',
    codigo: 'ADM2019001',
    area: 'Gestión Administrativa',
    añosServicio: '6 años',
    horario: 'Lunes a Viernes, 8:00 AM - 5:00 PM',
  }
};

export default function MiPerfil() {
  const { user } = useAuth();
  
  if (!user) return null;

  const perfil = perfilData[user.type as keyof typeof perfilData];

  return (
    <Layout>
      <div className="flex justify-center items-start min-h-full">
        <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-4xl">
          {/* Header del perfil con foto */}
          <div className="flex items-center gap-6 mb-8 pb-4 border-b border-gray-200">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-4xl font-bold">
            {perfil.nombre.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{perfil.nombre}</h2>
            <p className="text-gray-600 capitalize flex items-center gap-2 mt-1">
              <MdBadge className="text-accent-500" />
              {user.type === 'administrativo' ? 'Administrativo' : user.type}
            </p>
          </div>
        </div>

        {/* Información personal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Email */}
          <div className="flex items-start gap-3">
            <MdEmail className="text-2xl text-accent-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500 font-semibold">Correo Electrónico</p>
              <p className="text-gray-800">{perfil.email}</p>
            </div>
          </div>

          {/* Teléfono */}
          <div className="flex items-start gap-3">
            <MdPhone className="text-2xl text-accent-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500 font-semibold">Teléfono</p>
              <p className="text-gray-800">{perfil.telefono}</p>
            </div>
          </div>

          {/* Dirección */}
          <div className="flex items-start gap-3">
            <MdLocationOn className="text-2xl text-accent-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500 font-semibold">Dirección</p>
              <p className="text-gray-800">{perfil.direccion}</p>
            </div>
          </div>

          {/* Fecha de nacimiento */}
          <div className="flex items-start gap-3">
            <MdCalendarToday className="text-2xl text-accent-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500 font-semibold">Fecha de Nacimiento</p>
              <p className="text-gray-800">{perfil.fechaNacimiento}</p>
            </div>
          </div>

          {/* Información específica por tipo de usuario */}
          {user.type === 'alumno' && (() => {
            const alumno = perfil as PerfilAlumno;
            return (
              <>
                <div className="flex items-start gap-3">
                  <MdSchool className="text-2xl text-accent-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Grado y Sección</p>
                    <p className="text-gray-800">{alumno.grado} - Sección {alumno.seccion}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdBadge className="text-2xl text-accent-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Código de Alumno</p>
                    <p className="text-gray-800">{alumno.codigo}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdPerson className="text-2xl text-accent-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Tutor Asignado</p>
                    <p className="text-gray-800">{alumno.tutor}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdCalendarToday className="text-2xl text-accent-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Año de Ingreso</p>
                    <p className="text-gray-800">{alumno.añoIngreso}</p>
                  </div>
                </div>
              </>
            );
          })()}

          {user.type === 'profesor' && (() => {
            const profesor = perfil as PerfilProfesor;
            return (
              <>
                <div className="flex items-start gap-3">
                  <MdSchool className="text-2xl text-accent-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Especialidad</p>
                    <p className="text-gray-800">{profesor.especialidad}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdBadge className="text-2xl text-accent-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Código de Docente</p>
                    <p className="text-gray-800">{profesor.codigo}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdWork className="text-2xl text-accent-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Años de Servicio</p>
                    <p className="text-gray-800">{profesor.añosServicio}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdSchool className="text-2xl text-accent-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Título Profesional</p>
                    <p className="text-gray-800">{profesor.titulo}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:col-span-2">
                  <MdCalendarToday className="text-2xl text-accent-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Horario de Trabajo</p>
                    <p className="text-gray-800">{profesor.horario}</p>
                  </div>
                </div>
              </>
            );
          })()}

          {user.type === 'administrativo' && (() => {
            const admin = perfil as PerfilAdministrativo;
            return (
              <>
                <div className="flex items-start gap-3">
                  <MdWork className="text-2xl text-accent-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Cargo</p>
                    <p className="text-gray-800">{admin.cargo}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdBadge className="text-2xl text-accent-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Código de Empleado</p>
                    <p className="text-gray-800">{admin.codigo}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdSchool className="text-2xl text-accent-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Área</p>
                    <p className="text-gray-800">{admin.area}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdWork className="text-2xl text-accent-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Años de Servicio</p>
                    <p className="text-gray-800">{admin.añosServicio}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:col-span-2">
                  <MdCalendarToday className="text-2xl text-accent-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Horario de Trabajo</p>
                    <p className="text-gray-800">{admin.horario}</p>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </div>
      </div>
    </Layout>
  );
}

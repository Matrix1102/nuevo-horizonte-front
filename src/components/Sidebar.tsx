import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import { Link, useLocation } from 'react-router-dom';
import { 
  MdCampaign, 
  MdMessage, 
  MdGrade, 
  MdPayment, 
  MdCheckCircle, 
  MdAppRegistration, 
  MdSchedule,
  MdClass,
  MdPeople,
  MdSchool,
  MdPersonAdd 
} from 'react-icons/md';
import logo from '../assets/login-bg-logo.png';

export function Sidebar() {
  const { user } = useAuth();
  const { isCollapsed } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const alumnoMenuItems = [
    { path: '/publicaciones', label: 'Publicaciones', icon: <MdCampaign /> },
    { path: '/mensajeria', label: 'Mensajería', icon: <MdMessage /> },
    { path: '/calificaciones', label: 'Calificaciones', icon: <MdGrade /> },
    { path: '/pagos', label: 'Pagos', icon: <MdPayment /> },
    { path: '/asistencia', label: 'Asistencia', icon: <MdCheckCircle /> },
    { path: '/mis-cursos', label: 'Mis Cursos', icon: <MdClass /> },
    { path: '/matricula-web', label: 'Matrícula Web', icon: <MdAppRegistration /> },
    { path: '/horario-escolar', label: 'Horario Escolar', icon: <MdSchedule /> }
  ];

  const profesorMenuItems = [
    { path: '/publicaciones', label: 'Publicaciones', icon: <MdCampaign /> },
    { path: '/mis-cursos', label: 'Mis Cursos', icon: <MdClass /> },
    { path: '/calificaciones-profesor', label: 'Calificaciones', icon: <MdGrade /> }, // CAMBIADO
    { path: '/asistencia-profesor', label: 'Asistencia', icon: <MdCheckCircle /> }, // CAMBIADO
    { path: '/horario', label: 'Horario', icon: <MdSchedule /> },
    { path: '/mensajeria', label: 'Mensajería', icon: <MdMessage /> }
  ];

  const adminMenuItems = [
    { path: '/publicaciones', label: 'Publicaciones', icon: <MdCampaign /> },
    { path: '/usuarios', label: 'Usuarios', icon: <MdPeople /> },
    { path: '/alumnos-matriculados', label: 'Alumnos Matriculados', icon: <MdSchool /> },
    { path: '/profesores-contratados', label: 'Profesores Contratados', icon: <MdPersonAdd /> },
    { path: '/cursos', label: 'Cursos', icon: <MdClass /> },
    { path: '/pagos', label: 'Pagos', icon: <MdPayment /> },
    { path: '/mensajeria', label: 'Mensajería', icon: <MdMessage /> }
  ];

  let menuItems = alumnoMenuItems;
  if (user?.type === 'profesor') menuItems = profesorMenuItems;
  if (user?.type === 'administrativo') menuItems = adminMenuItems;

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-60'} bg-gradient-to-b from-accent-500 to-accent-700 fixed left-0 top-0 h-screen flex flex-col shadow-lg z-100 transition-all duration-300`}>
      <div className={`py-4 px-4 text-center border-b border-white/10 ${isCollapsed ? 'px-2' : ''}`}>
        <img 
          src={logo} 
          alt="Logo" 
          className={`${isCollapsed ? 'w-10 h-10' : 'w-24 h-24'} object-contain mx-auto transition-all duration-300`}
        />
      </div>

      {!isCollapsed && (
        <div className="py-3 px-4 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center text-white text-base font-bold shadow-lg">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-xs mb-0.5">
              {user?.name}
            </p>
            <p className="text-secondary-400 text-xs font-medium">
              {user?.type === 'alumno' && 'Estudiante'}
              {user?.type === 'profesor' && 'Profesor'}
              {user?.type === 'administrativo' && 'Administrativo'}
            </p>
          </div>
        </div>
      )}

      {isCollapsed && (
        <div className="py-3 px-2 flex justify-center border-b border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center text-white text-base font-bold shadow-lg">
            {user?.name.charAt(0).toUpperCase()}
          </div>
        </div>
      )}

      <nav className="flex-1 py-3 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 ${isCollapsed ? 'px-2 justify-center' : 'px-4'} py-2.5 text-white/80 no-underline transition-all border-l-3 ${
              isActive(item.path)
                ? 'bg-secondary-500/30 text-white border-l-secondary-500 shadow-md'
                : 'border-l-transparent hover:bg-white/5 hover:text-white hover:border-l-secondary-500'
            }`}
            title={isCollapsed ? item.label : ''}
          >
            <span className={`text-xl ${isCollapsed ? 'w-auto' : 'w-5'} flex items-center justify-center text-secondary-400`}>
              {item.icon}
            </span>
            {!isCollapsed && <span className="text-xs font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
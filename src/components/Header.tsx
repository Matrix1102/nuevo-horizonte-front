import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import { useNavigate, Link } from 'react-router-dom';
import { MdMenu, MdHome, MdNotifications, MdSettings, MdLogout } from 'react-icons/md';

export function Header() {
  const { user, logout } = useAuth();
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white h-18 flex items-center justify-between px-8 shadow-md sticky top-0 z-50 border-b-2 border-soft-200">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="bg-none border-none cursor-pointer text-primary-500 hover:text-secondary-500 transition-colors p-2 rounded-lg hover:bg-soft-100 flex items-center justify-center w-10 h-10 text-2xl leading-none"
          title="Expandir/Contraer menú"
        >
          <MdMenu />
        </button>
        <Link
          to="/dashboard"
          className="cursor-pointer text-primary-500 hover:text-secondary-500 transition-colors p-2 rounded-lg hover:bg-soft-100 flex items-center justify-center w-10 h-10 text-2xl leading-none"
          title="Ir al inicio"
        >
          <MdHome className="text-primary-500 hover:text-secondary-500" />
        </Link>
        <h2 className="text-primary-500 text-xl font-bold">
          Colegio Nuevo Horizonte
        </h2>
      </div>
      
      <div className="flex items-center gap-5">
        <button 
          className="bg-none border-none text-2xl cursor-pointer p-2 rounded-lg transition-colors hover:bg-soft-200 text-accent-500"
          title="Notificaciones"
        >
          <MdNotifications />
        </button>
        
        <div className="relative group">
          <button className="bg-none border-none text-primary-500 text-sm font-semibold cursor-pointer px-4 py-2.5 rounded-lg transition-colors hover:bg-soft-200">
            {user?.name} ▼
          </button>
          <div className="absolute top-full right-0 mt-2.5 bg-white rounded-lg shadow-lg p-2 min-w-[200px] opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible border border-soft-300">
            <button 
              onClick={handleLogout}
              className="w-full bg-none border-none px-4 py-3 text-left cursor-pointer rounded-md text-red-600 font-semibold transition-colors hover:bg-red-50 flex items-center gap-2"
            >
              <MdLogout /> Cerrar Sesión
            </button>
          </div>
        </div>

        <button 
          className="bg-none border-none text-2xl cursor-pointer p-2 rounded-lg transition-colors hover:bg-soft-200 text-primary-500"
          title="Configuración"
        >
          <MdSettings />
        </button>
      </div>
    </header>
  );
}

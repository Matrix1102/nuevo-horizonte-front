import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import { useMessaging } from '../hooks/useMessaging';
import { useNavigate, Link } from 'react-router-dom';
import { MdMenu, MdHome, MdNotifications, MdPerson, MdLogout } from 'react-icons/md';

export function Header() {
  const { user, logout } = useAuth();
  const { toggleSidebar } = useSidebar();
  const { getUnreadCountForUser } = useMessaging();
  const navigate = useNavigate();
  
  const unreadCount = user ? getUnreadCountForUser(user.name) : 0;

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
          onClick={() => navigate('/mensajeria')}
          className="relative bg-none border-none text-2xl cursor-pointer p-2 rounded-lg transition-colors hover:bg-soft-200 text-accent-500"
          title="Mensajería"
        >
          <MdNotifications />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
        
        <div className="relative group">
          <button className="bg-none border-none text-primary-500 text-sm font-semibold cursor-pointer px-4 py-2.5 rounded-lg transition-colors hover:bg-soft-200">
            {user?.name} ▼
          </button>
          <div className="absolute top-full right-0 mt-2.5 bg-white rounded-lg shadow-lg p-2 min-w-[200px] opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible border border-soft-300">
            <Link
              to="/mi-perfil"
              className="w-full bg-none border-none px-4 py-3 text-left cursor-pointer rounded-md text-primary-600 font-semibold transition-colors hover:bg-primary-50 flex items-center gap-2 no-underline"
            >
              <MdPerson /> Mi Perfil
            </Link>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="bg-none border-none text-2xl cursor-pointer p-2 rounded-lg transition-colors hover:bg-red-50 text-red-600"
          title="Cerrar Sesión"
        >
          <MdLogout />
        </button>
      </div>
    </header>
  );
}

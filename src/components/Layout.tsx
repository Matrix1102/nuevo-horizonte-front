import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';
import logoImage from '../assets/colegio-logo.png';

interface LayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: LayoutProps) {
  const { isCollapsed } = useSidebar();
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      {/* El padding-left se ajusta dinámicamente según el estado del sidebar */}
      <div 
        className="flex-1 flex flex-col transition-all duration-300 relative" 
        style={{ paddingLeft: isCollapsed ? '64px' : '240px' }}
      >
        <Header />
        <div className="flex-1 p-8 relative">
          {/* Marca de agua del logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <img 
              src={logoImage} 
              alt="Logo Colegio" 
              className="opacity-5 w-[680px] h-[680px] object-contain"
            />
          </div>
          {/* Contenido */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}

import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';

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
        className="flex-1 flex flex-col transition-all duration-300" 
        style={{ paddingLeft: isCollapsed ? '64px' : '240px' }}
      >
        <Header />
        <div className="flex-1 p-8">
          {children}
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

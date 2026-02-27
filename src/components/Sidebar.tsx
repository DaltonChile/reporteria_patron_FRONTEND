import React from 'react';
import { 
  IconUpload, 
  IconList, 
  IconMap, 
  IconEdit, 
  IconDatabase, 
  IconSettings,
  IconMenu
} from './Icons';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  role: string;
  setRole: (role: string) => void;
}

export default function Sidebar({ currentView, setCurrentView, role }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  // Definir las vistas disponibles según el rol
  const getLinks = () => {
    switch(role) {
      case 'admin':
        return [
          { id: 'upload', label: 'Cargar Archivos', icon: <IconUpload className="w-5 h-5" /> },
          { id: 'fieldWork', label: 'Labores y Aplicaciones', icon: <IconList className="w-5 h-5" /> },
          { id: 'map', label: 'Mapa de Campo', icon: <IconMap className="w-5 h-5" /> },
          { id: 'dataEntry', label: 'Ingreso de Datos', icon: <IconEdit className="w-5 h-5" /> },
          { id: 'database', label: 'Base de Datos', icon: <IconDatabase className="w-5 h-5" /> },
          { id: 'settings', label: 'Configuración', icon: <IconSettings className="w-5 h-5" /> },
        ];
      case 'digitador':
        return [
          { id: 'dataEntry', label: 'Ingreso de Datos', icon: <IconEdit className="w-5 h-5" /> },
        ];
      case 'invitado':
        return [
          { id: 'fieldWork', label: 'Labores y Aplicaciones', icon: <IconList className="w-5 h-5" /> },
          { id: 'map', label: 'Mapa de Campo', icon: <IconMap className="w-5 h-5" /> },
          { id: 'database', label: 'Base de Datos', icon: <IconDatabase className="w-5 h-5" /> },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <div className={`transition-all duration-300 bg-brand-blue text-white ${isOpen ? 'w-64' : 'w-20'} flex flex-col h-full shadow-lg`}>
       <div className="h-16 flex items-center justify-between px-4 border-b border-[#2d63a8] shrink-0">
          <div className="flex items-center space-x-3 overflow-hidden" title="Nanihue Agrícola Patrón">
            <img src="/logo.svg" alt="Nanihue Logo" className="w-9 h-9 drop-shadow-sm flex-shrink-0" />
            {isOpen && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-lg text-white tracking-wide leading-tight">Nanihue</span>
                <span className="text-[10px] text-brand-green font-semibold uppercase tracking-wide leading-none mt-0.5">Agrícola Patrón</span>
              </div>
            )}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-brand-green p-1 transition-colors z-10">
            <IconMenu className="w-6 h-6" />
          </button>
       </div>
       
       <nav className="flex-1 py-6 space-y-2 overflow-y-auto px-3">
         {links.map((link) => (
           <button
             key={link.id}
             onClick={() => setCurrentView(link.id)}
             className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group
               ${currentView === link.id 
                 ? 'bg-brand-green text-white shadow-md' 
                 : 'text-slate-300 hover:bg-[#2d63a8] hover:text-white'
               }
             `}
             title={!isOpen ? link.label : ''}
           >
             <div className={`${currentView === link.id ? 'text-white' : 'text-brand-green group-hover:text-white'}`}>
                {link.icon}
             </div>
             {isOpen && (
               <span className="ml-3 font-medium whitespace-nowrap">
                 {link.label}
               </span>
             )}
           </button>
         ))}
       </nav>

       {isOpen && (
         <div className="p-4 border-t border-[#2d63a8] text-xs text-center text-slate-400">
           &copy; {new Date().getFullYear()} Nanihue Blueberry Farm
         </div>
       )}
    </div>
  );
}

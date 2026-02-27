import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import UploadExcel from './views/UploadExcel';
import FieldWork from './views/FieldWork';
import FieldMap from './views/FieldMap';
import DataEntry from './views/DataEntry';
import DatabaseInteraction from './views/DatabaseInteraction';
import Settings from './views/Settings';
import './index.css';

export default function App() {
  const [role, setRole] = useState('admin'); // admin, digitador, invitado
  const [currentView, setCurrentView] = useState('upload');

  // Ajustar la vista actual si el rol cambia a uno con menos permisos
  useEffect(() => {
    if (role === 'digitador' && currentView !== 'dataEntry') {
      setCurrentView('dataEntry');
    }
    if (role === 'invitado' && !['fieldWork', 'map', 'database'].includes(currentView)) {
      setCurrentView('fieldWork');
    }
  }, [role, currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'upload': return <UploadExcel />;
      case 'fieldWork': return <FieldWork />;
      case 'map': return <FieldMap />;
      case 'dataEntry': return <DataEntry />;
      case 'database': return <DatabaseInteraction />;
      case 'settings': return <Settings />;
      default: return <UploadExcel />;
    }
  };

  return (
    <div className="flex h-screen bg-brand-bg font-sans text-slate-800 overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        role={role} 
        setRole={setRole} 
      />
      <main className="flex-1 flex flex-col relative h-full">
        {/* Header Superior */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm shrink-0 z-10 w-full relative">
           <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-brand-blue tracking-tight">Sistema de Control de Gestión Agrícola</h1>
           </div>
           <div className="flex items-center space-x-4">
             <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest hidden sm:block">Rol de Usuario:</span>
             <select 
               className="bg-brand-light-green text-brand-blue font-bold px-3 py-1.5 rounded-lg border border-transparent hover:border-brand-green focus:border-brand-green focus:ring-2 focus:ring-brand-green/50 outline-none transition-all cursor-pointer shadow-sm text-sm"
               value={role} 
               onChange={(e) => setRole(e.target.value)}
             >
               <option value="admin">Administrador</option>
               <option value="digitador">Digitador</option>
               <option value="invitado">Invitado</option>
             </select>
           </div>
        </header>
        
        {/* Contenido Dinámico */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-brand-bg/50 absolute inset-0 top-16 container-scroll transition-opacity duration-300">
          <div className="h-full w-full">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  )
}

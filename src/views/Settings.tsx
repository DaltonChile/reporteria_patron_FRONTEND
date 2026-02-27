import { IconSettings } from '../components/Icons';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="mb-8 border-b border-slate-100 pb-6 flex items-center">
            <IconSettings className="w-8 h-8 mr-3 text-brand-green" />
            <div>
              <h2 className="text-2xl font-bold text-brand-blue">Configuración del Sistema</h2>
              <p className="text-slate-500 mt-1">Administración de usuarios, roles y ajustes globales.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-brand-blue mb-4 flex items-center">
              Gestionar Usuarios
            </h3>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 shadow-sm">
               <ul className="space-y-4 mb-4">
                  <li className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <div>
                      <span className="block font-medium text-slate-700">Juan Pérez</span>
                      <span className="text-xs text-slate-500 font-semibold bg-blue-100 text-brand-blue px-2 py-0.5 rounded-full inline-block mt-1">Administrador</span>
                    </div>
                    <button className="text-sm font-semibold text-red-500 hover:text-red-700 transition">Revocar</button>
                  </li>
                  <li className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <div>
                      <span className="block font-medium text-slate-700">Pedro Díaz</span>
                      <span className="text-xs text-slate-500 font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full inline-block mt-1">Digitador</span>
                    </div>
                    <button className="text-sm font-semibold text-red-500 hover:text-red-700 transition">Eliminar</button>
                  </li>
               </ul>
               <button className="w-full bg-brand-green hover:bg-[#649635] text-white py-2 rounded-lg text-sm font-semibold shadow-sm transition">
                 + Añadir Nuevo Usuario
               </button>
            </div>
          </div>

          <div>
             <h3 className="text-lg font-semibold text-brand-blue mb-4">Ajustes Generales</h3>
             <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
               <div>
                  <label className="text-sm font-semibold text-slate-700 flex justify-between items-center cursor-pointer">
                    <span>Permitir carga múltiple (Excel)</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-blue transition" />
                  </label>
               </div>
               <div className="border-t border-slate-200 pt-4">
                  <label className="text-sm font-semibold text-slate-700 flex justify-between items-center cursor-pointer">
                    <span>Notificaciones por correo (Digitación)</span>
                    <input type="checkbox" className="w-4 h-4 text-brand-blue transition" />
                  </label>
               </div>
               <div className="border-t border-slate-200 pt-4">
                  <div className="flex flex-col space-y-2">
                     <label className="text-sm font-semibold text-slate-700">Temporada Vigente</label>
                     <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-brand-blue">
                        <option>Temporada 2024</option>
                        <option>Temporada 2023</option>
                     </select>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

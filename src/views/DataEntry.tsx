import { useState } from 'react';
import { IconEdit } from '../components/Icons';

export default function DataEntry() {
  const [category, setCategory] = useState<'insectos' | 'pluviometro'>('insectos');

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="mb-8 border-b border-slate-100 pb-6 flex items-center">
            <IconEdit className="w-8 h-8 mr-3 text-brand-green" />
            <div>
              <h2 className="text-2xl font-bold text-brand-blue">Ingreso de Datos</h2>
              <p className="text-slate-500 mt-1">Formularios de campo para digitadores.</p>
            </div>
        </div>

        <div className="flex space-x-4 mb-8">
          <button 
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm ${category === 'insectos' ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            onClick={() => setCategory('insectos')}
          >
            🐛 Monitoreo de Insectos
          </button>
          <button 
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm ${category === 'pluviometro' ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            onClick={() => setCategory('pluviometro')}
          >
            🌧️ Medición Pluviómetro
          </button>
        </div>

        {category === 'insectos' ? (
           <form className="space-y-6" onSubmit={e => e.preventDefault()}>
             <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Cuartel</label>
                 <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow">
                   <option>Norte</option>
                   <option>Sur</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Tipo de Plaga</label>
                 <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow">
                   <option>Pulgón</option>
                   <option>Arañita Roja</option>
                   <option>Polilla del Brote</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Nivel de Infestación (1-5)</label>
                 <input type="number" min="1" max="5" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow" defaultValue={1} />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Fecha de Observación</label>
                 <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow" />
               </div>
             </div>
             
             <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-700">Observaciones</label>
               <textarea className="w-full h-32 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brand-green transition-shadow resize-none"></textarea>
             </div>

             <button type="submit" className="w-full bg-brand-green hover:bg-[#649635] text-white font-bold py-3 rounded-xl shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99]">
               Guardar Monitoreo
             </button>
           </form>
        ) : (
           <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Estación</label>
                 <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow">
                   <option>Estación Central</option>
                   <option>Estación Sector Sur</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Fecha de Lectura</label>
                 <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow" />
               </div>
               <div className="space-y-2 col-span-2">
                 <label className="text-sm font-semibold text-slate-700">Medición (mm)</label>
                 <input type="number" step="0.1" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow" placeholder="Ej: 15.2" />
               </div>
              </div>
              <button type="submit" className="w-full bg-brand-blue hover:bg-[#1a3a56] text-white font-bold py-3 rounded-xl shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99]">
               Registrar Lluvia
             </button>
           </form>
        )}
      </div>
    </div>
  );
}

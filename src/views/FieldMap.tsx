import { useState, useEffect } from 'react';
import { IconMap } from '../components/Icons';
import { api } from '../services/api';

export default function FieldMap() {
  const [activeCuartel, setActiveCuartel] = useState<number | null>(null);
  const [cuarteles, setCuarteles] = useState<any[]>([]);
  const [predios, setPredios] = useState<any[]>([]);
  const [selectedPredio, setSelectedPredio] = useState<number>(1); // 1 = Huemul as default

  useEffect(() => {
    const fetchData = async () => {
      const [resCuarteles, resPredios] = await Promise.all([
        api.getCuarteles(),
        api.getPredios()
      ]);
      setCuarteles(resCuarteles);
      setPredios(resPredios);
      
      if (resPredios.length > 0) {
          setSelectedPredio(resPredios[0].id);
      }
    };
    fetchData();
  }, []);

  // Filtrar los cuarteles correspondientes al predio seleccionado
  const cuartelesFiltrados = cuarteles.filter(c => c.predio_id === selectedPredio);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-bold text-brand-blue flex items-center">
                <IconMap className="w-8 h-8 mr-3 text-brand-green" />
                Mapa de Campo (Vista Aérea)
              </h2>
              <p className="text-slate-500 mt-2">Interactúa con los cuarteles para ver estadísticas y detalles específicos.</p>
            </div>
            
            <div className="flex flex-col items-end">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Seleccionar Predio</label>
                <select 
                    className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-brand-blue font-bold outline-none focus:ring-2 focus:ring-brand-green shadow-sm"
                    value={selectedPredio}
                    onChange={(e) => {
                        setSelectedPredio(Number(e.target.value));
                        setActiveCuartel(null); // Resetear zona activa al cambiar predio
                    }}
                >
                    {predios.map(p => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                </select>
            </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex items-center"><span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span> Cosecha</div>
          <div className="flex items-center"><span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span> Poda</div>
          <div className="flex items-center"><span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span> Riego</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
           {/* Simple Map Visualization */}
           <div className="relative w-full aspect-[4/3] bg-brand-light-green rounded-xl border-4 border-slate-100 overflow-hidden shadow-inner">
             <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
               {cuartelesFiltrados.map(c => (
                 <g key={c.id} 
                    onClick={() => setActiveCuartel(c.id)} 
                    className="cursor-pointer transition-all duration-300 hover:opacity-80 drop-shadow-md origin-center"
                 >
                   <rect 
                     x={c.x} y={c.y} width={c.w} height={c.h} 
                     className={`${c.color} stroke-white stroke-[0.5] ${activeCuartel === c.id ? '!stroke-[1.5] !stroke-brand-blue' : ''}`} rx="2" 
                   />
                   <text 
                     x={c.x + c.w/2} y={c.y + c.h/2} 
                     textAnchor="middle" fill="white" fontSize="4" fontWeight="bold" dominantBaseline="middle"
                     className="drop-shadow-md select-none pointer-events-none"
                   >
                     {c.name}
                   </text>
                 </g>
               ))}
             </svg>
           </div>
        </div>

        <div className="w-full md:w-80 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 self-start">
          <h3 className="text-lg font-bold text-brand-blue border-b border-slate-100 pb-3 mb-4">
            {activeCuartel ? cuartelesFiltrados.find(c => c.id === activeCuartel)?.name : 'Selecciona un cuartel'}
          </h3>
          
          {activeCuartel ? (
            <div className="space-y-4">
              <div>
                <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">Estado Actual</span>
                <span className="text-sm font-medium text-slate-800">{cuartelesFiltrados.find(c => c.id === activeCuartel)?.status}</span>
              </div>
              <div>
                 <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Última Aplicación</span>
                 <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-sm font-medium text-brand-blue">Fertilizante NPK</p>
                    <p className="text-xs text-slate-500">Hace 3 días</p>
                 </div>
              </div>
              <div>
                 <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Observaciones</span>
                 <p className="text-sm text-slate-600 bg-brand-light-green/30 p-3 rounded-lg">Sector presenta buena humedad debido a lluvias recientes.</p>
              </div>
              <button className="w-full mt-4 bg-brand-blue hover:bg-[#1a3a56] text-white py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                Ver Ficha Completa
              </button>
            </div>
          ) : (
             <div className="h-40 flex items-center justify-center text-slate-400 text-sm text-center">
               Interactúa con el mapa para ver la información detallada del cuartel.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

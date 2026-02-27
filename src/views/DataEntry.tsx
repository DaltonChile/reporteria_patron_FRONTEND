import { useState, useEffect } from 'react';
import { IconEdit } from '../components/Icons';
import { api } from '../services/api';

export default function DataEntry() {
  const [category, setCategory] = useState<'insectos' | 'pluviometro'>('insectos');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Catálogos para los dropdowns
  const [predios, setPredios] = useState<any[]>([]);
  const [centrosCosto, setCentrosCosto] = useState<any[]>([]);
  const [plagas, setPlagas] = useState<any[]>([]);

  useEffect(() => {
    const fetchCatalogs = async () => {
      const [_predios, _cc, _plagas] = await Promise.all([
        api.getPredios(),
        api.getCentrosCostoList(),
        api.getPlagas()
      ]);
      setPredios(_predios);
      setCentrosCosto(_cc);
      setPlagas(_plagas);
    };
    fetchCatalogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: string) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const date = (formData.get('date') as string) || new Date().toISOString().split('T')[0];
    const time = new Date().toISOString().split('T')[1].substring(0, 8);
    const fechaHora = `${date}T${time}`;
    
    try {
      if (type === 'insectos') {
        const ccId = Number(formData.get('centro_costo_id'));
        const plagaId = Number(formData.get('plaga_id'));
        const conteo = Number(formData.get('conteo'));
        const severidad = formData.get('severidad') as string;
        const comentario = formData.get('comentario') as string;
        
        await api.addMonitoreoPlaga({
          fecha_hora: fechaHora,
          centro_costo_id: ccId,
          digitador_id: 2, // Simulando al digitador logueado
          plaga_id: plagaId,
          conteo: conteo,
          severidad: severidad,
          comentario: comentario,
          foto_url: '' // placeholder
        });
      } else {
        const predioId = Number(formData.get('predio_id'));
        const mmAgua = Number(formData.get('mm_agua'));
        const tempMin = Number(formData.get('temp_min'));
        const tempMax = Number(formData.get('temp_max'));
        const observaciones = formData.get('observaciones') as string;

        await api.addRegistroClima({
          fecha_hora: fechaHora,
          predio_id: predioId,
          digitador_id: 2, // Simulando al digitador logueado
          mm_agua: mmAgua,
          temperatura_min: tempMin,
          temperatura_max: tempMax,
          observaciones: observaciones
        });
      }
      alert('Registro guardado exitosamente.');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      alert('Error al guardar el registro.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
             type="button"
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm ${category === 'insectos' ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            onClick={() => setCategory('insectos')}
          >
            🐛 Monitoreo de Insectos
          </button>
          <button 
             type="button"
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm ${category === 'pluviometro' ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            onClick={() => setCategory('pluviometro')}
          >
            🌧️ Medición de Clima
          </button>
        </div>

        {category === 'insectos' ? (
           <form className="space-y-6" onSubmit={e => handleSubmit(e, 'insectos')}>
             <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Cuartel (Centro de Costo)</label>
                 <select required name="centro_costo_id" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow">
                   {centrosCosto.map(cc => <option key={cc.id} value={cc.id}>{cc.nombre}</option>)}
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Tipo de Plaga</label>
                 <select required name="plaga_id" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow">
                   {plagas.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Conteo (Individuos)</label>
                 <input required name="conteo" type="number" min="0" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow" defaultValue={0} />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Severidad Visual</label>
                 <select required name="severidad" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow">
                   <option value="BAJO">BAJO</option>
                   <option value="MEDIO">MEDIO</option>
                   <option value="ALTO">ALTO</option>
                 </select>
               </div>
               <div className="space-y-2 col-span-2">
                 <label className="text-sm font-semibold text-slate-700">Fecha de Observación</label>
                 <input required name="date" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow" />
               </div>
             </div>
             
             <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-700">Comentarios Adicionales</label>
               <textarea name="comentario" className="w-full h-24 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brand-green transition-shadow resize-none"></textarea>
             </div>

             <button type="submit" disabled={isSubmitting} className="w-full bg-brand-green hover:bg-[#649635] disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99]">
               {isSubmitting ? 'Guardando...' : 'Guardar Monitoreo'}
             </button>
           </form>
        ) : (
           <form className="space-y-6" onSubmit={e => handleSubmit(e, 'pluviometro')}>
              <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2 col-span-2">
                 <label className="text-sm font-semibold text-slate-700">Predio / Fundo</label>
                 <select required name="predio_id" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow">
                   {predios.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                 </select>
               </div>
               <div className="space-y-2 col-span-2 sm:col-span-1">
                 <label className="text-sm font-semibold text-slate-700">Fecha de Lectura</label>
                 <input required name="date" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow" />
               </div>
               <div className="space-y-2 col-span-2 sm:col-span-1">
                 <label className="text-sm font-semibold text-slate-700">Medición Agua (mm)</label>
                 <input required name="mm_agua" type="number" step="0.1" min="0" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow" placeholder="Ej: 15.2" />
               </div>
               <div className="space-y-2 sm:col-span-1">
                 <label className="text-sm font-semibold text-slate-700">Temperatura Mínima (°C)</label>
                 <input name="temp_min" type="number" step="0.1" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow" placeholder="Ej: 5.0" />
               </div>
               <div className="space-y-2 sm:col-span-1">
                 <label className="text-sm font-semibold text-slate-700">Temperatura Máxima (°C)</label>
                 <input name="temp_max" type="number" step="0.1" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-green transition-shadow" placeholder="Ej: 18.2" />
               </div>
              </div>
              <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-700">Observaciones</label>
               <textarea name="observaciones" className="w-full h-20 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brand-green transition-shadow resize-none"></textarea>
             </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-brand-blue hover:bg-[#1a3a56] disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99]">
               {isSubmitting ? 'Registrando...' : 'Registrar Clima'}
             </button>
           </form>
        )}
      </div>
    </div>
  );
}

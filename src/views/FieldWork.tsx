import { IconList } from '../components/Icons';

export default function FieldWork() {
  const records = [
    { date: '2023-11-20', task: 'Poda verde', area: 'Cuartel Norte', status: 'Completado' },
    { date: '2023-11-21', task: 'Aplicación Foliar', area: 'Cuartel Sur', status: 'En Progreso' },
    { date: '2023-11-22', task: 'Desmalezado', area: 'Cuartel Oeste', status: 'Pendiente' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue flex items-center">
            <IconList className="w-8 h-8 mr-3 text-brand-green" />
            Labores de Campo y Aplicaciones
          </h2>
          <p className="text-slate-500 mt-1">Registro cronológico de tareas y tratamientos aplicados.</p>
        </div>
        <button className="bg-brand-green hover:bg-[#649635] text-white px-4 py-2 flex items-center space-x-2 font-semibold shadow-sm transition-colors rounded-lg">
           ✚ Nuevo Registro
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider border-b border-slate-200">
              <th className="py-4 px-6 font-semibold">Fecha</th>
              <th className="py-4 px-6 font-semibold">Labor / Aplicación</th>
              <th className="py-4 px-6 font-semibold">Cuartel</th>
              <th className="py-4 px-6 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.map((r, i) => (
              <tr key={i} className="hover:bg-brand-light-green/30 transition-colors">
                <td className="py-4 px-6 text-slate-700">{r.date}</td>
                <td className="py-4 px-6 font-medium text-brand-blue">{r.task}</td>
                <td className="py-4 px-6 text-slate-500">{r.area}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full 
                    ${r.status === 'Completado' ? 'bg-green-100 text-green-700' :
                      r.status === 'En Progreso' ? 'bg-blue-100 text-brand-blue' :
                      'bg-orange-100 text-orange-700'}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

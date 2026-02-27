import { IconDatabase } from '../components/Icons';

export default function DatabaseInteraction() {
  const data = [
    { id: 101, table: 'Monitoreos', field: 'Cuartel Norte', date: '2023-11-20', value: 'Pulgón Nivel 3' },
    { id: 102, table: 'Lluvias', field: 'Est. Central', date: '2023-11-22', value: '15.2 mm' },
    { id: 103, table: 'Aplicaciones', field: 'Cuartel Sur', date: '2023-11-23', value: 'Fertilizante NPK' },
    { id: 104, table: 'Monitoreos', field: 'Cuartel Este', date: '2023-11-23', value: 'Arañita Roja Nivel 1' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue flex items-center">
            <IconDatabase className="w-8 h-8 mr-3 text-brand-green" />
            Explorador de Base de Datos
          </h2>
          <p className="text-slate-500 mt-1">Busca, filtra y audita los registros en el sistema.</p>
        </div>
        <div className="flex space-x-3">
          <input 
            type="text" 
            placeholder="Buscar por Cuartel, Valor..." 
            className="px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue bg-white shadow-sm w-64"
          />
          <button className="bg-brand-blue hover:bg-[#1a3a56] text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm">
            Filtrar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider border-b border-slate-200">
                <th className="py-4 px-6 font-semibold">ID Ref</th>
                <th className="py-4 px-6 font-semibold">Tabla/Categoría</th>
                <th className="py-4 px-6 font-semibold">Sector</th>
                <th className="py-4 px-6 font-semibold">Fecha Registro</th>
                <th className="py-4 px-6 font-semibold">Valor Registrado</th>
                <th className="py-4 px-6 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-brand-light-green/30 transition-colors">
                  <td className="py-4 px-6 text-slate-500 text-xs font-mono">#{row.id}</td>
                  <td className="py-4 px-6">
                     <span className={`px-3 py-1 text-xs font-semibold rounded-full 
                        ${row.table === 'Monitoreos' ? 'bg-orange-100 text-orange-700' : 
                          row.table === 'Lluvias' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                        {row.table}
                     </span>
                  </td>
                  <td className="py-4 px-6 text-slate-700 font-medium">{row.field}</td>
                  <td className="py-4 px-6 text-slate-500">{row.date}</td>
                  <td className="py-4 px-6 text-slate-700">{row.value}</td>
                  <td className="py-4 px-6">
                    <button className="text-brand-blue hover:text-brand-green font-medium text-sm transition-colors mr-3">Ver Detalle</button>
                    <button className="text-red-500 font-medium text-sm transition-colors hover:text-red-700">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 p-4 border-t border-slate-200 text-sm text-slate-500 flex justify-between items-center">
            <span>Mostrando {data.length} de 1,204 registros</span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-100">Ant</button>
              <button className="px-3 py-1 bg-brand-blue text-white rounded">1</button>
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-100">2</button>
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-100">Sig</button>
            </div>
        </div>
      </div>
    </div>
  );
}

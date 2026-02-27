import React from 'react';
import { IconUpload } from '../components/Icons';

export default function UploadExcel() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="mb-8 border-b border-slate-100 pb-6">
          <h2 className="text-2xl font-bold text-brand-blue">Carga de Archivos</h2>
          <p className="text-slate-500 mt-2">
            Sube los archivos Excel (.xlsx) generados desde fx360. 
            El sistema procesará la información y la guardará en la base de datos automáticamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card for each module */}
          {['Labores de Campo', 'Aplicaciones Químicas', 'Cosecha Semanal', 'Inventario'].map((module, i) => (
            <div key={i} className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-brand-light-green hover:border-brand-green transition-all group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IconUpload className="w-8 h-8 text-brand-blue" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 group-hover:text-brand-blue">{module}</h3>
              <p className="text-sm text-center text-slate-500 mt-2 px-4">
                Haz clic o arrastra el archivo Excel (.xlsx) correspondiente a este módulo.
              </p>
              <button className="mt-4 px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 group-hover:border-brand-green group-hover:text-brand-green shadow-sm">
                Seleccionar Archivo
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

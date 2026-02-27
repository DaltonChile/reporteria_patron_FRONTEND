import * as mock from './mockData';

// Almacenamiento en memoria para simular una base de datos real
// Al usar variables en este módulo, el estado persistirá mientras la app no se recargue
let db = {
    ...mock,
    // Necesitamos hacerlos mutables
    dbRegistroClima: [...mock.dbRegistroClima],
    dbMonitoreoPlaga: [...mock.dbMonitoreoPlaga]
};

// Función auxiliar para simular la latencia de red (delay)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    // Catálogos para Formularios
    getPredios: async () => { await delay(100); return db.dbPredios; },
    getCentrosCostoList: async () => { await delay(100); return db.dbCentrosCosto; },
    getPlagas: async () => { await delay(100); return db.dbPlagasObjetivo; },
    // Cuarteles (Centros de Costo)
    getCuarteles: async () => {
        await delay(300);
        return db.dbCentrosCosto.map(cc => {
            // Parsear poligono_json para el mapa
            const poly = JSON.parse(cc.poligono_json || "{}");
            // Buscar estado fenológico a traves de la unidad de manejo
            const um = db.dbUnidadesManejo.find(u => u.id === cc.unidad_manejo_id);
            const estado = um ? db.dbEstadosFenologicos.find(e => e.id === um.estado_fenologico_id)?.nombre : 'Desconocido';

            return {
                id: cc.id,
                name: `Cuartel ${cc.nombre}`,
                status: estado,
                predio_id: um?.predio_id,
                ...poly
            };
        });
    },

    // Registros de campo (Aplicaciones / Labores) combinados
    getFieldRecords: async () => {
        await delay(400);

        // 1. Obtener Labores
        const labores = db.dbRegistroLaboral.map(rl => {
            const cc = db.dbCentrosCosto.find(c => c.id === rl.centro_costo_id);
            const labor = db.dbLabores.find(l => l.id === rl.labor_id);
            return {
                id: `L-${rl.id}`,
                date: rl.fecha,
                task: labor?.nombre || 'Labor Desconocida',
                area: cc ? `Cuartel ${cc.nombre}` : 'Desconocido',
                status: rl.cantidad_real >= rl.meta_proyectada ? 'Completado' : 'En Progreso'
            };
        });

        // 2. Obtener Aplicaciones
        const aplicaciones = db.dbRegistroAplicacion.map(ra => {
            const cc = db.dbCentrosCosto.find(c => c.id === ra.centro_costo_id);
            const detalle = db.dbDetalleAplicacion.find(d => d.registro_aplicacion_id === ra.id);
            const producto = detalle ? db.dbProductos.find(p => p.id === detalle.producto_id)?.nombre : 'Aplicación Genérica';

            return {
                id: `A-${ra.id}`,
                date: ra.fecha.split('T')[0], // sacar solo fecha
                task: `Aplicación: ${producto}`,
                area: cc ? `Cuartel ${cc.nombre}` : 'Desconocido',
                status: 'Completado'
            };
        });

        return [...labores, ...aplicaciones].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },

    // Registros de auditoría / monitor de base de datos general
    getLogs: async () => {
        await delay(500);
        // Para la vista DatabaseInteraction vamos a unificar monitoreos
        const monitoreos = db.dbMonitoreoPlaga.map(m => {
            const cc = db.dbCentrosCosto.find(c => c.id === m.centro_costo_id);
            const plaga = db.dbPlagasObjetivo.find(p => p.id === m.plaga_id);
            return {
                id: m.id,
                table: 'Monitoreos',
                field: cc ? `Cuartel ${cc.nombre}` : 'Desconocido',
                date: m.fecha_hora.split('T')[0],
                value: `${plaga?.nombre} (Sev: ${m.severidad}) - ${m.conteo} unid.`
            };
        });

        // Clima (Pluviómetro)
        const climas = db.dbRegistroClima.map(c => {
            const predio = db.dbPredios.find(p => p.id === c.predio_id);
            return {
                id: c.id + 500, // ID artificial para la tabla unificada
                table: 'Clima',
                field: predio ? predio.nombre : 'Desconocido',
                date: c.fecha_hora.split('T')[0],
                value: `${c.mm_agua} mm`
            };
        });

        // Además, incluimos aplicaciones como registros en la BD
        const aplicacionesLogs = db.dbRegistroAplicacion.map(ra => {
            const cc = db.dbCentrosCosto.find(c => c.id === ra.centro_costo_id);
            const detalle = db.dbDetalleAplicacion.find(d => d.registro_aplicacion_id === ra.id);
            const producto = detalle ? db.dbProductos.find(p => p.id === detalle.producto_id)?.nombre : 'Aplicación';

            return {
                id: 2000 + ra.id,
                table: 'Aplicaciones',
                field: cc ? `Cuartel ${cc.nombre}` : 'Desconocido',
                date: ra.fecha.split('T')[0],
                value: producto
            }
        });

        return [...monitoreos, ...climas, ...aplicacionesLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },

    // Añadir registros (Digitadores)
    addRegistroClima: async (climaData: Omit<typeof db.dbRegistroClima[0], 'id'>) => {
        await delay(600);
        const newLog = {
            id: Math.floor(Math.random() * 9000) + 1000,
            ...climaData
        };
        db.dbRegistroClima = [newLog, ...db.dbRegistroClima];
        return newLog;
    },

    addMonitoreoPlaga: async (monitoreoData: Omit<typeof db.dbMonitoreoPlaga[0], 'id'>) => {
        await delay(600);
        const newLog = {
            id: Math.floor(Math.random() * 9000) + 1000,
            ...monitoreoData
        };
        db.dbMonitoreoPlaga = [newLog, ...db.dbMonitoreoPlaga];
        return newLog;
    }
};

// ==========================================
// 1. ESTRUCTURA FÍSICA Y AGRONÓMICA
// ==========================================
export const dbPredios = [
    { id: 1, nombre: 'Huemul' },
    { id: 2, nombre: 'Nanihue' }
];

export const dbUnidadesManejo = [
    { id: 1, predio_id: 1, nombre: 'Sector Blue Ribbon Norte', variedad_id: 1, estado_fenologico_id: 5, anio_plantacion: 2019 },
    { id: 2, predio_id: 2, nombre: 'Sector Nanihue Central', variedad_id: 2, estado_fenologico_id: 3, anio_plantacion: 2020 }
];

export const dbCentrosCosto = [
    { id: 1, unidad_manejo_id: 1, nombre: '1A', superficie_has: 3.5, poligono_json: '{"x": 20, "y": 10, "w": 30, "h": 40, "color": "fill-green-400"}' },
    { id: 2, unidad_manejo_id: 1, nombre: '2A', superficie_has: 4.0, poligono_json: '{"x": 60, "y": 10, "w": 30, "h": 40, "color": "fill-blue-400"}' },
    { id: 3, unidad_manejo_id: 2, nombre: 'C01', superficie_has: 5.5, poligono_json: '{"x": 20, "y": 60, "w": 40, "h": 30, "color": "fill-yellow-400"}' },
    { id: 4, unidad_manejo_id: 2, nombre: 'C02', superficie_has: 6.2, poligono_json: '{"x": 65, "y": 60, "w": 25, "h": 30, "color": "fill-purple-400"}' }
];

// ==========================================
// 2. LOGÍSTICA Y RECURSOS
// ==========================================
export const dbBodegas = [
    { id: 1, nombre: 'Bodega Fitosanitarios' }
];

export const dbProductos = [
    { id: 1, nombre: 'Switch', tipo: 'Fitosanitario', unidad_medida: 'Kg' },
    { id: 2, nombre: 'Salitre', tipo: 'Fertilizante', unidad_medida: 'Kg' }
];

export const dbMaquinarias = [
    { id: 1, nombre: 'Tractor Frutero', costo_hora: 16000 },
    { id: 2, nombre: 'Nebulizadora', costo_hora: 5000 }
];

export const dbInventario = [
    { id: 1, bodega_id: 1, producto_id: 1, cantidad_actual: 200, costo_promedio: 85000 }
];

export const dbTrabajadores = [
    { id: 1, rut: '11.111.111-1', nombre_completo: 'Roberto Jefe', rol: 'Supervisor' },
    { id: 2, rut: '22.222.222-2', nombre_completo: 'Ana Operadora', rol: 'Maquinaria' },
    { id: 3, rut: '33.333.333-3', nombre_completo: 'Carlos Jornal', rol: 'Trabajador' },
    { id: 4, rut: '44.444.444-4', nombre_completo: 'Luisa Monitora', rol: 'Digitador' }
];

// ==========================================
// 3. OPERACIÓN DIARIA (Registros)
// ==========================================
export const dbLabores = [
    { id: 1, nombre: 'Cosecha Manual', unidad_medida: 'Kg', precio_referencia: 550 },
    { id: 2, nombre: 'Poda de Invierno', unidad_medida: 'Plantas', precio_referencia: 80 }
];

// Flujo 1: Mano de Obra
export const dbRegistroLaboral = [
    { id: 1, fecha: '2026-02-27', centro_costo_id: 1, trabajador_id: 3, labor_id: 1, meta_proyectada: 60, cantidad_real: 55, costo_total: 30250 }
];

// Flujo 2: Aplicaciones (Sanidad + Maquinaria)
export const dbRegistroAplicacion = [
    { id: 1, fecha: '2026-02-27T09:00:00', centro_costo_id: 2, trabajador_id: 2, maquinaria_id: 1, horas_maquina: 2.0, estado_clima: 'Húmedo', observaciones: 'Aplicación Switch preventiva Botrytis' }
];

export const dbDetalleAplicacion = [
    { id: 1, registro_aplicacion_id: 1, producto_id: 1, bodega_origen_id: 1, dosis_teorica: 1.0, cantidad_real: 1.2, costo_total: 102000 }
];

// ==========================================
// 4. CATÁLOGOS MAESTROS
// ==========================================
export const dbVariedades = [
    { id: 1, nombre: 'Blue Ribbon', especie: 'Arándano' },
    { id: 2, nombre: 'Duke', especie: 'Arándano' }
];

export const dbEstadosFenologicos = [
    { id: 1, nombre: 'Yema Hinchada', orden: 1 },
    { id: 2, nombre: 'Floración', orden: 2 },
    { id: 3, nombre: 'Cuaja', orden: 3 },
    { id: 4, nombre: 'Pinta', orden: 4 },
    { id: 5, nombre: 'Cosecha', orden: 5 }
];

export const dbPlagasObjetivo = [
    { id: 1, nombre: 'Lobesia Botrana', umbral_critico: 2 },
    { id: 2, nombre: 'Drosophila Suzukii', umbral_critico: 5 }
];

// ==========================================
// 5. OPERACIONES MANUALES (Digitadores en Terreno)
// ==========================================
export const dbRegistroClima = [
    { id: 1, fecha_hora: '2026-02-27T06:00:00', predio_id: 1, digitador_id: 4, mm_agua: 8.0, temperatura_min: 10.0, temperatura_max: 22.0, observaciones: 'Garúa matinal' }
];

export const dbMonitoreoPlaga = [
    { id: 1, fecha_hora: '2026-02-27T11:30:00', centro_costo_id: 1, digitador_id: 4, plaga_id: 2, conteo: 3, severidad: 'BAJO', foto_url: '', comentario: 'Larvas detectadas en fruta sobremadura' }
];

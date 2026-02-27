# Guía de Vistas - Sistema de Control de Gestión Agrícola

Este documento define la estructura inicial y los requerimientos de las vistas para el frontend del proyecto, basado en la visión general y pautas del Product Owner.

## 👥 Roles y Tipos de Usuarios

El sistema contempla tres tipos de usuarios con permisos específicos:

1. **Administradores**
   - Acceso total e irrestricto al sistema.
   - Encargados de la carga de archivos Excel (`.xlsx`) provenientes del sistema *fx360*.
   - Acceso a las configuraciones globales y a la vista de interacción avanzada con la base de datos.
2. **Digitadores**
   - Acceso completamente restringido a una **única página**.
   - Ingresan datos manuales mediante formularios en dos categorías:
     - **Insectos** (monitoreo de presencia/plagas).
     - **Pluviómetro** (mediciones de lluvia/agua).
3. **Invitados**
   - Acceso de solo lectura ("solo ven").
   - Pueden visualizar informes, revisar los mapas y la información de la base de datos sin capacidad de edición ni carga.

---

## 🗺️ Estructura de Vistas (Iniciales)

### 1. Vista de Carga de Archivos (Para Administradores)
- **Propósito:** Actuar como punto de entrada de la información extraída de *fx360*.
- **Elementos clave:**
  - Interfaces específicas para recibir archivos `.xlsx`.
  - Debe haber un espacio o cargador dedicado para *cada cosa* o módulo.
  - El sistema solo recibirá el archivo en esta fase (posteriormente, la lógica de backend extraerá la información relevante de los Excel y alimentará la BD de forma estructurada).

### 2. Vista de Labores de Campo y Aplicaciones
- **Propósito:** Mostrar qué se ha hecho y cuándo en el terreno.
- **Elementos clave:**
  - Registro cronológico o consolidado de las diferentes labores llevadas a cabo.
  - Información sobre las aplicaciones (químicos, fertilizantes, etc.) realizadas en los campos.

### 3. Vista de Mapa de Campo
- **Propósito:** Representación espacial (top-down) interactiva.
- **Elementos clave:**
  - Visualización del terreno "desde arriba".
  - Componente de navegación para cambiar fácilmente de un campo a otro.
  - Interactividad en los **cuarteles** (sectores del campo): estos deben ser presionables para (posiblemente) desplegar información detallada, cruces estadísticos o filtros correspondientes a ese sector específico.

### 4. Vista de Ingreso de Datos (Para Digitadores)
- **Propósito:** Recopilación directa de los trabajadores de terreno.
- **Elementos clave:**
  - Formularios simplificados para acelerar el llenado de datos.
  - Categoría **Pluviómetro**: Registro de las mediciones de precipitación.
  - Categoría **Insectos**: Registro o conteo de inspecciones en terreno.
  - Botón lógico que dispare el guardado directo en la base de datos.

### 5. Interacción con la Base de Datos
- **Propósito:** Consulta y manipulación de los registros consolidados.
- **Elementos clave:**
  - Tablas / DataGrids que permitan al usuario filtrar, ordenar y leer el histórico y la data presente en la base de datos.
  - Capacidad para que los administradores busquen discrepancias o revisen la información en bruto.

### 6. Vista de Configuración
- **Propósito:** Ajustes del entorno del sistema.
- **Elementos clave:**
  - Gestión de roles y usuarios.
  - Ajustes de los módulos de la plataforma u opciones administrativas que deriven del producto.

---
> **Documento Referencial:** La diagramación visual final, colores y experiencia de usuario más específica deberá alinearse al documento `Sistema de Control de Gestión Agrícola.pdf` entregado por el Product Owner.

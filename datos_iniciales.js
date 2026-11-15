// ========================================================
// BASE DE DATOS INICIAL EN JAVASCRIPT (LOCALSTORAGE)
// U.E. Enrique Sánchez de Lozada - Porco
// ========================================================

// Contraseña por defecto para la psicopedagoga (Lic. Vanesa)
const CONTRASEÑA_PSICOPEDAGOGA = "psico2026";

// Muestras iniciales con imágenes ilustrativas SVG atractivas para cada categoría
const SVG_CHAMARRA = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='15' fill='%23e8f5e9'/><path d='M30,25 L45,35 L50,45 L55,35 L70,25 L85,45 L75,55 L70,45 L70,85 L30,85 L30,45 L25,55 L15,45 Z' fill='%231b5e20'/><path d='M47,38 L50,85 L53,85 L50,38 Z' fill='%23ffffff'/><circle cx='50' cy='55' r='2' fill='%23ffb703'/><circle cx='50' cy='65' r='2' fill='%23ffb703'/><text x='50' y='94' font-size='8' text-anchor='middle' fill='%231b5e20' font-family='sans-serif' font-weight='bold'>Chamarra ESL</text></svg>";

const SVG_GUARDAPOLVO = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='15' fill='%23fce4ec'/><path d='M32,22 L45,32 L50,42 L55,32 L68,22 L82,42 L74,50 L68,42 L68,88 L32,88 L32,42 L26,50 L18,42 Z' fill='%23ffffff' stroke='%23f48fb1' stroke-width='2'/><path d='M48,36 L50,88 L52,88 L50,36 Z' fill='%23f06292'/><circle cx='50' cy='50' r='2' fill='%23ec4899'/><circle cx='50' cy='60' r='2' fill='%23ec4899'/><circle cx='50' cy='70' r='2' fill='%23ec4899'/><text x='50' y='95' font-size='8' text-anchor='middle' fill='%23c2185b' font-family='sans-serif' font-weight='bold'>Guardapolvo Blanco</text></svg>";

const SVG_LIBRO = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='15' fill='%23e0f2fe'/><path d='M25,25 C35,22 45,25 50,30 C55,25 65,22 75,25 L75,75 C65,72 55,75 50,80 C45,75 35,72 25,75 Z' fill='%230288d1'/><path d='M28,28 C36,25 44,28 48,32 L48,77 C44,73 36,70 28,73 Z' fill='%23ffffff'/><path d='M72,28 C64,25 56,28 52,32 L52,77 C56,73 64,70 72,73 Z' fill='%23ffffff'/><text x='50' y='94' font-size='8' text-anchor='middle' fill='%230369a1' font-family='sans-serif' font-weight='bold'>Álgebra de Baldor</text></svg>";

const SVG_ZAPATOS = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='15' fill='%23fff3cd'/><path d='M15,60 C25,55 35,50 45,55 C55,45 65,45 75,50 C85,55 88,65 85,72 L18,72 Z' fill='%23212529'/><ellipse cx='50' cy='52' rx='12' ry='4' fill='%23495057'/><text x='50' y='94' font-size='8' text-anchor='middle' fill='%23856404' font-family='sans-serif' font-weight='bold'>Zapatos Negros Talla 37</text></svg>";

const DATOS_DEFAULT_DONACIONES = [
  {
    id: 1,
    nombre: "Chamarra Oficial del Colegio (Talla 14)",
    categoria: "Prendas y Uniformes",
    modalidad: "Donación",
    estadoFisico: "Excelente estado",
    descripcion: "Chamarra institucional verde con franja blanca, limpia y sin roturas. Ideal para 1ro a 3ro de secundaria.",
    donante: "Leydi Keyla Coca",
    curso: "6to 'B' Secundaria",
    anonimo: false,
    foto: SVG_CHAMARRA,
    estadoRevision: "Aprobado",
    fecha: "2026-10-15"
  },
  {
    id: 2,
    nombre: "Guardapolvo Blanco de Práctica (Talla S)",
    categoria: "Prendas y Uniformes",
    modalidad: "Donación",
    estadoFisico: "Buen estado",
    descripcion: "Guardapolvo para talleres técnicos y laboratorio. Tiene todos los botones completos.",
    donante: "Daniela Apaza Cruz",
    curso: "6to 'B' Secundaria",
    anonimo: false,
    foto: SVG_GUARDAPOLVO,
    estadoRevision: "Aprobado",
    fecha: "2026-10-18"
  },
  {
    id: 3,
    nombre: "Texto de Matemáticas y Álgebra de Baldor",
    categoria: "Libros y Textos",
    modalidad: "Préstamo",
    estadoFisico: "Buen estado",
    descripcion: "Libro de álgebra con ejercicios resueltos. Disponible para préstamo bimestral.",
    donante: "Haneth Abigail Tarqui",
    curso: "6to 'B' Secundaria",
    anonimo: false,
    foto: SVG_LIBRO,
    estadoRevision: "Aprobado",
    fecha: "2026-10-20"
  },
  {
    id: 4,
    nombre: "Zapatos Escolares Negros (Talla 37)",
    categoria: "Prendas y Uniformes",
    modalidad: "Donación",
    estadoFisico: "Buen estado",
    descripcion: "Zapatos escolares de cuero negro bien cuidados, listos para usar.",
    donante: "Estudiante Solidario",
    curso: "5to Secundaria",
    anonimo: true,
    foto: SVG_ZAPATOS,
    estadoRevision: "Pendiente",
    fecha: "2026-10-25"
  }
];

const DATOS_DEFAULT_SOLICITUDES = [
  {
    id: 1,
    articulo: "Pantalón de uniforme azul marino talla 16",
    curso: "2do 'A' Secundaria",
    mensaje: "Mi hermanito menor no tiene pantalón de gala para los desfiles y actos cívicos.",
    estudiante: "Marcos Q.",
    telefono: "71239845",
    estado: "En proceso de entrega",
    fecha: "2026-10-24"
  },
  {
    id: 2,
    articulo: "Calculadora Científica",
    curso: "4to 'B' Secundaria",
    mensaje: "La necesito para la materia de Física y Química para las evaluaciones.",
    estudiante: "Yola M.",
    telefono: "69854120",
    estado: "Pendiente",
    fecha: "2026-10-25"
  }
];

// Inicializar LocalStorage si no existe
function inicializarBaseDeDatos() {
  // Asegurar clave de administración
  if (!localStorage.getItem('esl_password_psico')) {
    localStorage.setItem('esl_password_psico', CONTRASEÑA_PSICOPEDAGOGA);
  }

  // Inicializar o actualizar donaciones
  if (!localStorage.getItem('esl_donaciones_v3')) {
    localStorage.setItem('esl_donaciones', JSON.stringify(DATOS_DEFAULT_DONACIONES));
    localStorage.setItem('esl_donaciones_v3', 'true');
  } else if (!localStorage.getItem('esl_donaciones')) {
    localStorage.setItem('esl_donaciones', JSON.stringify(DATOS_DEFAULT_DONACIONES));
  }

  if (!localStorage.getItem('esl_solicitudes')) {
    localStorage.setItem('esl_solicitudes', JSON.stringify(DATOS_DEFAULT_SOLICITUDES));
  }
}

inicializarBaseDeDatos();

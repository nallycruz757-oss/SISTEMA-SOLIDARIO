-- ========================================================
-- BASE DE DATOS: sistema_solidario_esl
-- UNIDAD EDUCATIVA TECNICO HUMANISTICO "ENRIQUE SANCHEZ DE LOZADA"
-- Especialidad: Sistemas Informáticos (BTH) - Gestión 2026
-- Desarrolladoras: Daniela Apaza, Leydi Coca, Haneth Tarqui
-- ========================================================

CREATE DATABASE IF NOT EXISTS sistema_solidario_esl CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE sistema_solidario_esl;

-- 1. TABLA DE USUARIOS / ROLES (Estudiantes y Psicopedagogía con Contraseña)
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(120) NOT NULL,
    curso VARCHAR(50) NULL,
    rol ENUM('Estudiante', 'Psicopedagoga', 'Docente') DEFAULT 'Estudiante',
    password_hash VARCHAR(255) NULL, -- Contraseña segura para Psicopedagogía
    contacto VARCHAR(50),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA DE DONACIONES Y PRENDAS CON FOTOGRAFÍA
CREATE TABLE donaciones (
    id_donacion INT AUTO_INCREMENT PRIMARY KEY,
    nombre_articulo VARCHAR(150) NOT NULL,
    categoria ENUM('Prendas y Uniformes', 'Libros y Textos', 'Útiles Escolares', 'Material Técnico') NOT NULL,
    modalidad ENUM('Donación', 'Intercambio', 'Préstamo') NOT NULL,
    estado_fisico ENUM('Excelente estado', 'Buen estado', 'Aceptable') NOT NULL,
    foto_url MEDIUMTEXT NULL, -- Fotografía de la prenda o material donado
    descripcion TEXT,
    id_donante INT,
    es_anonimo BOOLEAN DEFAULT FALSE,
    estado_revision ENUM('Pendiente', 'Aprobado', 'Entregado', 'Rechazado') DEFAULT 'Pendiente',
    aprobado_por VARCHAR(100) DEFAULT 'Lic. Vanesa (Psicopedagoga)',
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_donante) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

-- 3. TABLA DE SOLICITUDES DE APOYO ESTUDIANTIL
CREATE TABLE solicitudes_ayuda (
    id_solicitud INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT,
    articulo_necesitado VARCHAR(150) NOT NULL,
    motivo TEXT,
    telefono_contacto VARCHAR(50),
    estado_atencion ENUM('Pendiente', 'En proceso de entrega', 'Entregado') DEFAULT 'Pendiente',
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_estudiante) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- DATOS DE PRUEBA INICIALES
-- Contraseña de psicopedagoga: 'psico2026'
INSERT INTO usuarios (nombre_completo, curso, rol, password_hash, contacto) VALUES 
('Lic. Vanesa', 'Gabinete Psicopedagógico', 'Psicopedagoga', SHA2('psico2026', 256), '70000000'),
('Daniela Apaza Cruz', '6to B Secundaria', 'Estudiante', NULL, '71112233'),
('Leydi Keyla Coca Camata', '6to B Secundaria', 'Estudiante', NULL, '72223344'),
('Haneth Abigail Tarqui Mamani', '6to B Secundaria', 'Estudiante', NULL, '73334455');

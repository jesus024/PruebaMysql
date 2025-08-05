-- Script SQL para Biblioteca Comunitaria "Lecturas Libres"
-- Crear base de datos
CREATE DATABASE IF NOT EXISTS biblioteca_comunitaria;
USE biblioteca_comunitaria;

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    identificacion VARCHAR(20) UNIQUE NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Libros
CREATE TABLE libros (
    isbn VARCHAR(20) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    año_publicacion INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Préstamos
CREATE TABLE prestamos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE NOT NULL,
    estado ENUM('activo', 'entregado', 'retrasado') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (isbn) REFERENCES libros(isbn) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_isbn (isbn),
    INDEX idx_estado (estado),
    INDEX idx_fecha_prestamo (fecha_prestamo)
);

-- Insertar datos de usuarios
INSERT INTO usuarios (nombre, identificacion, correo, telefono) VALUES
('Mtro. Jacinto Granados', '89359014', 'equinones@hotmail.com', '369.107.1573'),
('Josefina Madrid Aponte', '87040564', 'villamayte@corral-mercado.org', '04758291663'),
('Jacobo Wendolin Perea Barrera', '87040564', '(907)581-6502x9428', '369.107.1573'),
('Dr. Mariana Valencia', '89359014', 'equinones@hotmail.com', '04758291663'),
('Sr(a). Gabriela Leal', '87040564', 'villamayte@corral-mercado.org', '(907)581-6502x9428'),
('Amelia Cano Bañuelos', '89359014', 'equinones@hotmail.com', '369.107.1573'),
('Dr. Mariana Valencia', '87040564', 'villamayte@corral-mercado.org', '04758291663'),
('Mtro. Jacinto Granados', '89359014', 'equinones@hotmail.com', '(907)581-6502x9428'),
('Josefina Madrid Aponte', '87040564', 'villamayte@corral-mercado.org', '369.107.1573'),
('Jacobo Wendolin Perea Barrera', '87040564', 'equinones@hotmail.com', '04758291663');

-- Insertar datos de libros
INSERT INTO libros (isbn, titulo, autor, año_publicacion) VALUES
('978-0-13-079650-9', 'Ad quo perspiciatis veritatis', 'Ursula Juan Carlos Méndez', 2018),
('978-0-609-15622-3', 'Nemo pariatur', 'Sr(a). Gabriela Leal', 2016),
('978-0-13-079650-9', 'Animi et facilis dolorem', 'Amelia Cano Bañuelos', 2008),
('978-0-609-15622-3', 'Ad quo perspiciatis veritatis', 'Ursula Juan Carlos Méndez', 2018),
('978-0-13-079650-9', 'Nemo pariatur', 'Sr(a). Gabriela Leal', 2016),
('978-0-609-15622-3', 'Animi et facilis dolorem', 'Amelia Cano Bañuelos', 2008),
('978-0-13-079650-9', 'Ad quo perspiciatis veritatis', 'Ursula Juan Carlos Méndez', 2018),
('978-0-609-15622-3', 'Nemo pariatur', 'Sr(a). Gabriela Leal', 2016),
('978-0-13-079650-9', 'Animi et facilis dolorem', 'Amelia Cano Bañuelos', 2008),
('978-0-609-15622-3', 'Ad quo perspiciatis veritatis', 'Ursula Juan Carlos Méndez', 2018);

-- Insertar datos de préstamos
INSERT INTO prestamos (usuario_id, isbn, fecha_prestamo, fecha_devolucion, estado) VALUES
(1, '978-0-13-079650-9', '2025-07-26', '2025-08-10', 'entregado'),
(2, '978-0-609-15622-3', '2025-06-28', '2025-07-29', 'retrasado'),
(3, '978-0-13-079650-9', '2025-07-15', '2025-08-15', 'activo'),
(4, '978-0-609-15622-3', '2025-06-20', '2025-07-20', 'entregado'),
(5, '978-0-13-079650-9', '2025-07-10', '2025-08-10', 'activo'),
(6, '978-0-609-15622-3', '2025-06-15', '2025-07-15', 'retrasado'),
(7, '978-0-13-079650-9', '2025-07-05', '2025-08-05', 'activo'),
(8, '978-0-609-15622-3', '2025-06-10', '2025-07-10', 'entregado'),
(9, '978-0-13-079650-9', '2025-07-01', '2025-08-01', 'activo'),
(10, '978-0-609-15622-3', '2025-06-05', '2025-07-05', 'retrasado'); 
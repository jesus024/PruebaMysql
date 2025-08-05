-- Script para insertar solo libros y préstamos
USE biblioteca_comunitaria;

-- Insertar datos de libros
INSERT INTO libros (isbn, titulo, autor, año_publicacion) VALUES
('978-0-13-079650-9', 'Ad quo perspiciatis veritatis', 'Ursula Juan Carlos Méndez', 2018),
('978-0-609-15622-3', 'Nemo pariatur', 'Sr(a). Gabriela Leal', 2016),
('978-0-13-079650-8', 'Animi et facilis dolorem', 'Amelia Cano Bañuelos', 2008),
('978-0-609-15622-4', 'Ad quo perspiciatis veritatis', 'Ursula Juan Carlos Méndez', 2018),
('978-0-13-079650-7', 'Nemo pariatur', 'Sr(a). Gabriela Leal', 2016),
('978-0-609-15622-5', 'Animi et facilis dolorem', 'Amelia Cano Bañuelos', 2008),
('978-0-13-079650-6', 'Ad quo perspiciatis veritatis', 'Ursula Juan Carlos Méndez', 2018),
('978-0-609-15622-6', 'Nemo pariatur', 'Sr(a). Gabriela Leal', 2016),
('978-0-13-079650-5', 'Animi et facilis dolorem', 'Amelia Cano Bañuelos', 2008),
('978-0-609-15622-7', 'Ad quo perspiciatis veritatis', 'Ursula Juan Carlos Méndez', 2018);

-- Insertar datos de préstamos (usando los IDs reales de usuarios)
INSERT INTO prestamos (usuario_id, isbn, fecha_prestamo, fecha_devolucion, estado) VALUES
(21, '978-0-13-079650-9', '2025-07-26', '2025-08-10', 'entregado'),
(22, '978-0-609-15622-3', '2025-06-28', '2025-07-29', 'retrasado'),
(23, '978-0-13-079650-8', '2025-07-15', '2025-08-15', 'activo'),
(24, '978-0-609-15622-4', '2025-06-20', '2025-07-20', 'entregado'),
(25, '978-0-13-079650-7', '2025-07-10', '2025-08-10', 'activo'),
(26, '978-0-609-15622-5', '2025-06-15', '2025-07-15', 'retrasado'),
(27, '978-0-13-079650-6', '2025-07-05', '2025-08-05', 'activo'),
(28, '978-0-609-15622-6', '2025-06-10', '2025-07-10', 'entregado'),
(29, '978-0-13-079650-5', '2025-07-01', '2025-08-01', 'activo'),
(30, '978-0-609-15622-7', '2025-06-05', '2025-07-05', 'retrasado'); 
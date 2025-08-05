const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// GET /prestamos - Listar todos los préstamos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        p.id,
        p.fecha_prestamo,
        p.fecha_devolucion,
        p.estado,
        u.nombre as usuario_nombre,
        u.identificacion as usuario_identificacion,
        l.titulo as libro_titulo,
        l.isbn,
        l.autor
      FROM prestamos p
      JOIN usuarios u ON p.usuario_id = u.id
      JOIN libros l ON p.isbn = l.isbn
      ORDER BY p.fecha_prestamo DESC
    `);
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error al obtener préstamos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// GET /prestamos/:id - Obtener préstamo por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(`
      SELECT 
        p.id,
        p.fecha_prestamo,
        p.fecha_devolucion,
        p.estado,
        u.nombre as usuario_nombre,
        u.identificacion as usuario_identificacion,
        u.correo as usuario_correo,
        u.telefono as usuario_telefono,
        l.titulo as libro_titulo,
        l.isbn,
        l.autor,
        l.año_publicacion
      FROM prestamos p
      JOIN usuarios u ON p.usuario_id = u.id
      JOIN libros l ON p.isbn = l.isbn
      WHERE p.id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Préstamo no encontrado'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener préstamo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// POST /prestamos - Crear nuevo préstamo
router.post('/', async (req, res) => {
  try {
    const { usuario_id, isbn, fecha_prestamo, fecha_devolucion, estado = 'activo' } = req.body;

    // Validaciones
    if (!usuario_id || !isbn || !fecha_prestamo || !fecha_devolucion) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    // Verificar que el usuario existe
    const [usuario] = await pool.execute('SELECT id FROM usuarios WHERE id = ?', [usuario_id]);
    if (usuario.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Verificar que el libro existe
    const [libro] = await pool.execute('SELECT isbn FROM libros WHERE isbn = ?', [isbn]);
    if (libro.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Libro no encontrado'
      });
    }

    const [result] = await pool.execute(`
      INSERT INTO prestamos (usuario_id, isbn, fecha_prestamo, fecha_devolucion, estado)
      VALUES (?, ?, ?, ?, ?)
    `, [usuario_id, isbn, fecha_prestamo, fecha_devolucion, estado]);

    res.status(201).json({
      success: true,
      message: 'Préstamo creado exitosamente',
      data: {
        id: result.insertId,
        usuario_id,
        isbn,
        fecha_prestamo,
        fecha_devolucion,
        estado
      }
    });
  } catch (error) {
    console.error('Error al crear préstamo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// PUT /prestamos/:id - Editar un préstamo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_devolucion, estado } = req.body;

    // Verificar que el préstamo existe
    const [prestamo] = await pool.execute('SELECT id FROM prestamos WHERE id = ?', [id]);
    if (prestamo.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Préstamo no encontrado'
      });
    }

    const [result] = await pool.execute(`
      UPDATE prestamos 
      SET fecha_devolucion = ?, estado = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [fecha_devolucion, estado, id]);

    res.json({
      success: true,
      message: 'Préstamo actualizado exitosamente',
      data: {
        id,
        fecha_devolucion,
        estado
      }
    });
  } catch (error) {
    console.error('Error al actualizar préstamo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// DELETE /prestamos/:id - Eliminar un préstamo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el préstamo existe
    const [prestamo] = await pool.execute('SELECT id FROM prestamos WHERE id = ?', [id]);
    if (prestamo.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Préstamo no encontrado'
      });
    }

    await pool.execute('DELETE FROM prestamos WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Préstamo eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar préstamo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// GET /prestamos/usuario/:id - Ver todos los préstamos de un usuario
router.get('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [rows] = await pool.execute(`
      SELECT 
        p.id,
        p.fecha_prestamo,
        p.fecha_devolucion,
        p.estado,
        l.titulo as libro_titulo,
        l.isbn,
        l.autor
      FROM prestamos p
      JOIN libros l ON p.isbn = l.isbn
      WHERE p.usuario_id = ?
      ORDER BY p.fecha_prestamo DESC
    `, [id]);

    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error al obtener préstamos del usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// GET /prestamos/activos - Listar préstamos que aún están activos
router.get('/activos', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        p.id,
        p.fecha_prestamo,
        p.fecha_devolucion,
        p.estado,
        u.nombre as usuario_nombre,
        u.identificacion as usuario_identificacion,
        l.titulo as libro_titulo,
        l.isbn,
        l.autor
      FROM prestamos p
      JOIN usuarios u ON p.usuario_id = u.id
      JOIN libros l ON p.isbn = l.isbn
      WHERE p.estado = 'activo'
      ORDER BY p.fecha_devolucion ASC
    `);

    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error al obtener préstamos activos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// GET /prestamos/historial/:isbn - Ver historial de un libro por su ISBN
router.get('/historial/:isbn', async (req, res) => {
  try {
    const { isbn } = req.params;
    
    const [rows] = await pool.execute(`
      SELECT 
        p.id,
        p.fecha_prestamo,
        p.fecha_devolucion,
        p.estado,
        u.nombre as usuario_nombre,
        u.identificacion as usuario_identificacion,
        l.titulo as libro_titulo,
        l.autor
      FROM prestamos p
      JOIN usuarios u ON p.usuario_id = u.id
      JOIN libros l ON p.isbn = l.isbn
      WHERE p.isbn = ?
      ORDER BY p.fecha_prestamo DESC
    `, [isbn]);

    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error al obtener historial del libro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// GET /libros/mas-prestados - Listar los 5 libros más prestados
router.get('/mas-prestados', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        l.isbn,
        l.titulo,
        l.autor,
        l.año_publicacion,
        COUNT(p.id) as total_prestamos
      FROM libros l
      LEFT JOIN prestamos p ON l.isbn = p.isbn
      GROUP BY l.isbn, l.titulo, l.autor, l.año_publicacion
      ORDER BY total_prestamos DESC
      LIMIT 5
    `);

    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error al obtener libros más prestados:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

module.exports = router; 
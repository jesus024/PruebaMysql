const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// GET /usuarios - Listar todos los usuarios
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM usuarios ORDER BY id');
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// GET /usuarios/:id - Obtener usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// GET /usuarios/con-retrasos - Listar usuarios que tienen préstamos en estado "retrasado"
router.get('/con-retrasos', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT DISTINCT
        u.id,
        u.nombre,
        u.identificacion,
        u.correo,
        u.telefono,
        COUNT(p.id) as total_prestamos_retrasados
      FROM usuarios u
      JOIN prestamos p ON u.id = p.usuario_id
      WHERE p.estado = 'retrasado'
      GROUP BY u.id, u.nombre, u.identificacion, u.correo, u.telefono
      ORDER BY total_prestamos_retrasados DESC
    `);

    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error al obtener usuarios con retrasos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

module.exports = router; 
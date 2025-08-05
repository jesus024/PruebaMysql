const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { testConnection } = require('./config/database');

// Importar rutas
const prestamosRoutes = require('./routes/prestamos');
const librosRoutes = require('./routes/libros');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana
  message: {
    success: false,
    message: 'Demasiadas solicitudes, intente más tarde'
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/prestamos', prestamosRoutes);
app.use('/libros', librosRoutes);
app.use('/usuarios', usuariosRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Biblioteca Comunitaria "Lecturas Libres"',
    version: '1.0.0',
    endpoints: {
      prestamos: {
        'GET /prestamos': 'Listar todos los préstamos',
        'GET /prestamos/:id': 'Obtener préstamo por ID',
        'POST /prestamos': 'Crear nuevo préstamo',
        'PUT /prestamos/:id': 'Editar un préstamo',
        'DELETE /prestamos/:id': 'Eliminar un préstamo',
        'GET /prestamos/usuario/:id': 'Préstamos de un usuario',
        'GET /prestamos/activos': 'Préstamos activos',
        'GET /prestamos/historial/:isbn': 'Historial de un libro'
      },
      libros: {
        'GET /libros/mas-prestados': 'Top 5 libros más prestados'
      },
      usuarios: {
        'GET /usuarios/con-retrasos': 'Usuarios con retrasos'
      }
    }
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno'
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Iniciar servidor
async function startServer() {
  try {
    // Probar conexión a la base de datos
    await testConnection();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor iniciado en puerto ${PORT}`);
      console.log(`📚 API Biblioteca Comunitaria "Lecturas Libres"`);
      console.log(`🌐 http://localhost:${PORT}`);
      console.log(`📖 Documentación: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer(); 
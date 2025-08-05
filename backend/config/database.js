const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'biblioteca_comunitaria',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Configuración adicional para autenticación
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from([0])
  }
};

const pool = mysql.createPool(dbConfig);

// Función para probar la conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a la base de datos establecida correctamente');
    connection.release();
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    console.log('💡 Intenta configurar la contraseña correcta en backend/.env');
    console.log('💡 O ejecuta: mysql -u root -p para verificar tu contraseña');
    process.exit(1);
  }
}

module.exports = {
  pool,
  testConnection
}; 
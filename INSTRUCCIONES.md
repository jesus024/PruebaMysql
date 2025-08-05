# Instrucciones de Instalación y Uso - Biblioteca Comunitaria "Lecturas Libres"

## 📋 Requisitos Previos

- **Node.js** (versión 14 o superior)
- **MySQL** (versión 5.7 o superior)
- **Git** (opcional, para clonar el repositorio)

## 🚀 Instalación Rápida

### Opción 1: Script Automático
```bash
chmod +x install.sh
./install.sh
```

### Opción 2: Instalación Manual

#### 1. Instalar dependencias del backend
```bash
cd backend
npm install
cd ..
```

#### 2. Configurar base de datos
```bash
# Copiar archivo de configuración
cp backend/env.example backend/.env

# Editar configuración de base de datos
nano backend/.env
```

#### 3. Crear base de datos
```bash
mysql -u root -p < database/schema.sql
```

## ⚙️ Configuración

### 1. Variables de Entorno
Edita el archivo `backend/.env` con tus credenciales de MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=biblioteca_comunitaria
DB_PORT=3306
PORT=3000
NODE_ENV=development
```

### 2. Base de Datos
Ejecuta el script SQL para crear la base de datos y las tablas:

```bash
mysql -u root -p < database/schema.sql
```

## 🏃‍♂️ Ejecutar el Sistema

### 1. Iniciar el Backend
```bash
cd backend
npm start
```

El servidor se iniciará en `http://localhost:3000`

### 2. Abrir el Frontend
Abre el archivo `frontend/index.html` en tu navegador web.

## 🧪 Probar la API

### Opción 1: Script de Pruebas
```bash
node test_api.js
```

### Opción 2: Postman
1. Importa la colección `docs/Postman_Collection.json` en Postman
2. Configura la variable `base_url` como `http://localhost:3000`
3. Ejecuta las pruebas

### Opción 3: cURL
```bash
# Obtener todos los préstamos
curl http://localhost:3000/prestamos

# Crear un nuevo préstamo
curl -X POST http://localhost:3000/prestamos \
  -H "Content-Type: application/json" \
  -d '{
    "usuario_id": 1,
    "isbn": "978-0-13-079650-9",
    "fecha_prestamo": "2025-01-15",
    "fecha_devolucion": "2025-02-15",
    "estado": "activo"
  }'
```

## 📚 Endpoints Disponibles

### CRUD de Préstamos
- `GET /prestamos` - Listar todos los préstamos
- `GET /prestamos/:id` - Obtener préstamo por ID
- `POST /prestamos` - Crear nuevo préstamo
- `PUT /prestamos/:id` - Editar un préstamo
- `DELETE /prestamos/:id` - Eliminar un préstamo

### Endpoints Especiales
- `GET /prestamos/usuario/:id` - Préstamos de un usuario
- `GET /prestamos/activos` - Préstamos activos
- `GET /prestamos/historial/:isbn` - Historial de un libro
- `GET /libros/mas-prestados` - Top 5 libros más prestados
- `GET /usuarios/con-retrasos` - Usuarios con retrasos

## 🎯 Características del Sistema

### ✅ Normalización de Datos
- **Usuarios**: Información personal y de contacto
- **Libros**: Metadatos de libros con ISBN único
- **Préstamos**: Transacciones con referencias a usuarios y libros

### ✅ Base de Datos
- Integridad referencial con claves foráneas
- Índices optimizados para consultas frecuentes
- Restricciones de datos y validaciones

### ✅ API REST
- Endpoints completos para CRUD
- Consultas especiales para análisis
- Manejo de errores y validaciones
- Rate limiting para seguridad

### ✅ Frontend
- Interfaz moderna con Bootstrap
- Funcionalidades completas de gestión
- Estadísticas en tiempo real
- Diseño responsivo

## 🔧 Solución de Problemas

### Error de conexión a la base de datos
1. Verifica que MySQL esté ejecutándose
2. Confirma las credenciales en `backend/.env`
3. Asegúrate de que la base de datos existe

### Error de puerto en uso
```bash
# Cambia el puerto en backend/.env
PORT=3001
```

### Error de dependencias
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

## 📁 Estructura del Proyecto

```
PruebaMysql/
├── data/
│   └── csv/                    # Datos normalizados
├── database/
│   └── schema.sql             # Script de base de datos
├── backend/
│   ├── config/                # Configuración
│   ├── routes/                # Rutas de la API
│   ├── models/                # Modelos de datos
│   └── server.js              # Servidor principal
├── frontend/
│   ├── index.html             # Página principal
│   ├── styles.css             # Estilos
│   └── script.js              # JavaScript
├── docs/
│   ├── API_DOCUMENTATION.md   # Documentación de la API
│   ├── Postman_Collection.json # Colección de Postman
│   └── diagrama_er.md         # Diagrama entidad-relación
└── README.md                  # Documentación principal
```

## 🎉 ¡Listo!

El sistema de Biblioteca Comunitaria "Lecturas Libres" está completamente funcional con:

- ✅ Normalización de datos completa
- ✅ Base de datos MySQL optimizada
- ✅ API REST con todos los endpoints requeridos
- ✅ Frontend moderno y funcional
- ✅ Documentación completa
- ✅ Pruebas automatizadas

¡Disfruta gestionando tu biblioteca de manera eficiente! 
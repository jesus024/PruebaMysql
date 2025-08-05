# Biblioteca Comunitaria "Lecturas Libres"

Sistema completo de gestión de préstamos de biblioteca con normalización de datos, base de datos SQL y API REST.

## Estructura del Proyecto

```
PruebaMysql/
├── data/
│   ├── prestamos_biblioteca_original.xlsx
│   └── csv/
│       ├── usuarios.csv
│       ├── libros.csv
│       └── prestamos.csv
├── database/
│   └── schema.sql
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   │   └── prestamos.js
│   └── models/
│       └── prestamo.js
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── docs/
    └── diagrama_er.png
```

## Características

- **Normalización de datos**: Modelo relacional optimizado
- **Base de datos MySQL**: Con integridad referencial
- **API REST**: Endpoints completos para gestión de préstamos
- **Frontend**: Interfaz web moderna con Bootstrap
- **Endpoints especiales**: Consultas avanzadas para análisis

## Instalación y Uso

### Requisitos
- Node.js
- MySQL
- Python (para procesamiento de datos)

### Configuración
1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Configurar base de datos MySQL
4. Ejecutar script de base de datos
5. Iniciar servidor: `npm start`

## Endpoints de la API

### CRUD Básico
- `GET /prestamos` - Listar todos los préstamos
- `GET /prestamos/:id` - Obtener préstamo por ID
- `POST /prestamos` - Crear nuevo préstamo
- `PUT /prestamos/:id` - Editar préstamo
- `DELETE /prestamos/:id` - Eliminar préstamo

### Endpoints Especiales
- `GET /prestamos/usuario/:id` - Préstamos de un usuario
- `GET /libros/mas-prestados` - Top 5 libros más prestados
- `GET /usuarios/con-retrasos` - Usuarios con retrasos
- `GET /prestamos/activos` - Préstamos activos
- `GET /prestamos/historial/:isbn` - Historial por ISBN 
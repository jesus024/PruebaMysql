# 🚀 Instrucciones Rápidas - Biblioteca Comunitaria

## ⚡ Inicio Rápido

### Opción 1: Script Automático (Recomendado)
```bash
./iniciar_sistema.sh
```

### Opción 2: Configuración Manual

#### 1. Configurar MySQL
```bash
./configurar_mysql.sh
```

#### 2. Iniciar Servidor
```bash
cd backend
npm start
```

#### 3. Abrir Frontend
```bash
cd frontend
python3 -m http.server 8000
# Luego abre: http://localhost:8000
```

## 🔧 Solución de Problemas

### Error de contraseña MySQL
```bash
# Opción A: Usar sudo
sudo mysql -e "CREATE USER 'biblioteca'@'localhost' IDENTIFIED BY ''; GRANT ALL PRIVILEGES ON biblioteca_comunitaria.* TO 'biblioteca'@'localhost';"

# Opción B: Configurar contraseña
./configurar_mysql.sh
```

### Error de puerto en uso
```bash
# Cambiar puerto en backend/.env
PORT=3001
```

### Error de dependencias
```bash
cd backend
npm install
```

## 📚 Endpoints de la API

- `GET /prestamos` - Listar préstamos
- `POST /prestamos` - Crear préstamo
- `GET /prestamos/activos` - Préstamos activos
- `GET /libros/mas-prestados` - Libros más prestados
- `GET /usuarios/con-retrasos` - Usuarios con retrasos

## 🧪 Probar la API

```bash
# Probar servidor
curl http://localhost:3000

# Probar préstamos
curl http://localhost:3000/prestamos

# Ejecutar pruebas completas
node test_api.js
```

## 📁 Estructura del Proyecto

```
PruebaMysql/
├── backend/          # API REST
├── frontend/         # Interfaz web
├── database/         # Scripts SQL
├── data/            # Datos CSV
├── docs/            # Documentación
└── scripts/         # Scripts de instalación
```

## 🎯 ¡Listo!

El sistema está completamente funcional con:
- ✅ Normalización de datos
- ✅ Base de datos MySQL
- ✅ API REST completa
- ✅ Frontend moderno
- ✅ Documentación completa 
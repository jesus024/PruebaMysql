# Documentación de la API - Biblioteca Comunitaria "Lecturas Libres"

## Información General

- **Base URL**: `http://localhost:3000`
- **Versión**: 1.0.0
- **Formato de respuesta**: JSON

## Endpoints

### Préstamos

#### GET /prestamos
Lista todos los préstamos con información completa.

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "fecha_prestamo": "2025-07-26",
      "fecha_devolucion": "2025-08-10",
      "estado": "entregado",
      "usuario_nombre": "Mtro. Jacinto Granados",
      "usuario_identificacion": "89359014",
      "libro_titulo": "Ad quo perspiciatis veritatis",
      "isbn": "978-0-13-079650-9",
      "autor": "Ursula Juan Carlos Méndez"
    }
  ],
  "count": 10
}
```

#### GET /prestamos/:id
Obtiene un préstamo específico por ID.

**Parámetros:**
- `id` (number): ID del préstamo

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "fecha_prestamo": "2025-07-26",
    "fecha_devolucion": "2025-08-10",
    "estado": "entregado",
    "usuario_nombre": "Mtro. Jacinto Granados",
    "usuario_identificacion": "89359014",
    "usuario_correo": "equinones@hotmail.com",
    "usuario_telefono": "369.107.1573",
    "libro_titulo": "Ad quo perspiciatis veritatis",
    "isbn": "978-0-13-079650-9",
    "autor": "Ursula Juan Carlos Méndez",
    "año_publicacion": 2018
  }
}
```

#### POST /prestamos
Crea un nuevo préstamo.

**Body:**
```json
{
  "usuario_id": 1,
  "isbn": "978-0-13-079650-9",
  "fecha_prestamo": "2025-01-15",
  "fecha_devolucion": "2025-02-15",
  "estado": "activo"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Préstamo creado exitosamente",
  "data": {
    "id": 11,
    "usuario_id": 1,
    "isbn": "978-0-13-079650-9",
    "fecha_prestamo": "2025-01-15",
    "fecha_devolucion": "2025-02-15",
    "estado": "activo"
  }
}
```

#### PUT /prestamos/:id
Actualiza un préstamo existente.

**Parámetros:**
- `id` (number): ID del préstamo

**Body:**
```json
{
  "fecha_devolucion": "2025-02-20",
  "estado": "entregado"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Préstamo actualizado exitosamente",
  "data": {
    "id": 1,
    "fecha_devolucion": "2025-02-20",
    "estado": "entregado"
  }
}
```

#### DELETE /prestamos/:id
Elimina un préstamo.

**Parámetros:**
- `id` (number): ID del préstamo

**Respuesta:**
```json
{
  "success": true,
  "message": "Préstamo eliminado exitosamente"
}
```

### Endpoints Especiales

#### GET /prestamos/usuario/:id
Lista todos los préstamos de un usuario específico.

**Parámetros:**
- `id` (number): ID del usuario

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "fecha_prestamo": "2025-07-26",
      "fecha_devolucion": "2025-08-10",
      "estado": "entregado",
      "libro_titulo": "Ad quo perspiciatis veritatis",
      "isbn": "978-0-13-079650-9",
      "autor": "Ursula Juan Carlos Méndez"
    }
  ],
  "count": 3
}
```

#### GET /prestamos/activos
Lista todos los préstamos que están activos.

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "fecha_prestamo": "2025-07-15",
      "fecha_devolucion": "2025-08-15",
      "estado": "activo",
      "usuario_nombre": "Jacobo Wendolin Perea Barrera",
      "usuario_identificacion": "87040564",
      "libro_titulo": "Ad quo perspiciatis veritatis",
      "isbn": "978-0-13-079650-9",
      "autor": "Ursula Juan Carlos Méndez"
    }
  ],
  "count": 4
}
```

#### GET /prestamos/historial/:isbn
Muestra el historial completo de préstamos de un libro específico.

**Parámetros:**
- `isbn` (string): ISBN del libro

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "fecha_prestamo": "2025-07-26",
      "fecha_devolucion": "2025-08-10",
      "estado": "entregado",
      "usuario_nombre": "Mtro. Jacinto Granados",
      "usuario_identificacion": "89359014",
      "libro_titulo": "Ad quo perspiciatis veritatis",
      "autor": "Ursula Juan Carlos Méndez"
    }
  ],
  "count": 5
}
```

### Libros

#### GET /libros/mas-prestados
Lista los 5 libros más prestados.

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "isbn": "978-0-13-079650-9",
      "titulo": "Ad quo perspiciatis veritatis",
      "autor": "Ursula Juan Carlos Méndez",
      "año_publicacion": 2018,
      "total_prestamos": 5
    }
  ],
  "count": 5
}
```

### Usuarios

#### GET /usuarios/con-retrasos
Lista usuarios que tienen préstamos en estado "retrasado".

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "nombre": "Josefina Madrid Aponte",
      "identificacion": "87040564",
      "correo": "villamayte@corral-mercado.org",
      "telefono": "04758291663",
      "total_prestamos_retrasados": 2
    }
  ],
  "count": 3
}
```

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 400 | Bad Request - Datos de entrada inválidos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error interno del servidor |

## Ejemplos de Uso

### Crear un nuevo préstamo
```bash
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

### Obtener préstamos activos
```bash
curl http://localhost:3000/prestamos/activos
```

### Actualizar estado de préstamo
```bash
curl -X PUT http://localhost:3000/prestamos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "entregado"
  }'
```

## Notas Importantes

1. Todas las fechas deben estar en formato ISO (YYYY-MM-DD)
2. Los estados válidos son: "activo", "entregado", "retrasado"
3. La API incluye rate limiting (100 requests por 15 minutos)
4. Todas las respuestas incluyen un campo `success` para indicar el estado de la operación 
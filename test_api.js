#!/usr/bin/env node

const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:3000';

// Colores para la consola
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();

        if (response.ok) {
            log(`✅ ${method} ${endpoint} - ${response.status}`, 'green');
            return data;
        } else {
            log(`❌ ${method} ${endpoint} - ${response.status}: ${data.message}`, 'red');
            return null;
        }
    } catch (error) {
        log(`❌ Error en ${method} ${endpoint}: ${error.message}`, 'red');
        return null;
    }
}

async function runTests() {
    log('🧪 Iniciando pruebas de la API de Biblioteca Comunitaria', 'blue');
    log('==================================================', 'blue');

    // Test 1: Verificar que el servidor está funcionando
    log('\n📋 Test 1: Verificar servidor', 'yellow');
    const rootResponse = await testEndpoint('/');
    if (!rootResponse) {
        log('❌ El servidor no está funcionando. Asegúrese de que esté ejecutándose en http://localhost:3000', 'red');
        return;
    }

    // Test 2: Obtener todos los préstamos
    log('\n📋 Test 2: Obtener todos los préstamos', 'yellow');
    const prestamos = await testEndpoint('/prestamos');
    if (prestamos && prestamos.data) {
        log(`✅ Se encontraron ${prestamos.count} préstamos`, 'green');
    }

    // Test 3: Obtener un préstamo específico
    log('\n📋 Test 3: Obtener préstamo por ID', 'yellow');
    const prestamo = await testEndpoint('/prestamos/1');
    if (prestamo && prestamo.data) {
        log(`✅ Préstamo encontrado: ${prestamo.data.libro_titulo}`, 'green');
    }

    // Test 4: Obtener préstamos activos
    log('\n📋 Test 4: Obtener préstamos activos', 'yellow');
    const prestamosActivos = await testEndpoint('/prestamos/activos');
    if (prestamosActivos && prestamosActivos.data) {
        log(`✅ Se encontraron ${prestamosActivos.count} préstamos activos`, 'green');
    }

    // Test 5: Obtener libros más prestados
    log('\n📋 Test 5: Obtener libros más prestados', 'yellow');
    const librosMasPrestados = await testEndpoint('/libros/mas-prestados');
    if (librosMasPrestados && librosMasPrestados.data) {
        log(`✅ Se encontraron ${librosMasPrestados.count} libros más prestados`, 'green');
    }

    // Test 6: Obtener usuarios con retrasos
    log('\n📋 Test 6: Obtener usuarios con retrasos', 'yellow');
    const usuariosConRetrasos = await testEndpoint('/usuarios/con-retrasos');
    if (usuariosConRetrasos && usuariosConRetrasos.data) {
        log(`✅ Se encontraron ${usuariosConRetrasos.count} usuarios con retrasos`, 'green');
    }

    // Test 7: Obtener historial de un libro
    log('\n📋 Test 7: Obtener historial de un libro', 'yellow');
    const historial = await testEndpoint('/prestamos/historial/978-0-13-079650-9');
    if (historial && historial.data) {
        log(`✅ Se encontraron ${historial.count} registros en el historial`, 'green');
    }

    // Test 8: Crear un nuevo préstamo
    log('\n📋 Test 8: Crear nuevo préstamo', 'yellow');
    const nuevoPrestamo = await testEndpoint('/prestamos', 'POST', {
        usuario_id: 1,
        isbn: '978-0-13-079650-9',
        fecha_prestamo: '2025-01-15',
        fecha_devolucion: '2025-02-15',
        estado: 'activo'
    });
    if (nuevoPrestamo && nuevoPrestamo.success) {
        log(`✅ Préstamo creado con ID: ${nuevoPrestamo.data.id}`, 'green');
        
        // Test 9: Actualizar el préstamo creado
        log('\n📋 Test 9: Actualizar préstamo', 'yellow');
        const prestamoActualizado = await testEndpoint(`/prestamos/${nuevoPrestamo.data.id}`, 'PUT', {
            estado: 'entregado'
        });
        if (prestamoActualizado && prestamoActualizado.success) {
            log('✅ Préstamo actualizado correctamente', 'green');
        }

        // Test 10: Eliminar el préstamo creado
        log('\n📋 Test 10: Eliminar préstamo', 'yellow');
        const prestamoEliminado = await testEndpoint(`/prestamos/${nuevoPrestamo.data.id}`, 'DELETE');
        if (prestamoEliminado && prestamoEliminado.success) {
            log('✅ Préstamo eliminado correctamente', 'green');
        }
    }

    log('\n🎉 ¡Todas las pruebas completadas!', 'green');
    log('📚 La API de Biblioteca Comunitaria está funcionando correctamente.', 'blue');
}

// Ejecutar pruebas
runTests().catch(error => {
    log(`❌ Error en las pruebas: ${error.message}`, 'red');
    process.exit(1);
}); 
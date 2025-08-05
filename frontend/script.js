// Configuración de la API
const API_BASE_URL = 'http://localhost:3000';

// Variables globales
let prestamosActuales = [];
let prestamoEditando = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    cargarPrestamos();
    cargarEstadisticas();
    cargarUsuarios();
    cargarLibros();
});

// Función para hacer peticiones a la API
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Error en la petición');
        }

        return data;
    } catch (error) {
        console.error('Error en API:', error);
        mostrarAlerta('Error: ' + error.message, 'danger');
        throw error;
    }
}

// Función para mostrar alertas
function mostrarAlerta(mensaje, tipo = 'info') {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
    alertContainer.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertContainer.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertContainer);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (alertContainer.parentNode) {
            alertContainer.remove();
        }
    }, 5000);
}

// Cargar préstamos
async function cargarPrestamos() {
    try {
        mostrarLoading('#prestamosList');
        
        const data = await apiRequest('/prestamos');
        prestamosActuales = data.data;
        
        renderizarPrestamos(prestamosActuales);
    } catch (error) {
        document.getElementById('prestamosList').innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Error al cargar los préstamos: ${error.message}
            </div>
        `;
    }
}

// Renderizar préstamos en tabla
function renderizarPrestamos(prestamos) {
    const container = document.getElementById('prestamosList');
    
    if (prestamos.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-book-open fa-3x text-muted mb-3"></i>
                <p class="text-muted">No hay préstamos registrados</p>
            </div>
        `;
        return;
    }

    const tableHTML = `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Libro</th>
                    <th>Fecha Préstamo</th>
                    <th>Fecha Devolución</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${prestamos.map(prestamo => `
                    <tr class="fade-in">
                        <td>${prestamo.id}</td>
                        <td>
                            <strong>${prestamo.usuario_nombre}</strong><br>
                            <small class="text-muted">${prestamo.usuario_identificacion}</small>
                        </td>
                        <td>
                            <strong>${prestamo.libro_titulo}</strong><br>
                            <small class="text-muted">${prestamo.isbn}</small>
                        </td>
                        <td>${formatearFecha(prestamo.fecha_prestamo)}</td>
                        <td>${formatearFecha(prestamo.fecha_devolucion)}</td>
                        <td>
                            <span class="badge ${prestamo.estado}">
                                ${prestamo.estado.charAt(0).toUpperCase() + prestamo.estado.slice(1)}
                            </span>
                        </td>
                        <td>
                            <div class="btn-group" role="group">
                                <button class="btn btn-sm btn-outline-primary" onclick="editarPrestamo(${prestamo.id})" title="Editar">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="eliminarPrestamo(${prestamo.id})" title="Eliminar">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = tableHTML;
}

// Mostrar loading
function mostrarLoading(selector) {
    document.querySelector(selector).innerHTML = `
        <div class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-2 text-muted">Cargando datos...</p>
        </div>
    `;
}

// Formatear fecha
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Cargar estadísticas
async function cargarEstadisticas() {
    try {
        // Cargar libros más prestados
        const librosData = await apiRequest('/libros/mas-prestados');
        renderizarLibrosMasPrestados(librosData.data);
        
        // Cargar usuarios con retrasos
        const usuariosData = await apiRequest('/usuarios/con-retrasos');
        renderizarUsuariosConRetrasos(usuariosData.data);
    } catch (error) {
        console.error('Error al cargar estadísticas:', error);
    }
}

// Renderizar libros más prestados
function renderizarLibrosMasPrestados(libros) {
    const container = document.getElementById('librosMasPrestados');
    
    if (libros.length === 0) {
        container.innerHTML = '<p class="text-muted">No hay datos disponibles</p>';
        return;
    }

    const html = libros.map((libro, index) => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
                <strong>${index + 1}. ${libro.titulo}</strong><br>
                <small class="text-muted">${libro.autor} (${libro.año_publicacion})</small>
            </div>
            <span class="badge bg-primary">${libro.total_prestamos} préstamos</span>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Renderizar usuarios con retrasos
function renderizarUsuariosConRetrasos(usuarios) {
    const container = document.getElementById('usuariosConRetrasos');
    
    if (usuarios.length === 0) {
        container.innerHTML = '<p class="text-muted">No hay usuarios con retrasos</p>';
        return;
    }

    const html = usuarios.map(usuario => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
                <strong>${usuario.nombre}</strong><br>
                <small class="text-muted">${usuario.correo}</small>
            </div>
            <span class="badge bg-danger">${usuario.total_prestamos_retrasados} retrasos</span>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Cargar usuarios para el formulario
async function cargarUsuarios() {
    try {
        const data = await apiRequest('/usuarios');
        const select = document.getElementById('usuario_id');
        
        // Mantener la opción por defecto
        select.innerHTML = '<option value="">Seleccionar usuario...</option>';
        
        data.data.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.id;
            option.textContent = `${usuario.nombre} (${usuario.identificacion})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

// Cargar libros para el formulario
async function cargarLibros() {
    try {
        const data = await apiRequest('/libros');
        const select = document.getElementById('isbn');
        
        // Mantener la opción por defecto
        select.innerHTML = '<option value="">Seleccionar libro...</option>';
        
        data.data.forEach(libro => {
            const option = document.createElement('option');
            option.value = libro.isbn;
            option.textContent = `${libro.titulo} (${libro.isbn})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar libros:', error);
    }
}

// Mostrar formulario de préstamo
function mostrarFormularioPrestamo(prestamo = null) {
    prestamoEditando = prestamo;
    const modal = new bootstrap.Modal(document.getElementById('prestamoModal'));
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('prestamoForm');
    
    // Limpiar formulario
    form.reset();
    
    if (prestamo) {
        modalTitle.textContent = 'Editar Préstamo';
        document.getElementById('usuario_id').value = prestamo.usuario_id;
        document.getElementById('isbn').value = prestamo.isbn;
        document.getElementById('fecha_prestamo').value = prestamo.fecha_prestamo;
        document.getElementById('fecha_devolucion').value = prestamo.fecha_devolucion;
        document.getElementById('estado').value = prestamo.estado;
    } else {
        modalTitle.textContent = 'Nuevo Préstamo';
        // Establecer fecha actual como fecha de préstamo
        document.getElementById('fecha_prestamo').value = new Date().toISOString().split('T')[0];
    }
    
    modal.show();
}

// Guardar préstamo
async function guardarPrestamo() {
    try {
        const formData = {
            usuario_id: parseInt(document.getElementById('usuario_id').value),
            isbn: document.getElementById('isbn').value,
            fecha_prestamo: document.getElementById('fecha_prestamo').value,
            fecha_devolucion: document.getElementById('fecha_devolucion').value,
            estado: document.getElementById('estado').value
        };

        // Validaciones
        if (!formData.usuario_id || !formData.isbn || !formData.fecha_prestamo || !formData.fecha_devolucion) {
            mostrarAlerta('Por favor complete todos los campos', 'warning');
            return;
        }

        let response;
        if (prestamoEditando) {
            // Actualizar préstamo existente
            response = await apiRequest(`/prestamos/${prestamoEditando.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    fecha_devolucion: formData.fecha_devolucion,
                    estado: formData.estado
                })
            });
            mostrarAlerta('Préstamo actualizado exitosamente', 'success');
        } else {
            // Crear nuevo préstamo
            response = await apiRequest('/prestamos', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            mostrarAlerta('Préstamo creado exitosamente', 'success');
        }

        // Cerrar modal y recargar datos
        bootstrap.Modal.getInstance(document.getElementById('prestamoModal')).hide();
        cargarPrestamos();
        cargarEstadisticas();
        
    } catch (error) {
        console.error('Error al guardar préstamo:', error);
    }
}

// Editar préstamo
async function editarPrestamo(id) {
    try {
        const data = await apiRequest(`/prestamos/${id}`);
        mostrarFormularioPrestamo(data.data);
    } catch (error) {
        console.error('Error al cargar préstamo para editar:', error);
    }
}

// Eliminar préstamo
async function eliminarPrestamo(id) {
    if (!confirm('¿Está seguro de que desea eliminar este préstamo?')) {
        return;
    }

    try {
        await apiRequest(`/prestamos/${id}`, {
            method: 'DELETE'
        });
        
        mostrarAlerta('Préstamo eliminado exitosamente', 'success');
        cargarPrestamos();
        cargarEstadisticas();
    } catch (error) {
        console.error('Error al eliminar préstamo:', error);
    }
}

// Buscar préstamos
function buscarPrestamos() {
    const busqueda = document.getElementById('buscarPrestamo').value.toLowerCase();
    const filtroEstado = document.getElementById('filtroEstado').value;
    
    let prestamosFiltrados = prestamosActuales.filter(prestamo => {
        const coincideBusqueda = prestamo.usuario_nombre.toLowerCase().includes(busqueda) ||
                                prestamo.libro_titulo.toLowerCase().includes(busqueda) ||
                                prestamo.isbn.toLowerCase().includes(busqueda);
        
        const coincideEstado = !filtroEstado || prestamo.estado === filtroEstado;
        
        return coincideBusqueda && coincideEstado;
    });
    
    renderizarPrestamos(prestamosFiltrados);
}

// Event listeners
document.getElementById('buscarPrestamo').addEventListener('input', buscarPrestamos);
document.getElementById('filtroEstado').addEventListener('change', buscarPrestamos); 
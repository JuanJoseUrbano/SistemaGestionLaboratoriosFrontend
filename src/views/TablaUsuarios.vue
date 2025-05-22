<template>
    <div class="roles-container">
        <div class="roles-header">
            <h1 class="roles-title">Gestión de Usuarios</h1>
            <p class="roles-subtitle">Información acerca de los usuarios del sistema</p>
        </div>

        <div class="roles-actions">
            <div class="search-box">
                <input type="text" class="form-control search-input" v-model="filtro" placeholder="Buscar por nombres, email o teléfono">
                <button @click="usuariosFiltrados" class="btn btn-outline-primary search-btn">
                    Buscar
                </button>
                <button @click="obtenerUsuarios" class="btn btn-outline-secondary">
                    Cancelar
                </button>
            </div>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#guardar_usuario">
                <i class="fas fa-plus-circle me-2"></i>Agregar Usuario
            </button>
        </div>

        <!-- Modal para agregar usuario -->
        <div class="modal fade" id="guardar_usuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="exampleModalLabel">Nuevo Usuario</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="nombres" class="form-label">Nombres</label>
                            <input type="text" class="form-control" v-model="usuarioNuevo.nombres" id="nombres" required>
                        </div>
                        <div class="mb-3">
                            <label for="apellidos" class="form-label">Apellidos</label>
                            <input type="text" class="form-control" v-model="usuarioNuevo.apellidos" id="apellidos" required>
                        </div>
                        <div class="mb-3">
                            <label for="correo" class="form-label">Correo</label>
                            <input type="email" class="form-control" v-model="usuarioNuevo.correo" id="correo" required>
                        </div>
                        <div class="mb-3">
                            <label for="telefono" class="form-label">Teléfono</label>
                            <input type="tel" class="form-control" v-model="usuarioNuevo.telefono" id="telefono" required>
                        </div>
                        <div class="mb-3">
                            <label for="rol" class="form-label">Rol</label>
                            <select class="form-select" v-model="usuarioNuevo.rol.id" id="rol" required>
                                <option disabled value="0">Seleccione un rol...</option>
                                <option v-for="rol in roles" :key="rol.id" :value="rol.id">{{ rol.nombre }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="guardarUsuario()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para editar usuario -->
        <div class="modal fade" id="editar_usuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-warning text-dark">
                        <h5 class="modal-title" id="exampleModalLabel">Editar Usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="edit_nombres" class="form-label">Nombres</label>
                            <input type="text" class="form-control" v-model="usuarioEditado.nombres" id="edit_nombres" required>
                        </div>
                        <div class="mb-3">
                            <label for="edit_apellidos" class="form-label">Apellidos</label>
                            <input type="text" class="form-control" v-model="usuarioEditado.apellidos" id="edit_apellidos" required>
                        </div>
                        <div class="mb-3">
                            <label for="edit_correo" class="form-label">Correo</label>
                            <input type="email" class="form-control" v-model="usuarioEditado.correo" id="edit_correo" required>
                        </div>
                        <div class="mb-3">
                            <label for="edit_telefono" class="form-label">Teléfono</label>
                            <input type="tel" class="form-control" v-model="usuarioEditado.telefono" id="edit_telefono" required>
                        </div>
                        <div class="mb-3">
                            <label for="edit_rol" class="form-label">Rol</label>
                            <select class="form-select" v-model="usuarioEditado.rol.id" id="edit_rol" required>
                                <option disabled value="0">Seleccione un rol...</option>
                                <option v-for="rol in roles" :key="rol.id" :value="rol.id">{{ rol.nombre }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-warning" @click="actualizarUsuario(usuarioEditado.id)">Actualizar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="roles-table-container">
            <div class="results-info">
                <span class="badge bg-info">{{ cantidadUsuarios }} Resultados</span>
            </div>

            <div v-if="cargando" class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando usuarios...</p>
            </div>

            <div v-else class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th scope="col" class="text-center">ID</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Correo</th>
                            <th scope="col" class="text-center">Teléfono</th>
                            <th scope="col">Rol</th>
                            <th scope="col" class="text-center">Estado</th>
                            <th scope="col" class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in usuarios" :key="user.id">
                            <td class="text-center">{{ user.id }}</td>
                            <td>{{ user.nombres }}</td>
                            <td>{{ user.apellidos }}</td>
                            <td>{{ user.correo }}</td>
                            <td class="text-center">{{ user.telefono }}</td>
                            <td>
                                <span v-if="user.rol.nombre" class="role-badge">{{ user.rol.nombre }}</span>
                                <span v-else class="badge bg-secondary">Sin rol</span>
                            </td>
                            <td class="text-center">
                                <span v-if="user.estado" class="status-badge active">
                                    <img src="../assets/comprobado.png" class="status-icon" />
                                    Activo
                                </span>
                                <span v-else class="status-badge inactive">
                                    <img src="../assets/desactivar.png" class="status-icon" />
                                    Inactivo
                                </span>
                            </td>
                            <td class="text-center">
                                <div class="action-buttons">
                                    <button @click="obtenerPorId(user.id)" class="btn btn-sm btn-outline-warning me-2"
                                        data-bs-toggle="modal" data-bs-target="#editar_usuario">
                                        <i class="fas fa-edit me-1"></i>Editar
                                    </button>
                                    <button @click="eliminarUsuario(user.id, user.correo)" class="btn btn-sm btn-outline-danger">
                                        <i class="fas fa-trash-alt me-1"></i>Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { confirmar, enviarSolicitud, mostrarAlerta } from '../funciones';
import { Modal } from 'bootstrap'; // ¡Importante: importamos el objeto Modal de Bootstrap!

export default {
    name: 'lista-reservas', // Considera cambiar este nombre a 'gestion-usuarios' para mayor claridad
    data() {
        return {
            usuarios: null,
            roles: null,
            usuarioNuevo: {
                nombres: '',
                apellidos: '',
                correo: '',
                telefono: '',
                rol: {
                    id: 0
                }
            },
            usuarioEditado: {
                id: 0,
                nombres: '',
                apellidos: '',
                correo: '',
                telefono: '',
                rol: {
                    id: 0
                }
            },
            cargando: false,
            filtro: '',
            cantidadUsuarios: 0,
            url: 'http://localhost:8081/laboratorio-corhuila/laboratorio-corhuila/',
            modalAgregar: null, // Propiedad para la instancia del modal de agregar
            modalEditar: null,  // Propiedad para la instancia del modal de editar
        };
    },
    async mounted() {
        // Inicializa las instancias de los modales cuando el componente se monta
        this.modalAgregar = new Modal(document.getElementById('guardar_usuario'));
        this.modalEditar = new Modal(document.getElementById('editar_usuario'));

        await this.obtenerUsuarios();
        await this.obtenerRoles();
    },
    methods: {
        async guardarUsuario() {
            if (this.usuarioNuevo.nombres.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese los nombres');
            } else if (this.usuarioNuevo.apellidos.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese los apellidos');
            } else if (this.usuarioNuevo.correo.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese el correo');
            } else if (this.usuarioNuevo.telefono === null) {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese el número de contacto');
            } else if (this.usuarioNuevo.rol.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un rol');
            } else {
                // Envía la solicitud y espera el resultado
                const response = await enviarSolicitud('POST', this.usuarioNuevo, this.url + 'usuario/guardar', 'Usuario agregado exitosamente', '/pagina-usuarios');

                // Si la solicitud fue exitosa (código de estado 200 o 201), cierra el modal y refresca la tabla
                if (response && (response.status === 200 || response.status === 201)) {
                    this.modalAgregar.hide(); // Cierra el modal de agregar usuario
                    this.obtenerUsuarios(); // Recarga la lista de usuarios
                    // Opcional: limpiar el formulario del modal
                    this.usuarioNuevo = { nombres: '', apellidos: '', correo: '', telefono: '', rol: { id: 0 } };
                }
            }
        },
        async obtenerUsuarios() {
            this.filtro = '';
            this.cargando = true;
            try {
                const response = await axios.get(this.url + 'usuario/encontrar-todos');
                this.usuarios = response.data;
                this.cantidadUsuarios = this.usuarios.length;
            } catch (error) {
                mostrarAlerta('Servidor caído', 'warning');
            } finally {
                this.cargando = false;
            }
        },
        async obtenerPorId(id) {
            // Muestra el modal de edición antes de cargar los datos
            this.modalEditar.show();
            try {
                const response = await axios.get(this.url + 'usuario/encontrar-por/' + id);
                const data = response.data;
                this.usuarioEditado = {
                    id: data.id,
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    correo: data.correo,
                    telefono: data.telefono,
                    rol: { id: data.rol.id }
                };
            } catch (error) {
                console.error("Error al obtener usuario:", error);
                mostrarAlerta('No se pudo cargar el usuario', 'error');
            }
        },
        async usuariosFiltrados() {
            this.cargando = true;
            try {
                const response = await axios.get(this.url + 'usuario/busqueda?filtro=' + this.filtro);
                this.usuarios = response.data;
                this.cantidadUsuarios = this.usuarios.length;
            } catch (error) {
                console.error("Estado de la petición: ", error);
                mostrarAlerta('No se pudo realizar la acción', 'error');
            } finally {
                this.cargando = false;
            }
        },
        async actualizarUsuario(id) {
            if (this.usuarioEditado.nombres.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese los nombres');
            } else if (this.usuarioEditado.apellidos.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese los apellidos');
            } else if (this.usuarioEditado.correo.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese el correo');
            } else if (this.usuarioEditado.telefono === null) {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese el número de contacto');
            } else if (this.usuarioEditado.rol.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un rol');
            } else {
                // Envía la solicitud y espera el resultado
                const response = await enviarSolicitud('PUT', this.usuarioEditado, this.url + 'usuario/actualizar/' + id, 'Usuario Actualizado exitosamente', '/pagina-usuarios');

                // Si la solicitud fue exitosa (código de estado 200), cierra el modal y refresca la tabla
                if (response && response.status === 200) {
                    this.modalEditar.hide(); // Cierra el modal de editar usuario
                    this.obtenerUsuarios(); // Recarga la lista de usuarios
                }
            }
        },
        async obtenerRoles() {
            try {
                const response = await axios.get(this.url + 'rol/encontrar-todos');
                this.roles = response.data;
            } catch (error) {
                mostrarAlerta('No se pudieron cargar los roles', 'error');
            }
        },
        eliminarUsuario(id, correo) {
            // La función 'confirmar' debería manejar el refresco de la página o la lista si la eliminación es exitosa
            confirmar(this.url + 'usuario/eliminar-por/', id, 'Eliminar Usuario', '¿Realmente desea eliminar a ' + correo + ' ?', '/pagina-usuarios');
        }
    }
};
</script>

<style scoped>
.roles-container {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.roles-header {
    margin-bottom: 2rem;
    text-align: center;
}

.roles-title {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.roles-subtitle {
    color: #7f8c8d;
    font-size: 1.1rem;
}

.roles-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;
}

.search-box {
    display: flex;
    flex-grow: 1;
    max-width: 600px;
    gap: 0.5rem;
}

.search-input {
    flex-grow: 1;
}

.roles-table-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 1.5rem;
    margin-top: 1rem;
}

.results-info {
    margin-bottom: 1rem;
    text-align: right;
}

.loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: #3498db;
}

.status-badge {
    padding: 0.35rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
}

.status-badge.active {
    background-color: #e8f5e9;
    color: #2e7d32;
}

.status-badge.inactive {
    background-color: #ffebee;
    color: #c62828;
}

.status-icon {
    width: 18px;
    height: 18px;
    margin-right: 5px;
}

.role-badge {
    background-color: #e3f2fd;
    color: #1565c0;
    padding: 0.35rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 500;
}

.action-buttons {
    display: flex;
    justify-content: center;
}

.table th {
    font-weight: 600;
    color: #34495e;
    white-space: nowrap;
}

.modal-header {
    padding: 1rem 1.5rem;
}

.modal-title {
    font-weight: 500;
}

@media (max-width: 992px) {
    .roles-actions {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .search-box {
        width: 100%;
        max-width: none;
    }
}

@media (max-width: 768px) {
    .action-buttons {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .action-buttons button {
        width: 100%;
    }
    
    .table-responsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
}
</style>
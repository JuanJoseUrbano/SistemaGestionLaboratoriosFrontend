<template>
    <div class="roles-container">
        <div class="roles-header">
            <h1 class="roles-title">Gestión de Laboratorios</h1>
            <p class="roles-subtitle">Información acerca de los laboratorios del sistema</p>
        </div>

        <div class="roles-actions">
            <div class="search-box">
                <input type="text" class="form-control search-input" v-model="filtro" placeholder="Buscar por nombre o ubicación">
                <button @click="laboratoriosFiltrados" class="btn btn-outline-primary search-btn">
                    Buscar
                </button>
                <button @click="obtenerLaboratorios" class="btn btn-outline-secondary">
                    Cancelar
                </button>
            </div>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#guardar_laboratorio">
                <i class="fas fa-plus-circle me-2"></i>Agregar Laboratorio
            </button>
        </div>

        <!-- Modal para agregar laboratorio -->
        <div class="modal fade" id="guardar_laboratorio" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="exampleModalLabel">Agregar Laboratorio</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" v-model="laboratorioNuevo.nombre" id="nombre" required>
                        </div>
                        <div class="mb-3">
                            <label for="ubicacion" class="form-label">Ubicación</label>
                            <input type="text" class="form-control" v-model="laboratorioNuevo.ubicacion" id="ubicacion" required>
                        </div>
                        <div class="mb-3">
                            <label for="capacidad" class="form-label">Capacidad</label>
                            <input type="number" class="form-control" v-model="laboratorioNuevo.capacidad" id="capacidad" required>
                        </div>
                        <div class="mb-3">
                            <label for="tipoLaboratorio" class="form-label">Tipo de Laboratorio</label>
                            <select class="form-select" v-model="laboratorioNuevo.tipoLaboratorio.id" id="tipoLaboratorio" required>
                                <option disabled value="0">Seleccione un tipo...</option>
                                <option v-for="tipoLab in tiposLaboratorios" :key="tipoLab.id" :value="tipoLab.id">{{ tipoLab.nombre }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="guardarLaboratorio()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para editar laboratorio -->
        <div class="modal fade" id="editar_laboratorio" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-warning text-dark">
                        <h5 class="modal-title" id="exampleModalLabel">Editar Laboratorio</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="edit_nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" v-model="laboratorioEditado.nombre" id="edit_nombre" required>
                        </div>
                        <div class="mb-3">
                            <label for="edit_ubicacion" class="form-label">Ubicación</label>
                            <input type="text" class="form-control" v-model="laboratorioEditado.ubicacion" id="edit_ubicacion" required>
                        </div>
                        <div class="mb-3">
                            <label for="edit_capacidad" class="form-label">Capacidad</label>
                            <input type="number" class="form-control" v-model="laboratorioEditado.capacidad" id="edit_capacidad" required>
                        </div>
                        <div class="mb-3">
                            <label for="edit_tipoLaboratorio" class="form-label">Tipo de Laboratorio</label>
                            <select class="form-select" v-model="laboratorioEditado.tipoLaboratorio.id" id="edit_tipoLaboratorio" required>
                                <option disabled value="0">Seleccione un tipo...</option>
                                <option v-for="tipoLab in tiposLaboratorios" :key="tipoLab.id" :value="tipoLab.id">{{ tipoLab.nombre }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-warning" @click="actualizarLaboratorio(laboratorioEditado.id)">Actualizar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="roles-table-container">
            <div class="results-info">
                <span class="badge bg-info">{{ cantidadLaboratorios }} Resultados</span>
            </div>

            <div v-if="cargando" class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando laboratorios...</p>
            </div>

            <div v-else class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th scope="col" class="text-center">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Ubicación</th>
                            <th scope="col" class="text-center">Capacidad</th>
                            <th scope="col" class="text-center">Estado</th>
                            <th scope="col">Tipo</th>
                            <th scope="col" class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="lab in laboratorios" :key="lab.id">
                            <td class="text-center">{{ lab.id }}</td>
                            <td>{{ lab.nombre }}</td>
                            <td>{{ lab.ubicacion }}</td>
                            <td class="text-center">{{ lab.capacidad }} personas</td>
                            <td class="text-center">
                                <span v-if="lab.estado" class="status-badge active">Activo</span>
                                <span v-else class="status-badge inactive">Inactivo</span>
                            </td>
                            <td>
                                <span v-if="lab.tipoLaboratorio.nombre" class="role-badge">{{ lab.tipoLaboratorio.nombre }}</span>
                                <span v-else class="badge bg-secondary">Sin tipo</span>
                            </td>
                            <td class="text-center">
                                <div class="action-buttons">
                                    <button @click="obtenerPorId(lab.id)" class="btn btn-sm btn-outline-warning me-2"
                                        data-bs-toggle="modal" data-bs-target="#editar_laboratorio">
                                        <i class="fas fa-edit me-1"></i>Editar
                                    </button>
                                    <button @click="eliminarLaboratorio(lab.id)" class="btn btn-sm btn-outline-danger">
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
import { Modal } from 'bootstrap';

export default {
    name: 'lista-reservas',
    data() {
        return {
            laboratorios: null,
            tiposLaboratorios: null,
            laboratorioNuevo: {
                nombre: '',
                ubicacion: '',
                capacidad: 0,
                tipoLaboratorio: {
                    id: 0
                }
            },
            laboratorioEditado: {
                id: 0,
                nombre: '',
                ubicacion: '',
                capacidad: 0,
                tipoLaboratorio: {
                    id: 0
                }
            },
            cargando: false,
            filtro: '',
            cantidadLaboratorios: 0,
            url: 'http://localhost:8081/laboratorio-corhuila/laboratorio-corhuila/',
            modalEditar: null,
            modalGuardar: null,
        }
    },
    mounted() {
        this.obtenerLaboratorios();
        this.obtenerTiposLaboratorios();
        // Inicializa el modal de edición una sola vez
        this.modalEditar = new Modal(document.getElementById('editar_laboratorio'));
        // Inicializa el modal de guardar una sola vez
        this.modalGuardar = new Modal(document.getElementById('guardar_laboratorio'));
    },
    methods: {
        async guardarLaboratorio() { // <--- Convertido a async
            if (this.laboratorioNuevo.nombre.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese el nombre');
            } else if (this.laboratorioNuevo.ubicacion.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la ubicación');
            } else if (this.laboratorioNuevo.capacidad === 0) { // <--- Cambiado a 0 para mejor validación de números
                mostrarAlerta('Información incompleta', 'info', 'Ingrese su capacidad');
            } else if (this.laboratorioNuevo.tipoLaboratorio.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un tipo de laboratorio');
            } else {
                try {
                    await enviarSolicitud('POST', this.laboratorioNuevo, this.url + 'laboratorio/guardar', 'Laboratorio agregado exitosamente', '/pagina-laboratorios');
                    this.modalGuardar.hide();
                    this.obtenerLaboratorios(); 
                } catch (error) {
                    console.error("Error al guardar el laboratorio: ", error);
                    mostrarAlerta('Error al guardar', 'error');
                }
            }
        },
        async obtenerLaboratorios() {
            this.cargando = true;
            try {
                const response = await axios.get(this.url + 'laboratorio/encontrar-todos');
                this.laboratorios = response.data;
                this.cantidadLaboratorios = this.laboratorios.length;
            } catch (error) {
                console.error("Estado de la petición: ", error);
                mostrarAlerta('Servidor caído', 'warning');
            } finally {
                this.cargando = false;
            }
        },
        async obtenerPorId(id) {
            this.modalEditar.show();
            try {
                const response = await axios.get(this.url + 'laboratorio/encontrar-por/' + id);
                const data = response.data;
                this.laboratorioEditado.id = data.id;
                this.laboratorioEditado.nombre = data.nombre;
                this.laboratorioEditado.ubicacion = data.ubicacion;
                this.laboratorioEditado.capacidad = data.capacidad;
                this.laboratorioEditado.tipoLaboratorio = { id: data.tipoLaboratorio.id };
            } catch (error) {
                mostrarAlerta('Error al cargar datos del laboratorio', 'error');
                this.modalEditar.hide(); 
            }
        },
        async actualizarLaboratorio(id) {
            if (this.laboratorioEditado.nombre.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese el nombre');
            } else if (this.laboratorioEditado.ubicacion.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la ubicación');
            } else if (this.laboratorioEditado.capacidad === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese su capacidad');
            } else if (this.laboratorioEditado.tipoLaboratorio.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un tipo de laboratorio');
            } else {
                try {
                    await enviarSolicitud('PUT', this.laboratorioEditado, this.url + 'laboratorio/actualizar/' + id, 'Laboratorio actualizado exitosamente', '/pagina-laboratorios');
                    this.modalEditar.hide(); 
                    this.obtenerLaboratorios();
                } catch (error) {
                    mostrarAlerta('Error al actualizar', 'error');
                }
            }
        },
        async obtenerTiposLaboratorios() {
            try {
                const response = await axios.get(this.url + 'tipolaboratorio/encontrar-todos');
                this.tiposLaboratorios = response.data;
            } catch (error) {
                mostrarAlerta('Error al cargar los laboratorio', 'error');
            }
        },
        async eliminarLaboratorio(id) { 
            confirmar(this.url + 'laboratorio/eliminar-por/', id, 'Eliminar Laboratorio', 'Realmente desea eliminar este laboratorio?', '/pagina-laboratorios');
        },
        async laboratoriosFiltrados() { 
            this.cargando = true;
            try {
                const response = await axios.get(this.url + 'laboratorio/busqueda?filtro=' + this.filtro);
                this.laboratorios = response.data;
                this.cantidadLaboratorios = this.laboratorios.length;
            } catch (error) {
                console.error("Estado de la petición: ", error);
                mostrarAlerta('No se pudo realizar la búsqueda', 'error');
            } finally {
                this.cargando = false;
            }
        }
    }
}
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
}

.status-badge.active {
    background-color: #e8f5e9;
    color: #2e7d32;
}

.status-badge.inactive {
    background-color: #ffebee;
    color: #c62828;
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
<template>
    <div class="roles-container">
        <div class="roles-header">
            <h1 class="roles-title">Gestión de Tipos de Laboratorio</h1>
            <p class="roles-subtitle">Información acerca de tipos de laboratorio del sistema</p>
        </div>

        <div class="modal fade" id="guardar_tipolab" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="exampleModalLabel">Agregar Tipo de Laboratorio</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" v-model="tipoLabNuevo.nombre" id="nombre" required>
                        </div>
                        <div class="mb-3">
                            <label for="descripcion" class="form-label">Descripción</label>
                            <input type="text" class="form-control" v-model="tipoLabNuevo.descripcion" id="descripcion" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="guardarTipoLaboratorio()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="editar_tipo_laboratorio" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-warning text-dark">
                        <h5 class="modal-title" id="exampleModalLabel">Editar Tipo de Laboratorio</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="edit_nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" v-model="tipoLabEditado.nombre" id="edit_nombre" required>
                        </div>
                        <div class="mb-3">
                            <label for="edit_descripcion" class="form-label">Descripción</label>
                            <input type="text" class="form-control" v-model="tipoLabEditado.descripcion" id="edit_descripcion" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-warning" @click="actualizarTipoLaboratorio(tipoLabEditado.id)">Actualizar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="roles-actions">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#guardar_tipolab">
                <i class="fas fa-plus-circle me-2"></i>Agregar
            </button>
            <div class="results-badge">
                <span class="badge bg-info">{{ cantidadResultado }} Resultados</span>
            </div>
        </div>

        <div class="roles-table-container">
            <div v-if="cargando" class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando tipos de laboratorio...</p>
            </div>

            <div v-else class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th scope="col" class="text-center">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col" class="text-center">Estado</th>
                            <th scope="col" class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x in tipoLaboratorios" :key="x.id">
                            <td class="text-center">{{ x.id }}</td>
                            <td>{{ x.nombre }}</td>
                            <td>{{ x.descripcion }}</td>
                            <td class="text-center">
                                <span v-if="x.estado" class="status-badge active">
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
                                    <button class="btn btn-sm btn-outline-warning me-2" @click="obtenerPorId(x.id)">
                                        <i class="fas fa-edit me-1"></i>Editar
                                    </button>
                                    <button @click="eliminarTipoLaboratorio(x.id)" class="btn btn-sm btn-outline-danger">
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
import { confirmar, mostrarAlerta, enviarSolicitud } from '../funciones';
import axios from 'axios';
import { Modal } from 'bootstrap';

export default {
    name: 'tablaRoles',
    data() {
        return {
            tipoLaboratorios: null,
            tipoLabNuevo: {
                nombre: '',
                descripcion: ''
            },
            tipoLabEditado: {
                id: 0,
                nombre: '',
                descripcion: ''
            },
            cantidadResultado: 0,
            cargando: false,
            url: 'http://localhost:8081/laboratorio-corhuila/laboratorio-corhuila/tipolaboratorio/',
            modalEditarTipoLab: null, // Agregamos la instancia para el modal de editar
        }
    },
    mounted() {
        this.obtenerTipoLaboratorio();
        // Inicializamos el modal de edición una sola vez
        this.modalEditarTipoLab = new Modal(document.getElementById('editar_tipo_laboratorio'));
    },
    methods: {
        obtenerTipoLaboratorio() {
            this.cargando = true
            axios.get(this.url + 'encontrar-todos').then(
                (response) => {
                    this.tipoLaboratorios = response.data;
                    this.cantidadResultado = this.tipoLaboratorios.length
                    this.cargando = false;
                }).catch(function (error) {
                    console.error("Estado de la petición: ", error);
                    mostrarAlerta('Servidor caido', 'warning')
                });
        },
        guardarTipoLaboratorio() {
            if (this.tipoLabNuevo.nombre.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese un nombre')
            } else if (this.tipoLabNuevo.descripcion.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese una descripción')
            }
            else {
                // Aquí deberías manejar el cierre del modal de guardar si lo abriste programáticamente.
                // Si lo abres con data-bs-toggle, Bootstrap se encarga.
                enviarSolicitud('POST', this.tipoLabNuevo, this.url + 'guardar', 'Tipo de Laboratorio agregado exitosamente', '/pagina-tipos-laboratorios');
            }
        },
        obtenerPorId(id) {
            // Usamos la instancia ya creada para mostrar el modal
            this.modalEditarTipoLab.show();
            axios.get(this.url + 'encontrar-por/' + id).then(
                (response) => {
                    let data = response.data
                    this.tipoLabEditado.id = data.id
                    this.tipoLabEditado.nombre = data.nombre
                    this.tipoLabEditado.descripcion = data.descripcion
                }
            )
        },
        actualizarTipoLaboratorio(id) {
            if (this.tipoLabEditado.nombre.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese un nombre')
            } else if (this.tipoLabEditado.descripcion.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese una descripción')
            } else {
                enviarSolicitud('PUT', this.tipoLabEditado, this.url + 'actualizar/' + id, 'Tipo de Laboratorio actualizado exitosamente', '/pagina-tipo-laboratorios');
                // Cerramos el modal de edición después de una actualización exitosa
                this.modalEditarTipoLab.hide();
            }
        },

        eliminarTipoLaboratorio(id) {
            confirmar(this.url + 'eliminar-por/', id, 'Eliminar Tipo de Laboratorio', 'Realmente desea realizar esta acción?', '/pagina-tipo-laboratorios')
        }
    }
}
</script>

<style scoped>
.roles-container {
    padding: 2rem;
    max-width: 1200px;
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
}

.results-badge {
    font-size: 0.9rem;
}

.roles-table-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 1rem;
    margin-top: 1rem;
}

.loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: #3498db;
}

.role-name {
    font-weight: 500;
    color: #2c3e50;
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
    width: 20px;
    height: 20px;
    margin-right: 5px;
}

.action-buttons {
    display: flex;
    justify-content: center;
}

.table th {
    font-weight: 600;
    color: #34495e;
}

.modal-header {
    padding: 1rem 1.5rem;
}

.modal-title {
    font-weight: 500;
}

@media (max-width: 768px) {
    .roles-actions {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .action-buttons {
        flex-direction: column;
        gap: 0.5rem;
    }

    .action-buttons button {
        width: 100%;
    }
}
</style>
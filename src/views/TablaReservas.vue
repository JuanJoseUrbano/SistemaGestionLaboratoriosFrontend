<template>
    <div class="reservas-container">
        <div class="reservas-header">
            <h1 class="reservas-title">📅 Gestión de Reservas de Laboratorios</h1>
            <p class="reservas-subtitle">Información y administración de reservas de laboratorios</p>
        </div>

        <div class="reservas-actions">
            <div class="d-flex flex-wrap gap-3">
                <input type="date" class="form-control w-auto" v-model="fecha" />
                <button @click="reservasFiltradas" class="btn btn-primary">
                    <i class="fas fa-search me-2"></i>Buscar Fecha
                </button>
                <button @click="obtenerReservas" class="btn btn-outline-secondary">
                    <i class="fas fa-times me-2"></i>Cancelar
                </button>
                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal_nueva_reserva">
                    <i class="fas fa-plus-circle me-2"></i>Agregar Reserva
                </button>
            </div>
            <div class="results-badge">
                <span class="badge bg-info">{{ cantidadReservas }} Resultados</span>
            </div>
        </div>

        <!-- Modal para nueva reserva -->
        <div class="modal fade" id="modal_nueva_reserva" tabindex="-1" aria-labelledby="nuevaReservaModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title" id="nuevaReservaModalLabel">Nueva Reserva</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="usuario" class="form-label">Email Usuario</label>
                            <select class="form-select" v-model="reservaNueva.usuario.id" id="usuario" required>
                                <option value="0" disabled>SELECCIONE EL USUARIO...</option>
                                <option v-for="user in usuarios" :key="user.id" :value="user.id">{{ user.correo }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="laboratorio" class="form-label">Laboratorio</label>
                            <select class="form-select" v-model="reservaNueva.laboratorio.id" id="laboratorio" required>
                                <option value="0" disabled>SELECCIONE UN LABORATORIO...</option>
                                <option v-for="lab in laboratorios" :key="lab.id" :value="lab.id">{{ lab.nombre }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="fechaReserva" class="form-label">Fecha</label>
                            <input type="date" class="form-control" v-model="reservaNueva.fechaReserva" id="fechaReserva" required>
                        </div>
                        <div class="mb-3">
                            <label for="horaInicio" class="form-label">Hora de inicio</label>
                            <input type="time" class="form-control" v-model="reservaNueva.horaInicio" id="horaInicio" required>
                        </div>
                        <div class="mb-3">
                            <label for="horaFin" class="form-label">Hora de Fin</label>
                            <input type="time" class="form-control" v-model="reservaNueva.horaFin" id="horaFin" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-success" @click="guardarReserva">
                            <i class="fas fa-save me-2"></i>Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para editar reserva -->
        <div class="modal fade" id="modal_editar_reserva" tabindex="-1" aria-labelledby="editarReservaModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-warning text-dark">
                        <h5 class="modal-title" id="editarReservaModalLabel">Editar Reserva</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="edit_usuario" class="form-label">Email Usuario</label>
                            <select class="form-select" v-model="reservaEditada.usuario.id" id="edit_usuario" required>
                                <option value="0" disabled>SELECCIONE EL USUARIO...</option>
                                <option v-for="user in usuarios" :key="user.id" :value="user.id">{{ user.correo }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="edit_laboratorio" class="form-label">Laboratorio</label>
                            <select class="form-select" v-model="reservaEditada.laboratorio.id" id="edit_laboratorio" required>
                                <option value="0" disabled>SELECCIONE UN LABORATORIO...</option>
                                <option v-for="lab in laboratorios" :key="lab.id" :value="lab.id">{{ lab.nombre }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="edit_fechaReserva" class="form-label">Fecha Reserva</label>
                            <input type="date" class="form-control" v-model="reservaEditada.fechaReserva" id="edit_fechaReserva" required>
                        </div>
                        <div class="mb-3">
                            <label for="horaInicioEdit" class="form-label">Hora de inicio</label>
                            <input type="time" class="form-control" v-model="reservaEditada.horaInicio" id="horaInicioEdit" required>
                        </div>
                        <div class="mb-3">
                            <label for="horaFinEdit" class="form-label">Hora de fin</label>
                            <input type="time" class="form-control" v-model="reservaEditada.horaFin" id="horaFinEdit" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-warning" @click="actualizarReserva(reservaEditada.id)">
                            <i class="fas fa-sync-alt me-2"></i>Actualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="reservas-table-container">
            <div v-if="cargando" class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando reservas...</p>
            </div>

            <div v-else class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th scope="col" class="text-center">ID</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Laboratorio</th>
                            <th scope="col">Fecha</th>
                            <th scope="col" class="text-center">Hora Inicio</th>
                            <th scope="col" class="text-center">Hora Fin</th>
                            <th scope="col" class="text-center">Estado</th>
                            <th scope="col" class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="reserva in reservas" :key="reserva.id">
                            <td class="text-center">{{ reserva.id }}</td>
                            <td>
                                <span v-if="reserva?.usuario?.nombres">{{ reserva.usuario.nombres }}</span>
                                <span v-else class="text-muted">NO ASOCIADO</span>
                            </td>
                            <td>
                                <span v-if="reserva?.laboratorio?.nombre">{{ reserva.laboratorio.nombre }}</span>
                                <span v-else class="text-muted">NO ASOCIADO</span>
                            </td>
                            <td>{{ reserva.fechaReserva }}</td>
                            <td class="text-center">{{ obtenerHora(reserva.horaInicio) }}</td>
                            <td class="text-center">{{ obtenerHora(reserva.horaFin) }}</td>
                            <td class="text-center">
                                <span v-if="reserva.estado" class="status-badge active">
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
                                    <button @click="prepararEdicion(reserva.id)" class="btn btn-sm btn-outline-warning me-2">
                                        <i class="fas fa-edit me-1"></i>Editar
                                    </button>
                                    <button @click="eliminarReserva(reserva.id)" class="btn btn-sm btn-outline-danger">
                                        <i class="fas fa-trash-alt me-1"></i>Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="!reservas || reservas.length === 0">
                            <td colspan="8" class="text-center py-4 text-muted">No hay reservas disponibles</td>
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
            reservas: null,
            laboratorios: null,
            usuarios: null,
            cargando: false,
            fecha: '',
            cantidadReservas: 0,
            url: 'http://localhost:8081/laboratorio-corhuila/laboratorio-corhuila/',
            reservaNueva: {
                usuario: { id: 0 },
                laboratorio: { id: 0 },
                fechaReserva: '',
                horaInicio: '',
                horaFin: ''
            },
            reservaEditada: {
                id: 0,
                usuario: { id: 0 },
                laboratorio: { id: 0 },
                fechaReserva: '',
                horaInicio: '',
                horaFin: ''
            },
            modalNuevaReserva: null,
            modalEditarReserva: null
        }
    },
    mounted() {
        this.obtenerReservas();
        this.obtenerLaboratorios();
        this.obtenerUsuarios();
        
        this.modalNuevaReserva = new Modal(document.getElementById('modal_nueva_reserva'));
        this.modalEditarReserva = new Modal(document.getElementById('modal_editar_reserva'));
    },
    methods: {
        async guardarReserva() {
            if (this.reservaNueva.usuario.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un usuario');
                return;
            } else if (this.reservaNueva.laboratorio.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un laboratorio');
                return;
            } else if (this.reservaNueva.fechaReserva === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la fecha');
                return;
            } else if (this.reservaNueva.horaInicio === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la hora de inicio');
                return;
            } else if (this.reservaNueva.horaFin === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la hora de fin');
                return;
            }

            try {
                this.reservaNueva.horaInicio = this.convertirAHoraCompleta(this.reservaNueva.fechaReserva, this.reservaNueva.horaInicio);
                this.reservaNueva.horaFin = this.convertirAHoraCompleta(this.reservaNueva.fechaReserva, this.reservaNueva.horaFin);

                await enviarSolicitud('POST', this.reservaNueva, this.url + 'reserva/guardar', 'Reserva agregada exitosamente', '/pagina-reservas');
                this.modalNuevaReserva.hide();
                this.obtenerReservas();
            } catch (error) {
                console.error("Error al guardar la reserva: ", error);
                mostrarAlerta('Error al guardar la reserva', 'error', 'Hubo un problema al intentar guardar la reserva.');
            }
        },
        async obtenerReservas() {
            this.cargando = true;
            try {
                const response = await axios.get(this.url + 'reserva/encontrar-activas');
                this.reservas = response.data;
                this.cantidadReservas = this.reservas.length;
            } catch (error) {
                console.error("Estado de la petición: ", error);
                mostrarAlerta('Servidor caído', 'warning', 'No se pudieron cargar las reservas. Intente de nuevo más tarde.');
            } finally {
                this.cargando = false;
            }
        },
        async prepararEdicion(id) {
            this.modalEditarReserva.show();
            try {
                const response = await axios.get(this.url + 'reserva/encontrar-por/' + id);
                const data = response.data;
                this.reservaEditada.id = data.id;
                this.reservaEditada.usuario.id = data.usuario.id;
                this.reservaEditada.laboratorio.id = data.laboratorio.id;
                this.reservaEditada.fechaReserva = data.fechaReserva;
                this.reservaEditada.horaInicio = data.horaInicio.substring(11, 16);
                this.reservaEditada.horaFin = data.horaFin.substring(11, 16);
            } catch (error) {
                console.error("Error al obtener reserva por ID: ", error);
                mostrarAlerta('Error al cargar datos de la reserva', 'error', 'No se pudo obtener la información para editar.');
                this.modalEditarReserva.hide();
            }
        },
        async actualizarReserva(id) {
            if (this.reservaEditada.usuario.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un usuario');
                return;
            } else if (this.reservaEditada.laboratorio.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un laboratorio');
                return;
            } else if (this.reservaEditada.fechaReserva === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la fecha');
                return;
            } else if (this.reservaEditada.horaInicio === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la hora de inicio');
                return;
            } else if (this.reservaEditada.horaFin === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la hora de fin');
                return;
            }

            try {
                this.reservaEditada.horaInicio = this.convertirAHoraCompleta(this.reservaEditada.fechaReserva, this.reservaEditada.horaInicio);
                this.reservaEditada.horaFin = this.convertirAHoraCompleta(this.reservaEditada.fechaReserva, this.reservaEditada.horaFin);

                await enviarSolicitud('PUT', this.reservaEditada, this.url + 'reserva/actualizar/' + id, 'Reserva actualizada exitosamente', '/pagina-reservas');
                this.modalEditarReserva.hide();
                this.obtenerReservas();
            } catch (error) {
                console.error("Error al actualizar la reserva: ", error);
                mostrarAlerta('Error al actualizar la reserva', 'error', 'Hubo un problema al intentar actualizar la reserva.');
            }
        },
        async obtenerLaboratorios() {
            try {
                const response = await axios.get(this.url + 'laboratorio/encontrar-todos');
                this.laboratorios = response.data;
            } catch (error) {
                console.error("Error al obtener laboratorios: ", error);
                mostrarAlerta('Error al cargar laboratorios', 'error', 'No se pudieron cargar los laboratorios disponibles.');
            }
        },
        async obtenerUsuarios() {
            try {
                const response = await axios.get(this.url + 'usuario/encontrar-todos');
                this.usuarios = response.data;
            } catch (error) {
                console.error("Error al obtener usuarios: ", error);
                mostrarAlerta('Error al cargar usuarios', 'error', 'No se pudieron cargar los usuarios disponibles.');
            }
        },
        async reservasFiltradas() {
            this.cargando = true;
            try {
                const response = await axios.get(this.url + 'reserva/busqueda?filtro=' + this.fecha);
                this.reservas = response.data;
                this.cantidadReservas = this.reservas.length;
            } catch (error) {
                console.error("Estado de la petición de filtro: ", error);
                mostrarAlerta('No se pudo realizar la búsqueda', 'warning', 'Ocurrió un error al filtrar las reservas.');
            } finally {
                this.cargando = false;
            }
        },
        async eliminarReserva(id) {
            confirmar(this.url + 'reserva/eliminar-por/', id, 'Eliminar Reserva', '¿Realmente desea eliminar esta reserva?', '/pagina-reservas');
        },
        obtenerHora(fechaHora) {
            if (!fechaHora) return '';
            const fecha = new Date(fechaHora);
            let hora = fecha.getHours();
            const minutos = fecha.getMinutes();
            let amPm = hora >= 12 ? "PM" : "AM";
            hora = hora % 12 || 12;
            const horaFormateada = hora < 10 ? "0" + hora : hora;
            const minutosFormateados = minutos < 10 ? "0" + minutos : minutos;
            return `${horaFormateada}:${minutosFormateados} ${amPm}`;
        },
        convertirAHoraCompleta(fecha, hora) {
            return `${fecha}T${hora}:00`;
        }
    }
}
</script>

<style scoped>
.reservas-container {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.reservas-header {
    margin-bottom: 2rem;
    text-align: center;
}

.reservas-title {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.reservas-subtitle {
    color: #7f8c8d;
    font-size: 1.1rem;
}

.reservas-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.results-badge {
    font-size: 0.9rem;
}

.reservas-table-container {
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
    .reservas-actions {
        flex-direction: column;
        align-items: flex-start;
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
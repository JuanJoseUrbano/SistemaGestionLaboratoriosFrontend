<template>
    <div class="container">
        <div class="row mt-3">
            <h1 class="text-center mb-5">Información de Reservas de Laboratorios</h1>
            <div class="input-group mb-3 w-auto">
                    <input type="date" class="form-control md-3" v-model="fecha">
                    <button @click="reservasFiltradas" class="btn btn-primary">
                        Buscar Fecha
                    </button>
                    <button @click="obtenerReservas" class="btn btn-secondary">
                        Cancelar
                    </button>
                </div>
            <div class="col-md-6 offset-md-3">
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Nueva Reserva</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Email Usuario:</label>
                                    <select class="form-select" aria-label="Seleccionar usuario"
                                        v-model="reservaNueva.usuario.id" id="laboratorio">
                                        <option disabled>SELECCIONE EL USUARIO...</option>
                                        <option v-for="user in usuarios" :key="user.id" :value="user.id">{{
                        user.correo }}</option>
                                    </select>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Laboratorio:</label>
                                    <select class="form-select" aria-label="Seleccionar laboratorio"
                                        v-model="reservaNueva.laboratorio.id" id="laboratorio">
                                        <option disabled>SELECCIONE UN LABORATORIO...</option>
                                        <option v-for="lab in laboratorios" :key="lab.id" :value="lab.id">{{
                        lab.nombre }}</option>
                                    </select>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Fecha:</label>
                                    <input type="date" class="form-control" v-model="reservaNueva.fechaReserva"
                                        id="horaInicio" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Hora de inicio:</label>
                                    <input type="time" class="form-control" v-model="reservaNueva.horaInicio"
                                        id="horaInicio" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Hora de Fin:</label>
                                    <input type="time" class="form-control" v-model="reservaNueva.horaFin" id="horaFin"
                                        required>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-success" @click="guardarReserva()">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="editar_reserva" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Reserva</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Email Usuario:</label>
                                    <select class="form-select" aria-label="Seleccionar usuario"
                                        v-model="reservaEditada.usuario.id" id="laboratorio">
                                        <option disabled>SELECCIONE EL USUARIO...</option>
                                        <option v-for="user in usuarios" :key="user.id" :value="user.id">{{
                        user.correo }}</option>
                                    </select>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Laboratorio:</label>
                                    <select class="form-select" aria-label="Seleccionar laboratorio"
                                        v-model="reservaEditada.laboratorio.id" id="laboratorio">
                                        <option disabled>SELECCIONE UN LABORATORIO...</option>
                                        <option v-for="lab in laboratorios" :key="lab.id" :value="lab.id">{{
                        lab.nombre }}</option>
                                    </select>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Fecha Reserva:</label>
                                    <input type="date" class="form-control" v-model="reservaEditada.fechaReserva"
                                        id="horaInicio" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3" for="horaInicio">Hora de inicio:</label>
                                    <input type="time" class="form-control" v-model="reservaEditada.horaInicio"
                                        id="horaInicio" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3" for="horaFin">Hora de fin:</label>
                                    <input type="time" class="form-control" v-model="reservaEditada.horaFin"
                                        id="horaFin" required>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary"
                                    @click="actualizarReserva(reservaEditada.id)">Actualizar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-100 d-flex justify-content-start mb-3">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar</button>
            </div>
            <div class="table-responsive table-bordered">
                <div class="alert alert-success d-flex align-items-center">
                    <p class="mb-0">{{ cantidadReservas }} Resultados</p>
                </div>
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Usuario</th>
                            <th>Laboratorio</th>
                            <th>Fecha de Reserva</th>
                            <th>Hora de Inicio</th>
                            <th>Hora de Fin</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="cargando">
                            <td colspan="8">
                                <h3>Cargando...</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="reserva in reservas" :key="reserva.id">
                            <td>{{ reserva.id }}</td>
                            <td>
                                <p v-if="reserva?.usuario?.nombres">{{ reserva?.usuario?.nombres }}</p>
                                <p v-else>NO TIENE ASOCIADO</p>
                            </td>
                            <td>
                                <p v-if="reserva?.laboratorio?.nombre">{{ reserva?.laboratorio?.nombre }}</p>
                                <p v-else>NO TIENE ASOCIADO</p>
                            </td>
                            <td>{{ reserva.fechaReserva }}</td>
                            <td>{{ obtenerHora(reserva.horaInicio) }}</td>
                            <td>{{ obtenerHora(reserva.horaFin) }}</td>
                            <td>
                                <p v-if="reserva.estado">
                                    <img src="../assets/comprobado.png" style="width: 25px; height: 25px;" />
                                </p>
                                <p v-else>
                                    <img src="../assets/desactivar.png" style="width: 25px; height: 30px;" />
                                </p>
                            </td>
                            <td>
                                <div class="d-flex align-items-center justify-content-center">
                                    <button @click="obtenerPorId(reserva.id)" class="btn btn-warning btn-sm me-2">
                                        Editar
                                    </button>
                                    <button @click="eliminarReserva(reserva.id)" class="btn btn-danger btn-sm">
                                        Eliminar
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
import { confirmar, enviarSolicitud, mostrarAlerta, } from '../funciones';
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
                usuario: {
                    id: 0
                },
                laboratorio: {
                    id: 0
                },
                fechaReserva: '',
                horaInicio: '',
                horaFin: ''
            },
            reservaEditada: {
                id: 0,
                usuario: {
                    id: 0
                },
                laboratorio: {
                    id: 0
                },
                fechaReserva: '',
                horaInicio: '',
                horaFin: ''
            }
        }
    },
    mounted() {
        this.obtenerReservas();
        this.obtenerLaboratorios();
        this.obtenerUsuarios();
    },
    methods: {
        guardarReserva() {
            if (this.reservaNueva.usuario.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un usuario')
            } else if (this.reservaNueva.laboratorio.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un laboratorio')
            } else if (this.reservaNueva.fechaReserva === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la fecha')
            }
            else if (this.reservaNueva.horaInicio === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la hora de inicio')
            } else if (this.reservaNueva.horaFin === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la hora de fin')
            } else {
                this.reservaNueva.horaInicio = this.convertirAHoraCompleta(this.reservaNueva.fechaReserva, this.reservaNueva.horaInicio)
                this.reservaNueva.horaFin = this.convertirAHoraCompleta(this.reservaNueva.fechaReserva, this.reservaNueva.horaFin)
                enviarSolicitud('POST', this.reservaNueva, this.url + 'reserva/guardar', 'Reserva agregada existosamente', '/pagina-reservas')
            }
        },
        obtenerReservas() {
            this.cargando = true
            axios.get(this.url + 'reserva/encontrar-activas').then(
                (response) => {
                    this.reservas = response.data;
                    this.cantidadReservas = this.reservas.length
                    this.cargando = false;
                }).catch(function (error) {
                    console.error("Estado de la petición: ", error);
                    mostrarAlerta('Servidor caido', 'warning')
                });
        },
        obtenerPorId(id) {
            let modal = new Modal(document.getElementById('editar_reserva'));
            modal.show();
            axios.get(this.url + 'reserva/encontrar-por/' + id).then(
                (response) => {
                    let data = response.data
                    this.reservaEditada.id = data.id
                    this.reservaEditada.usuario.id = data.usuario.id
                    this.reservaEditada.laboratorio.id = data.laboratorio.id
                    this.reservaEditada.fechaReserva = data.fechaReserva
                    this.reservaEditada.horaInicio = data.horaInicio.substring(11, 16)
                    this.reservaEditada.horaFin = data.horaFin.substring(11, 16)
                }
            )
        },
        actualizarReserva(id) {
            if (this.reservaEditada.usuario.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un usuario')
            } else if (this.reservaEditada.laboratorio.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un laboratorio')
            } else if (this.reservaEditada.fechaReserva === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la fecha')
            }
            else if (this.reservaEditada.horaInicio === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la hora de inicio')
            } else if (this.reservaEditada.horaFin === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la hora de fin')
            } else {
                this.reservaEditada.horaInicio = this.convertirAHoraCompleta(this.reservaEditada.fechaReserva, this.reservaEditada.horaInicio)
                this.reservaEditada.horaFin = this.convertirAHoraCompleta(this.reservaEditada.fechaReserva, this.reservaEditada.horaFin)
                enviarSolicitud('PUT', this.reservaEditada, this.url + 'reserva/actualizar/' + id, 'Reserva Actualizada existosamente', '/pagina-reservas')
            }
        },
        obtenerLaboratorios() {
            axios.get(this.url + 'laboratorio/encontrar-todos').then((response) => {
                this.laboratorios = response.data
            })
        },
        obtenerUsuarios() {
            axios.get(this.url + 'usuario/encontrar-todos').then((response) => {
                this.usuarios = response.data
            })
        },
        reservasFiltradas() {
            axios.get(this.url + 'reserva/busqueda?filtro=' + this.fecha).then(
                (response) => {
                    this.cargando = true;
                    this.reservas = response.data;
                    this.cargando = false;
                }
            ).catch(function (error) {
                console.error("Estado de la petición: ", error);
                mostrarAlerta('No se pudo realizar la acción', 'warning')
            });
        },
        eliminarReserva(id) {
            confirmar(this.url + 'reserva/eliminar-por/', id, 'Eliminar Reserva', 'Realmente desea eliminar l@ reserva?', '/pagina-reservas')
        },
        obtenerHora(fechaHora) {
            const fecha = new Date(fechaHora);
            let hora = fecha.getHours();
            const minutos = fecha.getMinutes();
            let amPm = hora >= 12 ? "PM" : "AM";
            // Convierte la hora al formato de 12 horas
            hora = hora % 12 || 12;
            // Formatea la hora y los minutos para asegurarse de que tengan dos dígitos
            const horaFormateada = hora < 10 ? "0" + hora : hora;
            const minutosFormateados = minutos < 10 ? "0" + minutos : minutos;
            return `${horaFormateada}:${minutosFormateados} ${amPm}`;
        },
        convertirAHoraCompleta(fecha, hora) {
            return fecha + 'T' + hora + ':00'
        }
    }
}
</script>

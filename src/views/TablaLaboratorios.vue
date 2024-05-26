<template>
    <div class="container">
        <div class="row mt-3">
            <h1 class="text-center mb-5">Información acerca de Laboratorios</h1>
            <div class="col-md-6 offset-md-3">
                <div class="input-group md-3 w-auto mb-3">
                    <input type="text" class="form-control" v-model="filtro" placeholder="Buscar Reserva por nombre o ubicación">
                    <button @click="laboratoriosFiltrados" class="btn btn-primary">
                        Buscar
                    </button>
                    <button @click="obtenerLaboratorios" class="btn btn-secondary">
                        Cancelar
                    </button>
                </div>
                <div class="modal fade" id="guardar_laboratorio" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Nuevo Laboratorio</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Nombre</label>
                                    <input type="text" class="form-control" v-model="laboratorioNuevo.nombre"
                                        id="nombres" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Ubicación</label>
                                    <input type="text" class="form-control" v-model="laboratorioNuevo.ubicacion"
                                        id="apellidos" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Capacidad</label>
                                    <input type="number" class="form-control" v-model="laboratorioNuevo.capacidad"
                                        id="correo" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Tipo de laboratorio:</label>
                                    <select class="form-select" aria-label="Seleccionar laboratorio"
                                        v-model="laboratorioNuevo.tipoLaboratorio.id" id="laboratorio">
                                        <option disabled>SELECCIONE TIPO DE LABORATORIO...</option>
                                        <option v-for="tipoLab in tiposLaboratorios" :key="tipoLab.id"
                                            :value="tipoLab.id">{{
                        tipoLab.nombre }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-success"
                                    @click="guardarLaboratorio()">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="editar_laboratorio" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Actualizar Laboratorio</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Nombre</label>
                                    <input type="text" class="form-control" v-model="laboratorioEditado.nombre"
                                        id="nombres" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Ubicación</label>
                                    <input type="text" class="form-control" v-model="laboratorioEditado.ubicacion"
                                        id="apellidos" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Capacidad</label>
                                    <input type="number" class="form-control" v-model="laboratorioEditado.capacidad"
                                        id="correo" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Tipo de laboratorio:</label>
                                    <select class="form-select" aria-label="Seleccionar laboratorio"
                                        v-model="laboratorioEditado.tipoLaboratorio.id" id="laboratorio">
                                        <option disabled>SELECCIONE TIPO DE LABORATORIO...</option>
                                        <option v-for="tipoLab in tiposLaboratorios" :key="tipoLab.id"
                                            :value="tipoLab.id">{{
                        tipoLab.nombre }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-success"
                                    @click="actualizarLaboratorio(laboratorioEditado.id)">Actualizar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="w-100 d-flex justify-content-start mb-3">
                <button class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#guardar_laboratorio">Agregar</button>
            </div>
            <div class="table-responsive table-bordered">
                <div class="alert alert-success d-flex align-items-center">
                    <p class="mb-0">{{ cantidadLaboratorios }} Resultados</p>
                </div>
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Ubicacion</th>
                            <th>Capacidad</th>
                            <th>Estado</th>
                            <th>Tipo de Laboratorio</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="cargando">
                            <td colspan="8">
                                <h3>Cargando...</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="lab in laboratorios" :key="lab.id">
                            <td>{{ lab.id }}</td>
                            <td> {{ lab.nombre }}</td>
                            <td> {{ lab.ubicacion }}</td>
                            <td> {{ lab.capacidad }} personas</td>
                            <td>
                                <p v-if="lab.estado">Activo</p>
                                <p v-else>Inactivo</p>
                            </td>
                            <td>
                                <p v-if="lab.tipoLaboratorio.nombre">{{ lab.tipoLaboratorio.nombre }}</p>
                                <p v-else>NO TIENE ASOCIADO</p>
                            </td>
                            <td>
                                <div class="d-flex align-items-center justify-content-center">
                                    <button @click="obtenerPorId(lab.id)" class="btn btn-warning btn-sm me-2">
                                        Editar
                                    </button>
                                    <button @click="eliminarLaboratorio(lab.id)" class="btn btn-danger btn-sm">
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
        }
    },
    mounted() {
        this.obtenerLaboratorios()
        this.obtenerTiposLaboratorios()
    },
    methods: {
        guardarLaboratorio() {
            if (this.laboratorioNuevo.nombre.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese el nombre')
            } else if (this.laboratorioNuevo.ubicacion.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la ubicación')
            } else if (this.laboratorioNuevo.capacidad === null) {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese su capacidad')
            } else if (this.laboratorioNuevo.tipoLaboratorio.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un tipo de laboratorio')
            } else {
                enviarSolicitud('POST', this.laboratorioNuevo, this.url + 'laboratorio/guardar', 'Laboratorio agregado existosamente', '/pagina-laboratorios')
            }
        },
        obtenerLaboratorios() {
            this.cargando = true
            axios.get(this.url + 'laboratorio/encontrar-todos').then(
                (response) => {
                    this.laboratorios = response.data;
                    this.cantidadLaboratorios = this.laboratorios.length
                    this.cargando = false;
                }).catch(function (error) {
                    console.error("Estado de la petición: ", error);
                    mostrarAlerta('Servidor caido', 'warning')
                });
        },
        obtenerPorId(id) {
            let modal = new Modal(document.getElementById('editar_laboratorio'));
            modal.show();
            axios.get(this.url + 'laboratorio/encontrar-por/' + id).then(
                (response) => {
                    let data = response.data
                    this.laboratorioEditado.id = data.id
                    this.laboratorioEditado.nombre = data.nombre
                    this.laboratorioEditado.ubicacion = data.ubicacion
                    this.laboratorioEditado.capacidad = data.capacidad
                    this.laboratorioEditado.tipoLaboratorio.id = data.tipoLaboratorio.id
                }
            )
        },
        actualizarLaboratorio(id) {
            if (this.laboratorioEditado.nombre.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese el nombre')
            } else if (this.laboratorioEditado.ubicacion.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese la ubicación')
            } else if (this.laboratorioEditado.capacidad === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese su capacidad')
            } else if (this.laboratorioEditado.tipoLaboratorio.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un tipo de laboratorio')
            } else {
                enviarSolicitud('PUT', this.laboratorioEditado, this.url + 'laboratorio/actualizar/' + id, 'Laboratorio Actualizado existosamente', '/pagina-laboratorios')
            }
        },
        obtenerTiposLaboratorios() {
            axios.get(this.url + 'tipolaboratorio/encontrar-todos').then(
                (response) => {
                    this.tiposLaboratorios = response.data
                }
            )
        },
        eliminarLaboratorio(id) {
            confirmar(this.url + 'laboratorio/eliminar-por/', id, 'Eliminar Laboratorio', 'Realmente desea eliminar este laboratorio?', '/pagina-laboratorios')
        },
        laboratoriosFiltrados() {
            axios.get(this.url + 'laboratorio/busqueda?filtro=' + this.filtro).then(
                (response) => {
                    this.cargando = true;
                    this.laboratorios = response.data;
                    this.cargando = false;
                }
            ).catch(function (error) {
                console.error("Estado de la petición: ", error);
                alert('No se pudo realizar la acción');
            });
        }
    }
}
</script>

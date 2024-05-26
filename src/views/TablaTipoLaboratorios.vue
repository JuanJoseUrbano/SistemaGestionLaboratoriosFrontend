<template>
    <div class="container">
        <div class="row mt-3">
            <h1 class="text-center mb-5">Información acerca de tipo de Labratorios</h1>
            <div class="col-md-6 offset-md-3">
                <div class="modal fade" id="guardar_tipolab" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Tipo de Laboratorio</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Nombre</label>
                                    <input type="text" class="form-control" v-model="tipoLabNuevo.nombre" id="nombre"
                                        required>
                                </div>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Descripción</label>
                                    <input type="text" class="form-control" v-model="tipoLabNuevo.descripcion"
                                        id="nombre" required>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-success"
                                    @click="guardarTipoLaboratorio()">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="editar_tipolab" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Tipo de Laboratorio</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Nombre</label>
                                    <input type="text" class="form-control" v-model="tipoLabEditado.nombre" id="nombre"
                                        required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Descripción</label>
                                    <input type="text" class="form-control" v-model="tipoLabEditado.descripcion"
                                        id="nombre" required>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary"
                                    @click="actualizarTipoLaboratorio(tipoLabEditado.id)">Actualizar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-100 d-flex justify-content-start mb-3">
                <button class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#guardar_tipolab">Agregar</button>
            </div>
            <div class="table-responsive table-bordered">
                <div class="alert alert-success d-flex align-items-center">
                    <p class="mb-0">{{ cantidadResultado }} Resultados</p>
                </div>
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="cargando">
                            <td colspan="5">
                                <h3>Cargando...</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="x in tipoLaboratorios" :key="x.id">
                            <td>{{ x.id }}</td>
                            <td>{{ x.nombre }}</td>
                            <td>{{ x.descripcion }}</td>
                            <td>
                                <p v-if="x.estado">
                                    <img src="../assets/comprobado.png" style="width: 25px; height: 25px;" />
                                </p>
                                <p v-else>
                                    <img src="../assets/desactivar.png" style="width: 25px; height: 25px;" />
                                </p>
                            </td>
                            <td>
                                <div class="d-flex align-items-center justify-content-center">
                                    <button class="btn btn-warning btn-sm me-2" @click="obtenerPorId(x.id)">
                                        Editar
                                    </button>
                                    <button @click="eliminarTipoLaboratorio(x.id)" class="btn btn-danger btn-sm">
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
            url: 'http://localhost:8081/laboratorio-corhuila/laboratorio-corhuila/tipolaboratorio/'
        }
    },
    mounted() {
        this.obtenerTipoLaboratorio();
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
                enviarSolicitud('POST', this.tipoLabNuevo, this.url + 'guardar', 'Reserva agregada existosamente', '/pagina-tipo-laboratorios')
            }
        },
        obtenerPorId(id) {
            let modal = new Modal(document.getElementById('editar_rol'));
            modal.show();
            axios.get(this.url + 'encontrar-por/' + id).then(
                (response) => {
                    let data = response.data
                    this.editRol.id = data.id
                    this.editRol.nombre = data.nombre
                }
            )
        },
        actualizarTipoLaboratorio(id) {
            if (this.tipoLabEditado.nombre.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese un nombre')
            } else if (this.tipoLabEditado.descripcion.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese una descripción')
            } else {
                enviarSolicitud('PUT', this.tipoLabEditado, this.url + 'actualizar/' + id, 'Tipo de Laboratorio actualizada existosamente', '/pagina-tipo-laboratorios')
            }
        },

        eliminarTipoLaboratorio(id) {
            confirmar(this.url + 'eliminar-por/', id, 'Eliminar Rol', 'Realmente desea realizar esta acción?', '/pagina-tipo-laboratorios')
        }

    }
}
</script>
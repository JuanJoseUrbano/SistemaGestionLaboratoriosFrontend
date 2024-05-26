<template>
    <div class="container">
        <div class="row mt-3">
            <h1 class="text-center mb-5">Información acerca de roles</h1>
            <div class="col-md-6 offset-md-3">
                <div class="modal fade" id="guardar_rol" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Rol</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Nombre</label>
                                    <input type="text" class="form-control" v-model="nuevoRol.nombre" id="nombre"
                                        required>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-success" @click="guardarRol()">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="editar_rol" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Rol</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Nombre</label>
                                    <input type="text" class="form-control" v-model="editRol.nombre" id="nombre"
                                        required>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary" @click="actualizarRol(editRol.id)">Actualizar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-100 d-flex justify-content-start mb-3">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#guardar_rol">Agregar</button>
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
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="cargando">
                            <td colspan="4">
                                <h3>Cargando...</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="rol in roles" :key="rol.id">
                            <td>{{ rol.id }}</td>
                            <td>
                                <p> {{ rol.nombre }}</p>
                            </td>
                            <td>
                                <p v-if="rol.estado">
                                    <img src="../assets/comprobado.png" style="width: 25px; height: 25px;" />
                                </p>
                                <p v-else>
                                    <img src="../assets/desactivar.png" style="width: 25px; height: 30px;" />
                                </p>
                            </td>
                            <td>
                                <div class="d-flex align-items-center justify-content-center">
                                    <button class="btn btn-warning btn-sm me-2" @click="obtenerPorId(rol.id)" >
                                        Editar
                                    </button>
                                    <button @click="eliminarRol(rol.id)" class="btn btn-danger btn-sm">
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
            roles: null,
            nuevoRol: {
                nombre: ''
            },
            editRol: {
                id:0,
                nombre: ''
            },
            cantidadResultado: 0,
            cargando: false,
            url: 'http://localhost:8081/laboratorio-corhuila/laboratorio-corhuila/rol/'
        }
    },
    mounted() {
        this.obtenerRoles();
    },
    methods: {
        obtenerRoles() {
            this.cargando = true
            axios.get(this.url + 'encontrar-todos').then(
                (response) => {
                    this.roles = response.data;
                    this.cantidadResultado = this.roles.length
                    this.cargando = false;
                }).catch(function (error) {
                    console.error("Estado de la petición: ", error);
                    mostrarAlerta('Servidor caido', 'warning')
                });
        },
        guardarRol() {
            if (this.nuevoRol.nombre.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese un nombre')
            } else {
                enviarSolicitud('POST', this.nuevoRol, this.url + 'guardar', 'Reserva agregada existosamente', '/pagina-roles')
            }
        },
        obtenerPorId(id){
            let modal = new Modal(document.getElementById('editar_rol'));
            modal.show();
            axios.get(this.url+'encontrar-por/'+id).then(
                (response)=>{
                    let data = response.data
                    this.editRol.id = data.id
                    this.editRol.nombre = data.nombre
                }
            )
        },
        actualizarRol(id){
            if (this.nuevoRol.nombre.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese un nombre')
            } else {
            enviarSolicitud('PUT',this.editRol,this.url + 'actualizar/'+id, 'Reserva actualizada existosamente', '/pagina-roles')
            }
        },

        eliminarRol(id) {
            confirmar(this.url + 'eliminar-por/', id, 'Eliminar Rol', 'Realmente desea eliminar este rol?', '/pagina-roles')
        }

    }
}
</script>
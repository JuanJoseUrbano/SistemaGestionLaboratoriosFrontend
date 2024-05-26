<template>
    <div class="container">
        <div class="row mt-3">
            <h1 class="text-center mb-5">Información acerca de Usuarios</h1>
            <div class="col-md-6 offset-md-3">
                <div class="input-group md-3 w-auto mb-3">
                    <input type="text" class="form-control" v-model="filtro"
                        placeholder="Buscar por nombres, email o telefono">
                    <button @click="usuariosFiltrados" class="btn btn-primary">
                        Buscar
                    </button>
                    <button @click="obtenerUsuarios" class="btn btn-secondary">
                        Cancelar
                    </button>
                </div>
                <div class="modal fade" id="guardar_usuario" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Nuevo Usuario</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Nombres</label>
                                    <input type="text" class="form-control" v-model="usuarioNuevo.nombres" id="nombres"
                                        required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Apellidos</label>
                                    <input type="text" class="form-control" v-model="usuarioNuevo.apellidos"
                                        id="apellidos" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Correo</label>
                                    <input type="text" class="form-control" v-model="usuarioNuevo.correo" id="correo"
                                        required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Telefono</label>
                                    <input type="number" class="form-control" v-model="usuarioNuevo.telefono"
                                        id="nombre" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Rol:</label>
                                    <select class="form-select" aria-label="Seleccionar laboratorio"
                                        v-model="usuarioNuevo.rol.id" id="laboratorio">
                                        <option disabled>SELECCIONE UN LABORATORIO...</option>
                                        <option v-for="rol in roles" :key="rol.id" :value="rol.id">{{
                        rol.nombre }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-success" @click="guardarUsuario()">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="editar_usuario" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Usuario</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Nombres</label>
                                    <input type="text" class="form-control" v-model="usuarioEditado.nombres"
                                        id="nombres" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Apellidos</label>
                                    <input type="text" class="form-control" v-model="usuarioEditado.apellidos"
                                        id="apellidos" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Correo</label>
                                    <input type="text" class="form-control" v-model="usuarioEditado.correo" id="correo"
                                        required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Telefono</label>
                                    <input type="number" class="form-control" v-model="usuarioEditado.telefono"
                                        id="nombre" required>
                                </div>
                                <div class="mb-3 d-flex align-items-center">
                                    <label class="form-label me-3">Rol:</label>
                                    <select class="form-select" aria-label="Seleccionar laboratorio"
                                        v-model="usuarioEditado.rol.id" id="laboratorio">
                                        <option disabled>SELECCIONE UN LABORATORIO...</option>
                                        <option v-for="rol in roles" :key="rol.id" :value="rol.id">{{
                        rol.nombre }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary"
                                    @click="actualizarUsuario(usuarioEditado.id)">Actualizar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-100 d-flex justify-content-start mb-3">
                <button class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#guardar_usuario">Agregar</button>
            </div>
            <div class="table-responsive table-bordered">
                <div class="alert alert-success d-flex align-items-center">
                    <p class="mb-0">{{ cantidadUsuarios }} Resultados</p>
                </div>
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th>Rol</th>
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
                        <tr v-else v-for="user in usuarios" :key="user.id">
                            <td>{{ user.id }}</td>
                            <td>{{ user.nombres }}</td>
                            <td>{{ user.apellidos }}</td>
                            <td>{{ user.correo }}</td>
                            <td>{{ user.telefono }}</td>
                            <td>
                                <p v-if="user.rol.nombre">{{ user.rol.nombre }}</p>
                                <p v-else>NO TIENE ASOCIADO</p>
                            </td>
                            <td>
                                <p v-if="user.estado">
                                    <img src="../assets/comprobado.png" style="width: 25px; height: 25px;" />
                                </p>
                                <p v-else>
                                    <img src="../assets/desactivar.png" style="width: 25px; height: 30px;" />
                                </p>
                            </td>
                            <td>
                                <div class="d-flex align-items-center justify-content-center">
                                    <button @click="obtenerPorId(user.id)" class="btn btn-warning btn-sm me-2">
                                        Editar
                                    </button>
                                    <button @click="eliminarUsuario(user.id, user.correo)"
                                        class="btn btn-danger btn-sm">
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
        }
    },
    mounted() {
        this.obtenerUsuarios()
        this.obtenerRoles()
    },
    methods: {
        guardarUsuario() {
            if (this.usuarioNuevo.nombres.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese los nombres')
            } else if (this.usuarioNuevo.apellidos.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese los apellidos')
            } else if (this.usuarioNuevo.correo.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese el correo')
            } else if (this.usuarioNuevo.telefono === null) {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese el numero de contacto')
            } else if (this.usuarioNuevo.rol.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un rol')
            } else {
                enviarSolicitud('POST', this.usuarioNuevo, this.url + 'usuario/guardar', 'Usuario agregado existosamente', '/pagina-usuarios')
            }
        },
        obtenerUsuarios() {
            this.filtro = ''
            this.cargando = true
            axios.get(this.url + 'usuario/encontrar-todos').then(
                (response) => {
                    this.usuarios = response.data;
                    this.cantidadUsuarios = this.usuarios.length
                    this.cargando = false;
                }).catch(function (error) {
                    console.error("Estado de la petición: ", error);
                    mostrarAlerta('Servidor caido', 'warning')
                });
        },
        obtenerPorId(id) {
            let modal = new Modal(document.getElementById('editar_usuario'));
            modal.show();
            axios.get(this.url + 'usuario/encontrar-por/' + id).then(
                (response) => {
                    let data = response.data
                    this.usuarioEditado.id = data.id
                    this.usuarioEditado.nombres = data.nombres
                    this.usuarioEditado.apellidos = data.apellidos
                    this.usuarioEditado.correo = data.correo
                    this.usuarioEditado.telefono = data.telefono
                    this.usuarioEditado.rol.id = data.rol.id
                }
            )
        },
        usuariosFiltrados() {
            axios.get(this.url + 'usuario/busqueda?filtro=' + this.filtro).then(
                (response) => {
                    this.cargando = true;
                    this.usuarios = response.data;
                    this.cargando = false;
                }
            ).catch(function (error) {
                console.error("Estado de la petición: ", error);
                alert('No se pudo realizar la acción');
            });
        },
        actualizarUsuario(id) {
            if (this.usuarioEditado.nombres.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese los nombres')
            } else if (this.usuarioEditado.apellidos.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese los apellidos')
            } else if (this.usuarioEditado.correo.trim() === '') {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese el correo')
            } else if (this.usuarioEditado.telefono === null) {
                mostrarAlerta('Información incompleta', 'info', 'Ingrese el numero de contacto')
            } else if (this.usuarioEditado.rol.id === 0) {
                mostrarAlerta('Información incompleta', 'info', 'Seleccione un rol')
            } else {
                enviarSolicitud('PUT', this.usuarioEditado, this.url + 'usuario/actualizar/' + id, 'Usuario Actualizado existosamente', '/pagina-usuarios')
            }
        },
        obtenerRoles() {
            axios.get(this.url + 'rol/encontrar-todos').then((response) => {
                this.roles = response.data
            })
        },
        eliminarUsuario(id, correo) {
            confirmar(this.url + 'usuario/eliminar-por/', id, 'Eliminar Usuario', 'Realmente desea eliminar a ' + correo + ' ?', '/pagina-usuarios')
        }
    }
}
</script>
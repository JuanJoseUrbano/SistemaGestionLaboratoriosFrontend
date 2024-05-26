import Swal from 'sweetalert2'
import axios from 'axios'


export function mostrarAlerta(titulo, icono, mensaje) {
    Swal.fire({
        title: titulo,
        icon: icono,
        text: mensaje,
        customClass: { confirmButtonColor: 'btn btn-primary', popup: 'animated zoomIn' }
    })
}

export function confirmar(peticion, id, titulo, mensaje, redireccionamiento) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
        cancelButtonText: 'No, cancelar',
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            enviarSolicitud('PUT', { id: id }, peticion + id, 'Eliminado',redireccionamiento)
        } else {
            mostrarAlerta('Opcion cancelada', 'info')
        }
    })
}

export function enviarSolicitud(metodo, parametros, url, mensaje, ruta) {
    axios({ method: metodo, url: url, data: parametros })
    .then(function (response) {
        let estado = response.status;
        if (estado === 200) {
            mostrarAlerta(mensaje, 'success');
            window.location.href=ruta
        }
    })
    .catch(function (error) {
        console.error("Estado de la petición: ", error);
        mostrarAlerta('No se pudo realizar la acción', 'info');
    });
}

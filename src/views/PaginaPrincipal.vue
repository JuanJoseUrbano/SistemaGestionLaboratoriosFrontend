<template>
    <div class="container">
    <div class="row text-azure text-center mb-5">
        <div class="col-sm-12 col-md-4 col-lg-6 col-lg-2 text-azure mb-5 mt-5 content-wrapper">
            <h1>Bienvenido al {{ titulo }} de Corhuila</h1>
            <br>
            <h5>{{ descripcion }}</h5>
            <img src="../assets/laboratorio_img.png" class="laboratorio-img">
            <h1></h1>
            <div class="menu-buttons mt-4">
                <router-link to="/pagina-laboratorios" class="btn btn-dark">Laboratorios</router-link>
                <router-link to="/pagina-usuarios" class="btn btn-dark">Usuarios</router-link>
                <router-link to="/pagina-reservas" class="btn btn-dark">Reservas</router-link>
                <router-link to="/pagina-tipos-laboratorios" class="btn btn-dark">Tipo de Laboratorios</router-link>
                <router-link to="/pagina-roles" class="btn btn-dark">Roles</router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'MyComponent',
    data() {
        return {
            titulo : 'Sistema de gestión Laboratorio',
            descripcion: 'Este sistema permitirá gestionar toma la información relacionada a los labolatorios de la sede Prado Alto de la Corporación Universitaria del Huila.'
        }
    }

}
</script>

<style>

.row {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 5rem; /* Espacio inferior */
}

.content-wrapper {
    background-color: #f9f9f9; /* Fondo claro */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.laboratorio-img {
    width: 60vh;
    max-width: 100%; /* Asegúrate de que la imagen no sobresalga del contenedor */
    border-radius: 8px; /* Bordes redondeados */
}

/* Responsividad */
@media (max-width: 768px) {
    .content-wrapper {
        margin-bottom: 20px;
    }
    
    .row {
        flex-direction: column;
    }
}
.menu-buttons {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Espacio entre los botones */
}

</style>
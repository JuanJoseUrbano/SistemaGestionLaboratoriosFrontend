<template>
  <div class="container my-5">
    <div class="row justify-content-center align-items-center text-center">
      <div class="col-12 col-md-10 col-lg-8 content-wrapper p-4">
        <h1 class="mb-3 text fw-bold">
          Bienvenido al {{ titulo }} de Corhuila
        </h1>
        <p class="lead mb-4 text-secondary">
          {{ descripcion }}
        </p>
        <img
          src="../assets/laboratorio_img.png"
          alt="Laboratorio Corhuila"
          class="img-fluid laboratorio-img mb-4 mx-auto d-block"
        />
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <router-link to="/pagina-laboratorios" class="btn btn-outline-dark px-4 py-2">
            Laboratorios
          </router-link>
          <router-link to="/pagina-usuarios" class="btn btn-outline-dark px-4 py-2">
            Usuarios
          </router-link>
          <router-link to="/pagina-reservas" class="btn btn-outline-dark px-4 py-2">
            Reservas
          </router-link>
          <router-link to="/pagina-tipos-laboratorios" class="btn btn-outline-dark px-4 py-2">
            Tipo de Laboratorios
          </router-link>
          <router-link to="/pagina-roles" class="btn btn-outline-dark px-4 py-2">
            Roles
          </router-link>
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
      titulo: 'Sistema de Gestión Laboratorio',
      descripcion:
        'Este sistema permite gestionar la información relacionada con los laboratorios de la sede Prado Alto de la Corporación Universitaria del Huila.'
    };
  }
};
</script>

<style scoped>
.content-wrapper {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.laboratorio-img {
  max-height: 350px;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
}

.btn-outline-primary {
  font-weight: 600;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
}
</style>

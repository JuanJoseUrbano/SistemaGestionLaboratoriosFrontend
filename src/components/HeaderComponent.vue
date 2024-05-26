<template>
  <nav class="navbar navbar-expand-lg  bg-light">
      <img class="me-2" src="../assets/logo_corhuila.png" width="30" height="30">
      <a class="navbar-brand" href="/pagina-principal">GESTIÓN DE LABORATORIO</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link">
              <router-link to='/pagina-reservas' class="nav-link">Reservas</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link ">
              <router-link to='/pagina-laboratorios' class="nav-link">Laboratorios</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <router-link to='/pagina-tipos-laboratorios' class="nav-link">Tipo de laboratorios</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <router-link to='/pagina-usuarios' class="nav-link">Usuarios</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <router-link to='/pagina-roles' class="nav-link">Roles</router-link>
            </a>
          </li>
        </ul>
      </div>
  </nav>
</template>

<script>
export default {
  name: 'HeadApp'
}
</script>
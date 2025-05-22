<template>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container-fluid">
      <div class="d-flex align-items-center">
        <img class="logo-img" src="../assets/logo_corhuila.png" alt="Logo Corhuila">
        <router-link to="/pagina-principal" class="navbar-brand">
          <span class="brand-main">GESTIÓN DE LABORATORIOS</span>
          <span class="brand-sub">CORHUILA</span>
        </router-link>
      </div>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
        aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/pagina-reservas" class="nav-link" active-class="active">
              <i class="fas fa-calendar-alt nav-icon"></i>
              <span class="nav-text">Reservas</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/pagina-laboratorios" class="nav-link" active-class="active">
              <i class="fas fa-flask nav-icon"></i>
              <span class="nav-text">Laboratorios</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/pagina-tipos-laboratorios" class="nav-link" active-class="active">
              <i class="fas fa-microscope nav-icon"></i>
              <span class="nav-text">Tipos</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/pagina-usuarios" class="nav-link" active-class="active">
              <i class="fas fa-users nav-icon"></i>
              <span class="nav-text">Usuarios</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/pagina-roles" class="nav-link" active-class="active">
              <i class="fas fa-user-tag nav-icon"></i>
              <span class="nav-text">Roles</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
/* Opción 1: Fondo blanco con borde inferior */
.navbar-custom {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #eaeaea;
}

/* Opción 2: Fondo azul claro institucional */
/*
.navbar-custom {
  background-color: #e6f2ff;
  border-bottom: 1px solid #cce0ff;
}
*/

/* Opción 3: Fondo gris muy claro */
/*
.navbar-custom {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e1e5e8;
}
*/

.logo-img {
  width: 40px;
  height: 40px;
  margin-right: 12px;
  object-fit: contain;
}

.navbar-brand {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  margin-right: 2rem;
  color: #2c3e50 !important;
}

.brand-main {
  font-weight: 700;
  font-size: 1.1rem;
  color: #2c3e50;
}

.brand-sub {
  font-weight: 400;
  font-size: 0.8rem;
  color: #7f8c8d;
}

.nav-link {
  color: #34495e !important;
  padding: 0.75rem 1rem !important;
  margin: 0 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: #f5f7fa;
}

.nav-link.active {
  color: #2980b9 !important;
  font-weight: 500;
  background-color: #ebf5fb;
}

.nav-icon {
  margin-right: 8px;
  font-size: 0.9rem;
  width: 20px;
  text-align: center;
  color: #3498db;
}

.nav-text {
  font-size: 0.95rem;
}

.navbar-toggler {
  border-color: rgba(0, 0, 0, 0.1) !important;
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .nav-link {
    margin: 0.25rem 0;
    padding: 0.5rem 1rem !important;
  }
}
</style>
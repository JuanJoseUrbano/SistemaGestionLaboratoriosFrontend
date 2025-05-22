<template>
  <footer class="footer-custom">
    <div class="footer-content container py-4">
      <div class="footer-section text-center text-md-start">
        <div class="footer-brand mb-3">
          <img class="footer-logo" src="../assets/logo_corhuila.png" alt="Logo Corhuila">
          <span class="footer-title">Gestión de Laboratorios</span>
        </div>
        
        <div class="footer-links">
          <p class="footer-terms mb-2">© 2023 Corporación Universitaria del Huila - Sede Prado Alto</p>
          <p class="footer-address mb-2">Neiva, Huila - Colombia</p>
          <p class="footer-contact mb-0">
            Contacto del desarrollador: 
            <a href="mailto:urbanoperdomoj@gmail.com" class="footer-link">
              urbanoperdomoj@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer-custom {
  background-color: #f8f9fa;
  color: #34495e;
  margin-top: 3rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
}

/* Efecto de sombra en el borde superior */
.footer-custom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #e1e5e8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  position: relative; /* Asegura que el contenido esté sobre el pseudo-elemento */
  z-index: 1; /* Asegura que el contenido esté sobre el pseudo-elemento */
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.footer-logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  object-fit: contain;
}

.footer-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: #2c3e50;
}

.footer-terms {
  font-size: 0.9rem;
  font-weight: 500;
}

.footer-address {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.footer-contact {
  font-size: 0.9rem;
}

.footer-link {
  color: #3498db;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #2980b9;
  text-decoration: underline;
}

@media (min-width: 768px) {
  .footer-section {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .footer-brand {
    margin-bottom: 0;
    justify-content: flex-start;
  }
  
  .footer-links {
    text-align: right;
  }
}
</style>
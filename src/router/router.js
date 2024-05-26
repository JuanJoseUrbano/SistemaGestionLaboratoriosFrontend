import { createRouter, createWebHistory} from 'vue-router'
import PaginaPrincipal from "@/views/PaginaPrincipal.vue";
import TablaReservas from '@/views/TablaReservas.vue';
import TablaRoles from '@/views/TablaRoles.vue';
import TablaLaboratorios from '@/views/TablaLaboratorios.vue';
import TablaUsuarios from '@/views/TablaUsuarios.vue';
import TablaTipoLaboratorios from '@/views/TablaTipoLaboratorios.vue';

const routes = [
  { redirect: '/pagina-principal', component: PaginaPrincipal },
  { path: '/pagina-principal', component: PaginaPrincipal },
  { path: '/pagina-reservas', component: TablaReservas },
  { path: '/pagina-roles', component: TablaRoles },
  { path: '/pagina-laboratorios', component: TablaLaboratorios },
  { path: '/pagina-usuarios', component: TablaUsuarios },
  { path: '/pagina-tipos-laboratorios', component: TablaTipoLaboratorios }
]

const router = createRouter(
  {
    history: createWebHistory(),
    routes,
  })

export default router;
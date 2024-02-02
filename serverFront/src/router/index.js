import { createRouter, createWebHistory } from "vue-router";

// Importa los componentes que se usarán como rutas
import panelControl from "../components/panelControl.vue";
import informacionGen from "../components/informacionGen.vue";

const routes = [
  {
    path: "/",
    name: "informacionGen",
    component: informacionGen,
  },
  {
    path: "/panelControl",
    name: "panelControl",
    component: panelControl,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";

export default {
  name: 'app',
  components: { LanguageSwitcher },
  title: 'TelaSecure',
  data() {
    return {
      drawer: false,
      items: [
        { label: 'Control Ambiental', to: '/control-ambiental' },
        { label: 'Reportes y análisis', to: '/reportes-y-analisis' },
        { label: 'Inventario', to: '/publishing/categories' },
        { label: 'Mantenimiento y soporte', to: '/mantenimiento-y-soporte' },
      ]
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
}
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <header>
    <pv-toolbar class="dark-toolbar">
      <template #start>
        <pv-button class="p-button-text hamburger-menu" icon="pi pi-bars" @click="toggleDrawer"/>
        <h3 class="title-color">TelaSecure</h3>
      </template>
      <template #center>
        <div class="flex-column">
          <router-link v-for="item in items"
                       :key="item.label"
                       v-slot="{ navigate, href }"
                       :to="item.to" custom>
            <pv-button class="p-button-text no-border" :href="href" @click="navigate">{{item.label}}</pv-button>
          </router-link>
        </div>
      </template>
      <template #end>
        <language-switcher/>
      </template>
    </pv-toolbar>
    <pv-drawer v-model:visible="drawer">
      <template #header>
        <h3 class="drawer-title">Menu</h3>
      </template>
      <template #content>
        <ul>
          <li v-for="item in items" :key="item.label">
            <router-link :to="item.to" class="drawer-link">{{ item.label }}</router-link>
          </li>
        </ul>
      </template>
    </pv-drawer>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<style scoped>
/* Estilo para el toolbar azul oscuro */
.dark-toolbar {
  background-color: #213159; /* Azul oscuro */
  color: #e6e6e6; /* Color de texto blanco */
}

/* Estilo para los botones del toolbar sin borde */
.no-border {
  border: none; /* Elimina el borde de los botones */
  background: none; /* Elimina el fondo del botón */
  color: #a3a3a3; /* Asegura que el texto sea blanco */
}



/* Estilos para el sidebar */
.drawer-title {
  color: black; /* Azul oscuro para el título del sidebar */
  text-align: center; /* Centra el título */
}

.drawer-link {
  display: block; /* Hace que el enlace ocupe toda la línea */
  padding: 10px; /* Espaciado para el enlace */
  color: #003366; /* Color del texto del enlace */
  text-decoration: none; /* Sin subrayado */
}

.drawer-link:hover {
  background-color: #000000; /* Color de fondo al pasar el ratón */
}

.hamburger-menu {
  color: #000000; /* Cambia este valor al color que desees */
}

.hamburger-menu:hover {
  color: #5a5a5a; /* Cambia este valor al color que desees para el hover */
}
</style>

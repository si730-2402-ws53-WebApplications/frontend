<template>
  <div class="w-full">
    <data-manager :title="title"
                  v-bind:items="categories"
                  v-on:new-item-requested="onNewItem"
                  v-on:edit-item-requested="onEditItem($event)"
                  v-on:delete-item-requested="onDeleteItem($event)"
                  v-on:delete-selected-items-requested="onDeleteSelectedItems($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="codigo" header="Código" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="nombre" header="Nombre" style="min-width: 24rem"/>
        <pv-column :sortable="true" field="almacen" header="Almacén" style="min-width: 16rem"/>
        <pv-column :sortable="true" field="categoria" header="Categoría" style="min-width: 16rem"/>
        <pv-column :sortable="true" field="cantidad" header="Cantidad" style="min-width: 12rem"/>
      </template>
    </data-manager>
    <category-create-and-edit-dialog
        :edit="isEdit"
        :item="category"
        :visible="createAndEditDialogIsVisible"
        v-on:cancel-requested="onCancelRequested"
        v-on:save-requested="onSaveRequested($event)"/>
  </div>
</template>

<script>
import { Category } from "../model/category.entity.js";
import { CategoryService } from "../services/category.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import CategoryCreateAndEditDialog from "../components/category-create-and-edit.component.vue";

export default {
  name: "category-management",
  components: { CategoryCreateAndEditDialog, DataManager },
  data() {
    return {
      title: { singular: "Category", plural: "Categories" },
      categories: [], // Aquí se cargarán las telas
      category: new Category({}), // Inicializa un nuevo objeto Category
      selectedCategories: [],
      categoryService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false
    }
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
    },
    findIndexById(id) {
      return this.categories.findIndex(category => category.id === id);
    },
    // Event Handlers
    onNewItem() {
      this.category = new Category({}); // Inicializa un nuevo objeto para el diálogo
      this.isEdit = false; // Indica que no se está editando
      this.createAndEditDialogIsVisible = true; // Muestra el diálogo
    },
    onEditItem(item) {
      this.category = new Category(item); // Carga los datos de la categoría seleccionada
      this.isEdit = true; // Indica que se está editando
      this.submitted = false; // Reinicia el estado de envío
      this.createAndEditDialogIsVisible = true; // Muestra el diálogo
    },
    onDeleteItem(item) {
      this.category = new Category(item); // Carga la categoría seleccionada
      this.deleteCategory(); // Llama al método para eliminar la categoría
    },
    onDeleteSelectedItems(selectedItems) {
      this.selectedCategories = selectedItems; // Guarda las categorías seleccionadas
      this.deleteSelectedCategories(); // Llama al método para eliminar las categorías seleccionadas
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false; // Oculta el diálogo
      this.submitted = false; // Reinicia el estado de envío
      this.isEdit = false; // Reinicia el estado de edición
    },
    onSaveRequested(item) {
      this.submitted = true; // Marca que se ha enviado el formulario
      // Verifica que todos los campos requeridos estén llenos
      if (item.codigo.trim() && item.nombre.trim() && item.almacen.trim() && item.categoria.trim() && item.cantidad >= 0) {
        if (this.isEdit) {
          this.updateCategory(); // Actualiza la categoría existente
        } else {
          this.createCategory(); // Crea una nueva categoría
        }
        this.createAndEditDialogIsVisible = false; // Oculta el diálogo
        this.isEdit = false; // Reinicia el estado de edición
      }
    },
    // Service client methods
    createCategory() {
      this.categoryService.create(this.category).then(response => {
        let category = new Category(response.data);
        this.categories.push(category); // Agrega la nueva categoría a la lista
        this.notifySuccessfulAction("Category created successfully"); // Notifica éxito
      }).catch(error => console.error(error));
    },
    updateCategory() {
      this.categoryService.update(this.category.id, this.category).then(response => {
        let index = this.findIndexById(this.category.id);
        this.categories[index] = new Category(response.data); // Actualiza la categoría en la lista
        this.notifySuccessfulAction("Category updated successfully"); // Notifica éxito
      }).catch(error => console.error(error));
    },
    deleteCategory() {
      this.categoryService.delete(this.category.id).then(() => {
        let index = this.findIndexById(this.category.id);
        this.categories.splice(index, 1); // Elimina la categoría de la lista
        this.notifySuccessfulAction("Category deleted successfully"); // Notifica éxito
      }).catch(error => console.error(error));
    },
    deleteSelectedCategories() {
      this.selectedCategories.forEach((category) => {
        this.categoryService.delete(category.id).then(() => {
          this.categories = this.categories.filter((c) => c.id !== category.id); // Filtra las categorías eliminadas
        });
      });
      this.notifySuccessfulAction("Selected Categories deleted successfully"); // Notifica éxito
    }
  },

  // Lifecycle Hooks
  created() {
    this.categoryService = new CategoryService(); // Inicializa el servicio de categoría
    this.categoryService.getAll().then(response => {
      this.categories = response.data.map(category => new Category(category)); // Carga las categorías
    }).catch(error => console.error(error));
  }
}
</script>

<style scoped>

</style>

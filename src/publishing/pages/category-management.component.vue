<script>
import { Category } from "../model/category.entity.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import CategoryCreateAndEditDialog from "../components/category-create-and-edit.component.vue";

// Simula la data que viene del db.json
const categoriesFromJson = [
  {
    id: 1,
    codigo: "A001",
    nombre: "Tela Algodón",
    almacen: "Almacén Central",
    categoria: "Algodón",
    cantidad: 120
  },
  {
    id: 2,
    codigo: "A002",
    nombre: "Tela Poliéster",
    almacen: "Almacén Norte",
    categoria: "Poliéster",
    cantidad: 80
  },
  {
    id: 3,
    codigo: "A003",
    nombre: "Tela Lino",
    almacen: "Almacén Sur",
    categoria: "Lino",
    cantidad: 50
  },
  {
    id: 4,
    codigo: "A004",
    nombre: "Tela Seda",
    almacen: "Almacén Este",
    categoria: "Seda",
    cantidad: 30
  }

];

export default {
  name: "category-management",
  components: { CategoryCreateAndEditDialog, DataManager },
  data() {
    return {
      title: { singular: "Category", plural: "Categories" },
      categories: [],
      category: new Category({}),
      selectedCategories: [],
      categoryService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false
    };
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({ severity: "success", summary: "Success", detail: message, life: 3000 });
    },
    findIndexById(id) {
      return this.categories.findIndex((category) => category.id === id);
    },
    onNewItem() {
      this.category = new Category({});
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
    },
    onEditItem(item) {
      this.category = new Category(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onDeleteItem(item) {
      this.category = new Category(item);
      this.deleteCategory();
    },
    onDeleteSelectedItems(selectedItems) {
      this.selectedCategories = selectedItems;
      this.deleteSelectedCategories();
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      this.submitted = true;
      if (this.category.nombre.trim()) {
        if (item.id) {
          this.updateCategory();
        } else {
          this.createCategory();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    createCategory() {
      // Simula la creación de categoría
      const newCategory = new Category(this.category);
      newCategory.id = this.categories.length + 1; // Genera un ID nuevo
      this.categories.push(newCategory);
      this.notifySuccessfulAction("Category created successfully");
    },
    updateCategory() {
      const index = this.findIndexById(this.category.id);
      this.categories[index] = new Category(this.category);
      this.notifySuccessfulAction("Category updated successfully");
    },
    deleteCategory() {
      const index = this.findIndexById(this.category.id);
      this.categories.splice(index, 1);
      this.notifySuccessfulAction("Category deleted successfully");
    },
    deleteSelectedCategories() {
      this.selectedCategories.forEach((category) => {
        const index = this.findIndexById(category.id);
        if (index !== -1) {
          this.categories.splice(index, 1);
        }
      });
      this.notifySuccessfulAction("Selected Categories deleted successfully");
    }
  },
  created() {
    // Cargar categorías simulando la llamada a un servicio
    this.categories = categoriesFromJson.map((category) => new Category(category));
  }
};
</script>

<template>
  <div class="w-full">
    <data-manager
        :title="title"
        v-bind:items="categories"
        v-on:new-item-requested="onNewItem"
        v-on:edit-item-requested="onEditItem($event)"
        v-on:delete-item-requested="onDeleteItem($event)"
        v-on:delete-selected-items-requested="onDeleteSelectedItems($event)"
    >
      <template #custom-columns>
        <pv-column :sortable="true" field="id" header="ID" style="min-width: 12rem" />
        <pv-column :sortable="true" field="nombre" header="Nombre" style="min-width: 24rem" />
        <pv-column :sortable="true" field="almacen" header="Almacén" style="min-width: 24rem" />
        <pv-column :sortable="true" field="categoria" header="Categoría" style="min-width: 24rem" />
        <pv-column :sortable="true" field="cantidad" header="Cantidad" style="min-width: 24rem" />
      </template>
    </data-manager>
    <category-create-and-edit-dialog
        :edit="isEdit"
        :item="category"
        :visible="createAndEditDialogIsVisible"
        v-on:cancel-requested="onCancelRequested"
        v-on:save-requested="onSaveRequested($event)"
    />
  </div>
</template>

<style scoped>

.w-full{
  padding: 3rem;
}

</style>

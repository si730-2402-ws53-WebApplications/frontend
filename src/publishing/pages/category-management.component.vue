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
      title: { singular: "Fabric", plural: "Fabrics" },
      categories: [], // Se llenará con la data desde el servicio
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
      this.categoryService.create(this.category)
          .then(response => {
            let category = new Category(response.data);
            this.categories.push(category); // Añadir nueva categoría
            this.notifySuccessfulAction("Category created successfully");
          })
          .catch(error => console.error(error));
    },
    updateCategory() {
      this.categoryService.update(this.category.id, this.category)
          .then(response => {
            let index = this.findIndexById(this.category.id);
            this.categories[index] = new Category(response.data); // Actualizar la categoría
            this.notifySuccessfulAction("Category updated successfully");
          })
          .catch(error => console.error(error));
    },
    deleteCategory() {
      this.categoryService.delete(this.category.id)
          .then(() => {
            let index = this.findIndexById(this.category.id);
            this.categories.splice(index, 1); // Eliminar la categoría
            this.notifySuccessfulAction("Category deleted successfully");
          })
          .catch(error => console.error(error));
    },
    deleteSelectedCategories() {
      this.selectedCategories.forEach((category) => {
        this.categoryService.delete(category.id)
            .then(() => {
              this.categories = this.categories.filter(c => c.id !== category.id); // Eliminar las categorías seleccionadas
            })
            .catch(error => console.error(error));
      });
      this.notifySuccessfulAction("Selected Categories deleted successfully");
    }
  },
  created() {
    this.categoryService = new CategoryService();
    this.categoryService.getAll()
        .then(response => {
          this.categories = response.data.map(category => new Category(category)); // Cargar las categorías desde el servidor
        })
        .catch(error => console.error(error));
  }
};
</script>

<template>
  <div class="w-full">
    <h3>{{ $t('inventory.manage') }}</h3>
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
        <pv-column :sortable="true" field="nombre" :header="$t('inventory.name')" style="min-width: 24rem" />
        <pv-column :sortable="true" field="almacen" :header="$t('inventory.storeroom')" style="min-width: 24rem" />
        <pv-column :sortable="true" field="categoria" :header="$t('inventory.category')" style="min-width: 24rem" />
        <pv-column :sortable="true" field="cantidad" :header="$t('inventory.quantity')" style="min-width: 24rem" />
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

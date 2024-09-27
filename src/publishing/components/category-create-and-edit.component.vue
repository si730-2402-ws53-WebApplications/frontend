<template>
  <create-and-edit
      :entity="item"
      :visible="visible"
      entity-name="Category"
      @cancel-requested="onCancelRequested"
      @save-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="codigo">Código</label>
            <pv-input-text id="codigo" v-model="item.codigo" />
          </pv-float-label>
        </div>
        <div class="field">
          <pv-float-label>
            <label for="nombre">Nombre</label>
            <pv-input-text id="nombre" v-model="item.nombre" />
          </pv-float-label>
        </div>
        <div class="field">
          <pv-float-label>
            <label for="almacen">Almacén</label>
            <pv-input-text id="almacen" v-model="item.almacen" />
          </pv-float-label>
        </div>
        <div class="field">
          <pv-float-label>
            <label for="categoria">Categoría</label>
            <pv-input-text id="categoria" v-model="item.categoria" />
          </pv-float-label>
        </div>
        <div class="field">
          <pv-float-label>
            <label for="cantidad">Cantidad</label>
            <pv-input-text id="cantidad" v-model="item.cantidad" type="number" />
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "category-create-and-edit-dialog",
  components: { CreateAndEdit },
  props: {
    item: Object,
    visible: Boolean
  },
  data() {
    return {
      submitted: false
    }
  },
  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested', this.item);
    }
  }
}
</script>

<style scoped>

</style>

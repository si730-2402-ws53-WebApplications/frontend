<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "category-create-and-edit-dialog",
  components: { CreateAndEdit },
  props: {
    item: Object, // Cambiado a Object para reflejar la estructura esperada
    visible: Boolean
  },
  data() {
    return {
      submitted: false
    }
  },
  methods: {
    onCancelRequested() {
      //this.$emit('cancel-requested'); duplica
    },
    onSaveRequested() {
      this.submitted = true;
      //this.$emit('save-requested', this.item); duplica
    }
  }
}
</script>

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
            <label for="name">{{$t('inventory.name')}}</label>
            <pv-input-text id="name" v-model="item.nombre"
                           :class="{'p-invalid': submitted && !item.nombre }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="almacen">{{$t('inventory.storeroom')}}</label>
            <pv-input-text id="almacen" v-model="item.almacen"
                           :class="{'p-invalid': submitted && !item.almacen }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="categoria">{{$t('inventory.category')}}</label>
            <pv-input-text id="categoria" v-model="item.categoria"
                           :class="{'p-invalid': submitted && !item.categoria }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="cantidad">{{$t('inventory.quantity')}}</label>
            <pv-input-text id="cantidad" v-model.number="item.cantidad"
                           :class="{'p-invalid': submitted && item.cantidad < 0}"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>
</style>

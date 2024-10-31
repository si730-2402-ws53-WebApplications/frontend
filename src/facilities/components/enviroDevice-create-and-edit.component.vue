<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
export default {
  name: "enviroDevice-create-and-edit",
  components: {CreateAndEdit},
  props: {
    edit: Boolean,
    item: null,
    visible: Boolean
  },
  data() {
    return {
      submitted: false
    }
  },
  methods: {
    onCancelRequestedDevice() {

    },
    onSaveRequestedDevise() {

    }
  }
}


</script>

<template>
  <create-and-edit
      :entity="item"
      :visible="visible"
      :edit="edit"
      entity-name="Environment Device"
      @cancel-requested="onCancelRequestedDevice"
      @save-requested="onSaveRequestedDevise">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text id="name" v-model="item.name"
                           :class="{'p-invalid': submitted && !item.name }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="location">Model</label>
            <pv-input-text id="name" v-model="item.model"
                           :class="{'p-invalid': submitted && !item.model }"/>
          </pv-float-label>
        </div>




      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>

</style>
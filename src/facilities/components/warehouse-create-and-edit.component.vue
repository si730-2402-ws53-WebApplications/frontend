<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
export default {
  name: "warehouse-create-and-edit",
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
    onCancelRequested() {

    },
    onSaveRequested() {

    }
  }
}

</script>

<template>
  <create-and-edit
      :entity="item"
      :visible="visible"

      :edit="edit"

      entity-name="Store Room"
      @cancel-requested="onCancelRequested"
      @save-requested="onSaveRequested">
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
            <label for="location">Location</label>
            <pv-input-text id="name" v-model="item.location"
                           :class="{'p-invalid': submitted && !item.location }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="description">Description</label>
            <pv-input-text id="name" v-model="item.description"
                           :class="{'p-invalid': submitted && !item.description }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="capacity">Capacity</label>
            <pv-input-text id="name" v-model="item.capacity"
                           :class="{'p-invalid': submitted && !item.capacity< 0 }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="phone">Phone</label>
            <pv-input-text id="phone" v-model="item.contact.phone"
                           :class="{'p-invalid': submitted && !item.contact.phone }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="email">Email</label>
            <pv-input-text id="phone" v-model="item.contact.email"
                           :class="{'p-invalid': submitted && !item.contact.email }"/>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <pv-float-label>
            <label for="actualTemperature">Actual Temperature</label>
            <pv-input-text id="actualTemperature" v-model="item.temperature.actual"
                           :class="{'p-invalid': submitted && item.item.temperature.actual < 0 }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="maximumTemperature">Maximum Temperature</label>
            <pv-input-text id="maximumTemperature" v-model="item.temperature.maximum"
                           :class="{'p-invalid': submitted && item.temperature.maximum < 0 }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="minimumTemperature">Minimum Temperature</label>
            <pv-input-text id="minimumTemperature" v-model="item.temperature.minimum"
                           :class="{'p-invalid': submitted && item.item.temperature.minimum < 0 }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="temperatureUnit">Temperature Unit</label>
            <pv-input-text id="temperatureUnit" v-model="item.temperature.unit"
                           :class="{'p-invalid': submitted && !item.temperature.unit }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="actualHumidity">Actual Humidity</label>
            <pv-input-text id="actualHumidity" v-model="item.humidity.actual"
                           :class="{'p-invalid': submitted && item.humidity.actual< 0 }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="maximumHumidity">Maximum Humidity</label>
            <pv-input-text id="maximumHumidity" v-model="item.humidity.maximum"
                           :class="{'p-invalid': submitted && item.humidity.maximum < 0 }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="minimumHumidity">Minimum Humidity</label>
            <pv-input-text id="minimumHumidity" v-model="item.humidity.minimum"
                           :class="{'p-invalid': submitted && item.humidity.minimum < 0 }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="humidityUnit">Humidity Unit</label>
            <pv-input-text id="humidityUnit" v-model="item.humidity.unit"
                           :class="{'p-invalid': submitted && !item.humidity.unit }"/>
          </pv-float-label>
        </div>
      </div>

    </template>
  </create-and-edit>
</template>

<style scoped>

</style>
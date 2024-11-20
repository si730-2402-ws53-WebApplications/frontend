<script>
import {Warehouse} from "../model/warehouse.entity.js";
import {WarehouseService} from "../services/warehouse.service.js";
import WarehouseList from "../components/warehouse-list.component.vue";

import WarehouseCreateAndEdit from "../components/warehouse-create-and-edit.component.vue";
import {ClimateSensor} from "../model/climateSensor.entity.js";
import ClimateSensorCreateAndEdit from "../components/climateSensor-create-and-edit.vue";
import EnviroDeviceCreateAndEdit from "../components/enviroDevice-create-and-edit.component.vue";
import {EnviroDevice} from "../model/enviroDevice.entity.js";





export default {
  name: "warehouse-management",
  components: {
    EnviroDeviceCreateAndEdit,
    ClimateSensorCreateAndEdit, WarehouseCreateAndEdit, WarehouseList
  },

  data() {
    return {
      warehouse: new Warehouse({}),
      climateSensor: new ClimateSensor({}),
      enviroDevice: new EnviroDevice({}),
      Warehouses: [],
      //Sensor
      sensors: [],
      WarehouseService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      //Sensor Dialog
      isEditSensor: false,
      createAndEditDialogIsVisibleSensor: false,

      //Device Dialog
      devices: [],
      createAndEditDialogIsVisibleDevice: false,
      isEditDevice: false,

    }
  },
  created() {
    this.warehouseService = new WarehouseService();

    this.loadWarehouses();
  },
  methods: {
    findIndexById(id) {
      return this.warehouses.findIndex((category) => category.id === id);
    },
    loadWarehouses()
    {
      this.warehouseService.getAll().then(response => {
        console.log(response.data);
          this.warehouses = response.data.map(warehouse => new Warehouse(warehouse));
        console.log(this.warehouses);
      }).catch(error => console.error(error));
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    //Sensor methods
    onCancelRequestedSensor() {
      this.createAndEditDialogIsVisibleSensor = false;
      this.submittedSensor = false;
      this.isEditSensor = false;
    },

    //Device methods
    onCancelRequestedDevice() {
      this.createAndEditDialogIsVisibleDevice = false;
      this.submittedDevice = false;
      this.isEditDevice = false;
    },

    //Sensor methods
    onSaveRequestedSensor(item) {
      console.log('onSaveRequestedSensor');
      this.submittedSensor = true;
      if (item.name.trim()) {
        this.climateSensor = item;
        if (item.id) {
          // Update logic here
        } else {
          this.createClimateSensor();
        }
        this.createAndEditDialogIsVisibleSensor = false;
        this.isEditSensor = false;
      }
    },

    //Device methods
    onSaveRequestedDevice(item) {
      console.log('onSaveRequestedDevice');
      this.submittedDevice = true;
      if (item.name.trim()) {
        this.enviroDevice = item;
        if (item.id) {
          // Update logic here
        } else {
          this.createEnviroDevice();
        }
        this.createAndEditDialogIsVisibleDevice = false;
        this.isEditDevice = false;
      }
    },

    //Sensor methods
    createClimateSensor() {
      console.log(this.warehouse.id);
      console.log(this.climateSensor);
      this.climateSensor.warehouseId = toString(this.warehouse.id);
      console.log(this.warehouse.id);
      console.log(this.climateSensor);
      this.warehouseService.createClimateSensor(this.warehouse.id, this.climateSensor).then(response => {
        let climateSensor = new ClimateSensor(response.data);
        this.sensors.push(climateSensor);
        this.loadWarehouses(); // Reload

      }).catch(error => console.error(error));
    },

    //Device methods
    createEnviroDevice(){
      this.enviroDevice.warehouseId = toString(this.warehouse.id);
      this.warehouseService.createEnviroDevice(this.warehouse.id, this.enviroDevice).then(response => {
        let enviroDevice = new EnviroDevice(response.data);
        this.devices.push(enviroDevice);
        this.loadWarehouses(); // Reload
      }).catch(error => console.error(error));
    },

    onSaveRequested(item) {
      console.log('onSaveRequested');
      this.submitted = true;
      if (this.warehouse.name.trim()) {
        if (item.id) {
          this.updateWarehouse();
        } else {
          this.createWarehouse();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },

    // Service client methods
    createWarehouse() {
      const warehouseData = {
        name: this.warehouse.name,
        location: this.warehouse.location,
        description: this.warehouse.description,
        capacity: this.warehouse.capacity,
        contact: {
          phone: this.warehouse.contact.phone,
          email: this.warehouse.contact.email
        },
        temperature: {
          actual: this.warehouse.temperature.actual,
          maximum: this.warehouse.temperature.maximum,
          minimum: this.warehouse.temperature.minimum,
          unit: this.warehouse.temperature.unit
        },
        humidity: {
          actual: this.warehouse.humidity.actual,
          maximum: this.warehouse.humidity.maximum,
          minimum: this.warehouse.humidity.minimum,
          unit: this.warehouse.humidity.unit
        }
      };

      console.log('Datos a enviar:', warehouseData); // Imprime los datos que estás enviando

      this.warehouseService.create(warehouseData).then(response => {
        let warehouse = new Warehouse(response.data);
        this.warehouses.push(warehouse);
        this.notifySuccessfulAction("Warehouse created successfully");
      }).catch(error => console.error('Error al crear el almacén:', error.response.data));
    },
    updateWarehouse() {
      this.WarehouseService.update(this.warehouse.id, this.warehouse).then(response => {
        console.log('updateWarehouse');
        let index = this.findIndexById(this.warehouse.id);
        this.warehouses[index] = new Warehouse(response.data);
        console.log(this.warehouses);
        this.notifySuccessfulAction("Warehouse updated successfully");
      }).catch(error => console.error(error));
    },
    deleteWarehouse(id) {
      this.warehouseService.delete(id).then(() => {
        let index = this.findIndexById(id);
        this.warehouses.splice(index, 1);
        this.notifySuccessfulAction("Warehouse deleted successfully");
        this.loadWarehouses(); // Recargar la lista de depósitos
      }).catch(error => console.error(error));
    },

    onNewItem() {
      this.warehouse = new Warehouse({});
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
      console.log(this.createAndEditDialogIsVisible);
    },

    onEditRequested(warehouse) {
      this.warehouse = warehouse;
      this.isEdit = true;
      this.createAndEditDialogIsVisible = true;
    },

    //Sensor methods
    onEditRequestedSensor(warehouse, sensor, type) {
      this.warehouse = warehouse;
      this.climateSensor = sensor;
      this.climateSensor.type=type;
      this.isEditSensor = true;
      this.createAndEditDialogIsVisibleSensor = true;
    },

    //Device methods
    onEditRequestedDevice(warehouse, device, type, unit) {
      this.warehouse = warehouse;
      this.enviroDevice = device;
      this.enviroDevice.type=type;
      this.enviroDevice.unit=unit;
      this.isEditDevice = true;
      this.createAndEditDialogIsVisibleDevice = true;
    }

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadWarehouses();
    });
  }
}






</script>

<template>
  <div class="w-full">
    <h1>{{ ('Editor de locales asignados') }}</h1>
    <p>{{ ('Aqui puede registrar sus almacenes y agregarles sensores') }}</p>
  </div>

  <pv-toolbar class="mb-4">
    <template #start>
      <pv-button class="mr-2" icon="pi pi-plus" label="New" severity="success" @click="onNewItem"/>
      <router-link to="/temperature">
        <pv-button class="mr-2" icon="pi pi-thermometer" label="Environment" severity="info"/>
      </router-link>
    </template>
  </pv-toolbar>

  <warehouse-create-and-edit
      :edit="isEdit"
      :item="warehouse"
      :visible="createAndEditDialogIsVisible"
      v-on:cancel-requested="onCancelRequested"
      v-on:save-requested="onSaveRequested($event)"/>

  <climate-sensor-create-and-edit
      :edit="isEditSensor"
      :item="climateSensor"
      :visible="createAndEditDialogIsVisibleSensor"
      v-on:cancel-requested="onCancelRequestedSensor"
      v-on:save-requested="onSaveRequestedSensor($event)"/>

  <enviro-device-create-and-edit
      :edit="isEditDevice"
      :item="enviroDevice"
      :visible="createAndEditDialogIsVisibleDevice"
      v-on:cancel-requested="onCancelRequestedDevice"
      v-on:save-requested="onSaveRequestedDevice($event)"/>

  <div class="container">
    <warehouse-list :warehouses="warehouses" :deleteWarehouses="deleteWarehouse" :onEditRequested="onEditRequested"
                    :onEditRequestedSensor="onEditRequestedSensor"
                    :onEditRequestedDevice="onEditRequestedDevice"/>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.container:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
  transition: color 0.3s ease-in-out;
}

h1:hover {
  color: #00e676; /* Neon green color on hover */
}

p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
  transition: color 0.3s ease-in-out;
}

p:hover {
  color: #00e676; /* Neon green color on hover */
}

.pv-toolbar {
  background-color: #4CAF50; /* Toolbar background color */
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
}

.pv-toolbar:hover {
  background-color: #388E3C; /* Darker shade on hover */
}

.pv-button {
  background-color: #008CBA; /* Button color */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.pv-button:hover {
  background-color: #005f73; /* Darker shade on hover */
  transform: scale(1.05); /* Slightly enlarge on hover */
}

.mb-4 {
  margin-bottom: 16px; /* Margin for spacing */
}

.deposit-list {
  margin-top: 20px; /* Space above the deposit list */
  border: 1px solid #ddd; /* Border zaround the list */
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.3s ease-in-out;
}

.deposit-list:hover {
  border-color: #00e676; /* Neon green border on hover */
}

.deposit-list tr {
  transition: background-color 0.3s;
}

.deposit-list tr:hover {
  background-color: #f0f0f0; /* Highlight on hover */
}

.dialog {
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
}

.dialog:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.dialog-header {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
}

.dialog-header:hover {
  background-color: #388E3C; /* Darker shade on hover */
}

.dialog-content {
  padding: 20px;
}


</style>

<script>
import {Deposit} from "../model/deposit.entity.js";
import {DepositService} from "../services/deposit.service.js";
import DepositList from "../components/deposit-list.component.vue";

import DepositCreateAndEdit from "../components/deposit-create-and-edit.component.vue";
import {ClimateSensor} from "../model/climateSensor.entity.js";
import ClimateSensorCreateAndEdit from "../components/climateSensor-create-and-edit.vue";
import EnviroDeviceCreateAndEditComponent from "../components/enviroDevice-create-and-edit.component.vue";
import EnviroDeviceCreateAndEdit from "../components/enviroDevice-create-and-edit.component.vue";
import {EnviroDevice} from "../model/enviroDevice.entity.js";

export default{
  name: "deposit-management",
  components: {
    EnviroDeviceCreateAndEdit,
    ClimateSensorCreateAndEdit, DepositCreateAndEdit, DepositList,EnviroDeviceCreateAndEditComponent},
  data(){
    return{
      deposit: new Deposit({}),
      climateSensor: new ClimateSensor({}),
      enviroDevice: new EnviroDevice({}),
      deposits: [],
      //Sensor
      sensors: [],
      depositService:null,
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
    this.depositService = new DepositService();
    this.loadDeposits();
  },
  methods: {
    findIndexById(id) {
      return this.deposits.findIndex((category) => category.id === id);
    },

    loadDeposits()
    {
      this.depositService.getAll().then(response => {
        console.log(response.data);
        this.deposits = response.data.map(deposit => new Deposit(deposit));
        console.log(this.deposits);
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
      console.log(this.deposit.id);
      console.log(this.climateSensor);
      this.climateSensor.depositId = toString(this.deposit.id);
      console.log(this.deposit.id);
      console.log(this.climateSensor);
      this.depositService.createClimateSensor(this.deposit.id, this.climateSensor).then(response => {
        let climateSensor = new ClimateSensor(response.data);
        this.sensors.push(climateSensor);
        this.loadDeposits(); // Reload the deposits

      }).catch(error => console.error(error));
    },
    //Device methods
    createEnviroDevice(){
      this.enviroDevice.depositId = toString(this.deposit.id);
      this.depositService.createEnviroDevice(this.deposit.id, this.enviroDevice).then(response => {
        let enviroDevice = new EnviroDevice(response.data);
        this.devices.push(enviroDevice);
        this.loadDeposits(); // Reload the deposits
      }).catch(error => console.error(error));
    },

    onSaveRequested(item) {
      console.log('onSaveRequested');
      this.submitted = true;
      if (this.deposit.name.trim()) {
        if (item.id) {
          this.updateDeposit();
        } else {
          this.createDeposit();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    // Service client methods
    createDeposit() {
      this.depositService.create(this.deposit).then(response => {
        let deposit = new Deposit(response.data);
        this.deposits.push(deposit);
        this.notifySuccessfulAction("Category created successfully");
      }).catch(error => console.error(error));
    },
    updateDeposit() {
      this.depositService.update(this.deposit.id, this.deposit).then(response => {
        console.log('updateDeposit');
        let index = this.findIndexById(this.deposit.id);
        this.deposits[index] = new Deposit(response.data);
        console.log(this.deposits);
        this.notifySuccessfulAction("Category updated successfully");
      }).catch(error => console.error(error));
    },
    deleteDeposit(id) {
      this.depositService.delete(id).then(() => {
        let index = this.findIndexById(id);
        this.deposits.splice(index, 1);
        this.notifySuccessfulAction("Category deleted successfully");
        this.loadDeposits(); // Recargar la lista de depósitos
      }).catch(error => console.error(error));
    },

    onNewItem() {
      this.deposit = new Deposit({});
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
      console.log(this.createAndEditDialogIsVisible);
    },
    onEditRequested(deposit) {
      this.deposit = deposit;
      this.isEdit = true;
      this.createAndEditDialogIsVisible = true;
    },

    //Sensor methods
    onEditRequestedSensor(deposit, sensor, type) {
      this.deposit = deposit;
      this.climateSensor = sensor;
      this.climateSensor.type=type;
      this.isEditSensor = true;
      this.createAndEditDialogIsVisibleSensor = true;
    },

    //Device methods
    onEditRequestedDevice(deposit, device, type, unit) {
      this.deposit = deposit;
      this.enviroDevice = device;
      this.enviroDevice.type=type;
      this.enviroDevice.unit=unit;
      this.isEditDevice = true;
      this.createAndEditDialogIsVisibleDevice = true;
    }



  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadDeposits();
    });
  }
};
</script>

<template>
  <div class="w-full">
    <h1>{{ ('Editor de locales asignados') }}</h1>
    <p>{{ ('Aqui puede registrar sus depositos y agregarles sensores') }}</p>
  </div>

  <pv-toolbar class="mb-4">
    <template #start>
      <pv-button class="mr-2" icon="pi pi-plus" label="New" severity="success" @click="onNewItem"/>
    </template>
  </pv-toolbar>

  <deposit-create-and-edit
      :edit="isEdit"
      :item="deposit"
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
    <deposit-list :deposits="deposits" :deleteDeposit="deleteDeposit" :onEditRequested="onEditRequested"
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
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
}

.pv-toolbar {
  background-color: #4CAF50; /* Toolbar background color */
  padding: 10px;
  border-radius: 4px;
}

.pv-button {
  background-color: #008CBA; /* Button color */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pv-button:hover {
  background-color: #005f73; /* Darker shade on hover */
}

.mb-4 {
  margin-bottom: 16px; /* Margin for spacing */
}

.deposit-list {
  margin-top: 20px; /* Space above the deposit list */
  border: 1px solid #ddd; /* Border around the list */
  border-radius: 4px;
  overflow: hidden;
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
}

.dialog-header {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
}

.dialog-content {
  padding: 20px;
}
</style>

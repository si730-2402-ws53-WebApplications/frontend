<script>
import {Deposit} from "../model/deposit.entity.js";
import {DepositService} from "../services/deposit.service.js";
import {Thermometer} from "../../temperature/model/thermometer.entity.js";
import {ClimateSensor} from "../model/climateSensor.entity.js";
import {EnviroDevice} from "../model/enviroDevice.entity.js";


export default {
  name: "DepositItem",
  props: {
    deposit: {type: Deposit, required: true},
    deleteDeposit: {type: Function, required: true},
    onEditRequested: { type: Function, required: true },
    onEditRequestedSensor: { type: Function, required: true },
    onEditRequestedDevice: { type: Function, required: true }



  },
  data(){
    return{
      thermometer: new ClimateSensor({}),
      sensors: [],
      hygrometer: new ClimateSensor({}),
      devices:[],
      heater: new EnviroDevice({}),
      humidifier: new EnviroDevice({}),
    }
  },
  created() {
    this.depositService = new DepositService();
    this.loadClimateSensors();
    this.loadEnviroDevices();
  },
  watch: {
    deposit: {
      handler() {
        this.loadClimateSensors();
        this.loadEnviroDevices();
      },
      deep: true
    }
  },
  methods:{
    loadClimateSensors(){
      this.depositService.getClimateSensors(this.deposit.id).then(response => {
        console.log(response.data);
        this.sensors = response.data
            .filter(sensor => sensor.type === "Thermometer")
            .map(thermometer => new ClimateSensor(thermometer));
        console.log(this.thermometers);

        if (this.sensors.length === 1) {
          this.thermometer = this.sensors[0];
        }       console.log(this.thermometer);



        this.sensors = response.data
            .filter(sensor => sensor.type === "Hygrometer")
            .map(hygrometer => new ClimateSensor(hygrometer));
        console.log(this.thermometers);
        if (this.sensors.length === 1) {
          this.hygrometer = this.sensors[0];
        }       console.log(this.hygrometer);

      }).catch(error => console.error(error));
    },
    loadEnviroDevices(){
      this.depositService.getEnviroDevices(this.deposit.id).then(response => {
        console.log(response.data);
        this.devices = response.data
            .filter(device => device.type === "Heater")
            .map(heater => new EnviroDevice(heater));
        console.log(this.devices);

        if (this.devices.length === 1) {
          this.heater = this.devices[0];
        }
        console.log(this.heater);


        this.devices = response.data
            .filter(device => device.type === "Humidifier")
            .map(humidifier => new EnviroDevice(humidifier));
        console.log(this.devices);
        if (this.devices.length === 1) {
          this.humidifier = this.devices[0];
        }
        console.log(this.heater);

      }).catch(error => console.error(error));
    }
  }
}
</script>

<template>
  <pv-card class="examiner-card">
    <template #header>
      <div class="card-header">
        <h2>{{ deposit.name }}</h2>
        <h2>{{ deposit.location }}</h2>
      </div>
    </template>

    <template #content>
      <p>{{ deposit.description }}</p>
      <p>{{ deposit.capacity }}</p>
      <p>Temperatura de {{ deposit.temperature.minimum }}°C a {{ deposit.temperature.maximum }}°C</p>
      <p>Humedad de {{ deposit.humidity.minimum }}% a {{ deposit.humidity.maximum }}%</p>

    </template>
    <template #footer>
      <p>Phone: {{ deposit.contact.phone }}</p>
      <p>Email: {{ deposit.contact.phone }}</p>

      <pv-button type="button" label="Delete" severity="secondary" class="p-button-text"
                 icon="pi pi-times" @click="deleteDeposit(deposit.id)"/>
      <pv-button class="mr-2" icon="pi pi-plus" label="Edit" severity="success" @click="onEditRequested(deposit)"/>

      <template v-if="thermometer.id === 0">
        <pv-button class="mr-2" icon="pi pi-plus" label="Thermometer" severity="success" @click="onEditRequestedSensor(deposit,thermometer,'Thermometer')"/>
      </template>
      <template v-else>
        <pv-card class="thermometer-card">
          <template #header>
            <h3>Thermometer</h3>
          </template>
          <template #content>
            <p>{{thermometer.name}}</p>
            <p>{{thermometer.type}}</p>
            <p>{{thermometer.model}}</p>
          </template>
        </pv-card>
      </template>



      <template v-if="hygrometer.id === 0">
        <pv-button class="mr-2" icon="pi pi-plus" label="Hygrometer" severity="success" @click="onEditRequestedSensor(deposit,hygrometer,'Hygrometer')"/>
      </template>
      <template v-else>
        <pv-card class="hygrometer-card">
          <template #header>
            <h3>Hygrometer</h3>
          </template>
          <template #content>
            <p>{{hygrometer.type}}</p>
            <p>{{hygrometer.name}}</p>
            <p>{{hygrometer.model}}</p>
          </template>
        </pv-card>
      </template>




      <template v-if="heater.id === 0">
        <pv-button class="mr-2" icon="pi pi-plus" label="Heater" severity="success" @click="onEditRequestedDevice(deposit,heater,'Heater','Celsius')"/>
      </template>
      <template v-else>
        <pv-card class="heater-card">
          <template #header>
            <h3>Heater</h3>
          </template>
          <template #content>
            <p>{{heater.name}}</p>
            <p>{{heater.model}}</p>
            <p>{{heater.unit}}</p>
          </template>
        </pv-card>
      </template>

      <template v-if="humidifier.id === 0">
        <pv-button class="mr-2" icon="pi pi-plus" label="Humidifier" severity="success" @click="onEditRequestedDevice(deposit,humidifier,'Humidifier','percent')"/>
      </template>
      <template v-else>
        <pv-card class="humidifier-card">
          <template #header>
            <h3>Humidifier</h3>
          </template>
          <template #content>

            <p>{{humidifier.name}}</p>
            <p>{{humidifier.model}}</p>
            <p>{{humidifier.unit}}</p>
          </template>
        </pv-card>
      </template>



    </template>
  </pv-card>
</template>

<style scoped>
.examiner-card {
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #007bff; /* Header background color */
  color: white;
  padding: 10px;
  border-radius: 8px 8px 0 0;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold; /* Bold text */
}

.card-header h2:nth-child(2) {
  font-size: 1.2rem;
  color: #d4edda; /* Lighter color for location */
  font-weight: bold; /* Bold text */
}

.card-header h3 {
  color: #007bff; /* Color for subtitles */
  font-weight: bold; /* Bold text */
}

.card-header p {
  margin: 5px 0;
  font-size: 1rem;
  color: #333;
  font-weight: 500; /* Semi-bold text */
}

.pv-button {
  margin-top: 10px;
}

.pv-card {
  margin-top: 10px;
  border-radius: 5px;
}

.thermometer-card,
.hygrometer-card,
.heater-card,
.humidifier-card {
  background-color: #f0f8ff; /* Light blue background for devices */
  border: 1px solid #007bff; /* Blue border for devices */
  border-radius: 8px;
  padding: 10px;
}

.thermometer-card h3,
.hygrometer-card h3,
.heater-card h3,
.humidifier-card h3 {
  color: #007bff; /* Blue color for device titles */
  font-weight: bold; /* Bold text */
}

h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold; /* Bold text */
}

p {
  color: #555; /* Slightly darker text color for paragraphs */
  font-weight: 500; /* Semi-bold text */
}
</style>

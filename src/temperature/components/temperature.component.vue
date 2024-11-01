<script>
import {Storeroom} from '../model/storeroom.entity.js';
import {StoreroomService} from "../services/storeroom.service.js";

import {Thermometer} from "../model/thermometer.entity.js";
import {ThermometerService} from "../services/thermometer.service.js";

import {Hygrometer} from "../model/hygrometer.entity.js";
import {HygrometerService} from "../services/hygrometer.service.js";

import {Heater} from "../model/heater.entity.js";
import {HeaterService} from "../services/heater.service.js";

import {Humidifier} from "../model/humidifier.entity.js";
import {HumidifierService} from "../services/humidifier.service.js";

export default {
  data() {
    return {
      storerooms: [],
      storeroomService: null,
      thermometers: [],
      thermometerService: null,
      hygrometers: [],
      hygrometerService: null,
      heaters: [],
      heaterService: null,
      humidifiers: [],
      humidifierService: null,
      temperature: 16,
      humidity: 50,
      alert: false,
    };
  },
  methods: {
    setHeaterTemperature(heater, temperature) {
      heater.temperature = temperature;
      this.heaterService.update(heater.id, heater)
          .then(response => {
            console.log('Heater updated:', response.data);
          })
          .catch(error => {
            console.error('Error updating heater:', error);
          });
    },
    setHumidifierHumidity(humidifier, humidity) {
      humidifier.humidity = humidity;
      this.humidifierService.update(humidifier.id, humidifier)
          .then(response => {
            console.log('Humidifier updated:', response.data);
          })
          .catch(error => {
            console.error('Error updating humidifier:', error);
          });
    },
    setStoreroomTemperature(heater, storeroom) {
      storeroom.temperatura.actual = heater.temperature;
      this.storeroomService.update(storeroom.id, storeroom)
          .then(response => {
            console.log('Storeroom updated:', response.data);
          })
          .catch(error => {
            console.error('Error updating storeroom:', error);
          });
    },
    setStoreroomHumidity(humidifier, storeroom) {
      storeroom.humedad.actual = humidifier.humidity;
      this.storeroomService.update(storeroom.id, storeroom)
          .then(response => {
            console.log('Storeroom updated:', response.data);
          })
          .catch(error => {
            console.error('Error updating storeroom:', error);
          });
    },
    updateHeaterInDatabase(heater) {
      // Llama al servicio del calentador para actualizar la base de datos
      this.heaterService.update(heater.id, { temperature: heater.temperature })
          .then(response => {
            console.log("Heater updated successfully", response.data);
          })
          .catch(error => {
            console.error("Error updating heater", error);
          });
    },
    updateStoreroomInDatabase(storeroom) {
      // Llama al servicio del almacén para actualizar la base de datos
      this.storeroomService.update(storeroom.id, { temperatura: storeroom.temperatura })
          .then(response => {
            console.log("Storeroom updated successfully", response.data);
          })
          .catch(error => {
            console.error("Error updating storeroom", error);
          });
    }
  },
  created() {
    //storerooms
    this.storeroomService = new StoreroomService();
    this.storeroomService.getAll().then(response => {
      this.storerooms = response.data.map(storeroom => new Storeroom(storeroom));
      console.log(this.storerooms);
    }).catch(error => console.error(error));

    //thermometers
    this.thermometerService = new ThermometerService();
    this.thermometerService.getAll().then(response => {
      this.thermometers = response.data.map(thermometer => new Thermometer(thermometer));
      console.log(this.thermometers);
    }).catch(error => console.error(error));

    //hygrometers
    this.hygrometerService = new HygrometerService();
    this.hygrometerService.getAll().then(response => {
      this.hygrometers = response.data.map(hygrometer => new Hygrometer(hygrometer));
      console.log(this.hygrometers);
    }).catch(error => console.error(error));

    //heaters
    this.heaterService = new HeaterService();
    this.heaterService.getAll().then(response => {
      this.heaters = response.data.map(heater => new Heater(heater));
      console.log(this.heaters);
    }).catch(error => console.error(error));

    //humidifiers
    this.humidifierService = new HumidifierService();
    this.humidifierService.getAll().then(response => {
      this.humidifiers = response.data.map(humidifier => new Humidifier(humidifier));
      console.log(this.humidifiers);
    }).catch(error => console.error(error));
  }
};
</script>


<template>

  <div class="storeroom-container" v-for="storeroom in storerooms" :key="storeroom.id">
    <h2>{{ storeroom.nombre }}</h2>

    <div class="recommended">
      <div>
        <h4>Temperatura maxima recomendada: {{ storeroom.temperatura.maxima }}</h4>
        <br>
        <h4>Temperatura minima recomendada: {{ storeroom.temperatura.minima }}</h4>
      </div>
      <div>
        <h4>Humedad maxima recomendada: {{ storeroom.humedad.maxima }}</h4>
        <br>
        <h4>Humedad minima recomendada: {{ storeroom.humedad.minima }}</h4>
      </div>
    </div>

    <div class="iot-container">
      <!--termometros-->
      <div v-for="thermometer in thermometers" :key="thermometer.id">
        <!-- Tarjeta de termometro actual -->
        <div class="card" v-if="thermometer.storeroom === storeroom.id">
          <h3>{{thermometer.name}}</h3>
          <div class="humidity-card">
            <div class="temperature-display">
              <div class="termometro">
                <div class="mercurio" :style="{ height: `${(storeroom.temperatura.actual) / (100) * 100}%` }"></div>
              </div>
              <div class="temperature-card">
                <p>{{ storeroom.temperatura.actual }}°C</p>
              </div>
            </div>
          </div>
          <!-- Alerta de temperatura alta-->
          <div v-if="storeroom.temperatura.actual < storeroom.temperatura.minima" class="alert">¡Alerta! Temperatura baja: {{ storeroom.temperatura.actual }}°C</div>
          <div v-if="storeroom.temperatura.actual > storeroom.temperatura.maxima" class="alert">¡Alerta! Temperatura alta: {{ storeroom.temperatura.actual }}°C</div>
        </div>
      </div>

      <!--higrometros-->
      <div v-for="hygrometer in hygrometers" :key="hygrometer.id">
        <!-- Tarjeta de humedad actual -->
        <div class="card" v-if="hygrometer.storeroom === storeroom.id">
          <h3>{{hygrometer.name}}</h3>
          <div class="humidity-card">
            <div class="humidity-display">
              <div class="temperature-card">
                <p>{{ storeroom.humedad.actual }}%</p>
              </div>
              <div :style="{ width: storeroom.humedad.actual + '%' }" class="humidity-bar"></div>
            </div>
          </div>
          <!-- Alerta de humedad alta-->
          <div v-if="storeroom.humedad.actual < storeroom.humedad.minima" class="alert">¡Alerta! Humedad baja: {{ storeroom.humedad.actual }}%</div>
          <div v-if="storeroom.humedad.actual > storeroom.humedad.maxima" class="alert">¡Alerta! Humedad alta: {{ storeroom.humedad.actual }}%</div>
        </div>
      </div>

      <!--heater o calentador-->
      <div v-for="heater in heaters" :key="heater.id">
        <div class="card" v-if="heater.storeroom === storeroom.id">
          <h3>{{heater.name}}</h3>
          <div class="humidity-card">
            <div class="humidity-display">
              <div class="temperature-card">
                <p>{{ heater.temperature }}°C</p>
              </div>
              <input type="range" v-model="heater.temperature" min="0" max="100" />
            </div>
          </div>
          <div class="card-footer">
            <button @click="setStoreroomTemperature(heater, storeroom)">Set Temperature</button>
            <button @click="setHeaterTemperature(heater, storeroom.temperatura.actual)">Reset</button>
          </div>
        </div>
      </div>

      <!-- humidifier -->
      <div v-for="humidifier in humidifiers" :key="humidifier.id">
        <div class="card" v-if="humidifier.storeroom === storeroom.id">
          <h3>{{humidifier.name}}</h3>
          <div class="humidity-card">
            <div class="humidity-display">
              <div class="temperature-card">
                <p>{{ humidifier.humidity }}%</p>
              </div>
              <input type="range" v-model="humidifier.humidity" min="0" max="100" />
            </div>
          </div>
          <div class="card-footer">
            <button @click="setStoreroomHumidity(humidifier, storeroom)">Set Humidity</button>
            <button @click="setHumidifierHumidity(humidifier, storeroom.humedad.actual)">Reset</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.recommended{
  display: flex;
  justify-content: space-around;
  margin: 1rem;
}

.card {
  display: inline-block;
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 5px 10px;
  width: 300px;
  color: #1a1a1a;
}

/* Tarjeta anidada de temperatura actual */
.temperature-card {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e0;
  width: 120px;
  height: 120px;
  margin: 10px auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

/* Tarjeta anidada de humedad actual */
.humidity-card {
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
}

/* Estilos de la barra de humedad */
.humidity-display {
  position: relative;
  margin: 10px 0;
}

.humidity-bar {
  height: 20px;
  background-color: lightblue;
}

.alert {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

.termometro {
  width: 20px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
}

.mercurio {
  width: 100%;
  background-color: #ff0000;
  border-radius: 5px;
}

.temperature-container{
  padding: 3rem;
}

.temperature-display{
  display: flex;
}

.iot-container{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.card-footer{
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.storeroom-container{
  margin-top: 1rem;
  margin-bottom: 2rem;
}

</style>

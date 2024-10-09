<template>
  <div>
    <div class="cards-container">
      <div class="card">
        <h3>Termómetro 01</h3>
        <!-- Tarjeta de temperatura actual -->
        <div>
          <h2>Temperatura en tiempo real</h2>
          <div class="temperature-card">
            <p>{{ temperature }}°C</p>
          </div>
          <p>Máxima temperatura: 100°C</p>
          <p>Mínima temperatura: 16°C</p>
        </div>
        <!-- Control de temperatura -->
        <div>
          <h2>Control de temperatura</h2>
          <input type="range" v-model="temperature" min="16" max="100" />
          <p>Temperatura: {{ temperature }}°C</p>
          <div class="termometro">
            <div class="mercurio" :style="{ height: `${(temperature - 16) / (100 - 16) * 100}%` }"></div>
          </div>
          <button @click="increaseTemperature">+</button>
          <button @click="decreaseTemperature">-</button>
        </div>
      </div>
      <div class="card">
        <h3>Higrómetro 01</h3>
        <!-- Tarjeta de humedad actual -->
        <div class="humidity-card">
          <h2>Humedad en tiempo real</h2>
          <div class="humidity-display">
            <p>Humedad Actual: {{ humidity.toFixed(2) }}%</p>
            <div :style="{ width: humidity + '%' }" class="humidity-bar"></div>
          </div>
        </div>
        <!-- Alerta de humedad alta -->
        <div v-if="alert" class="alert">¡Alerta! Humedad alta: {{ humidity.toFixed(2) }}%</div>
        <!-- Botón para actualizar humedad -->
        <button @click="checkHumidity">Actualizar Humedad</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temperature: 16,
      humidity: 50,
      alert: false,
    };
  },
  methods: {
    increaseTemperature() {
      this.temperature = Math.min(this.temperature + 1, 100);
    },
    decreaseTemperature() {
      this.temperature = Math.max(this.temperature - 1, 16);
    },
    checkHumidity() {
      // Lógica para obtener datos del sensor
      this.humidity = Math.random() * 100; // Simulación de lectura
      this.alert = this.humidity > 70; // Umbral de alerta
    },
  },
};
</script>

<style>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
</style>

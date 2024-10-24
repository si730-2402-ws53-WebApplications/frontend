<script>
import LineChartComponent from "../../shared/components/line-chart.component.vue";

export default {
  components: {
    LineChartComponent,
  },
  data() {
    return {
      selectedWarehouse: null,
      warehouses: [
        { id: 1, name: 'Almacén 1' },
        { id: 2, name: 'Almacén 2' }
      ],
      irregularities: 'No se encontraron irregularidades',
      temperatureData: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
          {
            label: 'Temperatura (°C)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            data: [10, 12, 8, 9, 14, 15],
          },
          {
            label: 'Humedad (%)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            data: [30, 35, 32, 40, 42, 38],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  },
  watch: {
    selectedWarehouse(newWarehouse) {
      this.updateChartData(newWarehouse);
    },
  },
  methods: {
    updateChartData(warehouse) {
      if (warehouse.id === 1) {
        this.temperatureData.datasets[0].data = [10, 12, 8, 9, 14, 15];
        this.temperatureData.datasets[1].data = [30, 35, 32, 40, 42, 38];
      } else if (warehouse.id === 2) {
        this.temperatureData.datasets[0].data = [11, 13, 9, 10, 15, 16];
        this.temperatureData.datasets[1].data = [31, 36, 33, 41, 43, 39];
      }
    },
  },
};
</script>

<template>
  <div class="report-analysis">
    <h2>{{ $t('report.analysis') }}</h2>

    <!-- Sección de Informes por almacén -->
    <section>
      <h3>{{ $t('report.byWarehouse') }}</h3>
      <div>
        <label>{{ $t('inventory.storeroom') }}: </label>
        <select v-model="selectedWarehouse">
          <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse">
            {{ warehouse.name }}
          </option>
        </select>
      </div>
      <p>{{ $t('report.irregularities') }}: {{ irregularities }}</p>
    </section>

    <!-- Sección de Tendencias con gráfico de líneas -->
    <section>
      <h3>{{ $t('report.trends') }}</h3>
      <line-chart-component :chartData="temperatureData" :chartOptions="chartOptions" />
    </section>

    <!-- Sección de Optimización de recursos -->
    <section>
      <h3>{{ $t('report.resourceOptimization') }}</h3>
      <p>{{ $t('report.optimizationAnalysis') }}</p>
    </section>
  </div>
</template>

<style scoped>
.report-analysis {
  padding: 40px;
}
</style>
<template>
  <div>
    <h1>Report Analysis</h1>
    <line-chart />
  </div>
</template>

<script>
import LineChart from "../../shared/components/line-chart.component.vue";

export default {
  name: 'ReportAnalysis',
  components: {
    LineChart,
  },
};
</script>

<script>
import DepositItem from "./deposit-item.component.vue";

export default {
  name: "deposit-list",
  components: {DepositItem},
  props:{
    deposits: {type: Array, required: true},
    deleteDeposit: {type: Function, required: true},
    onEditRequested: { type: Function, required: true },
    onEditRequestedSensor: { type: Function, required: true },
    onEditRequestedDevice: { type: Function, required: true }

  },
  methods:{

  }
}

</script>

<template>
  <div>
    <div class="card-grid">
      <div v-for="deposit in deposits" :key="deposit.id">
        <deposit-item :deposit="deposit" :deleteDeposit="deleteDeposit" :onEditRequested="onEditRequested" :onEditRequestedSensor="onEditRequestedSensor" :onEditRequestedDevice="onEditRequestedDevice"/>

      </div>
    </div>

  </div>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
</style>
<template>
  <div class="container-app">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          PRV-USDT
        </p>
      </header>
      <div class="card-content">
        <line-chart
          :data="markets[market]"
        ></line-chart>
        <sub>Charting Library by <a href="https://highcharts.com">Highcharts</a> (CC BY-NC 3.0)</sub>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'price',
  computed: {
    markets() {
      return this.$store.state.markets;
    },
  },
  data() {
    return {
      market: 'PRV-pUSDT',
    };
  },
};
</script>

<style scoped>
</style>

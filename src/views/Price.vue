<template>
  <div class="container-app">
    <div class="card">
      <header class="dropdown is-hoverable card-header">
        <div class="dropdown-trigger">
          <p class="card-header-title">
            {{market}}
          </p>
        </div>
        <div class="dropdown-menu">
          <div class="dropdown-content">
            <a
              class="dropdown-item"
              v-for="pair in Object.keys(markets)"
              :key="pair"
              v-on:click="market = pair"
            >
              {{pair}}
            </a>
          </div>
        </div>
      </header>
      <div class="card-content">
        <line-chart
          :data="markets[market]"
          :library="{plotOptions:{series:{animation: false}}}"
        ></line-chart>
        <sub><a href="https://highcharts.com">Highcharts</a> (CC BY-NC 3.0)</sub>
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
  .dropdown-content {
    height: 350px;
    overflow: auto;
  }
</style>

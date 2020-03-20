<template>
  <div class="container-app">
    <div class="card">
      <area-chart
        :data="markets[market]"
        :library="{
          plotOptions:{
            series:{
              animation: false,
            },
          },
          chart: {
            backgroundColor: '#282c37',
          },
          xAxis: {
            labels: {
                style: {
                    color: '#d9e1e8'
                }
            },
          },
          yAxis: {
              labels: {
                  style: {
                      color: '#d9e1e8'
                  }
              },
          },
          tooltip: {
              backgroundColor: '#191b22',
              style: {
                  color: '#d9e1e8'
              }
          },
        }"
        :round="2"
        :zeros="true"
      ></area-chart>
      <div class="controls">
        <div class="selection" v-on:click="showMenu = !showMenu">
          {{market}}<span class="mdi mdi-menu-up"></span>
        </div>
        <div class="credits">
          <sub><a href="https://highcharts.com">Highcharts</a> (CC BY-NC 3.0)</sub>
        </div>
      </div>
      <div class="pairs" v-if="showMenu">
        <div
          class="item"
          v-for="pair in Object.keys(markets)"
          :key="pair"
          v-on:click="market = pair; showMenu = !showMenu"
        >
          {{pair}}
        </div>
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
      showMenu: false,
    };
  },
};
</script>

<style scoped>
  .card {
    border-radius: 4px;
    background: #282c37;
    width: calc(100vw - 64px);
    box-shadow: 0 0 15px rgba(0,0,0,.2);
    padding-top: 6px;
  }

  .card > .controls {
    height: 47px;
  }

  .card > .controls > .selection {
    float: left;
    padding: 8px;
    margin: 6px;
    background: #313543;
    box-shadow: 0 0 15px rgba(0,0,0,.2);
    border-radius: 4px;
    cursor: pointer;
  }

  .card  > .pairs {
    float: left;
    padding: 8px;
    margin: 6px;
    background: #313543;
    box-shadow: 0 0 15px rgba(0,0,0,.2);
    border-radius: 4px;
    height: 280px;
    overflow-y: auto;
    transform: translateY(-352px);
  }

  .card > .controls > .credits {
    float: right;
    padding-top: 16px;
    padding-right: 8px;
  }
</style>

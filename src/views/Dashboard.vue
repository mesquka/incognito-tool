<template>
  <div class="container-app">
    <h1>Network</h1>
    <network></network>

    <h1>Shards</h1>
    <shards></shards>

    <h1>Mempool</h1>
    <mempool></mempool>
  </div>
</template>

<script>
import Mempool from '@/components/dashboard/Mempool.vue';
import Network from '@/components/dashboard/Network.vue';
import Shards from '@/components/dashboard/Shards.vue';

export default {
  name: 'dashboard',
  components: {
    Mempool,
    Network,
    Shards,
  },
  computed: {
    price() {
      return this.$store.state.markets['PRV-pUSDT'][
        this.$store.state.beaconBlockTimeIndex[
          Math.floor(this.blockchain.Beacon.Height / 2000) * 2000
        ]
      ];
    },
  },
};
</script>

<style scoped>
.card-header {
  overflow: auto;
}

.table {
  width: 100%;
}

td {
  overflow: auto;
}
</style>

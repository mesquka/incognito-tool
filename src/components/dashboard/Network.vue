<template>
  <div class="stats">
    <div class="item">
      <div class="stat">{{blockchain.ActiveShards}}</div>
      <div class="label">Shards</div>
    </div>

    <div class="item">
      <div class="stat">{{blockchain.TotalTxs}}</div>
      <div class="label">Transactions Processed</div>
    </div>

    <div class="item">
      <div class="stat">{{mempool.Size}}</div>
      <div class="label">Pending Transactions</div>
    </div>

    <div class="item">
      <div class="stat">{{blockchain.Beacon.Epoch}}</div>
      <div class="label">Epoch</div>
    </div>

    <div class="item" v-if="price">
      <div class="stat">${{price.toPrecision(2)}}</div>
      <div class="label">PRV-USDT</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'network',
  computed: {
    blockchain() {
      return this.$store.state.chainStats.blockchainInfo;
    },
    mempool() {
      return this.$store.state.chainStats.mempoolInfo;
    },
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
.stats {
  display: flex;
  flex-wrap: wrap;
  width: calc(100vw - 64px);
}

.stats > .item {
  flex-grow: 1;
  border-radius: 4px;
  min-width: 128px;
  width: calc(33% - 44px);
  text-align: center;
  background: #282c37;
  margin: 0 10px 16px 10px;
  padding: 12px;
  box-shadow: 0 0 15px rgba(0,0,0,.2);
}

.stats > .item > .stat {
  font-size: 32px;
}

.stats > .item > .label {
  font-size: 12px;
  color: #606984;
}
</style>

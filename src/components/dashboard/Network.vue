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
  },
};
</script>

<style scoped>
.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: calc(100vw - 64px);
}

.stats > .item {
  border-radius: 4px;
  height: 52px;
  min-width: 268px;
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

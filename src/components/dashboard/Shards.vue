<template>
  <div class="shards">
    <div class="item">
      <header class="header">
        Beacon Chain
      </header>
      <div class="stat">
        {{blockchain.Beacon.Height}}
      </div>
      <div class="label">
        Height
      </div>
      <div class="stat">
        {{blockchain.Beacon.Hash}}
      </div>
      <div class="label">
        Latest Block
      </div>
    </div>

    <div class="item" v-for="shard in blockchain.Shards" :key="shard.id">
      <header class="header">
        Shard {{shard.id}}
      </header>
      <div class="stat">
        {{shard.Height}}
      </div>
      <div class="label">
        Height
      </div>
      <div class="stat">
        {{shard.Hash}}
      </div>
      <div class="label">
        Latest Block
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shards',
  computed: {
    blockchain() {
      return this.$store.state.chainStats.blockchainInfo;
    },
  },
};
</script>

<style scoped>
.shards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: calc(100vw - 64px);
}

.shards > .item {
  flex-grow: 1;
  text-align: center;
  border-radius: 4px;
  min-width: 292px;
  width: calc(33% - 20px);
  background: #282c37;
  margin: 0 10px 16px 10px;
  box-shadow: 0 0 15px rgba(0,0,0,.2);
}

.shards > .item > .header {
  background: #313543;
  border-radius: 4px 4px 0 0;
  padding: 8px;
  margin-bottom: 8px;
}

.shards > .item > .label {
  font-size: 12px;
  margin: 0 16px 8px 16px;
  color: #606984;
}

.shards > .item > .stat {
  margin: 0 16px 0 16px;
  overflow-wrap: break-word;
  width: calc(100% - 32px);
}
</style>

<template>
  <div class="transactions">
    <div class="transaction" v-if="!mempool.ListTxs || mempool.ListTxs.length === 0">
      <header class="header">
        No Pending Transactions
      </header>
    </div>
    <div class="transaction" v-for="tx in mempool.ListTxs" v-bind:key="tx.TxID">
      <header class="header">
        Transaction
      </header>
      <div class="txid">
        {{tx.TxID}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mempool',
  computed: {
    mempool() {
      return this.$store.state.chainStats.mempoolInfo;
    },
  },
};
</script>

<style scoped>
.transactions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: calc(100vw - 64px);
}

.transactions > .transaction {
  border-radius: 4px;
  min-width: 292px;
  width: calc(25% - 44px);
  height: 128px;
  text-align: center;
  background: #282c37;
  margin: 0 10px 16px 10px;
  box-shadow: 0 0 15px rgba(0,0,0,.2);
}

.transactions > .transaction > .header {
  background: #313543;
  border-radius: 4px 4px 0 0;
  padding: 8px;
}

.transactions > .transaction > .txid {
  padding: 16px;
  overflow-wrap: break-word;
}
</style>

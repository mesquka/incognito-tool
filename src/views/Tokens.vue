<template>
  <div class="container-app">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Tokens
        </p>
      </header>
      <div class="card-content">
        <table class="table is-bordered is-hoverable is-fullwidth">
          <tbody>
            <tr v-for="(token, tokenIndex) in verifiedTokens" :key="tokenIndex">
              <th>{{token.Name}} ({{token.PSymbol}})</th>
              <td>{{token.TokenID}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tokenlist',
  computed: {
    verifiedTokens() {
      return this.$store.state.tokensInfo.verifiedTokens;
    },
  },
};
</script>

<style scoped>
.card-header {
  overflow: auto;
}

.table {
  table-layout: fixed;
}

td {
  overflow: auto;
}
</style>

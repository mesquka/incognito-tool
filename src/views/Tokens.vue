<template>
  <div class="container-app">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Tip
        </p>
      </header>
      <div class="card-content">
        If you're having issues you may need to allow unsafe scripts in your browser,
        in chrome this is usually found at the right of the address bar.
      </div>
    </div>

    <div class="spacer"></div>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Tokens
        </p>
      </header>
      <div class="card-content">
        <table class="table is-hoverable is-fullwidth">
          <tbody>
            <tr v-for="(token, tokenIndex) in verifiedTokens" v-bind:key="tokenIndex">
              <th>{{token.Name}} ({{token.PSymbol}})</th>
              <td>{{token.TokenID}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="spacer"></div>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Tokens (Unverified)
        </p>
      </header>
      <div class="card-content">
        <table class="table is-hoverable is-fullwidth">
          <tbody>
            <tr v-for="(token, tokenIndex) in unverifiedTokens" v-bind:key="tokenIndex">
              <th>{{token.Name}} ({{token.PSymbol}})</th>
              <td>{{token.TokenID}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="spacer"></div>
  </div>
</template>

<script>
export default {
  name: 'tokenlist',
  computed: {
    verifiedTokens() {
      return this.$store.state.verifiedTokens;
    },
    unverifiedTokens() {
      return this.$store.state.unverifiedTokens;
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
</style>

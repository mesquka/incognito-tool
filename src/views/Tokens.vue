<template>
  <div class="container-app">
    <h1>Tokens</h1>
    <div class="tokens">
      <div class="token" v-for="(token, tokenIndex) in verifiedTokens" :key="tokenIndex">
        <div class="symbol">
          {{token.PSymbol}}
        </div>
        <div class="name">
          {{token.Name}}
        </div>
      </div>
    </div>
    <!--<div class="card">
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
    </div>-->
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
.tokens {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: calc(100vw - 64px);
}

.token {
  text-align: center;
  width: 150px;
  padding: 10px;
  margin: 10px;
  background: #282c37;
  box-shadow: 0 0 15px rgba(0,0,0,.2);
  border-radius: 4px;
}

.token > .name {
  font-size: 12px;
  width: 100%;
  color: #606984;
}
</style>

<template>
  <div class="container-app">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title" v-if="!!nodes[pubKey]">
          You
        </p>
        <p class="card-header-title" v-if="!nodes[pubKey]">
          <router-link to="/settings">Set address in settings</router-link>
        </p>
      </header>
      <div class="card-content" v-if="!!nodes[pubKey]">
        <table class="table is-fullwidth">
          <tr v-for="(value, index) in nodes[pubKey]" v-bind:key="index">
            <th>{{tokenIDToName(index)}}</th>
            <td>{{value/10**9}}</td>
          </tr>
        </table>
      </div>
    </div>

    <hr>

    <div v-for="(tokens, tindex) in nodes" v-bind:key="tindex">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{tindex}}
          </p>
        </header>
        <div class="card-content">
          <table class="table is-fullwidth">
            <tr v-for="(value, index) in tokens" v-bind:key="index">
              <th>{{tokenIDToName(index)}}</th>
              <td>{{value/10**9}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="spacer"></div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import store from '@/store';

export default {
  name: 'home',
  data() {
    api.listRewardAmount().then((result) => {
      this.nodes = result.data.Result;
      store.commit('setListRewardAmountCache', result.data.Result);
    });
    return {
      pubKey: store.state.pubKey,
      nodes: store.state.listRewardAmountCache,
    };
  },
  methods: {
    tokenIDToName: api.tokenIDToName,
  },
};
</script>

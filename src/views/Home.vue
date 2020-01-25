<template>
  <div class="container-app">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title" v-if="this.loading">
          LOADING
        </p>
        <p class="card-header-title" v-if="this.selfIsPresent">
          {{pubKey}}
        </p>
        <p class="card-header-title" v-if="!this.selfIsPresent && !this.loading">
          <router-link to="/settings">Set address in settings</router-link>
        </p>
      </header>
      <div class="card-content" v-if="this.selfIsPresent">
        <table class="table is-fullwidth">
          <tr>
            <th>BeaconHeight</th>
            <td>{{selfData}}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="spacer"></div>
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
      this.loading = false;
      this.selfIsPresent = !!this.nodes[this.pubKey];
      this.selfData = this.selfIsPresent ? this.nodes[this.pubKey] : {};
    });
    return {
      loading: true,
      selfIsPresent: false,
      pubKey: store.state.pubKey,
      selfData: {},
      nodes: {},
    };
  },
};
</script>

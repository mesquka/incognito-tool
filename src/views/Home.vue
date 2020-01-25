<template>
  <div class="container-app">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title" v-if="this.nodes[this.pubKey]">
          {{nodeIP}}
        </p>
        <p class="card-header-title" v-if="!this.nodes[this.pubKey]">
          <router-link to="/settings">Set address in settings</router-link>
        </p>
      </header>
      <div class="card-content" v-if="this.nodes[this.pubKey]">

      </div>
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
    });
    return {
      pubKey: store.state.pubKey,
      nodes: {},
    };
  },
};
</script>

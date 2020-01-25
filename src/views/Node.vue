<template>
  <div class="container-app">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title" v-if="this.status.Chain">
          {{nodeIP}}
        </p>
        <p class="card-header-title" v-if="!this.status.Chain">
          <router-link to="/settings">Set node details in settings</router-link>
        </p>
      </header>
      <div class="card-content" v-if="this.status.Chain">
        <table class="table is-fullwidth">
          <tr>
            <th>BeaconHeight</th>
            <td>{{status.BeaconHeight}}</td>
          </tr>
          <tr>
            <th>Chain</th>
            <td>{{status.Chain}}</td>
          </tr>
          <tr>
            <th>CurrentShardBlockTx</th>
            <td>{{status.CurrentShardBlockTx}}</td>
          </tr>
          <tr>
            <th>Mining</th>
            <td>{{status.IsEnableMining}}</td>
          </tr>
          <tr>
            <th>Layer</th>
            <td>{{status.Layer}}</td>
          </tr>
          <tr>
            <th>MiningPublickey</th>
            <td>{{status.MiningPublickey}}</td>
          </tr>
          <tr>
            <th>PoolSize</th>
            <td>{{status.PoolSize}}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{{status.Role}}</td>
          </tr>
          <tr>
            <th>ShardHeight</th>
            <td>{{status.ShardHeight}}</td>
          </tr>
          <tr>
            <th>ShardID</th>
            <td>{{status.ShardID}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import store from '@/store';

export default {
  name: 'node',
  data() {
    api.getMiningInfo(`http://${store.state.nodeIP}:${store.state.nodePort}`).then((result) => {
      this.status = result.data.Result;
    });
    return {
      nodeIP: store.state.nodeIP,
      nodePort: store.state.nodePort,
      nodeKey: store.state.nodeKey,
      status: {},
    };
  },
};
</script>

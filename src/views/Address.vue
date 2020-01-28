<template>
  <div class="container-app">
    <div class="loader-wrapper" v-if="isLoading">
      <div class="loader is-loading"></div>
    </div>

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

    <div v-for="(address, index) in addresses" v-bind:key="index">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{address.address}}
          </p>
        </header>
        <div class="card-content">
          <table class="table is-bordered is-fullwidth">
            <tr v-for="(reward, index) in address.rewards" v-bind:key="index">
              <th>{{reward.name}}</th>
              <td>{{reward.amount/10**9}}</td>
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
    api.listRewardAmount().then((rewards) => {
      this.addresses.forEach((address, index) => {
        api.getPublicKeyFromPaymentAddress(address.address).then((publicKey) => {
          this.addresses[index].rewards = [];
          Object.keys(rewards[publicKey.PublicKeyInBase58Check]).forEach((token) => {
            if (
              rewards[publicKey.PublicKeyInBase58Check][token] !== 0
              && api.tokenIDToName(token)
            ) {
              this.addresses[index].rewards.push({
                name: api.tokenIDToName(token),
                amount: parseInt(rewards[publicKey.PublicKeyInBase58Check][token], 10),
              });
              this.save();
            }
          });
          if (this.addresses[index].rewards.length === 0) {
            this.addresses[index].rewards.push({
              name: 'PRV',
              amount: 0,
            });
          }
        });
        this.isLoading = false;
      });
    });
    return {
      isLoading: true,
      addresses: store.state.addresses,
    };
  },
  methods: {
    save() {
      store.commit('setAddresses', this.addresses);
    },
  },
};
</script>

<style scoped>
.loader-wrapper {
  position: fixed;
  top: 54px;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  z-index: -1;
}

.loader {
  height: 80px;
  width: 80px;
  z-index: 100;
}

.card-header {
  overflow: scroll;
}
</style>

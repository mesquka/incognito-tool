import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    address: '',
    pubKey: '',
    nodeIP: '',
    nodeKey: '',
  },
  mutations: {
    setAddress(state, address) {
      state.address = address;
    },
    setPubKey(state, pubKey) {
      state.pubKey = pubKey;
    },
    setNodeIP(state, ip) {
      state.nodeIP = ip;
    },
    setNodeKey(state, key) {
      state.nodeKey = key;
    },
  },
  actions: {
    changeAddress(state, address) {
      return new Promise((resolve, reject) => {
        api.getPublicKeyFromPaymentAddress(address).then((result) => {
          state.commit('setAddress', address);
          state.commit('setPubKey', result.data.Result.PublicKeyInBase58Check);
          resolve();
        }).catch(reject);
      });
    },
    changeNodeIP(state, nodeIP) {
      return new Promise((resolve, reject) => {
        api.getPublicKeyMining(nodeIP).then((result) => {
          state.commit('setNodeIP', nodeIP);
          state.commit('setNodeKey', result.data.Result[0]);
          resolve();
        }).catch(reject);
      });
    },
  },
  plugins: [new VuexPersistence().plugin],
});

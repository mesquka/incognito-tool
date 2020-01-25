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
    nodePort: 9334,
    nodeKey: '',
    listRewardAmountCache: {},
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
    setNodePort(state, port) {
      state.nodePort = port;
    },
    setNodeKey(state, key) {
      state.nodeKey = key;
    },
    setListRewardAmountCache(state, value) {
      state.listRewardAmountCache = value;
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
    changeNodeIP(state, node) {
      return new Promise((resolve, reject) => {
        api.getPublicKeyMining(`http://${node.nodeIP}:${node.nodePort}`).then((result) => {
          state.commit('setNodeIP', node.nodeIP);
          state.commit('setNodePort', node.nodePort);
          state.commit('setNodeKey', result.data.Result[0]);
          resolve();
        }).catch(reject);
      });
    },
  },
  plugins: [new VuexPersistence().plugin],
});

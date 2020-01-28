import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    addresses: [],
    nodes: [],
  },
  mutations: {
    setAddresses(state, addresses) {
      state.addresses = addresses;
    },
    setNodes(state, nodes) {
      state.nodes = nodes;
    },
  },
  plugins: [new VuexPersistence({
    storage: window.localStorage,
  }).plugin],
});

export default store;

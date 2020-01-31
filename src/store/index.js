import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    addresses: [],
    nodes: [],
    tokenNameIDMap: {},
  },
  mutations: {
    setAddresses(state, addresses) {
      state.addresses = addresses;
    },
    setNodes(state, nodes) {
      state.nodes = nodes;
    },
    setTokenNameIDMap(state, tokenNameIDMap) {
      state.tokenNameIDMap = tokenNameIDMap;
    },
  },
  plugins: [new VuexPersistence({
    storage: window.localStorage,
  }).plugin],
});

export default store;

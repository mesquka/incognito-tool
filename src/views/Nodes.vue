<template>
  <div class="container-app">
    <button v-on:click="toggleCollapsed" class="collapse-button">
      <i v-if="!collapsed" class="mdi mdi-unfold-less-horizontal"></i>
      <i v-if="collapsed" class="mdi mdi-unfold-more-horizontal"></i>
    </button>

    <div class="spacer"></div>

    <div class="nodes-list">
      <node
        v-for="(node, index) in nodes"
        :key="index"
        :node="node"
        :collapsed="collapsed"
      ></node>
    </div>
  </div>
</template>

<script>
import Node from '@/components/nodes/Node.vue';

export default {
  name: 'nodes',
  components: {
    Node,
  },
  computed: {
    nodes() {
      return this.$store.state.nodes;
    },
    collapsed() {
      return this.$store.state.preferences.collapsed;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.commit('setPreference', {
        name: 'collapsed',
        value: !this.$store.state.preferences.collapsed,
      });
    },
  },
};
</script>

<style scoped>
.collapse-button {
  width: calc(100vw - 64px);
  color: #FFFFFF;
  background: #282c37;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 0 15px rgba(0,0,0,.2);
  border: 0;
  padding: 8px;
}

.nodes-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: calc(100vw - 64px);
}
</style>

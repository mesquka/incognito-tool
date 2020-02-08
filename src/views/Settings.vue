<template>
  <div class="container-app">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Nodes
        </p>
        <p class="card-header-icon" v-on:click="addNode">
          <span class="icon">
            <i class="mdi mdi-plus"></i>
          </span>
        </p>
      </header>
      <div class="card-content">
        <div class="card node-card" v-for="(node, index) in nodes" v-bind:key="index">
          <header class="card-header">
            <p class="card-header-title">
              {{node.ip}}:{{node.port}}
            </p>
          </header>
          <div class="card-content">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">IP</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded">
                    <input
                      class="input"
                      type="text"
                      placeholder="IP"
                      v-model="node.ip"
                      v-on:blur="save"
                    >
                  </p>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Port</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded">
                    <input
                      class="input"
                      type="number"
                      placeholder="Port"
                      v-model="node.port"
                      v-on:blur="save"
                    >
                  </p>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Direct Connect</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <label class="switch">
                    <input type="checkbox" v-model="node.directConnect" v-on:change="save">
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded">
                    <button class="button is-fullwidth is-danger" v-on:click="deleteNode(index)">
                      <i class="mdi mdi-delete"></i>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="spacer"></div>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Refresh Interval
        </p>
      </header>
      <div class="card-content">
        <div class="field has-addons">
          <p class="control is-expanded">
            <input
              class="input"
              type="number"
              v-model.number="refreshInterval"
              v-on:blur="save"
            >
          </p>
          <p class="control">
            <a class="button is-static">
              minutes
            </a>
          </p>
        </div>
      </div>
    </div>

    <div class="spacer"></div>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Reset Settings
        </p>
      </header>
      <div class="card-content">
        <button class="button is-danger is-fullwidth" v-on:click="resetData">
          Reset App Settings
        </button>
        <small>Use this if you're experiencing issues with the dashboard</small>
      </div>
    </div>

    <div class="spacer"></div>
  </div>
</template>

<script>

export default {
  name: 'settings',
  data() {
    return {
      refreshInterval: this.$store.state.refreshInterval / 60 / 1000,
      nodes: this.$store.state.nodes,
    };
  },
  methods: {
    deleteNode(index) {
      this.nodes.splice(index, 1);
      this.save();
    },
    addNode() {
      this.nodes.push({
        ip: '',
        port: '9334',
        directConnect: false,
        status: {},
        miningKey: '',
        rewards: {},
      });
    },
    save() {
      this.$store.commit('setNodes', this.nodes);

      if (
        this.refreshInterval > 0
      ) {
        this.$store.commit('setRefreshInterval', this.refreshInterval * 60 * 1000);
        this.$root.dataUpdater.refreshInterval();
      }
    },
    resetData() {
      window.localStorage.removeItem('vuex');
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.node-card {
  margin-bottom: 10px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #00d1b2;
}

input:focus + .slider {
  box-shadow: 0 0 1px #00d1b2;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>

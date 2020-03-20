<template>
  <div class="node">
    <header class="header">
      {{node.ip}}:{{node.port}}
    </header>
    <div class="field miningKey" v-if="!collapsed">
      <div class="item">
        <div class="value">
          {{node.miningKey}}
        </div>
        <div class="label">
          Mining Key
        </div>
      </div>
    </div>

    <hr v-if="!collapsed">

    <div class="field" v-if="!collapsed">
      <div class="item">
        <div class="value">
          {{node.status.BeaconHeight}}
        </div>
        <div class="label">
          Beacon Height
        </div>
      </div>
      <div class="item">
        <div class="value">
          {{`${node.status.Layer.charAt(0).toUpperCase()}${node.status.Layer.slice(1)}`}}
        </div>
        <div class="label">
          Layer
        </div>
      </div>
      <div class="item">
        <div class="value">
          {{`${node.status.Role.charAt(0).toUpperCase()}${node.status.Role.slice(1)}`}}
        </div>
        <div class="label">
          Role
        </div>
      </div>
      <div class="item">
        <div class="value">
          {{node.status.ShardID}}
        </div>
        <div class="label">
          Shard ID
        </div>
      </div>
    </div>

    <hr v-if="!collapsed">

    <div class="field">
      <div class="item" v-for="reward in node.rewards" :key="reward.Name">
        <div class="value">
          {{reward.amount/(10 ** reward.PDecimals)}}
        </div>
        <div class="label">
          {{reward.Name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'node',
  props: ['node', 'collapsed'],
};
</script>

<style scoped>
.node {
  flex-grow: 1;
  border-radius: 4px;
  min-width: 292px;
  width: calc(50% - 20px);
  text-align: center;
  background: #282c37;
  margin: 0 10px 16px 10px;
  box-shadow: 0 0 15px rgba(0,0,0,.2);
}

.node > .header {
  background: #313543;
  border-radius: 4px 4px 0 0;
  padding: 8px;
}

.node > .field {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.node > .field > .item {
  min-width: 105px;
  margin: 8px 10px 8px 10px;
  width: calc(25% - 20px);
}

.node > .field.miningKey > .item {
  margin: 8px 10px 8px 10px;
  width: calc(100% - 20px);
}

.node > .field.miningKey > .item > .value {
  font-size: 12px;
}

.node > .field > .item > .label {
  font-size: 12px;
  width: 100%;
  color: #606984;
}

.node > .field > .item > .value {
  overflow-wrap: break-word;
  width: 100%;
}
</style>

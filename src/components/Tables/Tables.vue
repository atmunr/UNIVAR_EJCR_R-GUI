<template>
  <div>
    <calibration-tables
      v-if="showTable('calibration')"
    />
    <prediction-tables
      v-if="showTable('prediction')"
    />
  </div>
</template>

<script lang="ts">
  import { mapState } from 'vuex';

  export default {
    computed: mapState('ui', ['shownValues', 'valuesAvailable']),
    methods: {
      showTable (name) {
        if (!this.valuesAvailable[name]) return false;
        return this.shownValues === name;
      }
    },
	  components: {
	    'calibration-tables' : require('components/Tables/CalibrationTables.vue').default,
	    'prediction-tables' : require('components/Tables/PredictionTables.vue').default
	  }
  }
</script>

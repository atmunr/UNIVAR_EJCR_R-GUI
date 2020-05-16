<template>
  <q-page class="q-pa-md">

    <div class="row q-pa-lg">
      <div class="col-3 text-center">
        <action-buttons />
      </div>
      <div class="col-9">
        <plots />
      </div>
    </div>

    <div class="q-pa-lg ">
      <calibration-tables
        v-if="shownValues === 'calibration' &&
        valuesStatus['calibration'] === 'AVAILABLE'"
      />
      <prediction-tables
        v-if="shownValues === 'prediction' &&
        valuesStatus['prediction'] === 'AVAILABLE'"
      />
    </div>

		<q-dialog v-model="showDataInputForm">
		  <data-input-form @formSubmitted="showDataInputForm = false" />
		</q-dialog>

  </q-page>
</template>

<script lang="ts">
  import { mapState } from 'vuex';

  export default {
    name: 'PageIndex',
    data () {
      let showDataInputForm : Boolean = false;

      return { showDataInputForm };
    },
    computed: mapState('ui', ['shownValues', 'valuesStatus']),
		mounted() {
			this.$root.$on('showDataInputForm', () => {
				this.showDataInputForm = true;
			});
		},
	  components: {
	    'plots' : require('components/Plots/Plots.vue').default,
	    'data-input-form' : require('components/ActionButtons/SubmitData/DataInputForm.vue').default,
	    'action-buttons' : require('components/ActionButtons/ActionButtons.vue').default,
	    'calibration-tables' : require('components/Tables/CalibrationTables.vue').default,
	    'prediction-tables' : require('components/Tables/PredictionTables.vue').default
	  }
  }
</script>

<style lang="scss">
  .no-plot {
    text-align: center;
    vertical-align: middle;
  }
</style>

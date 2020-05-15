<template>
  <q-page class="q-pa-md">

    <div class="row q-pa-lg">
      <div class="col-3 text-center">
        <action-buttons />
      </div>
      <div class="col-9">
        <q-img
          v-if="plots.current === 'regression' && plots.urls.regression !== ''"
          :src="plots.urls.regression"
          spinner-color="white" contain
          style="max-height: 550px; max-width: 1500px"
        />
        <q-img
          v-else-if="plots.current === 'residuals' && plots.urls.residuals !== ''"
          :src="plots.urls.residuals"
          spinner-color="white" contain
          style="max-height: 550px; max-width: 1500px"
        />
	      <div v-else>
	        <div class="q-pa-lg q-ma-lg text-h5 text-primary no-plot">
	          Upload files using the options on the left and the plots
	          will appear over here.
	        </div>
        </div>
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
    computed: mapState('ui', ['plots', 'shownValues', 'valuesStatus']),
		mounted() {
			this.$root.$on('showDataInputForm', () => {
				this.showDataInputForm = true;
			});
		},
	  components: {
	    'data-input-form' : require('components/DataInputForm.vue').default,
	    'action-buttons' : require('components/ActionButtons.vue').default,
	    'calibration-tables' : require('components/CalibrationTables.vue').default,
	    'prediction-tables' : require('components/PredictionTables.vue').default
	  }
  }
</script>

<style lang="scss">
  .no-plot {
    text-align: center;
    vertical-align: middle;
  }
</style>

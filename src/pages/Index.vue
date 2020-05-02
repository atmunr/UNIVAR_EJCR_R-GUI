<template>
  <q-page class="q-pa-md">

    <div class="row q-pa-lg">
      <div class="col-3 text-center">
        <action-buttons
          @calibrationButtonPressed="showCalibrationForm = true"
        />
      </div>
      <div class="col-9">
        <q-img
          :src="calibrationPlotUrl"
          spinner-color="white" contain
          style="max-height: 550px; max-width: 1500px"
        />
      </div>
    </div>

    <calibration-tables />

		<q-dialog v-model="showCalibrationForm">
		  <edit-calibration-data @formSubmitted="showCalibrationForm = false" />
		</q-dialog>

  </q-page>
</template>

<script lang="ts">
  import { mapState } from 'vuex';

  export default {
    name: 'PageIndex',
    data () {
      let showCalibrationForm : Boolean = false;
      return { showCalibrationForm };
    },
    computed: mapState('calibration', ['calibrationPlotUrl']),
	  components: {
	    'edit-calibration-data' : require('components/CalibrationForm.vue').default,
	    'action-buttons' : require('components/ActionButtons.vue').default,
	    'calibration-tables' : require('components/CalibrationTables.vue').default
	  }
  }
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <q-img
      :src="calibrationPlotUrl"
      spinner-color="white" contain
      style="height: 500px; width: 1500px"
    />
    <q-btn push color="orange" label="Calibration data" @click="showCalibrationForm = true" />
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
    computed: mapState('calibrationData', ['calibrationPlotUrl']),
	  components: {
	    'edit-calibration-data' : require('components/CalibrationForm.vue').default
	  }
  }
</script>

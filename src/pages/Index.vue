<template>
  <q-page class="row items-center justify-evenly">
    <q-img
      :src="plotUrl"
      spinner-color="white" contain
      style="height: 500px; width: 1500px"
    />
    <q-btn push color="orange" label="Calibration data" @click="showEditCalibrationForm = true" />
		<q-dialog v-model="showEditCalibrationForm">
		  <edit-calibration-data @formSubmitted="showEditCalibrationForm = false" />
		</q-dialog>
  </q-page>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PageIndex',
  data () {
    let showEditCalibrationForm : Boolean = false;

    return { showEditCalibrationForm };
  },
  computed : {
		...mapGetters('calibrationData', ['dataPointsAnalytes', 'dataPointsSignals', 'plotUrl'])
  },
	components: {
	  'edit-calibration-data' : require('components/EditCalibrationData.vue').default
	}
}
</script>

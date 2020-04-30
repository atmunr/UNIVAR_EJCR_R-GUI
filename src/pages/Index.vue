<template>
  <q-page class="row items-center justify-evenly">
    <q-img
      :src="plotUrl"
      spinner-color="white" contain
      style="height: 500px; width: 1500px"
    />
    <q-btn push color="orange" label="Get plot" @click="getPlot" />


    <q-btn push color="orange" label="Calibration data" @click="showEditCalibrationForm = true" />
		<q-dialog v-model="showEditCalibrationForm">
		  <edit-calibration-data @formSubmitted="updatePlot" />
		</q-dialog>
  </q-page>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
  name: 'PageIndex',
  data () {
    let plotUrl : String = '';
    let showEditCalibrationForm : Boolean = false;

    return { plotUrl, showEditCalibrationForm };
  },
  computed : {
		...mapGetters('calibrationData', ['dataPointsAnalytes', 'dataPointsSignals'])
  },
  methods: {
    getPlot () {
      this.dataPointsAnalytes;
      this.$axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/plotVectors', {
        x: this.dataPointsAnalytes, y: this.dataPointsSignals,
        title: 'A plot', xlabel: 'Some values', ylabel: 'Some more values',
        slope: 2, intercept: 0
      })
      .then((response) => {
        this.plotUrl = 'https://cloud.opencpu.org' + response.data.split('\n')[4];
      })
      .catch((error) => { console.log(error); });
    },
    updatePlot () {
      this.showEditCalibrationForm = false;
      this.getPlot();
    }
  },
	components: {
	  'edit-calibration-data' : require('components/EditCalibrationData.vue').default
	}
}
</script>

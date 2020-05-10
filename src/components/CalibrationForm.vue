<template>
  <q-card>
	  <q-card-section class="row">
      <div class="text-h6">Edit calibration data</div>
      <q-space />
      <q-btn flat round dense icon="close" v-close-popup />
    </q-card-section>

    <form @submit.prevent="submitForm">

      <q-file
        :label-color="fileNames['calibration'] ? 'primary' : ''"
        v-model="calibrationValuesFile"
        :label="fileNames['calibration'] ? fileNames['calibration'] : 'Calibration Data'"
      >
        <template v-slot:prepend>
          <q-icon name="attachment" :color="fileNames['calibration'] ? 'primary' : ''" />
        </template>
      </q-file>

      <q-file v-if="valuesStatus['calibration'] === 'AVAILABLE'"
        :label-color="fileNames['prediction'] ? 'primary' : ''"
        v-model="predictionValuesFile"
        :label="fileNames['prediction'] ? fileNames['prediction'] : 'Test Data'"
      >
        <template v-slot:prepend>
          <q-icon name="attachment" :color="fileNames['prediction'] ? 'primary' : ''" />
        </template>
      </q-file>

      <q-card-actions align="right">
	      <q-btn v-close-popup flat dense label="Save" type="submit" />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script lang="ts">
  import { mapState, mapActions } from 'vuex';
  import Papa from 'papaparse';

  export default {
    data () {
      let calibrationValuesFile : File, predictionValuesFile : File;
      return { calibrationValuesFile, predictionValuesFile };
    },
    computed: mapState('ui', ['fileNames', 'valuesStatus']),
    methods: {
		  ...mapActions('calibration', ['updateCalibrationValues']),
      submitForm () {
        Papa.parse(this.calibrationValuesFile, {
          header: false,
          delimiter: ' ',
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: results => {
            for (let row = 0; row < results.data.length; row++) {
              results.data[row] = results.data[row].filter(x => x != null);
            }
            this.updateCalibrationValues({
              newCalibrationSamples: results.data,
              newFileName: this.calibrationValuesFile.name
            });
          }
        });
        this.$emit('formSubmitted');
      }
    }
  }
</script>

<style lang="scss">

</style>

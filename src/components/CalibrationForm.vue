<template>
  <q-card>
	  <q-card-section class="row">
      <div class="text-h6">Edit calibration data</div>
      <q-space />
      <q-btn flat round dense icon="close" v-close-popup />
    </q-card-section>

    <form @submit="submitForm">
      <q-file color="orange" v-model="calibrationValuesFile" label="Calibration Data">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
      <q-card-actions align="right">
	      <q-btn v-close-popup flat dense label="Save" type="submit" />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script lang="ts">
  import { mapActions } from 'vuex';
  import Papa from 'papaparse';

  export default {
    data () {
      let calibrationValuesFile : File;
      return { calibrationValuesFile };
    },
    methods: {
		  ...mapActions('calibrationData', ['updateCalibrationValues']),
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
            this.updateCalibrationValues(results.data);
          }
        });
        this.$emit('formSubmitted');
      }
    }
  }
</script>

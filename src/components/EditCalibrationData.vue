<template>
  <q-card>
	  <q-card-section class="row">
      <div class="text-h6">Edit calibration data</div>
      <q-space />
      <q-btn flat round dense icon="close" v-close-popup />
    </q-card-section>

    <form @submit="submitForm">
      <q-card-actions align="right">
	      <q-btn v-close-popup flat dense label="Save" type="submit" />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script lang="ts">
import { mapActions } from 'vuex';

export default {
  data () {
    let newCalibrationData : Number[][];
    return { newCalibrationData };
  },
  methods: {
		...mapActions('calibrationData', ['updateCalibrationData']),
    submitForm () {
      // get new calibration data from form
      this.newCalibrationData = [
        [1, 1,  2.5,  3],
        [2, 3,  3.5,  5],
        [3, 5,  6.6,  7],
        [4, 7,  7.5,  9],
        [5, 9,  9.5, 10]
      ];
      this.updateCalibrationData(this.newCalibrationData);
      this.$emit('formSubmitted');
    }
  }
}
</script>

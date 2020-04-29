<template>
  <q-page class="row items-center justify-evenly">
    <q-img
      :src="plotUrl"
      spinner-color="white" contain
      style="height: 500px; width: 1500px"
    />
    <q-btn push color="orange" label="Get plot" @click="getPlot" />
  </q-page>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
  name: 'PageIndex',
  data () {
    let plotUrl : String = '';
    return { plotUrl };
  },
  computed : {
		...mapGetters('calibrationData', ['dataPointsAnalytes', 'dataPointsSignals'])
  },
  methods: {
    getPlot () {
      this.$axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/plotVectors', {
        x: this.dataPointsAnalytes, y: this.dataPointsSignals,
        title: 'A plot', xlabel: 'Some values', ylabel: 'Some more values',
        slope: 2, intercept: 0
      })
      .then((response) => {
        this.plotUrl = 'https://cloud.opencpu.org' + response.data.split('\n')[4];
      })
      .catch((error) => { console.log(error); });
    }
  }
}
</script>

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
export default {
  name: 'PageIndex',
  data () {
    let plotUrl : String = '';
    return { plotUrl };
  },
  computed : {
    dataPoints: () => {
      const calibData : Number[][] = [
        [1, 1,  2,  3],
        [2, 3,  4,  5],
        [3, 5,  6,  7],
        [4, 7,  8,  9],
        [5, 9, 10, 11]
      ];
      let analytes : Number[] = [], signals : Number[] = [];
      for (let row = 0; row < 5; row++) {
        for (let col = 1; col < 4; col++) {
          analytes.push(calibData[row][0]);
          signals.push(calibData[row][col])
        } 
      }
      return {analytes: analytes, signals: signals};
    }
  },
  methods: {
    getPlot () {
      this.$axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/plotVectors', {
        x: this.dataPoints.analytes, y: this.dataPoints.signals,
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

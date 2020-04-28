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
    const x : Number[] = [1, 2, 3, 4, 5];
    const y : Number[] = [2, 3, 4, 5, 6];
    let plotUrl : String = '';
    return { x, y, plotUrl };
  },
  methods: {
    getPlot () {
      this.$axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/plotVectors', {
        x: this.x, y: this.y,
        title: 'A plot', xlabel: 'Some values', ylabel: 'Some more values',
        slope: 1, intercept: 1
      })
      .then((response) => {
        this.plotUrl = 'https://cloud.opencpu.org' + response.data.split('\n')[4];
      })
      .catch((error) => { console.log(error); });
    }
  }
}
</script>

<template>
  <div v-if="loadingPlot">
	  <div class="q-pa-lg q-ma-lg text-h5 text-info no-plot">
	    Processing request...
	  </div>
  </div>
  <div v-else-if="selectedPlotAvailable">
    <plot :url="selectedPlotUrl" />
  </div>
  <div v-else>
	  <div class="q-pa-lg q-ma-lg text-h5 text-info no-plot">
	    Upload files using the options on the left and the plots
	    will appear over here.
	  </div>
  </div>
</template>

<script lang="ts">
  import { mapState } from 'vuex';

  export default {
    computed: mapState('ui', {
      loadingPlot: state => {
        return state['loadingRequest'];
      },
      selectedPlotUrl: state => {
        const selectedPlot = state['plots'].current;
        return state['plots'].urls[selectedPlot];
      },
      selectedPlotAvailable: state => {
        const selectedPlot = state['plots'].current;
        return state['plots'].urls[selectedPlot] !== '';
      }
    }),

	  components: {
	    'plot' : require('components/Plots/Plot.vue').default
	  }
  }
</script>

<style lang="scss">
  .no-plot {
    text-align: center;
    vertical-align: middle;
  }
</style>

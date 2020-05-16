<template>
  <div v-if="nothingToShow">
	  <div class="q-pa-lg q-ma-lg text-h5 text-primary no-plot">
	    Upload files using the options on the left and the plots
	    will appear over here.
	  </div>
  </div>
  <div v-else>
    <plot :url="currentPlotUrl" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: mapState('ui', {
      nothingToShow: state => {
        return state.plots.current === '';
      },
      currentPlotUrl: state => {
        return state.plots.urls[state.plots.current];
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

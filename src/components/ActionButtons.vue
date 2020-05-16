<template>
  <div>
    <submit-data-button />

    <values-selection />

    <plot-selection />
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    computed: mapState('ui', ['plots', 'shownValues', 'valuesStatus']),

    methods: mapActions('ui', ['updateCurrentPlot']),

    components: {
      'submit-data-button' : require('components/SubmitDataButton.vue').default,
      'values-selection' : require('components/ValuesSelection.vue').default,
      'plot-selection' : require('components/PlotSelection.vue').default,
      'mode-selection' : require('components/Shared/ModeSelection.vue').default,
      'mode-selection-button' : require('components/Shared/ModeSelectionButton.vue').default
    }
  }
</script>

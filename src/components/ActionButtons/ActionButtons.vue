<template>
  <div>
    <submit-data-button />

    <values-selection />

    <plot-selection />
  </div>
</template>

<script>
  export default {
    components: {
      'submit-data-button' : require('components/ActionButtons/SubmitData/SubmitDataButton.vue').default,
      'values-selection' : require('components/ActionButtons/ValuesSelection.vue').default,
      'plot-selection' : require('components/ActionButtons/PlotSelection.vue').default
    }
  }
</script>

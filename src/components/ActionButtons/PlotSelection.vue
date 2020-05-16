<template>
  <q-card class="q-mt-lg">
    <q-card-section class="bg-primary text-black">
      <div class="text-h6">Change plot</div>
    </q-card-section>
    <q-card-section>
      <mode-selection-button
        class="full-width"
        label="Linear Regression"
        :disable="willBeDisabled('regression')"
        :highlight="willBeHighlighted('regression')"
        @clicked="updateCurrentPlot('regression')"
      />
    </q-card-section>
    <q-card-section>
      <mode-selection-button
        class="full-width"
        label="Residuals"
        :disable="willBeDisabled('residuals')"
        :highlight="willBeHighlighted('residuals')"
        @clicked="updateCurrentPlot('residuals')"
      />
    </q-card-section>
  </q-card>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    computed: mapState('ui', ['plots']),

    methods: {
      ...mapActions('ui', ['updateCurrentPlot']),

      willBeDisabled (name) {
        return this.plots.urls[name] === '';
      },

      willBeHighlighted (name) {
        if (this.willBeDisabled(name)) return false;
        return this.plots.current === name;
      }
    },

    components: {
      'mode-selection-button' : require('components/Shared/ModeSelectionButton.vue').default
    }
  }
</script>

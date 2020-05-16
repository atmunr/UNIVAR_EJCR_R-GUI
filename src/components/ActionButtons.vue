<template>
  <div>
    <submit-data-button />

    <q-card class="q-mt-lg">
      <q-card-section class="bg-primary text-black">
        <div class="text-h6">Change shown values</div>
      </q-card-section>
      <q-card-section class="text-black">
        <mode-selection
          :firstButton="{
            label: 'Calibration',
            disable: willBeDisabled('calibration'),
            highlight: willBeHighlighted('calibration')
          }"
          @firstButtonClicked="updateShownValues('calibration')"
          :secondButton="{
            label: 'Prediction',
            disable: willBeDisabled('prediction'),
            highlight: willBeHighlighted('prediction')
          }"
          @secondButtonClicked="updateShownValues('prediction')"
          :thirdButton="{
            label: 'EJCR',
            disable: willBeDisabled('ejcr'),
            highlight: willBeHighlighted('ejcr')
          }"
          @thirdButtonClicked="updateShownValues('ejcr')"
          :fourthButton="{
            label: 'RMSE',
            disable: willBeDisabled('rmse'),
            highlight: willBeHighlighted('rmse')
          }"
          @fourthButtonClicked="updateShownValues('rmse')"
        />
      </q-card-section>
    </q-card>

    <q-card class="q-mt-lg">
      <q-card-section class="bg-primary text-black">
        <div class="text-h6">Change plot</div>
      </q-card-section>
      <q-card-section>
        <mode-selection-button
          class="full-width"
          label="Linear Regression"
          :disable="plots.urls['regression'] === ''"
          :highlight="plots.current === 'regression' && plots.urls['regression'] !== ''"
          @clicked="updateCurrentPlot('regression')"
        />
      </q-card-section>
      <q-card-section>
        <mode-selection-button
          class="full-width"
          label="Residuals"
          :disable="plots.urls['residuals'] === ''"
          :highlight="plots.current === 'residuals' && plots.urls['residuals'] !== ''"
          @clicked="updateCurrentPlot('residuals')"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    computed: mapState('ui', ['plots', 'shownValues', 'valuesStatus']),

    methods: {
      ...mapActions('ui', ['updateCurrentPlot', 'updateShownValues']),

      willBeDisabled (name) {
        return this.valuesStatus[name] === 'EMPTY';
      },

      willBeHighlighted (name) {
        return this.shownValues === name;
      }
    },

    components: {
      'submit-data-button' : require('components/SubmitDataButton.vue').default,
      'mode-selection' : require('components/Shared/ModeSelection.vue').default,
      'mode-selection-button' : require('components/Shared/ModeSelectionButton.vue').default
    }
  }
</script>

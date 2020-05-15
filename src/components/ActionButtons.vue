<template>
  <div>
    <submit-data-button />

    <q-card class="q-mt-lg">
      <q-card-section class="bg-primary text-black">
        <div class="text-h6">Change shown values</div>
      </q-card-section>
      <q-card-section class="text-black">
        <div class="row justify-between">
          <div class="column">
            <mode-selection-button
              label="Calibration"
              :disable="valuesStatus['calibration'] === 'EMPTY'"
              :highlight="shownValues === 'calibration'"
              @clicked="updateShownValues('calibration')"
            />
            <mode-selection-button
              class="q-mt-md"
              label="Prediction"
              :disable="valuesStatus['prediction'] === 'EMPTY'"
              :highlight="shownValues === 'prediction'"
              @clicked="updateShownValues('prediction')"
            />
          </div>
          <div class="column">
            <mode-selection-button
              label="EJCR"
              :disable="valuesStatus['ejcr'] === 'EMPTY'"
              :highlight="shownValues === 'ejcr'"
              @clicked="updateShownValues('ejcr')"
            />
            <mode-selection-button
              class="q-mt-md"
              label="RMSE"
              :disable="valuesStatus['rmse'] === 'EMPTY'"
              :highlight="shownValues === 'rmse'"
              @clicked="updateShownValues('rmse')"
            />
          </div>
        </div>
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
    methods: mapActions('ui', ['updateCurrentPlot', 'updateShownValues']),
    components: {
      'submit-data-button' : require('components/SubmitDataButton.vue').default,
      'mode-selection-button' : require('components/ModeSelectionButton.vue').default
    }
  }
</script>

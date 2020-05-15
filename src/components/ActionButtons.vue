<template>
  <div>
    <div class="q-mt-lg text-h6">
      <q-btn
        class="full-width"
        color="primary" text-color="black"
        label="Submit Data" no-caps
        @click="$emit('submitDataButtonClicked')"
      />
    </div>

    <q-card class="q-mt-lg">
      <q-card-section class="bg-primary text-black">
        <div class="text-h6">Change shown values</div>
      </q-card-section>
      <q-card-section class="text-black">
        <div class="row justify-between">
          <div class="column">
            <q-btn
              color="primary" text-color="black"
              label="Calibration" no-caps
              @click="updateShownValues('calibration')"
              :disable="valuesStatus['calibration'] === 'EMPTY'"
              :glossy="shownValues === 'calibration'"
            />
            <q-btn
              class="q-mt-md"
              color="primary" text-color="black"
              label="Prediction" no-caps
              @click="updateShownValues('prediction')"
              :disable="valuesStatus['prediction'] === 'EMPTY'"
              :glossy="shownValues === 'prediction'"
            />
          </div>
          <div class="column">
            <q-btn
              color="primary" text-color="black"
              label="EJCR" no-caps
              @click="updateShownValues('ejcr')"
              :disable="valuesStatus['ejcr'] === 'EMPTY'"
              :glossy="shownValues === 'ejcr'"
            />
            <q-btn
              class="q-mt-md"
              color="primary" text-color="black"
              label="RMSE" no-caps
              @click="updateShownValues('rmse')"
              :disable="valuesStatus['rmse'] === 'EMPTY'"
              :glossy="shownValues === 'rmse'"
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
        <q-btn
          class="full-width"
          color="primary" text-color="black"
          label="Linear regression" no-caps
          @click="updateCurrentPlot('regression')"
          :disable="plots.urls['regression'] === ''"
          :glossy="plots.current === 'regression' && plots.urls['regression'] !== ''"
        />
      </q-card-section>
      <q-card-section>
        <q-btn
          class="full-width"
          color="primary" text-color="black"
          label="Residuals" no-caps
          @click="updateCurrentPlot('residuals')"
          :disable="plots.urls['residuals'] === ''"
          :glossy="plots.current === 'residuals' && plots.urls['residuals'] !== ''"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    computed: mapState('ui', ['plots', 'shownValues', 'valuesStatus']),
    methods: mapActions('ui', ['updateCurrentPlot', 'updateShownValues'])
  }
</script>

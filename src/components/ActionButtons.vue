<template>
  <div>
    <q-card class="q-mt-sm">
      <q-card-section class="bg-primary text-black">
        <div class="text-h6">Submit data</div>
      </q-card-section>
      <q-card-section>
        <q-btn
          class="full-width"
          color="primary" text-color="black"
          label="Calibration" no-caps
          @click="$emit('calibrationButtonPressed')"
        />
      </q-card-section>
      <q-card-section>
        <q-btn
          class="full-width"
          color="primary" text-color="black"
          label="EJCR"
          @click=""
        />
      </q-card-section>
      <q-card-section>
        <q-btn
          class="full-width"
          color="primary" text-color="black"
          label="RMSE"
          @click=""
        />
      </q-card-section>

    </q-card>

    <q-card class="q-mt-lg">
      <q-card-section class="bg-primary text-black">
        <div class="text-h6">Show plot</div>
      </q-card-section>
      <q-card-section>
        <q-btn
          class="full-width"
          color="primary" text-color="black"
          label="Linear regression" no-caps
          @click="updateCurrentPlot('regression')"
        />
      </q-card-section>
      <q-card-section>
        <q-btn
          class="full-width"
          color="primary" text-color="black"
          label="Residuals" no-caps
          @click="updateCurrentPlot('residuals')"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    methods: {
      ...mapActions('calibration', ['updateCurrentPlot'])
    }
  }
</script>

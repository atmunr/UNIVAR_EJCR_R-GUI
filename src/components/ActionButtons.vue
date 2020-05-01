<template>
  <q-card class="q-mt-sm">
    <q-card-section class="bg-primary text-black">
      <div class="text-h6">Univariate calibration & comparison</div>
    </q-card-section>
    <q-card-section>
      <q-btn
        color="primary" text-color="black"
        class="full-width" label="Calibration"
        @click="$emit('calibrationButtonPressed')"
      />
    </q-card-section>
    <q-card-section>
      <q-btn
        color="primary" text-color="black"
        class="full-width" label="Prediction"
        @click=""
      />
    </q-card-section>
    <q-card-section>
      <q-btn
        color="primary" text-color="black"
        class="full-width" label="EJCR"
        @click=""
      />
    </q-card-section>
    <q-card-section>
      <q-btn
        color="primary" text-color="black"
        class="full-width" label="RMSE"
        @click=""
      />
    </q-card-section>
  </q-card>
</template>

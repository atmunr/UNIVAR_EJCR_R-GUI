<template>
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
</template>

<script lang="ts">
  import { mapState, mapActions } from 'vuex';

  export default {
    computed: mapState('ui', ['shownValues', 'valuesAvailable']),

    methods: {
      ...mapActions('ui', ['updateShownValues']),

      willBeDisabled (name : String) {
        return !this.valuesAvailable[name];
      },

      willBeHighlighted (name : String) {
        return this.shownValues === name;
      }
    },

    components: {
      'mode-selection' : require('components/Shared/ModeSelection.vue').default,
      'mode-selection-button' : require('components/Shared/ModeSelectionButton.vue').default
    }
  }
</script>

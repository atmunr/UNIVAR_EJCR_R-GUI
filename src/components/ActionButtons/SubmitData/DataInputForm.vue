<template>
  <q-card>
	  <q-card-section class="q-gutter-lg row bg-primary text-black">
      <div class="text-h6">Submit data</div>
      <q-space /> <q-space />
      <q-btn flat round dense icon="close" v-close-popup />
    </q-card-section>

    <q-card-section class="text-black">
      <mode-selection
        :firstButton="{
          label: 'Calibration Data',
          disable: false,
          highlight: fileTarget === 'calibration'
        }"
        @firstButtonClicked="fileTarget = 'calibration'"
        :secondButton="{
          label: 'Prediction Data',
          disable: false,
          highlight: fileTarget === 'prediction'
        }"
        @secondButtonClicked="fileTarget = 'prediction'"
        :thirdButton="{
          label: 'EJCR',
          disable: false,
          highlight: fileTarget === 'ejcr'
        }"
        @thirdButtonClicked="fileTarget = 'ejcr'"
        :fourthButton="{
          label: 'RMSE',
          disable: false,
          highlight: fileTarget === 'rmse'
        }"
        @fourthButtonClicked="fileTarget = 'rmse'"
      />
    </q-card-section>

    <q-card-section>
      <form @submit.prevent="submitForm">
      <q-file outlined
        v-model="newFile"
        :disable="!fileTarget"
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>

        <q-card-actions align="right" class="row q-mt-md">
          <q-btn v-close-popup label="Save" type="submit"
            color="primary" text-color="black"
          />
        </q-card-actions>
      </form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
  import { mapState, mapActions } from 'vuex';
  import Papa from 'papaparse';

  export default {
    data () {
      let newFile : File, fileTarget : String;
      return { newFile, fileTarget };
    },
    methods: {
		  ...mapActions('calibration', ['calibrate']),
		  ...mapActions('prediction', ['clearPredictionValues', 'updatePredictionValues']),

      submitForm () {
        if (this.newFile !== undefined) {
          this.processFile(this.newFile, this.fileTarget);
        }

        this.$emit('formSubmitted');
      },

      parseFile (file : File, callback : Function) {
        Papa.parse(file, {
          header: false,
          delimiter: ' ',
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: results => {
            for (let row = 0; row < results.data.length; row++) {
              results.data[row] = results.data[row].filter(x => x != null);
            }
            results.data.forEach((sample, row) => {
              sample.forEach((value, column) => {
                if (value === 'NaN') {
                  results.data[row][column] = NaN;
                }
              })
            });
            callback(results.data);
          }
        });
      },

      processFile (file : File, target : String) {
        this.parseFile(file, (results) => {
          if (target === 'calibration') {
            this.clearPredictionValues();
            this.calibrate({
              samples: results,
              fileName: file.name
            });
          }
          if (target === 'prediction') {
            this.updatePredictionValues({
              newReplicateSets: results,
              newFileName: file.name
            });
          }
        });
      }
    },
	  components: {
	    'mode-selection' : require('components/Shared/ModeSelection.vue').default,
	    'mode-selection-button' : require('components/Shared/ModeSelectionButton.vue').default
	  }
  }
</script>

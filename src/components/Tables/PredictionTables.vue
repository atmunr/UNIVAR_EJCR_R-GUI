<template>
  <div class="row justify-center">
    <q-table
      :data="predictionInfoTable.rows"
      :columns="predictionInfoTable.columns"
      hide-bottom
    />
  </div>
</template>

<script lang="ts">
  import { mapState } from 'vuex';

  export default {
    computed: mapState('prediction', {
      predictionInfoTable: state => {

        let samples : {
          name: String,
          analyteConcentration: Number,
          plusMinus: Number,
          deviation: Number,
          relDeviation: Number
        }[] = [];

        for (let i = 0; i < state['analytes'].length; i++) {
          samples.push({
            name: 'Sample ' + (i + 1),
            analyteConcentration: state['analytes'][i],
            plusMinus: Math.abs(state['plusMinus'][i]),
            deviation: state['deviation'][i],
            relDeviation: state['relDeviation'][i]
          });
        }

        return {
          columns: [
            { align: 'center', field: row => row.name },
            { align: 'center', label: 'Concentration', field: 'analyteConcentration' },
            { align: 'center', label: '+ / -', field: 'plusMinus' },
            { align: 'center', label: 'Standard deviation', field: 'deviation' },
            { align: 'center', label: 'Relative Standard deviation', field: 'relDeviation' }
          ],
          rows: samples
        }
      },
    })
  }
</script>

<template>
  <div class="row justify-center">
    <q-table
      :data="predictionInfoTable.rows"
      :columns="predictionInfoTable.columns"
      hide-bottom
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: mapState('prediction', {
      predictionInfoTable: state => {
        let samples = [];
        for (let i = 0; i < state.analytes.length; i++) {
          samples.push({
            name: 'Sample ' + (i + 1),
            analyteConcentration: state.analytes[i],
            plusMinus: state.plusMinus[i],
            deviation: state.deviation[i],
            relDeviation: state.relDeviation[i]
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

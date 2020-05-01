<template>
  <div>
    <div class="row q-pa-lg justify-center">
      <q-table
        :data="calibrationValuesTable.generalInfo.rows"
        :columns="calibrationValuesTable.generalInfo.columns"
        hide-bottom
      />
    </div>
    <div class="row q-pa-lg">
      <div class="col q-pa-sm">
        <q-table
          title="Linear regression"
          :data="calibrationValuesTable.regression.rows"
          :columns="calibrationValuesTable.regression.columns"
          hide-bottom
        />
      </div>
      <div class="col q-pa-sm">
        <q-table
          title="Linearity Test"
          :data="calibrationValuesTable.linearityTest.rows"
          :columns="calibrationValuesTable.linearityTest.columns"
          hide-bottom
        />
      </div>
    </div>
    <div class="row q-pa-lg justify-center">
      <q-table
        title="Figures of Merit"
        :data="calibrationValuesTable.figuresOfMerit.rows"
        :columns="calibrationValuesTable.figuresOfMerit.columns"
        hide-bottom
      />
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      let calibrationValuesTable = {
        generalInfo: {
          columns: [
            { align: 'center', label: 'Concentration levels', field: 'concentrationLevels' },
            { align: 'center', label: 'Max. n° of replicates at each level', field: 'replicates' },
            { align: 'center', label: 'Data points', field: 'dataPoints' }
          ],
          rows: [{ concentrationLevels: 6, replicates: 3, dataPoints: 18 }]
        },
        regression: {
          columns: [
            { align: 'center', field: row => row.name },
            { align: 'center', label: 'Value', field: 'value' },
            { align: 'center', label: '+ / -', field: 'plusMinus' },
            { align: 'center', label: 'Standard deviation', field: 'deviation' }
          ],
          rows: [
            { name: 'Slope', value: 1.3174, plusMinus: 0.030206, deviation: 0.01423 },
            { name: 'Intercept', value: 0.12365, plusMinus: 0.091455, deviation: 0.043124 }
          ]
        },
        linearityTest: {
          columns: [
            { align: 'center', label: 'Estimated noise level', field: 'noiseLevel' },
            { align: 'center', label: 'Expectation value', field: 'expectationValue' },
            { align: 'center', label: 'Critical value', field: 'criticalValue' },
            { align: 'center', label: 'p-value', field: 'pValue' }
          ],
          rows: [{ noiseLevel: 0.082125, expectationValue: 1.5792, criticalValue: 2.6012, pValue: 0.214 }]
        },
        figuresOfMerit: {
          columns: [
            { align: 'center', label: 'Sensitivity', field: 'sensitivity' },
            { align: 'center', label: 'Analytical sensitivity (gamma)', field: 'gamma' },
            { align: 'center', label: '1 / gamma', field: 'oneOverGamma' },
            { align: 'center', label: 'Decision limit', field: 'decisionLimit' },
            { align: 'center', label: 'Detection limit', field: 'detectionLimit' },
            { align: 'center', label: 'Quantitation limit', field: 'quantitationLimit' },
            { align: 'center', label: 'Correlation coefficient', field: 'correlationCoefficient' }
          ],
          rows: [{
            sensitivity: 1.3174, gamma: 12.7654, oneOverGamma: 0.078337,
            decisionLimit: 0.14819, detectionLimit: 0.29638, quantitationLimit: 0.84901,
            correlationCoefficient: 0.99907
          }]
        }
      }

      return { calibrationValuesTable };
    }
  }
</script>

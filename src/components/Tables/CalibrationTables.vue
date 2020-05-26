<template>
  <div>
    <div class="row justify-center">
      <q-table
        :data="generalInfoTable.rows"
        :columns="generalInfoTable.columns"
        hide-bottom
      />
    </div>
    <div class="row q-pa-lg">
      <q-table class="col q-pa-sm"
        title="Linear regression"
        :data="regressionInfoTable.rows"
        :columns="regressionInfoTable.columns"
        hide-bottom
      />
      <div class="col q-pa-sm">
        <q-table
          title="Linearity Test"
          :data="linearityTestInfoTable1.rows"
          :columns="linearityTestInfoTable1.columns"
          hide-bottom
        />
        <q-table class="q-mt-md"
          :data="linearityTestInfoTable2.rows"
          :columns="linearityTestInfoTable2.columns"
          hide-bottom
        />
      </div>
    </div>
    <div class="row q-pa-lg justify-center">
      <q-table
        title="Figures of Merit"
        :data="figuresOfMeritInfoTable.rows"
        :columns="figuresOfMeritInfoTable.columns"
        hide-bottom
      />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: mapState('calibration', {
      generalInfoTable: state => {
        return {
          columns: [
            { align: 'center', label: 'Concentration levels', field: 'concentrationLevels' },
            { align: 'center', label: 'Max. n° of replicates at each level', field: 'replicates' },
            { align: 'center', label: 'Data points', field: 'dataPoints' }
          ],
          rows: [{
            concentrationLevels: state.generalInfo.concentrationLevels,
            replicates: state.generalInfo.replicates,
            dataPoints: state.generalInfo.dataPoints
          }]
        }
      },
      regressionInfoTable: state => {
        return {
          columns: [
            { align: 'center', field: row => row.name },
            { align: 'center', label: 'Value', field: 'value' },
            { align: 'center', label: '+ / -', field: 'plusMinus' },
            { align: 'center', label: 'Standard deviation', field: 'deviation' }
          ],
          rows: [
            { name: 'Slope',
                value: state.regression.slope.value,
                plusMinus: state.regression.slope.plusMinus,
                deviation: state.regression.slope.deviation
            },
            { name: 'Intercept',
              value: state.regression.intercept.value,
              plusMinus: state.regression.intercept.plusMinus,
              deviation: state.regression.intercept.deviation,
            }
          ]
        }
      },
      linearityTestInfoTable1: state => {
        return {
          columns: [
            { align: 'center', label: 'Estimated noise level', field: 'noiseLevel' },
            { align: 'center', label: 'Expectation value', field: 'expectationValue' },
            { align: 'center', label: 'Critical value', field: 'criticalValue' }
          ],
          rows: [{
            noiseLevel: state.linearityTest.noiseLevel,
            expectationValue: state.linearityTest.expectationValue,
            criticalValue: state.linearityTest.criticalValue,
            pValue: state.linearityTest.pValue,
            pass: state.linearityTest.pass ? "Yes" : "No"
          }]
        }
      },
      linearityTestInfoTable2: state => {
        return {
          columns: [
            { align: 'center', label: 'p-value', field: 'pValue' },
            { align: 'center', label: 'Pass?', field: 'pass' }
          ],
          rows: [{
            pValue: state.linearityTest.pValue,
            pass: state.linearityTest.pass ? "Yes" : "No"
          }]
        }
      },
      figuresOfMeritInfoTable: state => {
        return {
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
            sensitivity: state.figuresOfMerit.sensitivity,
            gamma: state.figuresOfMerit.gamma,
            oneOverGamma: state.figuresOfMerit.oneOverGamma,
            decisionLimit: state.figuresOfMerit.decisionLimit,
            detectionLimit: state.figuresOfMerit.detectionLimit,
            quantitationLimit: state.figuresOfMerit.quantitationLimit,
            correlationCoefficient: state.figuresOfMerit.correlationCoefficient
          }]
        }
      }
    })
  }
</script>

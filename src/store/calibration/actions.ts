
import state from './state'
import axios from 'axios';

import { createDataPoints, generalInfo, truncateDecimals } from './utils';

export async function updateCalibrationValues ({ commit, dispatch }, payload) {

  const newCalibrationSamples : Number[][] = payload.newCalibrationSamples;
  const newFileName : String = payload.newFileName;

  commit('ui/updateValuesStatus', {
    name: 'calibration', available: false
  }, { root: true });
  dispatch('ui/updateShownValues', 'calibration', { root: true });

  let [analytes, signals] = createDataPoints(newCalibrationSamples);
	commit('updateCalibrationValues', {
		newCalibrationSamples: newCalibrationSamples,
		newAnalytes: analytes,
		newSignals: signals
	});
  dispatch('updateGeneralInfo', newCalibrationSamples);

  await dispatch('getCalibrationResults');
  dispatch('getLinearityTestResults');

  commit('ui/updateValuesStatus', {
    name: 'calibration', available: true
  }, { root: true });

  commit('ui/updateFileName', {
    target: 'calibration', newFileName: newFileName
  }, { root: true });

  // Get new linear regression plot
  dispatch('ui/getNewPlot', {
    x: state.dataPoints.analytes, y: state.dataPoints.signals,
    title: 'Linear regression', xlabel: 'Concentration', ylabel: 'Response',
    slope: state.regression.slope.value, intercept: state.regression.intercept.value,
    plotName: 'regression'
  }, { root: true });

  // Get new plot of residuals
  dispatch('ui/getNewPlot', {
    x: state.dataPoints.analytes, y: state.regression.residuals.values,
    title: 'Residuals', xlabel: 'Concentration', ylabel: 'Residual',
    slope: 0, intercept: 0,
    plotName: 'residuals'
  }, { root: true });
}


export function updateGeneralInfo ({ commit }, newCalibrationSamples) {
	let [newConcentrationLevels,
	  newReplicates,
	  newDataPoints
	] = generalInfo(newCalibrationSamples);

  commit('updateGeneralInfo', {
    concentrationLevels: newConcentrationLevels,
    replicates: newReplicates,
    dataPoints: newDataPoints
  });
}

export async function getCalibrationResults ({ commit } ) {
  await axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/fitSimpleLinearRegressionOLS/json?digits=6', {
    x: state.dataPoints.analytes, y: state.dataPoints.signals
  })
  .then((response) => {
    const newRegressionValues = {
      slope: {
        value: response.data[0][0],
        deviation: response.data[1][0],
        plusMinus: response.data[2][0]
      },
      intercept: {
        value: response.data[3][0],
        deviation: response.data[4][0],
        plusMinus: response.data[5][0]
      },
      residuals: {
        values: response.data[6],
        deviation: response.data[7][0]
      }
    };

    const newFiguresOfMerit = {
      sensitivity: Math.abs(newRegressionValues.slope.value),
      gamma: response.data[8][0],
      oneOverGamma: truncateDecimals(1 / response.data[8][0], 6),
      decisionLimit: response.data[9][0],
      detectionLimit: response.data[10][0],
      quantitationLimit: response.data[11][0],
      correlationCoefficient: response.data[12][0],
    };

    commit('updateRegressionValues', newRegressionValues);
    commit('updateFiguresOfMerit', newFiguresOfMerit);
  })
  .catch((error) => { console.log(error); });
}

export function getLinearityTestResults ({ commit }) {
	// Get rid of analyte concentrations - keep only replicates.
	const replicateSets = state.samples.map((sample) => {
    return sample.slice(1, sample.length);
	});

  axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/runFTest/json?digits=6', {
    replicate_sets: replicateSets,
    deviation_residuals: state.regression.residuals.deviation
  })
  .then((response) => {
    const newLinearityTestValues = {
      noiseLevel: response.data[0][0],
      expectationValue: response.data[1][0],
      criticalValue: response.data[2][0],
      ccdf: response.data[3][0],
      pass: response.data[4][0],
    };
    commit('updateLinearityTestValues', newLinearityTestValues);
  })
  .catch((error) => { console.log(error); });
}

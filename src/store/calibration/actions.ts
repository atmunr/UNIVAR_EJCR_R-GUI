
import state from './state'
import axios from 'axios';

// @ts-ignore: .ts extension
import { createDataPoints, generalInfo, truncateDecimals } from './utils.ts';

export async function calibrate ({ commit, dispatch }, payload) {
  const samples : Number[][] = payload.samples;
  const fileName : String = payload.fileName;

  commit('ui/setLoadingRequestStatus', true, { root: true });

  commit('ui/updateValuesStatus', {
    name: 'calibration', available: false
  }, { root: true });

  await dispatch('updateLocalValues', samples);
  await dispatch('contactAPI');

  commit('ui/updateValuesStatus', {
    name: 'calibration', available: true
  }, { root: true });

  commit('ui/updateFileName', {
    target: 'calibration', newFileName: fileName
  }, { root: true });

  commit('ui/setLoadingRequestStatus', false, { root: true });

  dispatch('ui/updateShownValues', 'calibration', { root: true });
}

export async function updateLocalValues ({ dispatch }, samples) {
  await dispatch('updateCalibrationValues', samples);
  dispatch('updateGeneralInfo', samples);
}

export function updateCalibrationValues ({ commit }, samples) {
  let [analytes, signals] = createDataPoints(samples);

	commit('updateCalibrationValues', {
		newCalibrationSamples: samples,
		newAnalytes: analytes,
		newSignals: signals
	});
}

export function updateGeneralInfo ({ commit }, samples) {
	let [
	  concentrationLevels,
	  replicates,
	  dataPoints
	] = generalInfo(samples);

  commit('updateGeneralInfo', {
    concentrationLevels: concentrationLevels,
    replicates: replicates,
    dataPoints: dataPoints
  });
}


export async function contactAPI ({ dispatch }) {
  await dispatch('getRegressionResults');
  dispatch('getLinearityTestResults');
  dispatch('getNewPlots');
}

export async function getRegressionResults ({ commit }) {
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

export function getNewPlots ({ dispatch }) {
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

  dispatch('ui/updateCurrentPlot', 'residuals', { root: true });
}

import Vue from 'vue';
import axios from 'axios';

import { createDataPoints, generalInfo } from './utils';

const state = {

  samples: [],
  fileName: undefined,

  dataPoints: {
    analytes: [],
    signals: []
  },

  generalInfo: {
    concentrationLevels: undefined,
    replicates: undefined,
    dataPoints: undefined
  },

  regression: {
    slope: {
      value: undefined,
      plusMinus: undefined,
      deviation: undefined
    },
    intercept: {
      value: undefined,
      plusMinus: undefined,
      deviation: undefined
    },
    residuals: {
      values: [],
      deviation: undefined
    }
  },

  linearityTest: {
    noiseLevel: undefined,
    expectationValue: undefined,
    criticalValue: undefined,
    ccdf: undefined,
    pass: undefined
  },

  figuresOfMerit: {
    sensitivity: undefined,
    gamma: undefined,
    oneOverGamma: undefined,
    decisionLimit: undefined,
    detectionLimit: undefined,
    quantitationLimit: undefined,
    correlationCoefficient: undefined
  }

};

const mutations = {

	updateCalibrationValues(state, payload) {
		state.samples = payload.newCalibrationSamples;
		state.dataPoints.analytes = payload.newAnalytes;
		state.dataPoints.signals = payload.newSignals;
	},


	updateGeneralInfo (state, payload) {
    state.generalInfo.concentrationLevels = payload.concentrationLevels;
    state.generalInfo.replicates = payload.replicates;
    state.generalInfo.dataPoints = payload.dataPoints;
	},

	updateRegressionValues (state, payload) {
	  state.regression.slope.value = payload.slope.value;
	  state.regression.slope.deviation = payload.slope.deviation;
	  state.regression.slope.plusMinus = payload.slope.plusMinus;

	  state.regression.intercept.value = payload.intercept.value;
	  state.regression.intercept.deviation = payload.intercept.deviation;
	  state.regression.intercept.plusMinus = payload.intercept.plusMinus;

	  state.regression.residuals.values = payload.residuals.values;
	  state.regression.residuals.deviation = payload.residuals.deviation;
	},

	updateFiguresOfMerit (state, payload) {
    state.figuresOfMerit.sensitivity = payload.sensitivity;
    state.figuresOfMerit.gamma = payload.gamma;
    state.figuresOfMerit.oneOverGamma = payload.oneOverGamma;
    state.figuresOfMerit.decisionLimit = payload.decisionLimit;
    state.figuresOfMerit.detectionLimit = payload.detectionLimit;
    state.figuresOfMerit.quantitationLimit = payload.quantitationLimit;
    state.figuresOfMerit.correlationCoefficient = payload.correlationCoefficient;
	},

	updateLinearityTestValues (state, payload) {
	  state.linearityTest.noiseLevel = payload.noiseLevel;
	  state.linearityTest.expectationValue = payload.expectationValue;
	  state.linearityTest.criticalValue= payload.criticalValue;
	  state.linearityTest.ccdf = payload.ccdf;
	  state.linearityTest.pass = payload.pass;
	}

};

const actions = {

  async updateCalibrationValues ({ commit, dispatch }, payload) {

    const newCalibrationSamples : Number[][] = payload.newCalibrationSamples;
    const newFileName : String = payload.newFileName;

    commit('ui/updateValuesStatus', {
      name: 'calibration', newStatus: 'LOADING'
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
      name: 'calibration', newStatus: 'AVAILABLE'
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
	},


	updateGeneralInfo ({ commit }, newCalibrationSamples) {
	  let [newConcentrationLevels,
	    newReplicates,
	    newDataPoints
	  ] = generalInfo(newCalibrationSamples);

    commit('updateGeneralInfo', {
      concentrationLevels: newConcentrationLevels,
      replicates: newReplicates,
      dataPoints: newDataPoints
    });
	},

	async getCalibrationResults ({ commit } ) {
    await axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/fitSimpleLinearRegressionOLS/json', {
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
        oneOverGamma: 1 / response.data[8][0],
        decisionLimit: response.data[9][0],
        detectionLimit: response.data[10][0],
        quantitationLimit: response.data[11][0],
        correlationCoefficient: response.data[12][0],
      };

      commit('updateRegressionValues', newRegressionValues);
      commit('updateFiguresOfMerit', newFiguresOfMerit);
    })
    .catch((error) => { console.log(error); });
	},

	getLinearityTestResults ({ commit }) {
	  // Get rid of analyte concentrations - keep only replicates.
	  const replicateSets = state.samples.map((sample) => {
      return sample.slice(1, sample.length);
	  });

    axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/runFTest/json', {
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
};

const getters = {

  getReplicateSets: (state) => {
    let replicateSets : Number[][] = [];
    for (let row = 0; row < state.samples.length; row++) {
      replicateSets.push([]);
      for (let col = 1; col < state.samples[row].length; col++) {
        replicateSets[row].push(state.samples[row][col]);
      }
    }

    return replicateSets;
  }

}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
};

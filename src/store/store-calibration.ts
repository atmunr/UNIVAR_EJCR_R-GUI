import Vue from 'vue';
import axios from 'axios';

import { createDataPoints, generalInfo } from './utils';

const state = {

  calibrationSamples: [],
  dataPointsAnalytes: [],
  dataPointsSignals: [],

  plots: {
    current: '',
    urls: {
      regression: '',
      residuals: ''
    }
  },

  valuesStatus: 'EMPTY',

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
    pValue: undefined,
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

  updateValuesStatus (state, newStatus) {
    state.valuesStatus = newStatus;
  },

	updateCalibrationValues(state, payload) {
		state.calibrationSamples = payload.newCalibrationSamples;
		state.dataPointsAnalytes = payload.newAnalytes;
		state.dataPointsSignals = payload.newSignals;
	},

	updateRegressionPlot (state, newUrl) {
	  state.plots.urls.regression = newUrl;
	},

	updateResidualsPlot (state, newUrl) {
	  state.plots.urls.residuals = newUrl;
	},

	updateCurrentPlot (state, plot) {
    state.plots.current = plot;
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
	}

};

const actions = {

  async updateCalibrationValues({ commit, dispatch }, newCalibrationSamples) {
    commit('updateValuesStatus', 'LOADING');

    let [analytes, signals] = createDataPoints(newCalibrationSamples);

		commit('updateCalibrationValues', {
		  newCalibrationSamples: newCalibrationSamples,
		  newAnalytes: analytes,
		  newSignals: signals
		});
    dispatch('updateGeneralInfo', newCalibrationSamples);

    await dispatch('getCalibrationResults');

    commit('updateValuesStatus', 'AVAILABLE');

    dispatch('getNewRegressionPlot');
    dispatch('getNewResidualsPlot');
	},

	getNewRegressionPlot ({ commit, dispatch }) {
    axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/plotVectors', {
      x: state.dataPointsAnalytes, y: state.dataPointsSignals,
      title: 'Linear regression', xlabel: 'Concentration', ylabel: 'Response',
      slope: state.regression.slope.value, intercept: state.regression.intercept.value
    })
    .then((response) => {
      const newUrl = 'https://cloud.opencpu.org' + response.data.split('\n')[4];
	    commit('updateRegressionPlot', newUrl);
	    dispatch('updateCurrentPlot', 'regression');
    })
    .catch((error) => {
      console.log(error);
      const newUrl = '';
	    commit('updateRegressionPlot', newUrl);
	    dispatch('updateCurrentPlot', 'regression');
    });
	},

	getNewResidualsPlot ({ commit, dispatch }) {
    axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/plotVectors', {
      x: state.dataPointsAnalytes, y: state.regression.residuals.values,
      title: 'Residuals', xlabel: 'Concentration', ylabel: 'Residual',
      slope: 0, intercept: 0
    })
    .then((response) => {
      const newUrl = 'https://cloud.opencpu.org' + response.data.split('\n')[4];
	    commit('updateResidualsPlot', newUrl);
	    dispatch('updateCurrentPlot', 'residuals');
    })
    .catch((error) => {
      console.log(error);
      const newUrl = '';
	    commit('updateResidualsPlot', newUrl);
	    dispatch('updateCurrentPlot', 'residuals');
    });
	},

	updateCurrentPlot ({ commit }, plot) {
	  commit('updateCurrentPlot', plot);
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
      x: state.dataPointsAnalytes, y: state.dataPointsSignals
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
	}
};

export default {
	namespaced: true,
	state,
	actions,
	mutations
};

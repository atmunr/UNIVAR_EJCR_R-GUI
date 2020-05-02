import Vue from 'vue';
import axios from 'axios';

const state = {

  calibrationSamples: [],
  dataPointsAnalytes: [],
  dataPointsSignals: [],

  calibrationPlotUrl: '',

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

	updateCalibrationValues(state, payload) {
		state.calibrationSamples = payload.newCalibrationSamples;
		state.dataPointsAnalytes = payload.newAnalytes;
		state.dataPointsSignals = payload.newSignals;
	},

	updatePlotUrl(state, newUrl) {
	  state.calibrationPlotUrl = newUrl;
	},

	updateGeneralInfo (state, payload) {
    state.generalInfo.concentrationLevels = payload.concentrationLevels;
    state.generalInfo.replicates = payload.replicates;
    state.generalInfo.dataPoints = payload.dataPoints;
	},

	updateRegressionValues (state, payload) {
	  state.regression.slope.value = payload[0][0];
	  state.regression.slope.deviation = payload[1][0];
	  state.regression.slope.plusMinus = payload[2][0];

	  state.regression.intercept.value = payload[3][0];
	  state.regression.intercept.deviation = payload[4][0];
	  state.regression.intercept.plusMinus = payload[5][0];

    state.figuresOfMerit.sensitivity = Math.abs(state.regression.slope.value);
    state.figuresOfMerit.gamma = payload[8][0];
    state.figuresOfMerit.oneOverGamma = 1 / state.figuresOfMerit.gamma;
    state.figuresOfMerit.decisionLimit = payload[9][0];
    state.figuresOfMerit.detectionLimit = payload[10][0];
    state.figuresOfMerit.quantitationLimit = payload[11][0];
    state.figuresOfMerit.correlationCoefficient = payload[12][0];
	}

};

const actions = {

	updateCalibrationValues({ commit, dispatch }, newCalibrationSamples) {
    let analytes : Number[] = [], signals : Number[] = [];
    for (let row = 0; row < newCalibrationSamples.length; row++) {
      for (let col = 1; col < newCalibrationSamples[row].length; col++) {
        analytes.push(newCalibrationSamples[row][0]);
        signals.push(newCalibrationSamples[row][col]);
      }
    }
		commit('updateCalibrationValues', {
		  newCalibrationSamples: newCalibrationSamples,
		  newAnalytes: analytes,
		  newSignals: signals
		});
    dispatch('getNewPlotUrl');
    dispatch('updateGeneralInfo', newCalibrationSamples);
    dispatch('getRegressionValues');
	},

	getNewPlotUrl ({ commit }) {
    axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/plotVectors', {
      x: state.dataPointsAnalytes, y: state.dataPointsSignals,
      title: 'A plot', xlabel: 'Some values', ylabel: 'Some more values',
      slope: 2, intercept: 0
    })
    .then((response) => {
      const newUrl = 'https://cloud.opencpu.org' + response.data.split('\n')[4];
	    commit('updatePlotUrl', newUrl);
    })
    .catch((error) => { console.log(error); });
	},

	updateGeneralInfo ({ commit }, newCalibrationSamples) {
    const concentrationLevels = state.calibrationSamples.length;

    let replicates = 0, dataPoints = 0;
    for (let row = 0; row < newCalibrationSamples.length; row++) {
      replicates = Math.max(replicates, state.calibrationSamples[row].length - 1);
      dataPoints += (state.calibrationSamples[row].length - 1);
    }

    commit('updateGeneralInfo', {
      concentrationLevels: concentrationLevels,
      replicates: replicates,
      dataPoints: dataPoints
    });
	},

	getRegressionValues ({ commit } ) {
    axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/fitSimpleLinearRegressionOLS/json', {
      x: state.dataPointsAnalytes, y: state.dataPointsSignals
    })
    .then((response) => {
      commit('updateRegressionValues', response.data);
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

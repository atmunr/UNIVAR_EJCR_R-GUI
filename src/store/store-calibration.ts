import Vue from 'vue';
import axios from 'axios';

const state = {
  calibrationSamples: [],
  dataPointsAnalytes: [],
  dataPointsSignals: [],

  calibrationPlotUrl: '',

  generalInfo: {
    concentrationLevels: 6,
    replicates: 3,
    dataPoints: 18
  },

  regression: {
    slope: {
      value: 1.3174,
      plusMinus: 0.030206,
      deviation: 0.01423
    },
    intercept: {
      value: 0.12365,
      plusMinus: 0.091455,
      deviation: 0.043124
    }
  },

  linearityTest: {
    noiseLevel: 0.082125,
    expectationValue: 1.5792,
    criticalValue: 2.6012,
    pValue: 0.214,
  },

  figuresOfMerit: {
    sensitivity: 1.3174,
    gamma: 12.7654,
    oneOverGamma: 0.078337,
    decisionLimit: 0.14819,
    detectionLimit: 0.29638,
    quantitationLimit: 0.84901,
    correlationCoefficient: 0.99907
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
	},
	getNewPlotUrl({ commit }) {
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
	}
};

export default {
	namespaced: true,
	state,
	actions,
	mutations
};

import Vue from 'vue';
import axios from 'axios';

const state = {
  calibrationSamples: [],
  dataPointsAnalytes: [],
  dataPointsSignals: [],
  calibrationPlotUrl: ''
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

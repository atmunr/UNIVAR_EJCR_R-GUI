import Vue from 'vue';
import axios from 'axios';

const state = {
  replicateSets: [],
  dataPointsAnalytes: [],
  dataPointsSignals: [],
  plotUrl: ''
};

const mutations = {
	updateCalibrationData(state, payload) {
		state.replicateSets = payload.calibrationData;
		state.dataPointsAnalytes = payload.dataPointsAnalytes;
		state.dataPointsSignals = payload.dataPointsSignals;
	},
	updatePlotUrl(state, newUrl) {
	  state.plotUrl = newUrl;
	}
};

const actions = {
	updateCalibrationData({ commit, dispatch }, replicateSets) {
    let analytes : Number[] = [], signals : Number[] = [];
    for (let row = 0; row < replicateSets.length; row++) {
      for (let col = 1; col < replicateSets[row].length; col++) {
        analytes.push(replicateSets[row][0]);
        signals.push(replicateSets[row][col]);
      }
    }
		commit('updateCalibrationData', {
		  calibrationData: replicateSets,
		  dataPointsAnalytes: analytes,
		  dataPointsSignals: signals
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

const getters = {
  dataPointsAnalytes: (state) => {
    return state.dataPointsAnalytes;
  },
  dataPointsSignals: (state) => {
    return state.dataPointsSignals;
  },
  plotUrl: (state) => {
    return state.plotUrl;
  }
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};

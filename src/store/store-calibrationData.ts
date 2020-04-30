import Vue from 'vue';

const state = {
  replicateSets: [
    [1, 1,  2,  3],
    [2, 3,  4,  5],
    [3, 5,  6,  7],
    [4, 7,  8,  9],
    [5, 9, 10, 11]
  ]
};

const mutations = {
	updateCalibrationData(state, calibrationData) {
		state.replicateSets = calibrationData;
	}
};

const actions = {
	updateCalibrationData({ commit }, calibrationData) {
		commit('updateCalibrationData', calibrationData);
	}
};

const getters = {
  dataPointsAnalytes: (state) => {
    let analytes : Number[] = [];
    for (let row = 0; row < state.replicateSets.length; row++) {
      for (let col = 1; col < state.replicateSets[row].length; col++) {
        analytes.push(state.replicateSets[row][0]);
      }
    }
    return analytes;
  },
  dataPointsSignals: (state) => {
    let signals : Number[] = [];
    for (let row = 0; row < state.replicateSets.length; row++) {
      for (let col = 1; col < state.replicateSets[row].length; col++) {
        signals.push(state.replicateSets[row][col]);
      }
    } return signals;
  }
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};

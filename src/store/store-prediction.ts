import Vue from 'vue';
import axios from 'axios';

const state = {

  replicateSets: [
    [0.69, 0.65, 0.75],
    [2.2, 2.13, 2.05],
    [3.55, 3.41, 3.52],
    [4.82, 4.71, 4.7]
  ],

  analytes: [],
  plusMinus: [0.11391, 0.10601, 0.10361, 0.10614],
  deviation: [0.053712, 0.049986, 0.048856, 0.050049],
  relDeviation: [12.3489, 3.2877, 1.9101, 1.4273]

};

const mutations = {

  updatePredictedAnalytes (state, newAnalytes) {
    state.analytes = newAnalytes;
  }

};

const actions = {

  async updatePredictionValues ({ commit, dispatch }) {
    commit('ui/updateValuesStatus', {
      name: 'prediction', newStatus: 'LOADING'
    }, { root: true });
    dispatch('ui/updateShownValues', 'prediction', { root: true });

    await dispatch('getPredictionResults');

    commit('ui/updateValuesStatus', {
      name: 'prediction', newStatus: 'AVAILABLE'
    }, { root: true });
  },

  async getPredictionResults ({ commit, rootState }) {
    await axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/predictAnalyteConcentrations/json', {
      replicate_sets: state.replicateSets,
      slope: rootState.calibration.regression.slope.value,
      intercept: rootState.calibration.regression.intercept.value
    })
    .then((response) => {
      commit('updatePredictedAnalytes', response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

};

export default {
	namespaced: true,
	state,
	actions,
	mutations
};

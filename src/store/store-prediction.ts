import Vue from 'vue';
import axios from 'axios';

const state = {

  replicateSets: undefined,
  analytes: undefined,
  plusMinus: undefined,
  deviation: undefined,
  relDeviation: undefined,

};

const mutations = {

  updateReplicateSets (state, newReplicateSets) {
    state.replicateSets = newReplicateSets;
  },

  updatePredictedAnalytes (state, newAnalytes) {
    state.analytes = newAnalytes;
  },

  clearPredictionValues (state) {
    state.replicateSets = null;
    state.analytes = null;
    //state.plusMinus = null;
    //state.deviation = null;
    //state.relDeviation = null;
  }

};

const actions = {

  clearPredictionValues ({ commit }) {
    commit('clearPredictionValues');
    commit('ui/updateValuesStatus', {
      name: 'prediction', newStatus: 'EMPTY'
    }, { root: true });
    commit('ui/updateFileName', {
      target: 'prediction', newStatus: undefined
    }, { root: true });
  },

  async updatePredictionValues ({ commit, dispatch }, payload) {
    const replicateSets : Number[][] = payload.newReplicateSets;
    const fileName : String = payload.newFileName;

    commit('ui/updateValuesStatus', {
      name: 'prediction', newStatus: 'LOADING'
    }, { root: true });
    dispatch('ui/updateShownValues', 'prediction', { root: true });

    commit('updateReplicateSets', replicateSets);

    commit('ui/updateFileName', {
      target: 'prediction', newFileName: fileName
    }, { root: true });

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

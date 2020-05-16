
import state from './state'
import axios from 'axios';

export function clearPredictionValues ({ commit }) {
  commit('clearPredictionValues');
  commit('ui/updateValuesStatus', {
    name: 'prediction', newStatus: 'EMPTY'
  }, { root: true });
  commit('ui/updateFileName', {
    target: 'prediction', newStatus: undefined
  }, { root: true });
}

export async function updatePredictionValues ({ commit, dispatch }, payload) {
  commit('ui/updateValuesStatus', {
    name: 'prediction', newStatus: 'LOADING'
  }, { root: true });

  const replicateSets : Number[][] = payload.newReplicateSets;
  commit('updateReplicateSets', replicateSets);

  const fileName : String = payload.newFileName;
  commit('ui/updateFileName', {
    target: 'prediction', newFileName: fileName
  }, { root: true });

  await dispatch('getPredictedAnalytes');
  await dispatch('getPredictionUncertainty');

  commit('ui/updateValuesStatus', {
    name: 'prediction', newStatus: 'AVAILABLE'
  }, { root: true });

  dispatch('ui/updateShownValues', 'prediction', { root: true });
}

export async function getPredictedAnalytes ({ commit, rootState }) {
  await axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/predictAnalyteConcentrations/json?digits=6', {
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

export async function getPredictionUncertainty ({ commit, rootState, rootGetters }) {
  const calibReplicateSets = rootGetters['calibration/getReplicateSets'];

  await axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/estimateUncertaintyOfPredictedValues/json?digits=6', {
    predicted_analytes: state.analytes,
    replicate_sets: state.replicateSets,
    calib_analytes: rootState.calibration.dataPoints.analytes,
    calib_signals: calibReplicateSets,
    gamma: rootState.calibration.figuresOfMerit.gamma,
    slope: rootState.calibration.regression.slope.value
  })
  .then((response) => {
    commit('updatePredictionUncertainty', {
      plusMinus: response.data[0],
      deviation: response.data[1],
      relDeviation: response.data[2]
    });
  })
  .catch((error) => {
    console.log(error);
  });
}

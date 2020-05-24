
import axios from 'axios';

const defaultPlots = {
  'calibration': 'regression',
  'prediction': undefined,
  'ejcr': undefined,
  'rmse': undefined
}

export function getNewPlot ({ commit, dispatch }, payload) {
  axios.post('https://atmunr.ocpu.io/UNIVAR_EJCR_R-API/R/plotVectors', {
    x: payload.x, y: payload.y,
    title: payload.title, xlabel: payload.xlabel, ylabel: payload.ylabel,
    slope: payload.slope, intercept: payload.intercept
  })
  .then((response) => {
    const newUrl = 'https://cloud.opencpu.org' + response.data.split('\n')[4];
	  commit('updatePlotUrl', {
	    name: payload.plotName, newUrl: newUrl
	  });
  })
  .catch((error) => {
    console.log(error);
	  commit('updatePlotUrl', {
	    name: payload.plotName, newUrl: ''
	  });
  });
}

export function updateCurrentPlot ({ commit }, plot) {
  commit('updateCurrentPlot', plot);
}

export function updateShownValues ({ commit, dispatch }, shownValues) {
	commit('updateShownValues', shownValues);
  if (defaultPlots[shownValues] !== undefined) {
	  commit('updateCurrentPlot', defaultPlots[shownValues]);
  }
}

export function processRequest ({ commit, dispatch }, payload) {
  dispatch('startRequest', {
    name: payload.name,
    afterRequestStarted: () => {
      payload.action(() => {
        dispatch('endRequest', payload.name);
      });
    }
  });
}

export function startRequest ({ commit }, payload) {
  commit('ui/setLoadingRequestStatus', true, { root: true });

  commit('ui/updateValuesStatus', {
    name: payload.name, available: false
  }, { root: true });

  payload.afterRequestStarted();
}

export function endRequest ({ commit }, name) {
  commit('ui/updateValuesStatus', {
    name: name, available: true
  }, { root: true });

  commit('ui/setLoadingRequestStatus', false, { root: true });
}

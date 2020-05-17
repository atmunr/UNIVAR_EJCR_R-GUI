
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
	  dispatch('updateCurrentPlot', payload.plotName);
  })
  .catch((error) => {
    console.log(error);
	  commit('updatePlotUrl', {
	    name: payload.plotName, newUrl: ''
	  });
	  dispatch('updateCurrentPlot', payload.plotName);
  });
}

export function updateShownValues ({ commit, dispatch }, shownValues) {
	commit('updateShownValues', shownValues);
  if (defaultPlots[shownValues] !== undefined) {
	  commit('updateCurrentPlot', defaultPlots[shownValues]);
  }
}

export function updateCurrentPlot ({ commit }, plot) {
  commit('updateCurrentPlot', plot);
}

export function processRequest ({ commit }, callback) {
  commit('setLoadingRequestStatus', true, { root: true });
  callback();
  commit('setLoadingRequestStatus', true, { root: true });
}

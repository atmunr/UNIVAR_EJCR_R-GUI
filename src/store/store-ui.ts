import Vue from 'vue';
import axios from 'axios';

const defaultPlots = {
  'calibration': 'regression',
  'prediction': undefined,
  'ejcr': undefined,
  'rmse': undefined
}

const state = {

  fileNames: {
    calibration: undefined,
    prediction: undefined,
  },

  plots: {
    current: '',
    urls: {
      regression: '',
      residuals: ''
    }
  },

  shownValues: undefined,

  valuesStatus: {
    calibration: 'EMPTY',
    prediction: 'EMPTY',
    ejcr: 'EMPTY',
    rmse: 'EMPTY'
  }

};

const mutations = {

  updateValuesStatus (state, payload) {
    state.valuesStatus[payload.name] = payload.newStatus;
  },

	updatePlotUrl (state, payload) {
	  state.plots.urls[payload.name] = payload.newUrl;
	},

	updateCurrentPlot (state, plot) {
    state.plots.current = plot;
	},

	updateShownValues (state, newShownValues) {
	  state.shownValues = newShownValues;
	},

  updateFileName (state, payload) {
    state.fileNames[payload.target] = payload.newFileName;
  }

};

const actions = {

	getNewPlot ({ commit, dispatch }, payload) {
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
	},

	updateShownValues ({ commit, dispatch }, shownValues) {
	  commit('updateShownValues', shownValues);
    if (defaultPlots[shownValues] !== undefined) {
	    commit('updateCurrentPlot', defaultPlots[shownValues]);
    }
	},

	updateCurrentPlot ({ commit }, plot) {
    commit('updateCurrentPlot', plot);
	}

};

export default {
	namespaced: true,
	state,
	actions,
	mutations
};

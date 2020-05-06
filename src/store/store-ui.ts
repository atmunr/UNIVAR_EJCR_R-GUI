import Vue from 'vue';
import axios from 'axios';

const state = {

  plots: {
    current: '',
    urls: {
      regression: '',
      residuals: ''
    }
  },

  valuesStatus: 'EMPTY',

};

const mutations = {

  updateValuesStatus (state, newStatus) {
    state.valuesStatus = newStatus;
  },

	updateRegressionPlot (state, newUrl) {
	  state.plots.urls.regression = newUrl;
	},

	updateResidualsPlot (state, newUrl) {
	  state.plots.urls.residuals = newUrl;
	},

	updateCurrentPlot (state, plot) {
    state.plots.current = plot;
	},

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
	    commit(payload.commit, newUrl);
	    dispatch('updateCurrentPlot', payload.plotName);
    })
    .catch((error) => {
      console.log(error);
	    commit(payload.commit, '');
	    dispatch('updateCurrentPlot', payload.plotName);
    });
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

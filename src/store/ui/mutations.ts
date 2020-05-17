
export function updateValuesStatus (state, payload) {
  state.valuesAvailable[payload.name] = payload.available;
}

export function updatePlotUrl (state, payload) {
	state.plots.urls[payload.name] = payload.newUrl;
}

export function updateCurrentPlot (state, plot) {
  state.plots.current = plot;
}

export function updateShownValues (state, newShownValues) {
	state.shownValues = newShownValues;
}

export function updateFileName (state, payload) {
  state.fileNames[payload.target] = payload.newFileName;
}

export function setLoadingRequestStatus (state, newStatus) {
  state.loadingRequest = newStatus;
}

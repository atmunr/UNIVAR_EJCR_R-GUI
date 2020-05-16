
export function updateReplicateSets (state, newReplicateSets) {
  state.replicateSets = newReplicateSets;
}

export function updatePredictedAnalytes (state, newAnalytes) {
  state.analytes = newAnalytes;
}

export function updatePredictionUncertainty (state, payload) {
  state.plusMinus = payload.plusMinus;
  state.deviation = payload.deviation;
  state.relDeviation = payload.relDeviation;
}

export function clearPredictionValues (state) {
  state.replicateSets = null;
  state.analytes = null;
  state.plusMinus = null;
  state.deviation = null;
  state.relDeviation = null;
}

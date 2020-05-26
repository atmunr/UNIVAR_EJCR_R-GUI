
export function updateCalibrationValues (state, payload) {
	state.samples = payload.newCalibrationSamples;
	state.dataPoints.analytes = payload.newAnalytes;
	state.dataPoints.signals = payload.newSignals;
}


export function updateGeneralInfo (state, payload) {
  state.generalInfo.concentrationLevels = payload.concentrationLevels;
  state.generalInfo.replicates = payload.replicates;
  state.generalInfo.dataPoints = payload.dataPoints;
}

export function updateRegressionValues (state, payload) {
	state.regression.slope.value = payload.slope.value;
	state.regression.slope.deviation = payload.slope.deviation;
	state.regression.slope.plusMinus = payload.slope.plusMinus;

	state.regression.intercept.value = payload.intercept.value;
	state.regression.intercept.deviation = payload.intercept.deviation;
	state.regression.intercept.plusMinus = payload.intercept.plusMinus;

	state.regression.residuals.values = payload.residuals.values;
	state.regression.residuals.deviation = payload.residuals.deviation;
}

export function updateFiguresOfMerit (state, payload) {
  state.figuresOfMerit.sensitivity = payload.sensitivity;
  state.figuresOfMerit.gamma = payload.gamma;
  state.figuresOfMerit.oneOverGamma = payload.oneOverGamma;
  state.figuresOfMerit.decisionLimit = payload.decisionLimit;
  state.figuresOfMerit.detectionLimit = payload.detectionLimit;
  state.figuresOfMerit.quantitationLimit = payload.quantitationLimit;
  state.figuresOfMerit.correlationCoefficient = payload.correlationCoefficient;
}

export function updateLinearityTestValues (state, payload) {
	state.linearityTest.noiseLevel = payload.noiseLevel;
	state.linearityTest.expectationValue = payload.expectationValue;
	state.linearityTest.criticalValue= payload.criticalValue;
	state.linearityTest.pValue = payload.pValue;
	state.linearityTest.pass = payload.pass;
}


export default {

  samples: [],
  fileName: undefined,

  dataPoints: {
    analytes: [],
    signals: []
  },

  generalInfo: {
    concentrationLevels: undefined,
    replicates: undefined,
    dataPoints: undefined
  },

  regression: {
    slope: {
      value: undefined,
      plusMinus: undefined,
      deviation: undefined
    },
    intercept: {
      value: undefined,
      plusMinus: undefined,
      deviation: undefined
    },
    residuals: {
      values: [],
      deviation: undefined
    }
  },

  linearityTest: {
    noiseLevel: undefined,
    expectationValue: undefined,
    criticalValue: undefined,
    pValue: undefined,
    pass: undefined
  },

  figuresOfMerit: {
    sensitivity: undefined,
    gamma: undefined,
    oneOverGamma: undefined,
    decisionLimit: undefined,
    detectionLimit: undefined,
    quantitationLimit: undefined,
    correlationCoefficient: undefined
  }

};

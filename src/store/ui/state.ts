

export default {

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

  loadingRequest: false,

  valuesAvailable: {
    calibration: false,
    prediction: false,
    ejcr: false,
    rmse: false,
  }

};

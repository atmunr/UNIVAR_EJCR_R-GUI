import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import calibrationData from './store-calibration';

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store({
    modules: {
      calibrationData
    },

    strict: !!process.env.DEV
  });

  return Store;
})

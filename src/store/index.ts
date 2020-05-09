import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import calibration from './store-calibration';
import prediction from './store-prediction';
import ui from './store-ui';

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store({
    modules: {
      calibration,
      prediction,
      ui
    },

    strict: !!process.env.DEV
  });

  return Store;
})

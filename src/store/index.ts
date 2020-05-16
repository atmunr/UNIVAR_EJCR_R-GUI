import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import calibration from './calibration/index';
import prediction from './prediction/index';
import ui from './ui/index.ts';

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

import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import calibration from './store-calibration';

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store({
    modules: {
      calibration
    },

    strict: !!process.env.DEV
  });

  return Store;
})

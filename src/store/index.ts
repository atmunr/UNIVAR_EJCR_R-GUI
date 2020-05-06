import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import calibration from './store-calibration';
import ui from './store-ui';

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store({
    modules: {
      calibration,
      ui
    },

    strict: !!process.env.DEV
  });

  return Store;
})

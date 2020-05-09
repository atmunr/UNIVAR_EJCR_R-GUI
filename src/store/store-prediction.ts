import Vue from 'vue';
import axios from 'axios';

const state = {

  replicateSets: [
    [6.9000000e-001, 6.5000000e-001, 7.5000000e-001],
    [2.2000000e+000, 2.1300000e+000, 2.0500000e+000],
    [3.5500000e+000, 3.4100000e+000, 3.5200000e+000],
    [4.8200000e+000, 4.7100000e+000, 4.7000000e+000]],
  //replicateMeans: [0.6967, 2.1267, 3.4933, 4.7433],

  analytes: [0.43495, 1.5204, 2.5578, 3.5066],
  plusMinus: [0.11391, 0.10601, 0.10361, 0.10614],
  deviation: [0.053712, 0.049986, 0.048856, 0.050049],
  relDeviation: [12.3489, 3.2877, 1.9101, 1.4273]

};

const mutations = {

};

const actions = {

};

export default {
	namespaced: true,
	state,
	actions,
	mutations
};

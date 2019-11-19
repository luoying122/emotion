import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
//state  getters   mutations

export default new Vuex.Store({
    getters,
    state,
    mutations,
    actions,
    strict: debug
})

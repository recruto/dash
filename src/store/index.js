import Vue from 'vue'
import Vuex from 'vuex'
import companies from './companies'
import positions from './positions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    companies,
    positions
  }
})

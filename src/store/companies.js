import Vue from 'vue'
import Joi from 'joi'
import serializeError from 'serialize-error'
import { db } from '@/plugins/firebase'
import createTypes from './createTypes'
import { pickBy } from 'lodash'

const collection = db.collection('companies')
const types = {
  ...createTypes(),
  LINK_POSITION: 'LINK_POSITION'
}
const schemas = {
  company: Joi.compile({
    domain: Joi.string().alphanum().min(2).max(20).required(),
    name: Joi.string().min(2).required(),
    site: Joi.string().uri({ scheme: [/https?/] }).required()
  })
}

export { schemas, types }
export default {
  namespaced: true,
  state: {
    collection: {},
    loading: {
      list: false,
      get: false,
      create: false
    },
    error: {
      list: false,
      get: false,
      create: false,
      invalid: false
    }
  },
  getters: {
    positionsByCompany: (state, getters, rootState) => companyId => {
      const picked = pickBy(rootState.positions.collection, position => position.companyId === companyId)
      return picked
    }
  },
  mutations: {
    [types.LIST_REQUEST] (state) {
      state.loading.list = true
    },
    [types.LIST_SUCCESS] (state, { collection }) {
      state.loading.list = false
      collection.forEach(doc => {
        Vue.set(state.collection, doc.id, doc.data())
      })
    },
    [types.LIST_FAILURE] (state, { err }) {
      state.loading.list = false
      Vue.set(state.error, 'list', serializeError(err))
    },
    [types.GET_REQUEST] (state) {
      state.loading.get = true
    },
    [types.GET_SUCCESS] (state, { doc }) {
      state.loading.get = false
      Vue.set(state.collection, doc.id, doc.data())
    },
    [types.GET_FAILURE] (state, { err }) {
      state.loading.get = false
      Vue.set(state.error, 'get', serializeError(err))
    },
    [types.CREATE_REQUEST] (state) {
      state.loading.create = true
    },
    [types.CREATE_SUCCESS] (state, { company }) {
      state.loading.create = false
      Vue.set(state.collection, company.domain, company)
    },
    [types.CREATE_FAILURE] (state, { err }) {
      state.loading.create = false
      Vue.set(state.error, 'create', serializeError(err))
    },
    [types.INVALID] (state, { err }) {
      Vue.set(state.error, 'invalid', serializeError(err))
    }
  },
  actions: {
    list ({ commit }) {
      commit(types.LIST_REQUEST)
      collection.get()
        .then(
          collection => { commit(types.LIST_SUCCESS, { collection }) }
        )
        .catch(
          err => { commit(types.LIST_FAILURE, { err }) }
        )
    },
    get ({ commit }, { id }) {
      commit(types.GET_REQUEST)
      collection.doc(id).get()
        .then(
          doc => { commit(types.GET_SUCCESS, { doc }) }
        )
        .catch(
          err => { commit(types.GET_FAILURE, { err }) }
        )
    },
    create ({ commit }, { company }) {
      schemas.company.validate(company)
        .then(() => {
          commit(types.CREATE_REQUEST)
          collection.doc(company.domain).set(company)
            .then(
              () => { commit(types.CREATE_SUCCESS, { company }) }
            )
            .catch(
              err => { commit(types.CREATE_FAILURE, { err }) }
            )
        })
        .catch(err => {
          commit(types.INVALID, { err })
        })
    },
    update () {

    },
    delete () {

    }
  }
}

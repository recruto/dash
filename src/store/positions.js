import Vue from 'vue'
import Joi from 'joi'
import serializeError from 'serialize-error'
import { db } from '@/plugins/firebase'
import createTypes from './createTypes'

const collection = db.collection('companies')
const types = createTypes()
const schemas = {
  position: Joi.compile({
    title: Joi.string().min(2).max(45).required(),
    // locale: Joi.string().min(2).max(45).required(),
    // state: undefined,
    // city: undefined,
    // team: Joi.string().required(),
    // level: Joi.string().required(),
    // type: ['PJ', 'CLT', 'Estágio', 'Freela'],
    description: Joi.string().min(2).required(),
    link: Joi.string().min(2).required()
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
  mutations: {
    [types.LIST_REQUEST] (state) {
      state.loading.list = true
    },
    [types.LIST_SUCCESS] (state, { companyId, querySnapshot }) {
      state.loading.list = false
      querySnapshot.forEach(docSnapshot => {
        Vue.set(state.collection, docSnapshot.id, { companyId, ...docSnapshot.data() })
      })
    },
    [types.LIST_FAILURE] (state, { err }) {
      state.loading.list = false
      Vue.set(state.error, 'list', serializeError(err))
    },
    [types.GET_REQUEST] (state) {
      state.loading.get = true
    },
    [types.GET_SUCCESS] (state, { docRef }) {
      state.loading.get = false
      Vue.set(state.collection, docRef.id, docRef.data())
    },
    [types.GET_FAILURE] (state, { err }) {
      state.loading.get = false
      Vue.set(state.error, 'get', serializeError(err))
    },
    [types.CREATE_REQUEST] (state) {
      state.loading.create = true
    },
    [types.CREATE_SUCCESS] (state, { docRef, position }) {
      state.loading.create = false
      Vue.set(state.collection, docRef.id, position)
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
    async get ({ commit }, { companyId, positionId }) {
      commit(types.GET_REQUEST)
      try {
        const docSnapshot = await collection.doc(companyId).collection('positions').doc(positionId).get()
        return commit(types.GET_SUCCESS, { docSnapshot })
      } catch (err) {
        return commit(types.GET_FAILURE, { err })
      }
    },
    async list ({ commit }, { companyId }) {
      commit(types.LIST_REQUEST)
      try {
        const querySnapshot = await collection.doc(companyId).collection('positions').get()
        return commit(types.LIST_SUCCESS, { companyId, querySnapshot })
      } catch (err) {
        return commit(types.LIST_FAILURE, { err })
      }
    },
    async create ({ commit }, { companyId, position }) {
      const validated = schemas.position.validate(position)
      if (validated.error) return commit(types.INVALID, { err: validated.error })
      commit(types.CREATE_REQUEST)
      try {
        const docRef = await collection.doc(companyId).collection('positions').add(position)
        return commit(types.CREATE_SUCCESS, { docRef, position })
      } catch (err) {
        return commit(types.CREATE_FAILURE, { err })
      }
    }
  }
}

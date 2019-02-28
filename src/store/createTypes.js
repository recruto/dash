import { snakeCase, toUpper } from 'lodash'

const defaultOption = {
  methods: ['list', 'get', 'create', 'update', 'delete'],
  actions: ['request', 'success', 'failure'],
  others: ['invalid']
}

const createTypes = (options = defaultOption) => {
  let types = {}

  for (let im = 0; im < options.methods.length; im++) {
    const method = options.methods[im]

    for (let ia = 0; ia < options.actions.length; ia++) {
      const action = options.actions[ia]
      const name = toUpper(snakeCase(`${method} ${action}`))
      types[name] = name
    }
  }

  for (let io = 0; io < options.others.length; io++) {
    const other = toUpper(snakeCase(options.others[io]))
    types[other] = other
  }

  return types
}

export default createTypes

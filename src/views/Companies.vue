<template lang="pug">
  .view_companies
    h1 Contas
    ul
      li(v-for="(company, id) in collection" :key="id")
        router-link(:to="{name: 'company', params: { companyId: id }}") {{ company.name }}
    router-link(:to="{name: 'new-company'}") Criar empresa
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'companies',
  computed: {
    ...mapState('companies', ['collection'])
  },
  methods: {
    ...mapActions('companies', ['list'])
  },
  created () {
    this.list()
  }
}
</script>

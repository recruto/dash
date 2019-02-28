<template lang='pug'>
  .view_company
    div(v-if="loading.get")
      p Carregando
    div(v-if="!loading.get && company")
      h1 {{ company.name }}
      p site: {{ company.site }}
      p https://{{ company.domain }}.recruta.ai

    ul
      li(v-for="(position, id) in positionsByCompany(companyId)" :key="id")
        router-link(:to="{name: 'position', params: { positionId: id }}") {{ position.title }}

    router-link(:to="{name: 'new-position'}") Criar vaga
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'company',
  data () {
    return {
      companyId: this.$route.params.companyId
    }
  },
  computed: {
    ...mapState('companies', ['loading', 'collection']),
    ...mapGetters('companies', ['positionsByCompany']),
    company () {
      return this.collection[this.companyId]
    }
  },
  methods: {
    ...mapActions('companies', ['get']),
    ...mapActions('positions', ['list'])
  },
  created () {
    this.get({ id: this.companyId })
    this.list({ companyId: this.companyId })
  }
}
</script>

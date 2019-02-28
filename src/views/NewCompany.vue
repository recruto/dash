<template lang='pug'>
  .view_new-company
    h1 New Company

    form(@submit.prevent="create({company})")
      label(for="company-name") Nome da empresa:
      input(type="text" name="company-name" id="company-name" v-model="name")

      label(for="company-site") Site da empresa:
      input(type="text" name="company-site" id="company-site" v-model="site")

      label(for="company-name") Dominio recruta.ai:
      input(type="text" name="company-domain" id="company-domain" v-model="domain")

      button(type="submit") Criar empresa
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'new-company',
  data () {
    return {
      domain: undefined,
      name: undefined,
      site: undefined
    }
  },
  computed: {
    company () {
      return {
        name: this.name,
        site: this.site,
        domain: this.domain
      }
    }
  },
  methods: {
    ...mapActions('companies', ['create'])
  }
}
</script>

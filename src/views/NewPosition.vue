<template lang='pug'>
  .new-position
    h1 New Position

    form(@submit.prevent="create({companyId, position})")
      label(for="position-title") Nome da vaga:
      input(type="text" name="position-title" id="position-title" v-model="title")

      label(for="position-link") Link:
      input(type="text" name="position-link" id="position-link" v-model="link")

      label(for="position-description") Descrição:
      textarea(name="position-description" id="position-description" v-model="description")

      button(type="submit") Criar posição
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'new-position',
  data () {
    return {
      title: undefined,
      description: undefined,
      link: undefined
    }
  },
  computed: {
    companyId () {
      return this.$route.params.companyId
    },
    position () {
      return {
        title: this.title,
        description: this.description,
        link: this.link
      }
    }
  },
  methods: {
    ...mapActions('positions', ['create'])
  }
}
</script>

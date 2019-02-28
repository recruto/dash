<template lang='pug'>
  .view_position
    div(v-if="loading.get")
      p Carregando
    div(v-if="!loading.get && position")
      h1 {{ position.title }}
      div {{ position.description }}
      a(:href="position.link") Aplicar

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'position',
  data () {
    return {
      companyId: this.$route.params.companyId,
      positionId: this.$route.params.positionId
    }
  },
  computed: {
    ...mapState('positions', ['loading', 'collection']),
    position () {
      return this.collection[this.positionId]
    }
  },
  methods: {
    ...mapActions('positions', ['get'])
  },
  created () {
    this.get({
      companyId: this.companyId,
      positionId: this.positionId
    })
  }
}
</script>

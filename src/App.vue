<template lang="pug">
  #app
    rto-header
    router-view
    rto-footer
</template>

<script>
import 'normalize.css'
import RtoHeader from '@/components/RtoHeader'
import RtoFooter from '@/components/RtoFooter'

export default {
  name: 'app',
  components: {
    RtoHeader,
    RtoFooter
  }
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  color: #333;
  font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  margin: 0 auto;
  max-width: 980px;
  width: 100%;
  padding: 0 24px;
}
</style>

<template lang="pug">
  header.rto-header
    .container
      h1.rto-header_logo
        a.rto-header_logo-link(href="https://g1.globo.com/") recru.to

    //- nav.nav
    //-   router-link(to="/") Home
    //-   router-link(:to="{name: 'companies'}") Empresas
</template>

<script>
export default {
  name: 'rto-header'
}
</script>

<style lang="scss">
.rto-header {
  background: #fff;
  border-bottom: 1px solid rgba(#000, .14);
  display: flex;
  margin-bottom: 24px;
  padding: 16px 0;

  &_logo {
    margin: 0;
  }

  &_logo-link {
    background-image: url('~@/assets/logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
    display: block;
    height: 28px;
    overflow: hidden;
    text-indent: 101%;
    width: 150px;
    white-space: nowrap;
  }
}

// .nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>

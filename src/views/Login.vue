<template lang="pug">
  div.login.container
    button.login_button-google(@click="login")
      font-awesome-icon(:icon="['fab', 'google']")
      span Entrar com o Google

</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  name: 'home',
  methods: {
    login () {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().useDeviceLanguage()
      firebase.auth().signInWithRedirect(provider)
    }
  }
}
</script>

<style lang="scss">
.login {
  text-align: center;
  margin-top: 24px;

  &_button-google {
    display: inline-block;
    zoom: 1;
    line-height: normal;
    white-space: nowrap;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    -webkit-user-drag: none;
    user-select: none;
    box-sizing: border-box;
    font-family: inherit;
    font-size: 100%;
    padding: 0.5em 1em;
    color: #000; /* rgba not supported (IE 8) */
    color: rgba(#000, 0.80); /* rgba supported */
    border: 1px solid #999;  /*IE 6/7/8*/
    border: none rgba(0, 0, 0, 0);  /*IE9 + everything else*/
    background-color: #E6E6E6;
    text-decoration: none;
    border-radius: 2px;

    svg {
      margin-right: 8px;
    }
  }
}
</style>

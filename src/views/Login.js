import firebase from '../plugins/firebase'
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

function login (e) {
  e.preventDefault();
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithRedirect(provider);
}

function getRedirect (url) {
  let params = new URLSearchParams(url)
  return params.get('redirect') || '/'
}


class Login extends Component {
  render() {
    return firebase.auth().currentUser ? (
      <Redirect to={ getRedirect(this.props.location.search) } />
    ) : (
      <div className="login">
        <button onClick={login}>Entrar com o Google</button>
      </div>
    );
  }
}

export default Login;

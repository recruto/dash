import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCOk_6ScUzhufwGiX0FhJ5sbu8OHnH3m7A',
  authDomain: 'recru-to.firebaseapp.com',
  databaseURL: 'https://recru-to.firebaseio.com',
  projectId: 'recru-to',
  storageBucket: 'recru-to.appspot.com',
  messagingSenderId: '373094688113'
})

const redirectResult = firebase.auth().getRedirectResult()

const db = firebase.firestore(app)

export default firebase
export { app, redirectResult, db }

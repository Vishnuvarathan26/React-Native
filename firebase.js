import firebase from "firebase";

const firebaseConfig = {
  // your Firebase config
};


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase
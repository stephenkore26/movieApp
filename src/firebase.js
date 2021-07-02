import * as firebase from 'firebase';
import "firebase/auth"

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyBptmOXC1cnf9K6eKeIVvNP6CuTLtncDJI",
    authDomain: "movie-plate.firebaseapp.com",
    projectId: "movie-plate",
    storageBucket: "movie-plate.appspot.com",
    messagingSenderId: "690577693617",
    appId: "1:690577693617:web:9bdf4a3a69b027c8ca7b90"
};
firebase.initializeApp(config);


export default firebase;
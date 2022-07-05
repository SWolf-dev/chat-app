import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, FacebookAuthProvider, getRedirectResult,createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDXKUWSXS6vsMHlLX9N5X1p460YkWeshXs",
  authDomain: "chat-app-6e562.firebaseapp.com",
  projectId: "chat-app-6e562",
  storageBucket: "chat-app-6e562.appspot.com",
  messagingSenderId: "539883108764",
  appId: "1:539883108764:web:1f2c6bdc9a4cf00022f059",
  measurementId: "G-PM5LBDRK4K"
};
// init app
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Provider
const fbProvider = new FacebookAuthProvider();
fbProvider.addScope('user_birthday');
fbProvider.setCustomParameters({
  'display': 'popup'
});


// authenticate
const auth = getAuth(app);
auth.languageCode = 'it';



//database
const db = getFirestore(app);
// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}



export { db, auth, fbProvider };
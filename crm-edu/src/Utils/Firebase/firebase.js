// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbON0QCOrluDsZT6RrbXEK2AhFfHopGwI",
  authDomain: "tutorincentre.firebaseapp.com",
  projectId: "tutorincentre",
  storageBucket: "tutorincentre.appspot.com",
  messagingSenderId: "261598866046",
  appId: "1:261598866046:web:81fdaec2c7a3e89017462f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage(app);

export default app;

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD042q2jsdoe4jOlqkkvglpy8VWwc1XTn4",
  authDomain: "ca-portal-93586.firebaseapp.com",
  projectId: "ca-portal-93586",
  storageBucket: "ca-portal-93586.appspot.com",
  messagingSenderId: "954012489264",
  appId: "1:954012489264:web:38673ecdb2017dcc26bff5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export function FirebaseApp(){
    return initializeApp(firebaseConfig);
}
const storage = getStorage(app);
export {storage};

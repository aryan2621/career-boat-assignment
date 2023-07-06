import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFWdKBFzqBhretq93ZKTE6Bw_Bx5JMNIY",
  authDomain: "admin-app-40320.firebaseapp.com",
  projectId: "admin-app-40320",
  storageBucket: "admin-app-40320.appspot.com",
  messagingSenderId: "61515429737",
  appId: "1:61515429737:web:de8c353cb1d77b119ceff8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

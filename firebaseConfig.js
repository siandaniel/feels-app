import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9RrPYfGQwaw3mCw4QB1qzH1yc3BmdtTM",
  authDomain: "feels-527c2.firebaseapp.com",
  projectId: "feels-527c2",
  storageBucket: "feels-527c2.appspot.com",
  messagingSenderId: "32711496458",
  appId: "1:32711496458:web:534a3b1f5ba42798d820f3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

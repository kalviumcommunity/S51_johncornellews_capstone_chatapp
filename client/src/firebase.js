import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMQi4KPtsRJ2QxJDuXseCkzOIlkUwryiI",
  authDomain: "chat-app-mern-ce1db.firebaseapp.com",
  projectId: "chat-app-mern-ce1db",
  storageBucket: "chat-app-mern-ce1db.appspot.com",
  messagingSenderId: "60958050136",
  appId: "1:60958050136:web:e9aede20b4d6a93f64872d",
  measurementId: "G-W842610069"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
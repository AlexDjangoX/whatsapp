import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC6rqjSculYkiFh7-BLDfb40yKYUk7l2So',
  authDomain: 'whatsapp-af96b.firebaseapp.com',
  projectId: 'whatsapp-af96b',
  storageBucket: 'whatsapp-af96b.appspot.com',
  messagingSenderId: '196617529491',
  appId: '1:196617529491:web:f86fbb5eaa5c97e9454566',
  measurementId: 'G-6KDSBEKVNR',
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: 'sarkari-sahayak-y50gt',
  appId: '1:83668272398:web:d9623abd2f8a1438f1835f',
  storageBucket: 'sarkari-sahayak-y50gt.firebasestorage.app',
  apiKey: 'AIzaSyAvNcVi2rjHjWEpMiZY61uIwWbILGoP07M',
  authDomain: 'sarkari-sahayak-y50gt.firebaseapp.com',
  messagingSenderId: '83668272398',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };

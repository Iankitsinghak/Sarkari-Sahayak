import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAvNcVi2rjHjWEpMiZY61uIwWbILGoP07M',
  authDomain: 'sarkari-sahayak-y50gt.firebaseapp.com',
  projectId: 'sarkari-sahayak-y50gt',
  storageBucket: 'sarkari-sahayak-y50gt.appspot.com',
  messagingSenderId: '83668272398',
  appId: '1:83668272398:web:d9623abd2f8a1438f1835f',
  measurementId: '', // optional
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };

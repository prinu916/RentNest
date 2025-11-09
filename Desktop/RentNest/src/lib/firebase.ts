// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeTFRalPycfVcJUTK2MoxWTWH5f6Wf_5E",
  authDomain: "rentnest-7bbfb.firebaseapp.com",
  projectId: "rentnest-7bbfb",
  storageBucket: "rentnest-7bbfb.firebasestorage.app",
  messagingSenderId: "230413906679",
  appId: "1:230413906679:web:433674ce350b71051ad9f2",
  measurementId: "G-PKGP1E27XF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (only in production)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export { analytics };
export default app;

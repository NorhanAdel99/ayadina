import { initializeApp ,getApps} from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
const firebaseConfig ={
    apiKey: "AIzaSyB1hE97BBWVGZcYcXp_XmIFEWTlaRcQrTo",
    authDomain: "ayadina-notify.firebaseapp.com",
    projectId: "ayadina-notify",
    storageBucket: "ayadina-notify.appspot.com",
    messagingSenderId: "908007313296",
    appId: "1:908007313296:web:61d2e7bd9cb8df26c7ed15",
    measurementId: "G-MKGCM8JMVY"
  };
const apps = getApps();
const app = !apps.length ? initializeApp(firebaseConfig) :app[0]
export const messaging = getMessaging(app); 
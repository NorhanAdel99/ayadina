
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyB1hE97BBWVGZcYcXp_XmIFEWTlaRcQrTo",
  authDomain: "ayadina-notify.firebaseapp.com",
  projectId: "ayadina-notify",
  storageBucket: "ayadina-notify.appspot.com",
  messagingSenderId: "908007313296",
  appId: "1:908007313296:web:61d2e7bd9cb8df26c7ed15",
  measurementId: "G-MKGCM8JMVY"
} );
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './notification.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
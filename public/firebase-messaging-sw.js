
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyAOnoOWRfWyjikzmfLZAxZH6QnY-ntz-kY",
  authDomain: "iadeena.firebaseapp.com",
  projectId: "iadeena",
  storageBucket: "iadeena.appspot.com",
  messagingSenderId: "77497322474",
  appId: "1:77497322474:web:adf8b165e16da034aa0093",
  measurementId: "G-ELLVSKWMNL"
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
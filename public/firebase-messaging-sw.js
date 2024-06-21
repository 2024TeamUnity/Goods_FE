// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyDrScJgUXI_dAnltyyF-nUvBaijatebaL8',
  authDomain: 'goods-54f7d.firebaseapp.com',
  projectId: 'goods-54f7d',
  storageBucket: 'goods-54f7d.appspot.com',
  messagingSenderId: '184724259259',
  appId: '1:184724259259:web:8e0c4a8c9ee4fa6dea049e',
  measurementId: 'G-MLW66YBYYY',
});

const messaging = firebase.messaging();

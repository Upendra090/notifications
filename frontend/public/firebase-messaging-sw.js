importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const defaultConfig = {
  apiKey: "AIzaSyBxOAiU5LvLNNJHsX0zzBNf7wW-JehST54",
  authDomain: "notifications-e2a73.firebaseapp.com",
  projectId: "notifications-e2a73",
  storageBucket: "notifications-e2a73.appspot.com",
  messagingSenderId: "772628883798",
  appId: "1:772628883798:web:b291bb8a194b361ccdcef7",
};

firebase.initializeApp(defaultConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Notification payload", payload);
  const notificationTitle = payload.notification.title;

  const notificationOptions = {
    body: payload.notification.body,
    click_action: payload.data.click_action,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener("notificationclick", function (event) {
//   console.log("notificationclick", event);
//   const urlToRedirect = event.notification.data.click_action;
//   event.notification.close();
//   event.waitUntil(self.clients.openWindow(urlToRedirect));
// });

self.addEventListener("notificationclick", (event) => {
  console.log("notificationclick", event);
  const urlToRedirect = event.notification.data.click_action;
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsArr) => {
        const hadWindowToFocus = clientsArr.some((windowClient) => {
          if (windowClient.url === urlToRedirect) {
            windowClient.focus();
            return true;
          }
          return false;
        });

        if (!hadWindowToFocus) {
          clients
            .openWindow(urlToRedirect)
            .then((windowClient) =>
              windowClient ? windowClient.focus() : null
            );
        }
      })
  );
});

importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

firebase.initializeApp(defaultConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    click_action: payload.data.click_action,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener("notificationclick", (event) => {
//   console.log(event);
//   event.notification.close();

//   event.waitUntil(
//     clients
//       .matchAll({
//         type: "window",
//       })
//       .then((clientList) => {
//         for (const client of clientList) {
//           if (client.url === "/" && "focus" in client) return client.focus();
//         }
//         if (clients.openWindow) return clients.openWindow("/");
//       })
//   );
// });

self.addEventListener("notificationclick", function (event) {
  console.log("notificationclick", event);
  const urlToRedirect = event.notification.data.click_action;
  event.notification.close();
  event.waitUntil(self.clients.openWindow(urlToRedirect));
});

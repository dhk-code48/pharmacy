self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/icon.png",
      badge: "/badge.png",
      vibrate: [100, 50, 100],
      sound: "/public/sounds/notification.mp3",
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    };
    const audio = new Audio(options.sound);
    audio.play();

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.");
  event.notification.close();

  const targetUrl = event?.data?.json()?.url || "/";
  event.waitUntil(clients.openWindow(targetUrl));
});

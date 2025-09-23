self.addEventListener("push", function (event) {
  let data = {
    title: "Notification",
    body: "You have a new message",
    data: { url: "/" },
  };
  try {
    const payload = event?.data?.json();
    data = {
      ...data,
      ...payload,
      data: {
        ...data.data,
        ...payload.data,
      },
    };
    console.log("Parsed push payload:", data);
  } catch (e) {
    data.body = event?.data?.text() || "You have a new message";
    console.log("Fallback to text payload:", data.body);
  }
  const options = {
    body: data.body,
    icon: "/DC_Logo.svg",
    badge: "/DC_Logo.svg",
    requireInteraction: true,
    data: {
      url: data?.data?.url || "/",
    },
    tag: "new-review",
    renotify: true,
  };
  event.waitUntil(self.registration.showNotification(data.title || "Notification", options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const targetUrl = event?.notification?.data?.url || "/";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && "focus" in client) {
          return client.focus();
        }
      }
      return clients.openWindow(targetUrl);
    })
  );
});
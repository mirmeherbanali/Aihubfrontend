function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};

export async function allowPushNotification(userId) {
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return console.error("Service worker not registered.");
    const existingSubscription = await registration.pushManager.getSubscription();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/allowNotification/checkSubscription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, endpoint: existingSubscription?.endpoint }),
    });
    const { isSubscribed } = await response.json();
    if (existingSubscription && !isSubscribed) {
      await existingSubscription.unsubscribe();
      console.log("Unsubscribed from old browser push endpoint");
    }
    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;
    }
    const newSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
    });
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/allowNotification/saveUserBrowserEndpoint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, subscription: newSubscription }),
    });
    console.log("New subscription sent to backend");
  } catch (err) {
    console.error("Push subscription error:", err);
  }
};
export function useNotifications() {
  const requestPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
  };

  const notify = (title: string, body?: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body, icon: "/favicon.ico" });
    }
  };

  const scheduleReminder = (title: string, delayMs: number) => {
    setTimeout(() => notify("Reminder", title), delayMs);
  };

  return { requestPermission, notify, scheduleReminder, supported: "Notification" in window };
}

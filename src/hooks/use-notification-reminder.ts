import { useEffect, useState, useCallback } from "react";

interface ReminderSettings {
  enabled: boolean;
  time: string; // HH:MM format
  lastScheduled: string | null;
}

const STORAGE_KEY = "fitpro-reminder-settings";
const DEFAULT_TIME = "08:00";

export const getReminderSettings = (): ReminderSettings => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return { enabled: false, time: DEFAULT_TIME, lastScheduled: null };
};

export const saveReminderSettings = (settings: ReminderSettings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

export const useNotificationReminder = () => {
  const [settings, setSettings] = useState<ReminderSettings>(getReminderSettings);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | "unsupported">("default");

  // Check notification support and permission
  useEffect(() => {
    if (!("Notification" in window)) {
      setPermissionStatus("unsupported");
      return;
    }
    setPermissionStatus(Notification.permission);
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!("Notification" in window)) return false;
    
    if (Notification.permission === "granted") {
      setPermissionStatus("granted");
      return true;
    }
    
    if (Notification.permission === "denied") {
      setPermissionStatus("denied");
      return false;
    }
    
    const permission = await Notification.requestPermission();
    setPermissionStatus(permission);
    return permission === "granted";
  }, []);

  // Enable reminders
  const enableReminders = useCallback(async (time: string = DEFAULT_TIME): Promise<boolean> => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return false;
    
    const newSettings: ReminderSettings = {
      enabled: true,
      time,
      lastScheduled: new Date().toISOString(),
    };
    saveReminderSettings(newSettings);
    setSettings(newSettings);
    scheduleNextReminder(time);
    return true;
  }, [requestPermission]);

  // Disable reminders
  const disableReminders = useCallback(() => {
    const newSettings: ReminderSettings = {
      ...settings,
      enabled: false,
    };
    saveReminderSettings(newSettings);
    setSettings(newSettings);
  }, [settings]);

  // Update reminder time
  const updateReminderTime = useCallback((time: string) => {
    const newSettings: ReminderSettings = {
      ...settings,
      time,
      lastScheduled: new Date().toISOString(),
    };
    saveReminderSettings(newSettings);
    setSettings(newSettings);
    if (settings.enabled) {
      scheduleNextReminder(time);
    }
  }, [settings]);

  // Schedule next reminder using setTimeout
  const scheduleNextReminder = useCallback((time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);
    
    // If time has passed today, schedule for tomorrow
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }
    
    const msUntilReminder = reminderTime.getTime() - now.getTime();
    
    // Only schedule if within 24 hours (browser will handle longer periods on revisit)
    if (msUntilReminder <= 24 * 60 * 60 * 1000) {
      setTimeout(() => {
        showReminder();
        // Reschedule for next day
        scheduleNextReminder(time);
      }, msUntilReminder);
    }
  }, []);

  // Show the reminder notification
  const showReminder = useCallback(() => {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    
    // Check if user already checked in today
    const streakData = localStorage.getItem("fitpro-streak");
    if (streakData) {
      const { lastCheckIn } = JSON.parse(streakData);
      const today = new Date().toISOString().split("T")[0];
      if (lastCheckIn === today) return; // Already checked in, no need to remind
    }
    
    new Notification("🔥 Protect Your Streak!", {
      body: "Take a moment to check in and keep your fitness journey on track.",
      icon: "/favicon.ico",
      tag: "streak-reminder",
      requireInteraction: false,
    });
  }, []);

  // On mount, schedule reminder if enabled
  useEffect(() => {
    if (settings.enabled && permissionStatus === "granted") {
      scheduleNextReminder(settings.time);
    }
  }, [settings.enabled, settings.time, permissionStatus, scheduleNextReminder]);

  return {
    settings,
    permissionStatus,
    enableReminders,
    disableReminders,
    updateReminderTime,
    isSupported: permissionStatus !== "unsupported",
    canEnable: permissionStatus !== "denied" && permissionStatus !== "unsupported",
  };
};

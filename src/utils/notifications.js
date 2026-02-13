// Browser notification utilities

export const isSupported = () => {
  return 'Notification' in window;
};

export const requestPermission = async () => {
  if (!isSupported()) {
    console.log('Browser notifications not supported');
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return 'denied';
  }
};

export const showNotification = (title, body, icon = null) => {
  if (!isSupported()) {
    console.log('Browser notifications not supported');
    return null;
  }

  if (Notification.permission !== 'granted') {
    console.log('Notification permission not granted');
    return null;
  }

  try {
    const notification = new Notification(title, {
      body,
      icon: icon || '/vite.svg',
      badge: '/vite.svg',
      tag: 'calendar-reminder',
      requireInteraction: false,
    });

    // Auto-close after 5 seconds
    setTimeout(() => notification.close(), 5000);

    return notification;
  } catch (error) {
    console.error('Error showing notification:', error);
    return null;
  }
};

export const getPermissionStatus = () => {
  if (!isSupported()) return 'unsupported';
  return Notification.permission;
};

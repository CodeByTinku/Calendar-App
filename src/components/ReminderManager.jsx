import { useEffect, useState } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { getReminderTime, shouldTriggerReminder } from '../utils/dateUtils';
import { requestPermission, showNotification, getPermissionStatus } from '../utils/notifications';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ReminderManager = () => {
  const { events, updateEvent } = useCalendar();
  const [notifications, setNotifications] = useState([]);
  const [permissionRequested, setPermissionRequested] = useState(false);

  // Request notification permission on mount
  useEffect(() => {
    if (!permissionRequested && getPermissionStatus() === 'default') {
      requestPermission();
      setPermissionRequested(true);
    }
  }, [permissionRequested]);

  // Check for reminders every minute
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      
      events.forEach(event => {
        if (!event.reminders) return;

        Object.entries(event.reminders).forEach(([type, enabled]) => {
          if (!enabled) return;

          const reminderTime = getReminderTime(event.date, event.time, type);
          
          if (shouldTriggerReminder(reminderTime)) {
            // Check if already triggered
            const alreadyTriggered = event.reminders[`${type}_triggered`];
            if (alreadyTriggered) return;

            // Show notification
            const message = `Reminder: ${event.title} at ${event.time}`;
            showNotification('Calendar Reminder', message);

            // Add to in-app notifications
            const notificationId = `${event.id}-${type}`;
            setNotifications(prev => [
              ...prev,
              {
                id: notificationId,
                eventId: event.id,
                title: event.title,
                time: event.time,
                type,
              },
            ]);

            // Mark as triggered
            updateEvent(event.id, {
              reminders: {
                ...event.reminders,
                [`${type}_triggered`]: true,
              },
            });

            // Auto-remove notification after 5 seconds
            setTimeout(() => {
              setNotifications(prev => prev.filter(n => n.id !== notificationId));
            }, 5000);
          }
        });
      });
    };

    // Check immediately
    checkReminders();

    // Then check every minute
    const interval = setInterval(checkReminders, 60000);

    return () => clearInterval(interval);
  }, [events, updateEvent]);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-l-4 border-primary-500 p-4 animate-slide-up"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <BellIcon className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Scheduled for {notification.time}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReminderManager;

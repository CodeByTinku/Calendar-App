import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addDays,
  format,
  isSameDay,
  isToday,
  isSameMonth,
  parseISO,
  addMinutes,
  addHours,
  subMinutes,
  subHours,
  subDays,
} from 'date-fns';

// Get all days to display in month view (including prev/next month days)
export const getMonthDays = (date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
};

// Get 7 days for week view
export const getWeekDays = (date) => {
  const weekStart = startOfWeek(date);
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
};

// Format date for display
export const formatDate = (date, formatStr = 'PPP') => {
  return format(date, formatStr);
};

// Format time for display
export const formatTime = (time) => {
  if (!time) return '';
  return time;
};

// Check if two dates are the same day
export const isSameDayUtil = (date1, date2) => {
  return isSameDay(date1, date2);
};

// Check if date is today
export const isTodayUtil = (date) => {
  return isToday(date);
};

// Check if date is in the same month
export const isSameMonthUtil = (date, monthDate) => {
  return isSameMonth(date, monthDate);
};

// Get reminder trigger time based on event date/time and reminder type
export const getReminderTime = (eventDate, eventTime, reminderType) => {
  // Combine date and time
  const [hours, minutes] = eventTime.split(':').map(Number);
  const eventDateTime = new Date(eventDate);
  eventDateTime.setHours(hours, minutes, 0, 0);

  switch (reminderType) {
    case '10min':
      return subMinutes(eventDateTime, 10);
    case '1hr':
      return subHours(eventDateTime, 1);
    case '1day':
      return subDays(eventDateTime, 1);
    default:
      return eventDateTime;
  }
};

// Check if reminder should trigger now
export const shouldTriggerReminder = (reminderTime) => {
  const now = new Date();
  const diff = reminderTime.getTime() - now.getTime();
  // Trigger if within 1 minute window
  return diff >= 0 && diff < 60000;
};

// Get events for a specific day
export const getEventsForDay = (events, date) => {
  return events.filter(event => isSameDay(event.date, date));
};

// Sort events by time
export const sortEventsByTime = (events) => {
  return [...events].sort((a, b) => {
    const timeA = a.time || '00:00';
    const timeB = b.time || '00:00';
    return timeA.localeCompare(timeB);
  });
};

// Generate time slots for day/week view
export const generateTimeSlots = () => {
  return Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });
};

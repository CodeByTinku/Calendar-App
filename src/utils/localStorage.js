// LocalStorage utility functions for persisting calendar data

const STORAGE_KEYS = {
  EVENTS: 'calendar_events',
  THEME: 'calendar_theme',
};

export const saveEvents = (events) => {
  try {
    const eventsToSave = events.map(event => ({
      ...event,
      date: event.date instanceof Date ? event.date.toISOString() : event.date,
    }));
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(eventsToSave));
  } catch (error) {
    console.error('Error saving events to localStorage:', error);
    if (error.name === 'QuotaExceededError') {
      alert('Storage quota exceeded. Please delete some events.');
    }
  }
};

export const loadEvents = () => {
  try {
    const eventsJSON = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (!eventsJSON) return [];
    
    const events = JSON.parse(eventsJSON);
    return events.map(event => ({
      ...event,
      date: new Date(event.date),
    }));
  } catch (error) {
    console.error('Error loading events from localStorage:', error);
    return [];
  }
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
  }
};

export const loadTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  } catch (error) {
    console.error('Error loading theme from localStorage:', error);
    return 'light';
  }
};

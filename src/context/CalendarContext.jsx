import { createContext, useContext, useState, useEffect } from 'react';
import { saveEvents, loadEvents } from '../utils/localStorage';

// Simple ID generator
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const CalendarContext = createContext();

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within CalendarProvider');
  }
  return context;
};

export const CalendarProvider = ({ children }) => {
  const [events, setEvents] = useState(() => loadEvents());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Save events to localStorage whenever they change
  useEffect(() => {
    saveEvents(events);
  }, [events]);

  // Add new event
  const addEvent = (eventData) => {
    const newEvent = {
      id: generateId(),
      ...eventData,
      createdAt: new Date(),
    };
    setEvents(prev => [...prev, newEvent]);
  };

  // Update existing event
  const updateEvent = (eventId, eventData) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === eventId ? { ...event, ...eventData } : event
      )
    );
  };

  // Delete event
  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  // Get all unique tags from events
  const getAllTags = () => {
    const tagsSet = new Set();
    events.forEach(event => {
      if (event.tags) {
        event.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet);
  };

  // Filter events based on search and tags
  const getFilteredEvents = () => {
    return events.filter(event => {
      const matchesSearch = !searchQuery || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags = selectedTags.length === 0 ||
        (event.tags && event.tags.some(tag => selectedTags.includes(tag)));

      return matchesSearch && matchesTags;
    });
  };

  // Open event form for creating new event
  const openEventForm = (date = null) => {
    setEditingEvent(null);
    setCurrentDate(date || currentDate);
    setIsEventFormOpen(true);
  };

  // Open event form for editing
  const openEditEventForm = (event) => {
    setEditingEvent(event);
    setIsEventFormOpen(true);
  };

  // Close event form
  const closeEventForm = () => {
    setIsEventFormOpen(false);
    setEditingEvent(null);
  };

  const value = {
    events,
    currentDate,
    setCurrentDate,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    selectedEvent,
    setSelectedEvent,
    isEventFormOpen,
    editingEvent,
    addEvent,
    updateEvent,
    deleteEvent,
    getAllTags,
    getFilteredEvents,
    openEventForm,
    openEditEventForm,
    closeEventForm,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

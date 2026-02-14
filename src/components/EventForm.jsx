import { useState, useEffect } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const EVENT_COLORS = [
  { name: 'Blue', value: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  { name: 'Green', value: 'border-green-500 bg-green-50 dark:bg-green-900/20' },
  { name: 'Red', value: 'border-red-500 bg-red-50 dark:bg-red-900/20' },
  { name: 'Purple', value: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' },
  { name: 'Orange', value: 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' },
  { name: 'Pink', value: 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' },
];

const EventForm = () => {
  const { isEventFormOpen, closeEventForm, addEvent, updateEvent, deleteEvent, editingEvent, currentDate } = useCalendar();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: format(currentDate, 'yyyy-MM-dd'),
    time: '09:00',
    tags: '',
    color: EVENT_COLORS[0].value,
    reminders: {
      '10min': false,
      '1hr': false,
      '1day': false,
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title || '',
        description: editingEvent.description || '',
        date: format(editingEvent.date, 'yyyy-MM-dd'),
        time: editingEvent.time || '09:00',
        tags: editingEvent.tags ? editingEvent.tags.join(', ') : '',
        color: editingEvent.color || EVENT_COLORS[0].value,
        reminders: editingEvent.reminders || { '10min': false, '1hr': false, '1day': false },
      });
    } else {
      setFormData({
        title: '',
        description: '',
        date: format(currentDate, 'yyyy-MM-dd'),
        time: '09:00',
        tags: '',
        color: EVENT_COLORS[0].value,
        reminders: { '10min': false, '1hr': false, '1day': false },
      });
    }
    setErrors({});
  }, [editingEvent, currentDate, isEventFormOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('reminder-')) {
      const reminderType = name.replace('reminder-', '');
      setFormData(prev => ({
        ...prev,
        reminders: {
          ...prev.reminders,
          [reminderType]: checked,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    const eventData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      date: new Date(formData.date),
      time: formData.time,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      color: formData.color,
      reminders: formData.reminders,
    };

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }

    closeEventForm();
  };

  const handleDelete = () => {
    if (editingEvent && window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(editingEvent.id);
      closeEventForm();
    }
  };

  if (!isEventFormOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={closeEventForm}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input-field ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Event title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="input-field"
              placeholder="Event description (optional)"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`input-field ${errors.date ? 'border-red-500' : ''}`}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`input-field ${errors.time ? 'border-red-500' : ''}`}
              />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="input-field"
              placeholder="work, personal, meeting (comma-separated)"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color
            </label>
            <div className="flex flex-wrap gap-3">
              {EVENT_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                  className={`px-4 py-2 rounded-lg border-l-4 ${color.value} transition-all ${
                    formData.color === color.value ? 'ring-2 ring-primary-500 scale-105' : ''
                  }`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Reminders */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reminders
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="reminder-10min"
                  checked={formData.reminders['10min']}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">10 minutes before</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="reminder-1hr"
                  checked={formData.reminders['1hr']}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">1 hour before</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="reminder-1day"
                  checked={formData.reminders['1day']}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">1 day before</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              {editingEvent && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete Event
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={closeEventForm}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                {editingEvent ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;

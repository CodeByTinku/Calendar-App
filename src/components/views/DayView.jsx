import { useCalendar } from '../../context/CalendarContext';
import { getEventsForDay, sortEventsByTime, generateTimeSlots } from '../../utils/dateUtils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { addDays, subDays, format } from 'date-fns';

const DayView = () => {
  const { currentDate, setCurrentDate, getFilteredEvents, openEventForm, openEditEventForm } = useCalendar();
  const events = getFilteredEvents();
  const dayEvents = sortEventsByTime(getEventsForDay(events, currentDate));
  const timeSlots = generateTimeSlots();

  const goToPreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  const goToNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsForTimeSlot = (time) => {
    const hour = time.split(':')[0];
    return dayEvents.filter(event => event.time.startsWith(hour));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {format(currentDate, 'EEEE, MMMM d, yyyy')}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToToday}
            className="btn-secondary text-sm"
          >
            Today
          </button>
          <button
            onClick={goToPreviousDay}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={goToNextDay}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Day Schedule */}
      <div className="card p-6">
        {dayEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No events scheduled for this day
            </p>
            <button
              onClick={() => openEventForm(currentDate)}
              className="btn-primary"
            >
              Add Event
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {timeSlots.map((time) => {
              const slotEvents = getEventsForTimeSlot(time);
              
              if (slotEvents.length === 0) return null;

              return (
                <div key={time} className="flex gap-4">
                  <div className="w-20 text-sm text-gray-500 dark:text-gray-400 font-medium pt-2">
                    {time}
                  </div>
                  <div className="flex-1 space-y-2">
                    {slotEvents.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => openEditEventForm(event)}
                        className={`p-4 rounded-lg border-l-4 ${event.color} cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                              {event.title}
                            </h3>
                            {event.description && (
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                {event.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <span>🕐 {event.time}</span>
                              {event.tags && event.tags.length > 0 && (
                                <div className="flex gap-1">
                                  {event.tags.map((tag, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-xs"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Add Button */}
      {dayEvents.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => openEventForm(currentDate)}
            className="btn-secondary"
          >
            Add Another Event
          </button>
        </div>
      )}
    </div>
  );
};

export default DayView;

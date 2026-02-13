import { useCalendar } from '../../context/CalendarContext';
import { getMonthDays, isSameDayUtil, isTodayUtil, isSameMonthUtil, getEventsForDay, formatDate } from '../../utils/dateUtils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { addMonths, subMonths, format } from 'date-fns';

const MonthView = () => {
  const { currentDate, setCurrentDate, getFilteredEvents, openEventForm, openEditEventForm } = useCalendar();
  const events = getFilteredEvents();
  const monthDays = getMonthDays(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getDayEvents = (day) => {
    return getEventsForDay(events, day);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToToday}
            className="btn-secondary text-sm"
          >
            Today
          </button>
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="card p-4">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {monthDays.map((day, index) => {
            const dayEvents = getDayEvents(day);
            const isToday = isTodayUtil(day);
            const isCurrentMonth = isSameMonthUtil(day, currentDate);

            return (
              <div
                key={index}
                onClick={() => openEventForm(day)}
                className={`min-h-[100px] p-2 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isToday
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                } ${
                  !isCurrentMonth ? 'opacity-40' : ''
                }`}
              >
                <div className={`text-sm font-semibold mb-1 ${
                  isToday
                    ? 'text-primary-700 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {format(day, 'd')}
                </div>

                {/* Event Indicators */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditEventForm(event);
                      }}
                      className={`text-xs p-1 rounded border-l-2 ${event.color} truncate hover:scale-105 transition-transform`}
                      title={event.title}
                    >
                      {event.time} {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 pl-1">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthView;

import { useCalendar } from '../../context/CalendarContext';
import { getWeekDays, getEventsForDay, sortEventsByTime, generateTimeSlots } from '../../utils/dateUtils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { addWeeks, subWeeks, format } from 'date-fns';

const WeekView = () => {
  const { currentDate, setCurrentDate, getFilteredEvents, openEventForm, openEditEventForm } = useCalendar();
  const events = getFilteredEvents();
  const weekDays = getWeekDays(currentDate);
  const timeSlots = generateTimeSlots();

  const goToPreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const goToNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getDayEvents = (day) => {
    return sortEventsByTime(getEventsForDay(events, day));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToToday}
            className="btn-secondary text-sm"
          >
            Today
          </button>
          <button
            onClick={goToPreviousWeek}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={goToNextWeek}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Week Grid */}
      <div className="card p-4 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Day Headers */}
          <div className="grid grid-cols-8 gap-2 mb-4 sticky top-0 bg-white dark:bg-gray-800 z-10">
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400"></div>
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="text-center">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {format(day, 'EEE')}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots and Events */}
          <div className="space-y-1">
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-8 gap-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 text-right pr-2 pt-1">
                  {time}
                </div>
                {weekDays.map((day) => {
                  const dayEvents = getDayEvents(day).filter(event => event.time.startsWith(time.split(':')[0]));
                  
                  return (
                    <div
                      key={day.toISOString()}
                      onClick={() => openEventForm(day)}
                      className="min-h-[60px] border border-gray-200 dark:border-gray-700 rounded-lg p-1 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                    >
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditEventForm(event);
                          }}
                          className={`text-xs p-2 rounded border-l-2 ${event.color} mb-1 hover:scale-105 transition-transform cursor-pointer`}
                        >
                          <div className="font-semibold truncate">{event.title}</div>
                          <div className="text-gray-600 dark:text-gray-400">{event.time}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView;

import { CalendarProvider } from './context/CalendarContext';
import { ThemeProvider } from './context/ThemeContext';
import { useCalendar } from './context/CalendarContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import EventForm from './components/EventForm';
import ReminderManager from './components/ReminderManager';
import MonthView from './components/views/MonthView';
import WeekView from './components/views/WeekView';
import DayView from './components/views/DayView';

const AppContent = () => {
  const { viewMode } = useCalendar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <SearchBar />
      
      <main className="pb-8">
        {viewMode === 'month' && <MonthView />}
        {viewMode === 'week' && <WeekView />}
        {viewMode === 'day' && <DayView />}
      </main>

      <EventForm />
      <ReminderManager />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <CalendarProvider>
        <AppContent />
      </CalendarProvider>
    </ThemeProvider>
  );
}

export default App;

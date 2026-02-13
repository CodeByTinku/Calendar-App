# 📅 Calendar App

A modern, feature-rich calendar application built with React, TailwindCSS, and localStorage for persistence. Create events, set reminders, and manage your schedule with a beautiful, responsive interface.

![Calendar App](https://img.shields.io/badge/React-18.3-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8) ![Vite](https://img.shields.io/badge/Vite-7.3-646cff)

## ✨ Features

### 📝 Event Management
- **Create Events** with title, description, date, time, and tags
- **Edit & Delete** events with a user-friendly interface
- **Color-Coded Events** for easy visual categorization
- **Tag System** for organizing events by category


### ⏰ Smart Reminders
- **Multiple Reminder Options**: 10 minutes, 1 hour, or 1 day before events
- **In-App Notifications**: Toast notifications that appear in the bottom-right corner
- **Automatic Tracking**: Reminders trigger automatically at the right time

### 📆 Multiple Calendar Views
- **Month View**: Traditional calendar grid showing the entire month
- **Week View**: Detailed 7-day schedule with hourly time slots
- **Day View**: Focused single-day view with all event details
- **Easy Navigation**: Previous/Next buttons and "Today" quick jump

### 🎨 Beautiful UI/UX
- **Dark/Light Mode**: Toggle between themes with persistence
- **Responsive Design**: Mobile-first approach, works on all devices
- **Smooth Animations**: Fade-in, slide-up effects for a premium feel
- **Custom Scrollbar**: Styled scrollbars that match the theme
- **Color Palette**: Vibrant primary (blue) and accent (purple) colors

### 🔍 Search & Filter
- **Text Search**: Find events by title or description
- **Tag Filtering**: Filter events by one or more tags
- **Real-Time Results**: Instant filtering as you type
- **Clear Filters**: One-click to reset all filters

### 💾 Data Persistence
- **LocalStorage**: All events and preferences saved locally
- **Automatic Saving**: Changes persist immediately
- **Theme Persistence**: Your dark/light mode preference is remembered
- **No Backend Required**: Works completely offline

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd calendar-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Editing an Event

1. Click on any event in the calendar
2. The event form will open with pre-filled data
3. Make your changes
4. Click **"Update Event"** to save or **"Delete Event"** to remove

### Switching Views

Use the view switcher in the header:
- **Month**: See the entire month at a glance
- **Week**: View a detailed 7-day schedule
- **Day**: Focus on a single day's events

### Using Reminders

1. When creating/editing an event, check the reminder options
2. The app will automatically show notifications at the specified time
3. **Browser notifications** require permission (you'll be prompted)
4. **In-app notifications** always work and appear in the bottom-right corner


## 🛠️ Tech Stack

- **React 18.3** - UI library with hooks and functional components
- **Vite 7.3** - Fast build tool and dev server
- **TailwindCSS 4.0** - Utility-first CSS framework
- **date-fns** - Modern date utility library
- **Heroicons** - Beautiful hand-crafted SVG icons
- **LocalStorage API** - Browser storage for persistence

## 📁 Project Structure

```
calendar-app/
├── src/
│   ├── components/
│   │   ├── views/
│   │   │   ├── MonthView.jsx    # Monthly calendar grid
│   │   │   ├── WeekView.jsx     # Weekly schedule
│   │   │   └── DayView.jsx      # Daily schedule
│   │   ├── Header.jsx           # App header with navigation
│   │   ├── EventForm.jsx        # Create/edit event modal
│   │   ├── SearchBar.jsx        # Search and filter UI
│   │   └── ReminderManager.jsx  # Reminder system
│   ├── context/
│   │   ├── CalendarContext.jsx  # Event state management
│   │   └── ThemeContext.jsx     # Theme state management
│   ├── utils/
│   │   ├── dateUtils.js         # Date manipulation helpers
│   │   ├── localStorage.js      # Storage utilities
│   │   └── notifications.js     # Notification helpers
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── tailwind.config.js           # TailwindCSS configuration
├── postcss.config.js            # PostCSS configuration
├── vite.config.js               # Vite configuration
└── package.json                 # Dependencies
```
## 📝 Future Enhancements

Potential features for future versions:
- Search functionality
- Form Validation
- Drag-and-drop event rescheduling
- Export/import events (JSON, iCal)
- Google Calendar integration
- Recurring events
- Event categories with custom colors
- Multi-day events
- Time zone support



---

**Made with ❤️ using React and TailwindCSS**


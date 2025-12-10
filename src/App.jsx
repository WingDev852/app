import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import BreathingScreen from './screens/BreathingScreen';
import SettingsScreen from './screens/SettingsScreen';
import HistoryScreen from './screens/HistoryScreen';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const navigate = (view, data = null) => {
    if (data) setSelectedRoutine(data);
    setCurrentView(view);
  };

  const renderScreen = () => {
    switch (currentView) {
      case 'home':
        return <HomeScreen onNavigate={navigate} />;
      case 'workout':
        return <WorkoutScreen routine={selectedRoutine} onExit={() => navigate('home')} />;
      case 'breathing':
        return <BreathingScreen onExit={() => navigate('home')} />;
      case 'settings':
        return <SettingsScreen onExit={(route) => navigate(route === 'history' ? 'history' : 'home')} />;
      case 'history':
        return <HistoryScreen onBack={() => navigate('settings')} />;
      default:
        return <HomeScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className="app-container">
      {renderScreen()}
    </div>
  );
}

export default App;

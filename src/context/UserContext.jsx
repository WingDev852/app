import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [streak, setStreak] = useState(() => {
        const saved = localStorage.getItem('mindful_reps_streak');
        return saved ? parseInt(saved, 10) : 0;
    });

    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('mindful_reps_history');
        return saved ? JSON.parse(saved) : [];
    });

    const [isPremium, setIsPremium] = useState(false); // Default free
    const [name, setName] = useState(() => localStorage.getItem('mindful_reps_name') || 'Guest');
    const [preferences, setPreferences] = useState(() => {
        const saved = localStorage.getItem('mindful_reps_prefs');
        return saved ? JSON.parse(saved) : { notifications: true, sounds: true, theme: 'system' };
    });

    useEffect(() => {
        localStorage.setItem('mindful_reps_streak', streak);
    }, [streak]);

    useEffect(() => {
        localStorage.setItem('mindful_reps_history', JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        localStorage.setItem('mindful_reps_name', name);
    }, [name]);

    useEffect(() => {
        localStorage.setItem('mindful_reps_prefs', JSON.stringify(preferences));
    }, [preferences]);

    const updatePreference = (key, value) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    };

    const completeWorkout = (routineId, mood = null) => {
        const today = new Date().toISOString().split('T')[0];
        const lastWorkout = history.length > 0 ? history[history.length - 1].date : null;

        // Add to history
        setHistory(prev => [...prev, { date: today, routineId, mood }]);

        // Streak logic (simplified)
        if (lastWorkout !== today) {
            setStreak(prev => prev + 1);
        }
    };

    return (
        <UserContext.Provider value={{ streak, history, isPremium, name, setName, preferences, updatePreference, completeWorkout }}>
            {children}
        </UserContext.Provider>
    );
};

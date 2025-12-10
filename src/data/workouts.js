export const EXERCISES = {
    pushups: { id: 'pushups', name: 'Push-ups', type: 'strength' },
    squats: { id: 'squats', name: 'Air Squats', type: 'strength' },
    lunges: { id: 'lunges', name: 'Forward Lunges', type: 'strength' },
    plank: { id: 'plank', name: 'Plank Hold', type: 'strength' },
    jumpingJacks: { id: 'jumpingJacks', name: 'Jumping Jacks', type: 'cardio' },
    mountainClimbers: { id: 'mountainClimbers', name: 'Mountain Climbers', type: 'cardio' },
    boxBreathing: { id: 'boxBreathing', name: 'Box Breathing', type: 'mindfulness' },
    bodyScan: { id: 'bodyScan', name: 'Quick Body Scan', type: 'mindfulness' },
    gratitude: { id: 'gratitude', name: 'Gratitude Reflection', type: 'mindfulness' },
};

export const ROUTINES = [
    {
        id: 'morning-fusion',
        title: 'Morning Fusion',
        duration: 300, // 5 minutes in seconds
        color: 'var(--color-accent)',
        sequence: [
            { type: 'exercise', id: 'jumpingJacks', duration: 45 },
            { type: 'rest', duration: 15 },
            { type: 'exercise', id: 'squats', duration: 45 },
            { type: 'rest', duration: 15 },
            { type: 'exercise', id: 'pushups', duration: 45 },
            { type: 'rest', duration: 15 },
            { type: 'mindfulness', id: 'boxBreathing', duration: 60 },
            { type: 'exercise', id: 'plank', duration: 60 },
        ]
    },
    {
        id: 'desk-relief',
        title: 'Desk Relief',
        duration: 300,
        color: 'var(--color-primary)',
        sequence: [
            { type: 'exercise', id: 'squats', duration: 45 },
            { type: 'rest', duration: 15 },
            { type: 'exercise', id: 'lunges', duration: 45 },
            { type: 'rest', duration: 15 },
            { type: 'mindfulness', id: 'bodyScan', duration: 90 },
            { type: 'exercise', id: 'plank', duration: 60 },
        ]
    },
    {
        id: 'sleep-prep',
        title: 'Pre-Sleep Calm',
        duration: 300,
        color: 'var(--color-secondary)',
        sequence: [
            { type: 'exercise', id: 'squats', duration: 30 },
            { type: 'rest', duration: 10 },
            { type: 'exercise', id: 'lunges', duration: 30 },
            { type: 'rest', duration: 10 },
            { type: 'mindfulness', id: 'gratitude', duration: 120 },
            { type: 'mindfulness', id: 'boxBreathing', duration: 100 },
        ]
    },
    {
        id: 'energy-boost',
        title: 'Energy Boost',
        duration: 300,
        color: 'hsl(var(--hue-accent) 80% 60%)',
        sequence: [
            { type: 'exercise', id: 'jumpingJacks', duration: 60 },
            { type: 'rest', duration: 15 },
            { type: 'exercise', id: 'mountainClimbers', duration: 45 },
            { type: 'rest', duration: 15 },
            { type: 'exercise', id: 'jumpingJacks', duration: 60 },
            { type: 'mindfulness', id: 'bodyScan', duration: 105 },
        ]
    },
    {
        id: 'focus-flow',
        title: 'Focus Flow',
        duration: 300,
        color: 'hsl(280 60% 60%)',
        sequence: [
            { type: 'exercise', id: 'plank', duration: 45 },
            { type: 'rest', duration: 15 },
            { type: 'mindfulness', id: 'boxBreathing', duration: 60 },
            { type: 'exercise', id: 'squats', duration: 45 },
            { type: 'rest', duration: 15 },
            { type: 'mindfulness', id: 'gratitude', duration: 120 },
        ]
    }
];

export const getDailyRoutines = () => {
    // In a real app, this would rotate based on date.
    // For prototype, we verify we return all 3.
    return ROUTINES;
};

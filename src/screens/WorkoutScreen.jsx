import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { EXERCISES } from '../data/workouts';
import { X, CheckCircle, Pause, Play } from 'lucide-react';

export default function WorkoutScreen({ routine, onExit }) {
    const { completeWorkout } = useUser();
    const [stepIndex, setStepIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(routine.sequence[0].duration);
    const [isPaused, setIsPaused] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const currentStep = routine.sequence[stepIndex];
    const exercise = currentStep.id ? EXERCISES[currentStep.id] : null;

    useEffect(() => {
        if (isPaused || isFinished) return;

        if (timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else {
            // Step finished
            if (stepIndex < routine.sequence.length - 1) {
                // Move to next step
                const nextIndex = stepIndex + 1;
                setStepIndex(nextIndex);
                setTimeLeft(routine.sequence[nextIndex].duration);
            } else {
                // Workout finished
                setIsFinished(true);
            }
        }
    }, [timeLeft, isPaused, isFinished, stepIndex, routine.sequence]);

    const getBackgroundColor = () => {
        if (isFinished) return 'hsl(var(--color-primary))'; // Greenish
        if (currentStep.type === 'rest') return 'hsl(var(--color-secondary))';
        if (currentStep.type === 'mindfulness') return 'hsl(var(--color-accent))';
        return 'hsl(var(--color-bg))'; // Exercise (default/whiteish)
    };

    const finishWorkout = (selectedMood) => {
        completeWorkout(routine.id, selectedMood);
        onExit();
    };

    if (isFinished) {
        return (
            <div className="animate-enter" style={{
                height: '100vh',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                background: 'hsl(var(--color-primary))',
                color: 'white', padding: '2rem', textAlign: 'center'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>How do you feel?</h2>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                    {[
                        { val: 1, icon: '😤' },
                        { val: 2, icon: '😫' },
                        { val: 3, icon: '😐' },
                        { val: 4, icon: '🙂' },
                        { val: 5, icon: '🤩' }
                    ].map(m => (
                        <button key={m.val} onClick={() => finishWorkout(m.val)} style={{ fontSize: '2.5rem', transition: 'transform 0.2s' }}>
                            {m.icon}
                        </button>
                    ))}
                </div>
                <p style={{ opacity: 0.8 }}>Select to complete</p>
            </div>
        );
    }

    // Active Workout View
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: getBackgroundColor(),
            color: currentStep.type === 'exercise' ? 'hsl(var(--color-text-main))' : 'white',
            transition: 'background 0.5s ease'
        }}>
            {/* Top Bar */}
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Step {stepIndex + 1} / {routine.sequence.length}
                </div>
                <button onClick={onExit} style={{ background: 'transparent', padding: '0.5rem' }}>
                    <X color={currentStep.type === 'exercise' ? 'black' : 'white'} />
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>

                <div style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: '0.5rem' }}>
                    {currentStep.type}
                </div>

                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                    {currentStep.type === 'rest' ? 'Rest' : exercise?.name}
                </h2>

                <div style={{ fontSize: '5rem', fontWeight: 'bold', fontVariantNumeric: 'tabular-nums' }}>
                    {timeLeft}
                </div>

            </div>

            {/* Controls */}
            <div style={{ padding: '3rem', display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={() => setIsPaused(!isPaused)}
                    style={{
                        background: isPaused ? 'rgba(0,0,0,0.1)' : 'white',
                        color: isPaused ? 'white' : 'black',
                        width: '64px', height: '64px', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: 'var(--shadow-md)'
                    }}>
                    {isPaused ? <Play fill="white" /> : <Pause fill="black" />}
                </button>
            </div>
        </div>
    );
}

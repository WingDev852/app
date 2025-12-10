import React, { useState, useEffect, useRef } from 'react';
import { X, RotateCw } from 'lucide-react';

export default function BreathingScreen({ onExit }) {
    const [timeLeft, setTimeLeft] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [phase, setPhase] = useState('Ready');

    useEffect(() => {
        // Auto-start after a brief delay for smoothness
        const startTimer = setTimeout(() => setIsActive(true), 500);
        return () => clearTimeout(startTimer);
    }, []);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => {
                    if (time <= 1) {
                        setIsFinished(true);
                        setIsActive(false);
                        return 0;
                    }
                    return time - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    useEffect(() => {
        if (!isActive) {
            if (!isFinished) setPhase('Ready');
            else setPhase('Done');
            return;
        }

        const cycle = 16;
        const current = 60 - timeLeft;
        const mod = current % cycle;

        // 4-4-4-4 Cycle
        if (mod < 4) setPhase('Inhale');
        else if (mod < 8) setPhase('Hold');
        else if (mod < 12) setPhase('Exhale');
        else setPhase('Hold');
    }, [timeLeft, isActive, isFinished]);

    const getInstructions = () => {
        switch (phase) {
            case 'Ready': return 'Get comfortable...';
            case 'Inhale': return 'Breathe in through nose';
            case 'Hold': return 'Hold your breath';
            case 'Exhale': return 'Release slowly through mouth';
            case 'Done': return 'Session Complete';
            default: return 'Relax';
        }
    }

    const getScale = () => {
        if (!isActive && !isFinished) return 'scale(0.8)'; // Initial small
        if (isFinished) return 'scale(1)';
        if (phase === 'Inhale') return 'scale(1.2)';
        if (phase === 'Exhale') return 'scale(0.8)';
        return 'scale(1)';
    }

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(180deg, hsl(215 30% 25%) 0%, hsl(215 40% 15%) 100%)',
            color: 'white',
            padding: '2rem',
            position: 'relative'
        }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', zIndex: 10 }}>
                <button onClick={onExit} style={{
                    background: 'rgba(255,255,255,0.1)',
                    width: '40px', height: '40px',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                }}>
                    <X color="white" size={20} />
                </button>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ opacity: 0.7, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem' }}>
                    Box Breathing
                </div>

                <h2 style={{
                    fontSize: '2.5rem',
                    marginBottom: '3rem',
                    fontWeight: '700',
                    height: '3rem', // Fixed height to prevent layout shift
                    display: 'flex', alignItems: 'center'
                }}>
                    {phase}
                </h2>

                {/* Visual Circle */}
                <div style={{
                    width: '240px',
                    height: '240px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 4s cubic-bezier(0.4, 0, 0.2, 1), background 1s ease',
                    transform: getScale(),
                    boxShadow: phase === 'Inhale' ? '0 0 50px rgba(255,255,255,0.15)' : 'none',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {isFinished ? (
                        <RotateCw size={48} />
                    ) : (
                        <span style={{ fontSize: '4rem', fontWeight: '300', fontVariantNumeric: 'tabular-nums' }}>
                            {isActive ? timeLeft : ''}
                        </span>
                    )}
                </div>

                <p style={{ marginTop: '3rem', opacity: 0.7, fontSize: '1.1rem', textAlign: 'center', minHeight: '1.5em' }}>
                    {getInstructions()}
                </p>

                {isFinished && (
                    <button className="animate-enter" onClick={onExit} style={{
                        marginTop: '1rem',
                        background: 'white',
                        color: 'hsl(215 40% 20%)',
                        padding: '0.8rem 2rem',
                        borderRadius: '30px',
                        fontWeight: '600'
                    }}>
                        Finish
                    </button>
                )}
            </div>
        </div>
    );
}
